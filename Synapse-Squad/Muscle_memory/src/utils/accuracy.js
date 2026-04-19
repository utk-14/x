/**
 * Compare user strokes to a rendered reference of the same character (any case).
 */

const MASK_CACHE = new Map();

const FONT_BASE = '800 220px "Nunito", system-ui, sans-serif';
const DILATE_RADIUS = 8;
const GRID = 6;
const MIN_POINTS = 24;

function cacheKey(letter, w, h) {
  return `${letter}-${w}x${h}`;
}

function buildRawMask(letterChar, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const ch = String(letterChar).slice(0, 1);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#1e293b";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = FONT_BASE;
  ctx.fillText(ch, width / 2, height / 2 + height * 0.04);

  const { data } = ctx.getImageData(0, 0, width, height);
  const mask = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const a = data[i * 4 + 3];
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const dark = r + g + b < 620;
    mask[i] = a > 20 && dark ? 1 : 0;
  }
  return mask;
}

function dilate(mask, width, height, radius) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!mask[i]) continue;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          out[ny * width + nx] = 1;
        }
      }
    }
  }
  return out;
}

function letterBounds(mask, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x]) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (minX > maxX) return null;
  return { minX, minY, maxX, maxY };
}

function gridCoverage(points, dilated, rawMask, width, height, bounds) {
  const cellW = (bounds.maxX - bounds.minX) / GRID || 1;
  const cellH = (bounds.maxY - bounds.minY) / GRID || 1;
  const cellsWithLetter = new Set();
  const cellsHit = new Set();

  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      const cx0 = bounds.minX + gx * cellW;
      const cy0 = bounds.minY + gy * cellH;
      let hasLetter = false;
      for (let py = Math.floor(cy0); py < cy0 + cellH && !hasLetter; py++) {
        for (let px = Math.floor(cx0); px < cx0 + cellW; px++) {
          if (px < 0 || py < 0 || px >= width || py >= height) continue;
          if (rawMask[py * width + px]) {
            hasLetter = true;
            break;
          }
        }
      }
      if (hasLetter) cellsWithLetter.add(`${gx},${gy}`);
    }
  }

  const near = 14;
  for (const p of points) {
    const gx = Math.floor((p.x - bounds.minX) / cellW);
    const gy = Math.floor((p.y - bounds.minY) / cellH);
    if (gx < 0 || gy < 0 || gx >= GRID || gy >= GRID) continue;
    let hit = false;
    for (let dy = -near; dy <= near && !hit; dy++) {
      for (let dx = -near; dx <= near; dx++) {
        const px = Math.round(p.x + dx);
        const py = Math.round(p.y + dy);
        if (px < 0 || py < 0 || px >= width || py >= height) continue;
        if (dilated[py * width + px]) {
          hit = true;
          break;
        }
      }
    }
    if (hit) cellsHit.add(`${gx},${gy}`);
  }

  let covered = 0;
  for (const id of cellsWithLetter) {
    if (cellsHit.has(id)) covered++;
  }
  const total = cellsWithLetter.size || 1;
  return covered / total;
}

export function calculateAccuracy(letterChar, points, width, height) {
  const ch = String(letterChar || "A").slice(0, 1);
  if (!points || points.length < MIN_POINTS) {
    return Math.round(((points?.length || 0) / MIN_POINTS) * 35);
  }

  const key = cacheKey(ch, width, height);
  let raw = MASK_CACHE.get(key);
  if (!raw) {
    raw = buildRawMask(ch, width, height);
    if (!raw) return 0;
    MASK_CACHE.set(key, raw);
  }

  const dilated = dilate(raw, width, height, DILATE_RADIUS);
  const bounds = letterBounds(raw, width, height);
  if (!bounds) return 0;

  let inside = 0;
  for (const p of points) {
    const x = Math.round(p.x);
    const y = Math.round(p.y);
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    if (dilated[y * width + x]) inside++;
  }

  const strokeMatch = inside / points.length;
  const cover = gridCoverage(points, dilated, raw, width, height, bounds);

  let score = strokeMatch * 62 + cover * 38;
  if (points.length < MIN_POINTS * 1.5) {
    score *= 0.85;
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function clearAccuracyCache() {
  MASK_CACHE.clear();
}

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layer, Line, Stage, Text } from "react-konva";

export const CANVAS_WIDTH = 420;
export const CANVAS_HEIGHT = 420;

function flattenPoints(lines) {
  const out = [];
  for (const ln of lines) {
    for (const p of ln.points) out.push(p);
  }
  return out;
}

const DrawingCanvas = forwardRef(function DrawingCanvas(
  { letter, disabled, onStrokesUpdate, resetSignal },
  ref
) {
  const ch = letter != null ? String(letter).slice(0, 1) : "A";
  const [lines, setLines] = useState([]);
  const linesRef = useRef([]);
  const drawing = useRef(false);
  const stageRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      /** All points from every stroke, including a stroke still in progress. */
      captureAllPoints() {
        return flattenPoints(linesRef.current);
      },
    }),
    []
  );

  useEffect(() => {
    setLines([]);
    linesRef.current = [];
  }, [ch, resetSignal]);

  const emitStrokes = useCallback(
    (nextLines) => {
      const flat = flattenPoints(nextLines);
      linesRef.current = nextLines;
      if (typeof onStrokesUpdate === "function") {
        onStrokesUpdate(flat);
      }
    },
    [onStrokesUpdate]
  );

  const pos = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return null;
    const p = stage.getPointerPosition();
    if (!p) return null;
    return { x: p.x, y: p.y };
  }, []);

  const onDown = useCallback(() => {
    if (disabled) return;
    const p = pos();
    if (!p) return;
    drawing.current = true;
    setLines((prev) => {
      const next = [...prev, { points: [p] }];
      linesRef.current = next;
      return next;
    });
  }, [disabled, pos]);

  const onMove = useCallback(() => {
    if (!drawing.current || disabled) return;
    const p = pos();
    if (!p) return;
    setLines((prev) => {
      if (!prev.length) return prev;
      const copy = [...prev];
      const last = copy[copy.length - 1];
      const pts = [...last.points, p];
      copy[copy.length - 1] = { points: pts };
      linesRef.current = copy;
      return copy;
    });
  }, [disabled, pos]);

  const onUp = useCallback(() => {
    if (!drawing.current) return;
    drawing.current = false;
    setLines((prev) => {
      emitStrokes(prev);
      return prev;
    });
  }, [emitStrokes]);

  const fontSize = ch.toLowerCase() === ch && ch !== ch.toUpperCase() ? 230 : 240;
  const dash = useMemo(() => [12, 10], []);

  return (
    <div className="rounded-[2rem] overflow-hidden shadow-soft border border-white/95 bg-white/75">
      {/* <p className="sr-only">
        You may use several strokes. Lift your finger or mouse between strokes
        if needed.
      </p> */}
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={stageRef}
        onMouseDown={onDown}
        onMousemove={onMove}
        onMouseup={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
        style={{
          touchAction: "none",
          cursor: disabled ? "not-allowed" : "crosshair",
        }}
      >
        <Layer listening={!disabled}>
          <Text
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            text={ch}
            fontSize={fontSize}
            fontFamily='"Nunito", system-ui, sans-serif'
            fontStyle="800"
            fill="rgba(252, 231, 243, 0.14)"
            align="center"
            verticalAlign="middle"
            listening={false}
          />
          <Text
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            text={ch}
            fontSize={fontSize}
            fontFamily='"Nunito", system-ui, sans-serif'
            fontStyle="800"
            fillEnabled={false}
            stroke="rgba(192, 170, 210, 0.5)"
            strokeWidth={3}
            dash={dash}
            align="center"
            verticalAlign="middle"
            opacity={0.45}
            listening={false}
          />
          {lines.map((line, i) => {
            if (line.points.length < 2) return null;
            return (
              <Line
                key={i}
                points={line.points.flatMap((p) => [p.x, p.y])}
                stroke="#38bdf8"
                strokeWidth={14}
                tension={0.45}
                lineCap="round"
                lineJoin="round"
                shadowColor="rgba(56, 189, 248, 0.35)"
                shadowBlur={6}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
});

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
export { flattenPoints };

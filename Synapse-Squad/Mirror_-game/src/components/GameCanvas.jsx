import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { shuffle } from "../utils/letters";

const SPOTS = [
  { x: 270, y: 210 },
  { x: 470, y: 210 }
];

function buildOptions(letter) {
  // Return 2 options: original and mirror
  return [
    { letter, isMirrored: false }, // correct option
    { letter, isMirrored: true }   // mirror option
  ];
}

export default function GameCanvas({ targetLetter, onCorrect, onWrong, resetKey }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 740,
      height: 420,
      parent: containerRef.current,
      backgroundColor: 0xffffff,
      scene: {
        create
      }
    });

    gameRef.current = game;

    function create() {
      const optionStates = buildOptions(targetLetter);
      this.add
        .text(370, 30, "Tap the correct letter", {
          fontFamily: "Comic Sans MS, Arial, sans-serif",
          fontSize: "28px",
          color: "#111827",
          fontStyle: "bold"
        })
        .setOrigin(0.5);

      optionStates.forEach((option, index) => {
        const spot = SPOTS[index];
        const text = this.add
          .text(spot.x, spot.y, option.letter, {
            fontFamily: "Comic Sans MS, Arial, sans-serif",
            fontSize: "120px",
            color: "#111827",
            stroke: "#ffffff",
            strokeThickness: 10
          })
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        if (option.isMirrored) {
          text.setScale(-1, 1);
        }

        text.on("pointerover", () => {
          text.setShadow(2, 2, "#6d28d9", 6, false, true);
        });

        text.on("pointerout", () => {
          text.setShadow(0, 0, "#000", 0, false, false);
        });

        text.on("pointerdown", () => {
          if (this.input.enabled === false) return;

          if (!option.isMirrored) {
            text.setTint(0x22c55e);
            this.input.enabled = false;
            onCorrect();
          } else {
            text.setTint(0xef4444);
            this.input.enabled = false;
            onWrong();
          }
        });
      });
    }

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [targetLetter, resetKey, onCorrect, onWrong]);

  return (
    <section className="card options-card">
      <div ref={containerRef} className="phaser-wrapper" />
    </section>
  );
}

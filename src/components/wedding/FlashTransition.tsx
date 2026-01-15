import React, { useEffect, useMemo, useState } from "react";

type FlashTransitionProps = {
  /** Controla si el flash debe ejecutarse */
  active: boolean;

  /** Duración total del flash (ms). Recomendado: 480–720 */
  durationMs?: number;

  /**
   * Callback al terminar. Útil para:
   * - ocultar el vídeo
   * - mostrar la página detrás
   */
  onDone?: () => void;

  /**
   * Ajuste fino: centro del flash.
   * Por defecto "50% 50%".
   */
  origin?: string;

  /**
   * Si quieres que el overlay bloquee clicks durante el flash.
   * Por defecto true.
   */
  blockPointerEvents?: boolean;
};

export default function FlashTransition({
  active,
  durationMs = 560,
  onDone,
  origin = "50% 50%",
  blockPointerEvents = true,
}: FlashTransitionProps) {
  const [running, setRunning] = useState(false);

  const animName = useMemo(
    () => `flash_${Math.random().toString(16).slice(2)}`,
    []
  );

  useEffect(() => {
    if (!active) return;

    setRunning(true);
    const t = window.setTimeout(() => {
      setRunning(false);
      onDone?.();
    }, durationMs);

    return () => window.clearTimeout(t);
  }, [active, durationMs, onDone]);

  if (!running) return null;

  const style = `
  @keyframes ${animName} {
    0%   { opacity: 0;   transform: scale(0.12); filter: blur(14px); }
    12%  { opacity: 0.55; transform: scale(0.55); filter: blur(16px); }
    22%  { opacity: 0.78; transform: scale(0.95); filter: blur(18px); }

    40%  { opacity: 0.92; transform: scale(1.45); filter: blur(20px); }
    55%  { opacity: 0.62; transform: scale(2.15); filter: blur(22px); }

    72%  { opacity: 0.22; transform: scale(2.55); filter: blur(24px); }
    100% { opacity: 0;   transform: scale(2.85); filter: blur(26px); }
  }

  @keyframes ${animName}_spike {
    0%   { opacity: 0; }
    46%  { opacity: 0; }
    49%  { opacity: 0.75; }
    52%  { opacity: 0; }
    100% { opacity: 0; }
  }
  `;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: blockPointerEvents ? "auto" : "none",
      }}
    >
      <style>{style}</style>

      <div
        style={{
          position: "absolute",
          inset: "-15%",
          transformOrigin: origin,
          animation: `${animName} ${durationMs}ms cubic-bezier(0.2, 0.0, 0.1, 1) forwards`,
          background: `
            radial-gradient(circle at ${origin},
              rgba(255, 246, 232, 0.98) 0%,
              rgba(255, 244, 224, 0.86) 12%,
              rgba(255, 236, 210, 0.42) 28%,
              rgba(255, 230, 195, 0.14) 44%,
              rgba(0, 0, 0, 0) 68%
            )
          `,
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 250, 242, 1)",
          animation: `${animName}_spike ${durationMs}ms linear forwards`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

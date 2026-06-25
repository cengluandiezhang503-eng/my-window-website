import { useState, useRef, useEffect } from 'react';

function WaterButton({ children, onClick, className, white }) {
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ fillLevel: 100, waveOffset: 0 });
  const fillColor = white ? 'rgba(255,255,255,0.95)' : 'rgba(185,28,28,0.95)';
  const textColor = white ? '#111827' : '#ffffff';

  useEffect(function() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let running = true;

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      const state = stateRef.current;
      const target = hovered ? 0 : H + 20;
      const speed = hovered ? 1.2 : 2.5;

      if (Math.abs(state.fillLevel - target) > 0.5) {
        state.fillLevel += (target - state.fillLevel) * (speed / 100);
      }

      state.waveOffset += hovered ? 0.06 : 0.02;

      const waveHeight = hovered ? 4 : 1;

      ctx.beginPath();
      ctx.moveTo(0, H);

      for (let x = 0; x <= W; x++) {
        const y = state.fillLevel
          + Math.sin(x * 0.05 + state.waveOffset) * waveHeight
          + Math.sin(x * 0.09 - state.waveOffset * 0.7) * (waveHeight * 0.6)
          + Math.sin(x * 0.03 + state.waveOffset * 1.3) * (waveHeight * 0.4);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return function() {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [hovered, fillColor]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        width={300}
        height={60}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          color: hovered ? textColor : 'inherit',
          transition: 'color 0.4s ease'
        }}
      >
        {children}
      </span>
    </button>
  );
}

export default WaterButton;
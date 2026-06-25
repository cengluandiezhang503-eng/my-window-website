import { useState, useRef, useEffect } from 'react';

function WaterButton({ children, onClick, className, white }) {
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const fillColor = white ? 'rgba(255,255,255,0.95)' : 'rgba(185,28,28,0.95)';
  const textColor = white ? '#111827' : '#ffffff';

  useEffect(function() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let fillLevel = hovered ? 0 : height;
    let targetLevel = hovered ? 0 : height;
    let waveOffset = 0;
    let running = true;

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // 目标水位
      targetLevel = hovered ? 0 : height + 10;

      // 缓慢逼近目标
      fillLevel += (targetLevel - fillLevel) * 0.04;

      waveOffset += 0.05;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 1) {
        const wave1 = Math.sin(x * 0.04 + waveOffset) * 5;
        const wave2 = Math.sin(x * 0.07 - waveOffset * 1.3) * 3;
        ctx.lineTo(x, fillLevel + wave1 + wave2);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
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
        height={50}
        style={{
          position: 'absolute',
          top: 0,
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
          transition: 'color 0.3s ease'
        }}
      >
        {children}
      </span>
    </button>
  );
}

export default WaterButton;
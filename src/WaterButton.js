import { useState } from 'react';

function WaterButton({ children, onClick, className, white }) {
  const [hovered, setHovered] = useState(false);

  const fillColor = white ? 'white' : '#b91c1c';
  const textHoverColor = white ? '#111827' : 'white';

  return (
    <button
      onClick={onClick}
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', zIndex: 0 }}
    >
      {/* 水波层 */}
      <span
        style={{
          position: 'absolute',
          bottom: hovered ? '-10%' : '-150%',
          left: '-10%',
          width: '120%',
          height: '200%',
          backgroundColor: fillColor,
          borderRadius: hovered ? '20% 25% 0% 0%' : '50% 55% 45% 50%',
          transition: 'bottom 0.8s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.8s ease',
          zIndex: -1,
          animation: hovered ? 'waveRipple 1.2s ease-in-out infinite' : 'none',
        }}
      />

      {/* 文字 */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          color: hovered ? textHoverColor : 'inherit',
          transition: 'color 0.5s ease'
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes waveRipple {
          0%   { border-radius: 20% 25% 0% 0%; }
          25%  { border-radius: 25% 18% 5% 3%; }
          50%  { border-radius: 18% 28% 3% 5%; }
          75%  { border-radius: 28% 20% 5% 2%; }
          100% { border-radius: 20% 25% 0% 0%; }
        }
      `}</style>
    </button>
  );
}

export default WaterButton;
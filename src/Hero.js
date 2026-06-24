import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const [content, setContent] = useState({
    slogan: '信任您的家\n交给我们™',
    description: '高品质窗户和门，专业安装，让您的家更美更节能，深受业主信赖'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-end"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600')" }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 text-white px-16 pb-32 max-w-2xl">
        <h1 className="text-6xl font-black mb-6 leading-tight uppercase">
          {content.slogan}
        </h1>
        <p className="text-lg mb-10 text-gray-200">
          {content.description}
        </p>
        <div className="flex gap-4">
          <button
            onClick={function() { navigate('/products'); }}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 flex items-center gap-2"
          >
            探索窗户 →
          </button>
          <button
            onClick={function() { navigate('/products'); }}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 flex items-center gap-2"
          >
            探索门 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
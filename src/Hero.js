import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const [content, setContent] = useState({
    slogan: '信任您的家，交给我们',
    description: '高品质窗户和门，专为您的家而生'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  return (
    <div className="relative">
      {/* 大图英雄区 */}
      <div
        className="relative h-screen bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600')" }}
      >
        {/* 深色遮罩 */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* 文字内容 */}
        <div className="relative z-10 text-white px-16 pb-24 max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            {content.slogan}
          </h1>
          <p className="text-xl mb-10 text-gray-200">
            {content.description}
          </p>
          <div className="flex gap-4">
            <button
              onClick={function() { navigate('/products'); }}
              className="bg-white text-gray-900 px-8 py-4 font-bold text-lg hover:bg-gray-100"
            >
              探索窗户
            </button>
            <button
              onClick={function() { navigate('/products'); }}
              className="border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-gray-900"
            >
              探索门
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
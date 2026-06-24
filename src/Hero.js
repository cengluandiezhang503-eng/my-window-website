import { useState, useEffect } from 'react';

function Hero() {
  const [content, setContent] = useState({
    slogan: '为您的家找到最完美的窗户和门',
    description: '高品质窗户和门，专业安装，让您的家更美更节能'
  });

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  return (
    <div className="bg-gray-100 py-20 px-8 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        {content.slogan}
      </h1>
      <p className="text-xl text-gray-500 mb-10">
        {content.description}
      </p>
      <button className="bg-red-700 text-white px-10 py-4 text-lg rounded hover:bg-red-800">
        立即获取免费报价
      </button>
    </div>
  );
}

export default Hero;
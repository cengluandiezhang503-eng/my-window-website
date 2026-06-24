import { useNavigate } from 'react-router-dom';

function Inspiration() {
  const navigate = useNavigate();

  const cards = [
    {
      title: '博客',
      description: '探索我们的在线空间，分享创意，向专家学习，拥抱最新趋势，当然，还有庆祝家居设计中的乐趣。',
      button: '查看博客 →',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600'
    },
    {
      title: '图片画廊',
      description: '浏览各种窗户和门项目，想象各种可能性。',
      button: '浏览图片 →',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600'
    },
    {
      title: '设计创意与灵感',
      description: '在一个地方找到您项目所需的一切灵感和创意！',
      button: '获取灵感 →',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600'
    }
  ];

  return (
    <div className="bg-white py-16 px-8 border-t">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-10">
          发现新创意和灵感
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {cards.map(function(card, index) {
            return (
              <div key={index}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-72 object-cover mb-4"
                />
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {card.description}
                </p>
                <button
                  onClick={function() { navigate('/'); }}
                  className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
                >
                  {card.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Inspiration;
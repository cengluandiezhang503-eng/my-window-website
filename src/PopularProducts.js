import { useNavigate } from 'react-router-dom';

function PopularProducts() {
  const navigate = useNavigate();

  const series = [
    {
      id: 1,
      tag: '传奇可靠性与多功能性',
      title: '400系列产品',
      description: '作为我们最受欢迎的系列，400系列产品为您提供性能与风格的最佳融合，满足几乎所有窗户或门的需求。凭借多年的工程和工艺积累，这些窗户旨在满足您的高标准。',
      button: '查看400系列详情 →',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700'
    },
    {
      id: 2,
      tag: '乙烯基的智能替代品',
      title: '100系列产品',
      description: '我们的100系列产品线采用Fibrex®复合材料工程制造，具有耐久性、可持续性和节能性。它比乙烯基强两倍，提供低维护的外观和精致的外观。',
      button: '查看100系列详情 →',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700'
    }
  ];

  return (
    <div className="bg-white py-16 px-8">
      <h2 className="text-3xl font-black text-gray-900 mb-10">
        您所在地区的热门产品
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
        {series.map(function(item) {
          return (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover mb-6"
              />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {item.tag}
              </p>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {item.description}
              </p>
              <button
                onClick={function() { navigate('/products/' + item.id); }}
                className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
              >
                {item.button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularProducts;
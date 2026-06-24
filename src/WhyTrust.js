import { useState } from 'react';

function WhyTrust() {
  const [selected, setSelected] = useState(null);

  const stats = [
    {
      id: 0,
      emoji: '🏆',
      title: '品质与性能第一',
      description: '我们反复测试，再测试，确保您的窗户和门每天都能正常工作。这就是为什么业主、建筑商、承包商和建筑师一致认为我们的产品在品质上排名第一。'
    },
    {
      id: 1,
      emoji: '🤝',
      title: '最受信赖与推荐',
      description: '超过120年的历史，我们赢得了业主和专业人士的信任。我们的产品以卓越的工艺和可靠性著称，是行业中最受推荐的品牌。'
    },
    {
      id: 2,
      emoji: '💡',
      title: '最具创新性的窗户门品牌',
      description: '我们不断创新，开发新技术和新材料，为您提供更节能、更耐用、更美观的窗户和门。我们的研发团队始终走在行业前沿。'
    },
    {
      id: 3,
      emoji: '👍',
      title: '客户服务第一品牌',
      description: '我们提供业内最好的客户服务，从选购到安装，再到售后支持，我们的团队随时为您提供帮助，确保您完全满意。'
    }
  ];

  return (
    <div className="bg-white py-16 px-8 border-t border-b">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-12">
          为什么信任我们？
        </h2>

        {/* 展开详情 */}
        {selected !== null && (
          <div className="bg-gray-50 rounded-lg p-8 mb-8 flex items-center gap-8 relative">
            <button
              onClick={function() { setSelected(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl font-bold"
            >
              ✕
            </button>
            <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">{stats[selected].emoji}</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-red-700 mb-3">
                {stats[selected].title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {stats[selected].description}
              </p>
            </div>
          </div>
        )}

        {/* 四个圆形图标 */}
        <div className="grid grid-cols-4 gap-8 text-center">
          {stats.map(function(stat) {
            const isSelected = selected === stat.id;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={function() {
                  if (selected === stat.id) {
                    setSelected(null);
                  } else {
                    setSelected(stat.id);
                  }
                }}
              >
                <div className={
                  'w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ' +
                  (isSelected ? 'bg-red-700' : 'bg-red-200 hover:bg-red-700')
                }>
                  <span className="text-5xl">{stat.emoji}</span>
                </div>
                <h3 className={
                  'text-lg font-black leading-tight ' +
                  (isSelected ? 'text-red-700' : 'text-gray-500 hover:text-gray-900')
                }>
                  {stat.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WhyTrust;
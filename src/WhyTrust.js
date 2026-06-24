function WhyTrust() {
  const stats = [
    {
      emoji: '🏆',
      title: '品质与性能第一'
    },
    {
      emoji: '🤝',
      title: '最受信赖与推荐'
    },
    {
      emoji: '💡',
      title: '最具创新性的窗户门品牌'
    },
    {
      emoji: '👍',
      title: '客户服务第一品牌'
    }
  ];

  return (
    <div className="bg-white py-16 px-8 border-t border-b">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-12">
          为什么信任我们？
        </h2>
        <div className="grid grid-cols-4 gap-8 text-center">
          {stats.map(function(stat, index) {
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 bg-red-700 rounded-full flex items-center justify-center mb-6">
                  <span className="text-5xl">{stat.emoji}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 leading-tight">
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
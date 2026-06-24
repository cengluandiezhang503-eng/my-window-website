import { useState } from 'react';

function WhyTrust() {
  const [selected, setSelected] = useState(null);

  const stats = [
    {
      id: 0,
      color: 'bg-red-600',
      lightColor: 'bg-red-200',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: '品质与性能第一',
      description: '我们反复测试，再测试，确保您的窗户和门每天都能正常工作。这就是为什么业主、建筑商、承包商和建筑师一致认为我们的产品在品质上排名第一。'
    },
    {
      id: 1,
      color: 'bg-green-600',
      lightColor: 'bg-green-200',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: '最受信赖与推荐',
      description: '超过120年的历史，我们赢得了业主和专业人士的信任。我们的产品以卓越的工艺和可靠性著称，是行业中最受推荐的品牌。'
    },
    {
      id: 2,
      color: 'bg-red-600',
      lightColor: 'bg-red-200',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: '最具创新性的窗户门品牌',
      description: '我们不断创新，开发新技术和新材料，为您提供更节能、更耐用、更美观的窗户和门。我们的研发团队始终走在行业前沿。'
    },
    {
      id: 3,
      color: 'bg-green-600',
      lightColor: 'bg-green-200',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
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
            <div className={stats[selected].color + ' w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0'}>
              {stats[selected].svg}
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
                  setSelected(isSelected ? null : stat.id);
                }}
              >
                <div className={
                  'w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ' +
                  (isSelected ? stat.color : stat.lightColor)
                }>
                  {stat.svg}
                </div>
                <h3 className={
                  'text-lg font-black leading-tight transition-colors ' +
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
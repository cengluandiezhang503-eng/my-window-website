function ProjectStage() {
  const stages = [
    {
      emoji: '💡',
      title: '找到您的窗户或门',
      description: '刚开始？帮我找到合适的产品。',
      button: '找到您的匹配 →'
    },
    {
      emoji: '📐',
      title: '开始设计',
      description: '想设计我的新窗户和门。',
      button: '开始设计 →'
    },
    {
      emoji: '💰',
      title: '寻找报价',
      description: '准备好与专家联系并获取报价。',
      button: '获取报价 →'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-8 border-t border-b">
      <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
        您在项目的哪个阶段？
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
        {stages.map(function(stage, index) {
          return (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="text-6xl mb-6">{stage.emoji}</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">{stage.title}</h3>
              <p className="text-gray-500 mb-6 text-sm">{stage.description}</p>
              <button className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors">
                {stage.button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectStage;
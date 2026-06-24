function Process() {
  const steps = [
    {
      number: "01",
      title: "填写报价表单",
      description: "在线填写您的需求和联系方式，只需2分钟"
    },
    {
      number: "02",
      title: "专家联系您",
      description: "我们的专业顾问在24小时内联系您"
    },
    {
      number: "03",
      title: "免费上门测量",
      description: "专业团队上门测量，提供精准报价"
    },
    {
      number: "04",
      title: "专业安装",
      description: "经验丰富的安装团队，高效完成安装"
    }
  ];

  return (
    <div className="bg-white py-16 px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        服务流程
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="hidden"></div>
            )}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Process;
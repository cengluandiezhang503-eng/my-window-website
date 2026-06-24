function WhyUs() {
  const reasons = [
    {
      emoji: "🏆",
      title: "20年行业经验",
      description: "深耕窗户行业20年，服务超过5万个家庭"
    },
    {
      emoji: "🔧",
      title: "专业安装团队",
      description: "所有安装人员经过严格培训，持证上岗"
    },
    {
      emoji: "💰",
      title: "透明定价",
      description: "无隐藏费用，报价即最终价格"
    },
    {
      emoji: "🌿",
      title: "节能环保",
      description: "所有产品符合国家节能标准，降低能耗"
    },
    {
      emoji: "📞",
      title: "售后保障",
      description: "24小时客服，10年产品质保"
    },
    {
      emoji: "🎨",
      title: "定制服务",
      description: "50+颜色款式，满足您的个性化需求"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        为什么选择我们
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow text-center">
            <div className="text-5xl mb-4">{reason.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {reason.title}
            </h3>
            <p className="text-gray-500">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
function Stats() {
  const stats = [
    { number: "50,000+", label: "satisfied customers", emoji: "😊" },
    { number: "20+", label: "年行业经验", emoji: "🏆" },
    { number: "100+", label: "授权经销商", emoji: "🤝" },
    { number: "99%", label: "客户满意度", emoji: "⭐" }
  ];

  return (
    <div className="bg-red-700 py-16 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8 text-center text-white">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl mb-2">{stat.emoji}</div>
            <div className="text-4xl font-bold mb-2">{stat.number}</div>
            <div className="text-red-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
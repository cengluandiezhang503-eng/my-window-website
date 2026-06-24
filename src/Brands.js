function Brands() {
  const brands = [
    { name: "安德森", emoji: "🏠" },
    { name: "皮尔金顿", emoji: "🪟" },
    { name: "圣戈班", emoji: "🏗️" },
    { name: "旭硝子", emoji: "✨" },
    { name: "信义玻璃", emoji: "💎" }
  ];

  return (
    <div className="bg-white py-12 px-8 border-t border-b">
      <h2 className="text-2xl font-bold text-center text-gray-600 mb-8">
        合作品牌
      </h2>
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {brands.map((brand, index) => (
          <div key={index} className="text-center text-gray-400 hover:text-gray-800">
            <div className="text-4xl mb-2">{brand.emoji}</div>
            <div className="font-bold">{brand.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
function Products() {
  const products = [
    {
      id: 1,
      name: "双层隔热窗",
      description: "节能保温，适合各种气候",
      price: "从 ¥2,999 起",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
      id: 2,
      name: "落地玻璃门",
      description: "宽敞明亮，连接室内外空间",
      price: "从 ¥4,999 起",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400"
    },
    {
      id: 3,
      name: "天窗",
      description: "引入自然光，提升居住体验",
      price: "从 ¥3,999 起",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
    }
  ];

  return (
    <div className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        我们的产品
      </h2>
      <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-4">{product.description}</p>
              <p className="text-red-700 font-bold">{product.price}</p>
              <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">
                了解更多
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
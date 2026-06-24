import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('全部');
  const navigate = useNavigate();

  const categories = ['全部', '窗户', '门', '天窗'];

  useEffect(() => {
    const url = category === '全部'
      ? 'https://window-server.onrender.com/api/products'
      : 'https://window-server.onrender.com/api/products?category=' + category;
    fetch(url)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-800 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">我们的产品</h1>
        <p className="text-gray-300 text-xl">高品质窗户和门，为您的家带来完美体验</p>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex gap-4 mb-10">
          {categories.map(function(cat) {
            return (
              <button
                key={cat}
                onClick={function() { setCategory(cat); setLoading(true); }}
                className={
                  'px-6 py-2 rounded-full border-2 font-medium ' +
                  (category === cat ? 'bg-red-700 text-white border-red-700' : 'border-gray-300 text-gray-600 hover:border-red-700 hover:text-red-700')
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">加载中...</div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {products.map(function(product) {
              return (
                <div
                  key={product.id}
                  onClick={function() { navigate('/products/' + product.id); }}
                  className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.category}</span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 font-bold">{product.price}</span>
                      <button className="bg-red-700 text-white px-4 py-2 rounded text-sm hover:bg-red-800">
                        了解更多
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
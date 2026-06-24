import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/products/' + id)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">加载中...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">产品不存在</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-800 text-white px-8 py-4">
        <button onClick={function() { navigate('/products'); }} className="text-gray-300 hover:text-white flex items-center gap-2">
          ← 返回产品列表
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-4">{product.name}</h1>
            <p className="text-gray-500 text-lg mb-6">{product.description}</p>
            <div className="text-3xl font-bold text-red-700 mb-8">{product.price}</div>

            <div className="border-t pt-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">产品特点：</h3>
              <ul className="flex flex-col gap-2 text-gray-600">
                <li className="flex items-center gap-2">✅ 高品质材料</li>
                <li className="flex items-center gap-2">✅ 专业安装服务</li>
                <li className="flex items-center gap-2">✅ 10年质量保证</li>
                <li className="flex items-center gap-2">✅ 节能环保认证</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={function() { navigate('/#quote'); }}
                className="flex-1 bg-red-700 text-white py-4 rounded-lg font-bold hover:bg-red-800"
              >
                获取免费报价
              </button>
              <button
                onClick={function() { navigate('/products'); }}
                className="flex-1 border-2 border-gray-300 text-gray-600 py-4 rounded-lg font-bold hover:border-red-700 hover:text-red-700"
              >
                查看更多产品
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
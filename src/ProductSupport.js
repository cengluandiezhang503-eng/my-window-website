import { useNavigate } from 'react-router-dom';

function ProductSupport() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-10">
          产品支持
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {/* 第一列：质保 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600"
              alt="质保"
              className="w-full h-56 object-cover mb-4"
            />
            <h3 className="text-xl font-black text-gray-900 mb-2">
              行业顶级质保
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              我们的窗户和门附带行业内最好的有限质保之一。
            </p>
            <button
              onClick={function() { navigate('/'); }}
              className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
            >
              质保详情 →
            </button>
          </div>

          {/* 第二列：需要零件 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
              alt="零件"
              className="w-full h-56 object-cover mb-4"
            />
            <h3 className="text-xl font-black text-gray-900 mb-2">
              需要零件？
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              购买替换零件和配件。
            </p>
            <button
              onClick={function() { navigate('/'); }}
              className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
            >
              购买零件 ↗
            </button>
          </div>

          {/* 第三列：帮助中心（深色背景） */}
          <div>
            <div className="w-full h-56 bg-gray-900 flex items-center justify-center mb-4 gap-4">
              <div className="bg-red-700 p-3 rounded">
                <span className="text-white text-3xl font-black">🏠</span>
              </div>
              <div className="text-white">
                <div className="text-xs text-gray-400 tracking-widest mb-1">我的窗户公司</div>
                <div className="text-2xl font-black leading-tight">窗户与门<br/>帮助中心</div>
              </div>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">
              产品支持与维护
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              查找您产品的安全、清洁、服务、更换和质保信息。
            </p>
            <button
              onClick={function() { navigate('/'); }}
              className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
            >
              访问帮助中心 ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSupport;
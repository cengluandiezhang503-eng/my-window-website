import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  return (
    <header>
      {/* 黑色顶部工具栏 */}
      <div className="bg-black text-white text-xs py-2 px-8 flex justify-center items-center gap-8">
        <button className="hover:text-gray-300 flex items-center gap-1">📍 经销商查询</button>
        <span className="text-gray-500">|</span>
        <button className="hover:text-gray-300">认证承包商</button>
        <span className="text-gray-500">|</span>
        <button className="hover:text-gray-300">安装服务</button>
        <span className="text-gray-500">|</span>
        <button className="hover:text-gray-300">成为认证承包商</button>
        <span className="text-gray-500">|</span>
        <button className="hover:text-gray-300">❤️ 我的收藏 (0)</button>
        <span className="text-gray-500">|</span>
        <span className="font-medium">400-123-4567</span>
      </div>

      {/* 白色主导航栏 */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={function() { navigate('/'); }}
        >
          <div className="bg-red-700 text-white font-bold px-3 py-2 text-lg">🏠</div>
          <div>
            <div className="font-bold text-gray-900 text-lg leading-tight">我的窗户公司</div>
            <div className="text-gray-500 text-xs">WINDOWS & DOORS</div>
          </div>
        </div>

        <ul className="flex gap-8 text-gray-700 font-medium text-sm">
          <li
            className="hover:text-red-700 cursor-pointer relative py-2"
            onMouseEnter={function() { setMenuOpen('windows'); }}
            onMouseLeave={function() { setMenuOpen(null); }}
          >
            窗户与门
            {menuOpen === 'windows' && (
              <div className="absolute top-10 left-0 bg-white shadow-xl border rounded p-6 w-64 z-50">
                <div className="font-bold text-gray-500 text-xs mb-3 uppercase">窗户</div>
                <ul className="flex flex-col gap-2 text-gray-700 text-sm">
                  <li className="hover:text-red-700 cursor-pointer">推拉窗</li>
                  <li className="hover:text-red-700 cursor-pointer">平开窗</li>
                  <li className="hover:text-red-700 cursor-pointer">天窗</li>
                  <li className="hover:text-red-700 cursor-pointer">百叶窗</li>
                </ul>
                <div className="font-bold text-gray-500 text-xs mb-3 mt-4 uppercase">门</div>
                <ul className="flex flex-col gap-2 text-gray-700 text-sm">
                  <li className="hover:text-red-700 cursor-pointer">入户门</li>
                  <li className="hover:text-red-700 cursor-pointer">落地玻璃门</li>
                  <li className="hover:text-red-700 cursor-pointer">推拉门</li>
                </ul>
              </div>
            )}
          </li>
          <li className="hover:text-red-700 cursor-pointer py-2">灵感</li>
          <li className="hover:text-red-700 cursor-pointer py-2">服务支持</li>
          <li className="hover:text-red-700 cursor-pointer py-2">技术文档</li>
          <li className="hover:text-red-700 cursor-pointer py-2" onClick={function() { navigate('/products'); }}>所有产品</li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white font-medium text-sm"
            onClick={function() { navigate('/'); }}
          >
            获取报价 →
          </button>
          <button className="text-gray-600 hover:text-gray-900 text-xl">🔍</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
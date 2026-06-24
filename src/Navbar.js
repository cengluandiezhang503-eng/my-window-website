import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  return (
    <header>
      {/* 顶部工具栏 */}
      <div className="bg-gray-100 border-b text-sm py-2 px-8 flex justify-between items-center">
        <div className="flex gap-6 text-gray-600">
          <a href="#" className="hover:text-gray-900">经销商查询</a>
          <a href="#" className="hover:text-gray-900">认证承包商</a>
          <a href="#" className="hover:text-gray-900">安装服务</a>
        </div>
        <div className="flex gap-6 text-gray-600">
          <a href="tel:400-123-4567" className="hover:text-gray-900 font-medium">📞 400-123-4567</a>
        </div>
      </div>

      {/* 主导航栏 */}
      <nav className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-gray-900 cursor-pointer"
          onClick={function() { navigate('/'); }}
        >
          🏠 我的窗户公司
        </div>

        <ul className="flex gap-8 text-gray-700 font-medium">
          <li
            className="hover:text-red-700 cursor-pointer relative"
            onMouseEnter={function() { setMenuOpen('windows'); }}
            onMouseLeave={function() { setMenuOpen(null); }}
          >
            窗户与门 ▾
            {menuOpen === 'windows' && (
              <div className="absolute top-8 left-0 bg-white shadow-xl border rounded-lg p-6 w-64 z-50">
                <div className="font-bold text-gray-500 text-xs mb-3">窗户</div>
                <ul className="flex flex-col gap-2 text-gray-700">
                  <li className="hover:text-red-700 cursor-pointer">推拉窗</li>
                  <li className="hover:text-red-700 cursor-pointer">平开窗</li>
                  <li className="hover:text-red-700 cursor-pointer">天窗</li>
                  <li className="hover:text-red-700 cursor-pointer">百叶窗</li>
                </ul>
                <div className="font-bold text-gray-500 text-xs mb-3 mt-4">门</div>
                <ul className="flex flex-col gap-2 text-gray-700">
                  <li className="hover:text-red-700 cursor-pointer">入户门</li>
                  <li className="hover:text-red-700 cursor-pointer">落地玻璃门</li>
                  <li className="hover:text-red-700 cursor-pointer">推拉门</li>
                </ul>
              </div>
            )}
          </li>
          <li className="hover:text-red-700 cursor-pointer" onClick={function() { navigate('/products'); }}>
            所有产品
          </li>
          <li className="hover:text-red-700 cursor-pointer">灵感</li>
          <li className="hover:text-red-700 cursor-pointer">服务支持</li>
          <li className="hover:text-red-700 cursor-pointer">专业人士</li>
        </ul>

        <button
          className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 font-medium"
          onClick={function() { navigate('/'); }}
        >
          获取报价
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
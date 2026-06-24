import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      {/* 黑色顶部工具栏 */}
      <div className="bg-black text-white text-xs py-2 px-8 flex justify-center items-center gap-6">
        <button className="hover:text-gray-300 flex items-center gap-1">📍 经销商查询</button>
        <span className="text-gray-600">|</span>
        <button className="hover:text-gray-300">认证承包商</button>
        <span className="text-gray-600">|</span>
        <button className="hover:text-gray-300">安装服务</button>
        <span className="text-gray-600">|</span>
        <button className="hover:text-gray-300">成为认证承包商</button>
        <span className="text-gray-600">|</span>
        <button className="hover:text-gray-300">❤️ 我的收藏 (0)</button>
        <span className="text-gray-600">|</span>
        <span className="font-medium">400-123-4567</span>
      </div>

      {/* 白色主导航栏 */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={function() { navigate('/'); }}
        >
          <div className="bg-red-700 text-white font-bold px-3 py-2 text-lg">🏠</div>
          <div>
            <div className="font-black text-gray-900 text-lg leading-tight">我的窗户公司</div>
            <div className="text-gray-500 text-xs tracking-widest">WINDOWS & DOORS</div>
          </div>
        </div>

        {/* 导航链接 */}
        <ul className="flex gap-8 text-gray-700 font-medium text-sm">
          <li
            className="cursor-pointer relative py-2 border-b-2 border-red-700"
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
          <li className="hover:text-red-700 cursor-pointer py-2 border-b-2 border-transparent hover:border-red-700">灵感</li>
          <li className="hover:text-red-700 cursor-pointer py-2 border-b-2 border-transparent hover:border-red-700">服务支持</li>
          <li className="hover:text-red-700 cursor-pointer py-2 border-b-2 border-transparent hover:border-red-700">技术文档</li>
          <li
            className="hover:text-red-700 cursor-pointer py-2 border-b-2 border-transparent hover:border-red-700"
            onClick={function() { navigate('/products'); }}
          >
            所有产品
          </li>
        </ul>

        {/* 右侧按钮 */}
        <div className="flex items-center gap-3">
          <button
            className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white font-bold text-sm transition-colors"
            onClick={function() { navigate('/'); }}
          >
            获取报价 →
          </button>
          <button
            onClick={function() { setSearchOpen(!searchOpen); }}
            className="w-9 h-9 bg-red-700 text-white rounded-full flex items-center justify-center hover:bg-red-800"
          >
            🔍
          </button>
        </div>
      </nav>

      {/* 搜索栏 */}
      {searchOpen && (
        <div className="bg-white border-b px-8 py-4">
          <div className="max-w-3xl mx-auto flex border-2 border-gray-300 rounded">
            <input
              className="flex-1 px-4 py-3 outline-none text-gray-700"
              placeholder="您想找什么？"
              autoFocus
            />
            <button className="px-4 text-gray-500 hover:text-gray-900">🔍</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
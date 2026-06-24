import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="relative z-50">
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
          className="cursor-pointer flex items-center gap-2 flex-shrink-0"
          onClick={function() { navigate('/'); }}
        >
          <div className="bg-red-700 text-white font-bold px-3 py-2 text-lg">🏠</div>
          <div>
            <div className="font-black text-gray-900 text-lg leading-tight">我的窗户公司</div>
            <div className="text-gray-500 text-xs tracking-widest">WINDOWS & DOORS</div>
          </div>
        </div>

        {/* 导航链接 */}
        <ul className="flex gap-8 text-gray-800 font-medium text-sm">
          <li
            className="cursor-pointer relative py-2"
            onMouseEnter={function() { setMenuOpen('windows'); setSearchOpen(false); }}
            onMouseLeave={function() { setMenuOpen(null); }}
          >
            <span className={menuOpen === 'windows' ? 'border-b-2 border-red-700 pb-1' : 'border-b-2 border-transparent pb-1'}>
              窗户与门
            </span>

            {/* 大型下拉菜单 */}
            {menuOpen === 'windows' && (
              <div className="absolute top-12 left-0 bg-white shadow-2xl border rounded p-8 z-50 w-screen max-w-4xl -translate-x-16">
                <div className="grid grid-cols-3 gap-8">
                  {/* 第一列：窗户 */}
                  <div>
                    <div className="font-black text-gray-900 text-base mb-4">窗户</div>
                    <ul className="flex flex-col gap-3 text-gray-700 text-sm">
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 推拉窗
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 平开窗
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 天窗
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 百叶窗
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 图片窗
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🪟</span> 特种窗
                      </li>
                      <li className="font-bold text-gray-900 cursor-pointer hover:text-red-700 mt-2">查看全部</li>
                    </ul>
                  </div>

                  {/* 第二列：门 */}
                  <div>
                    <div className="font-black text-gray-900 text-base mb-4">门</div>
                    <ul className="flex flex-col gap-3 text-gray-700 text-sm">
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🚪</span> 入户门
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🚪</span> 落地玻璃门
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🚪</span> 推拉门
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🚪</span> 折叠门
                      </li>
                      <li className="hover:text-red-700 cursor-pointer flex items-center gap-2">
                        <span>🚪</span> 纱门
                      </li>
                      <li className="font-bold text-gray-900 cursor-pointer hover:text-red-700 mt-2">查看全部</li>
                    </ul>
                  </div>

                  {/* 第三列：图片卡片 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative cursor-pointer group">
                      <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
                        alt="按系列浏览"
                        className="w-full h-28 object-cover rounded"
                      />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="bg-white border-2 border-red-700 text-red-700 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-700 group-hover:text-white transition-colors">
                          按系列浏览
                        </span>
                      </div>
                    </div>
                    <div className="relative cursor-pointer group">
                      <img
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300"
                        alt="按材质浏览"
                        className="w-full h-28 object-cover rounded"
                      />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="bg-white border-2 border-red-700 text-red-700 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-700 group-hover:text-white transition-colors">
                          按材质浏览
                        </span>
                      </div>
                    </div>
                    <div
                      className="relative cursor-pointer group"
                      onClick={function() { navigate('/products'); }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300"
                        alt="所有产品"
                        className="w-full h-28 object-cover rounded"
                      />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="bg-white border-2 border-red-700 text-red-700 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-700 group-hover:text-white transition-colors">
                          所有产品
                        </span>
                      </div>
                    </div>
                    <div className="relative cursor-pointer group">
                      <img
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300"
                        alt="认证承包商"
                        className="w-full h-28 object-cover rounded"
                      />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="bg-white border-2 border-red-700 text-red-700 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-700 group-hover:text-white transition-colors">
                          认证承包商
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
            onClick={function() { setSearchOpen(!searchOpen); setMenuOpen(null); }}
            className="text-gray-700 hover:text-gray-900 text-xl font-light"
          >
            ✕{searchOpen ? '' : ''}
            {searchOpen ? '✕' : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 搜索栏 */}
      {searchOpen && (
        <div className="bg-white border-b px-8 py-4 shadow-md">
          <div className="max-w-3xl mx-auto flex border-2 border-gray-300 rounded">
            <input
              className="flex-1 px-4 py-3 outline-none text-gray-700 text-lg"
              placeholder="您想找什么？"
              autoFocus
            />
            <button className="px-4 text-gray-500 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
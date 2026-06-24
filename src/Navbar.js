import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = function(menu) {
    if (menuOpen === menu) {
      setMenuOpen(null);
    } else {
      setMenuOpen(menu);
      setSearchOpen(false);
    }
  };

  const toggleSearch = function() {
    setSearchOpen(!searchOpen);
    setMenuOpen(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
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
        <div
          className="cursor-pointer flex items-center gap-2 flex-shrink-0"
          onClick={function() { navigate('/'); setMenuOpen(null); }}
        >
          <div className="bg-red-700 text-white font-bold px-3 py-2 text-lg">🏠</div>
          <div>
            <div className="font-black text-gray-900 text-lg leading-tight">我的窗户公司</div>
            <div className="text-gray-500 text-xs tracking-widest">WINDOWS & DOORS</div>
          </div>
        </div>

        <ul className="flex gap-8 text-gray-800 font-medium text-sm">
          <li className="relative py-2">
            <button
              onClick={function() { toggleMenu('windows'); }}
              className={'font-medium ' + (menuOpen === 'windows' ? 'border-b-2 border-red-700 text-red-700' : 'hover:text-red-700')}
            >
              窗户与门
            </button>
          </li>
          <li className="relative py-2">
            <button
              onClick={function() { toggleMenu('inspiration'); }}
              className={'font-medium ' + (menuOpen === 'inspiration' ? 'border-b-2 border-red-700 text-red-700' : 'hover:text-red-700')}
            >
              灵感
            </button>
          </li>
          <li className="relative py-2">
            <button
              onClick={function() { toggleMenu('support'); }}
              className={'font-medium ' + (menuOpen === 'support' ? 'border-b-2 border-red-700 text-red-700' : 'hover:text-red-700')}
            >
              服务支持
            </button>
          </li>
          <li className="relative py-2">
            <button
              onClick={function() { toggleMenu('docs'); }}
              className={'font-medium ' + (menuOpen === 'docs' ? 'border-b-2 border-red-700 text-red-700' : 'hover:text-red-700')}
            >
              技术文档
            </button>
          </li>
          <li className="relative py-2">
            <button
              onClick={function() { toggleMenu('pros'); }}
              className={'font-medium ' + (menuOpen === 'pros' ? 'border-b-2 border-red-700 text-red-700' : 'hover:text-red-700')}
            >
              专业人士
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white font-bold text-sm transition-colors"
            onClick={function() { navigate('/'); }}
          >
            获取报价
          </button>
          <button onClick={toggleSearch} className="text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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

      {/* 窗户与门下拉菜单 */}
      {menuOpen === 'windows' && (
        <div className="w-full bg-white shadow-2xl border-t">
          <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
            <div>
              <div className="font-black text-gray-900 text-base mb-4">窗户</div>
              <ul className="flex flex-col gap-3 text-gray-700 text-sm">
                {['推拉窗', '平开窗', '天窗', '百叶窗', '图片窗', '特种窗', '替换窗'].map(function(item) {
                  return <li key={item} className="hover:text-red-700 cursor-pointer flex items-center gap-2">🪟 {item}</li>;
                })}
                <li className="font-bold cursor-pointer hover:text-red-700 mt-1">查看全部</li>
              </ul>
            </div>
            <div>
              <div className="font-black text-gray-900 text-base mb-4">门</div>
              <ul className="flex flex-col gap-3 text-gray-700 text-sm">
                {['入户门', '落地玻璃门', '推拉门', '折叠门', '纱门', '替换门'].map(function(item) {
                  return <li key={item} className="hover:text-red-700 cursor-pointer flex items-center gap-2">🚪 {item}</li>;
                })}
                <li className="font-bold cursor-pointer hover:text-red-700 mt-1">查看全部</li>
              </ul>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {[
                { title: '按系列浏览', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' },
                { title: '按材质浏览', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300' },
                { title: '所有产品', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300' },
                { title: '认证承包商', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300' },
              ].map(function(card) {
                return (
                  <div key={card.title} className="relative cursor-pointer group rounded overflow-hidden" onClick={function() { navigate('/products'); setMenuOpen(null); }}>
                    <img src={card.img} alt={card.title} className="w-full h-32 object-cover" />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                      <span className="bg-white border-2 border-red-700 text-red-700 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-700 group-hover:text-white transition-colors">
                        {card.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-30" onClick={function() { setMenuOpen(null); }} />
      )}
    </header>
  );
}

export default Navbar;
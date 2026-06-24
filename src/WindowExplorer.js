import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WindowExplorer() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('awning');

  const windows = [
    {
      id: 'awning',
      name: '推拉窗',
      what: '从底部摇开的窗户',
      where: '通常安装在较高的墙壁上，保护隐私并通风',
      fact: '即使在雨天也可以开着，听雨声感受新鲜空气',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'
    },
    {
      id: 'bay',
      name: '飘窗',
      what: '至少三个窗户组成的舒适角落',
      where: '最常用于客厅和卧室',
      fact: '向外延伸到房屋墙壁之外，增加室内空间',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600'
    },
    {
      id: 'casement',
      name: '平开窗',
      what: '可以摇开的窗户',
      where: '在厨房水槽上方很受欢迎，因为很容易打开',
      fact: '可以高达8英尺，让更多光线和新鲜空气进入',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
    },
    {
      id: 'hung',
      name: '上下推拉窗',
      what: '上下滑动的窗户',
      where: '几乎可以安装在任何地方',
      fact: '是美国最常见的窗户之一',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600'
    },
    {
      id: 'sliding',
      name: '左右推拉窗',
      what: '左右滑动的窗户',
      where: '常见于厨房、卧室和客厅',
      fact: '就像推拉玻璃门，但尺寸更小',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'
    },
    {
      id: 'picture',
      name: '固定窗',
      what: '不能打开的窗户',
      where: '通常与可以打开的窗户组合使用',
      fact: '是框住景色、让自然光充满空间的好方法',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600'
    },
  ];

  const doors = [
    {
      id: 'entry',
      name: '入户门',
      what: '坚固安全的入口门',
      where: '用于家庭主要入口',
      fact: '多种颜色和风格可选，彰显个性',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca9d13?w=600'
    },
    {
      id: 'patio',
      name: '落地玻璃门',
      what: '连接室内外的大型玻璃门',
      where: '用于通往露台或花园',
      fact: '可以让大量自然光进入室内',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600'
    },
    {
      id: 'sliding-door',
      name: '推拉门',
      what: '左右滑动的门',
      where: '适合空间有限的区域',
      fact: '节省空间，操作简便',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600'
    },
  ];

  const allItems = [...windows, ...doors];
  const currentItem = allItems.find(function(item) { return item.id === selected; }) || windows[0];

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-8">
          适合任何项目的正确解决方案
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {/* 左侧列表 */}
          <div className="col-span-1">
            <div className="border-b border-gray-300 pb-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-700">▼</span>
                <span className="font-black text-xs text-gray-700 uppercase tracking-widest">探索我们的窗户</span>
              </div>
              <ul className="flex flex-col">
                {windows.map(function(item) {
                  return (
                    <li
                      key={item.id}
                      onClick={function() { setSelected(item.id); }}
                      className={
                        'py-2 px-3 cursor-pointer text-sm border-l-2 ' +
                        (selected === item.id
                          ? 'border-gray-900 font-bold text-gray-900'
                          : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400')
                      }
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-700">▼</span>
                <span className="font-black text-xs text-gray-700 uppercase tracking-widest">按类型选门</span>
              </div>
              <ul className="flex flex-col">
                {doors.map(function(item) {
                  return (
                    <li
                      key={item.id}
                      onClick={function() { setSelected(item.id); }}
                      className={
                        'py-2 px-3 cursor-pointer text-sm border-l-2 ' +
                        (selected === item.id
                          ? 'border-gray-900 font-bold text-gray-900'
                          : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400')
                      }
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* 中间大图 */}
          <div className="col-span-2">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* 右侧详情 */}
          <div className="col-span-1 flex flex-col justify-center">
            <h3 className="text-3xl font-black text-gray-900 mb-6">
              {currentItem.name}
            </h3>
            <div className="flex flex-col gap-4 text-sm text-gray-600 mb-8">
              <p><span className="font-bold text-gray-900">是什么：</span>{currentItem.what}</p>
              <p><span className="font-bold text-gray-900">在哪里：</span>{currentItem.where}</p>
              <p><span className="font-bold text-gray-900">趣味知识：</span>{currentItem.fact}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={function() { navigate('/products'); }}
                className="border-2 border-red-700 text-red-700 px-6 py-3 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                了解更多 <span>→</span>
              </button>
              <button
                onClick={function() { navigate('/products'); }}
                className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-900 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                设计这款窗户 <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WindowExplorer;
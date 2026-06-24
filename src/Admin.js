import { useState, useEffect } from 'react';

function Admin() {
  const [tab, setTab] = useState('dashboard');
  const [quotes, setQuotes] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [saved, setSaved] = useState(false);

  const API = 'https://window-server.onrender.com';

  const handleLogin = () => {
    if (password === 'admin123') {
      setLoggedIn(true);
    } else {
      alert('密码错误！');
    }
  };

  useEffect(() => {
    if (!loggedIn) return;
    fetch(API + '/api/quotes')
      .then(res => res.json())
      .then(data => { setQuotes(data); setLoading(false); });
    fetch(API + '/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, [loggedIn]);

  const updateStatus = async (id, status) => {
    await fetch(API + '/api/quotes/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setQuotes(quotes.map(q => q.id === id ? Object.assign({}, q, { status: status }) : q));
  };

  const saveContent = async () => {
    await fetch(API + '/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
          <div className="text-4xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">管理员登录</h2>
          <p className="text-gray-500 mb-6">窗户公司管理系统</p>
          <input
            type="password"
            placeholder="输入密码"
            onChange={function(e) { setPassword(e.target.value); }}
            onKeyPress={function(e) { if(e.key === 'Enter') handleLogin(); }}
            className="border rounded p-3 w-full mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold">
            登录
          </button>
        </div>
      </div>
    );
  }

  const totalQuotes = quotes.length;
  const pending = quotes.filter(q => q.status === '待跟进').length;
  const contacted = quotes.filter(q => q.status === '已联系').length;
  const closed = quotes.filter(q => q.status === '已成交').length;

  const navItems = [
    { id: 'dashboard', label: '数据概览', icon: '📊' },
    { id: 'quotes', label: '报价管理', icon: '📋' },
    { id: 'content', label: '内容管理', icon: '✏️' },
    { id: 'products', label: '产品管理', icon: '🪟' },
    { id: 'settings', label: '网站设置', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* 左侧导航栏 */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="text-xl font-bold">🏠 窗户公司</div>
          <div className="text-gray-400 text-sm mt-1">管理后台</div>
        </div>
        <nav className="flex-1 p-4">
          {navItems.map(function(item) {
            return (
              <button
                key={item.id}
                onClick={function() { setTab(item.id); }}
                className={
                  'w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center gap-3 ' +
                  (tab === item.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white')
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <a href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
            <span>🌐</span> 查看网站
          </a>
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {navItems.find(function(i) { return i.id === tab; }).label}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">管理员</span>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-auto">

          {/* 数据概览 */}
          {tab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">总报价数</div>
                  <div className="text-3xl font-bold text-gray-800">{totalQuotes}</div>
                  <div className="text-green-500 text-sm mt-2">📈 所有报价</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">待跟进</div>
                  <div className="text-3xl font-bold text-yellow-500">{pending}</div>
                  <div className="text-yellow-500 text-sm mt-2">⏳ 需要联系</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">已联系</div>
                  <div className="text-3xl font-bold text-blue-500">{contacted}</div>
                  <div className="text-blue-500 text-sm mt-2">📞 跟进中</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">已成交</div>
                  <div className="text-3xl font-bold text-green-500">{closed}</div>
                  <div className="text-green-500 text-sm mt-2">✅ 成功转化</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">最新报价申请</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-gray-500 font-medium">姓名</th>
                      <th className="text-left p-3 text-gray-500 font-medium">产品</th>
                      <th className="text-left p-3 text-gray-500 font-medium">状态</th>
                      <th className="text-left p-3 text-gray-500 font-medium">时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.slice(0, 5).map(function(quote) {
                      return (
                        <tr key={quote.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{quote.name}</td>
                          <td className="p-3">{quote.product_type}</td>
                          <td className="p-3">
                            <span className={
                              'px-2 py-1 rounded text-xs font-medium ' +
                              (quote.status === '待跟进' ? 'bg-yellow-100 text-yellow-800' :
                              quote.status === '已联系' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800')
                            }>
                              {quote.status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-500 text-sm">
                            {new Date(quote.created_at).toLocaleString('zh-CN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 报价管理 */}
          {tab === 'quotes' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold text-gray-800">所有报价申请（{totalQuotes}）</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-gray-500 font-medium">姓名</th>
                    <th className="text-left p-4 text-gray-500 font-medium">邮箱</th>
                    <th className="text-left p-4 text-gray-500 font-medium">电话</th>
                    <th className="text-left p-4 text-gray-500 font-medium">产品</th>
                    <th className="text-left p-4 text-gray-500 font-medium">项目</th>
                    <th className="text-left p-4 text-gray-500 font-medium">状态</th>
                    <th className="text-left p-4 text-gray-500 font-medium">时间</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500">加载中...</td></tr>
                  ) : quotes.length === 0 ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500">暂无报价申请</td></tr>
                  ) : (
                    quotes.map(function(quote) {
                      return (
                        <tr key={quote.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{quote.name}</td>
                          <td className="p-4 text-gray-600">{quote.email}</td>
                          <td className="p-4 text-gray-600">{quote.phone}</td>
                          <td className="p-4">{quote.product_type}</td>
                          <td className="p-4">{quote.project_type}</td>
                          <td className="p-4">
                            <select
                              value={quote.status}
                              onChange={function(e) { updateStatus(quote.id, e.target.value); }}
                              className="border rounded p-1 text-sm"
                            >
                              <option>待跟进</option>
                              <option>已联系</option>
                              <option>已成交</option>
                            </select>
                          </td>
                          <td className="p-4 text-sm text-gray-500">
                            {new Date(quote.created_at).toLocaleString('zh-CN')}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 内容管理 */}
          {tab === 'content' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">公司名称</label>
                  <input
                    value={content.company_name || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { company_name: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">电话</label>
                  <input
                    value={content.phone || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { phone: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">网站口号</label>
                  <input
                    value={content.slogan || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { slogan: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">公司描述</label>
                  <textarea
                    value={content.description || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { description: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">邮箱</label>
                  <input
                    value={content.email || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { email: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">地址</label>
                  <input
                    value={content.address || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { address: e.target.value })); }}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <button
                onClick={saveContent}
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 font-bold"
              >
                {saved ? '✅ 保存成功！' : '保存修改'}
              </button>
            </div>
          )}

          {/* 产品管理 */}
          {tab === 'products' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">🪟</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">产品管理</h3>
              <p className="text-gray-500">即将推出...</p>
            </div>
          )}

          {/* 网站设置 */}
          {tab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">网站设置</h3>
              <p className="text-gray-500">即将推出...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;
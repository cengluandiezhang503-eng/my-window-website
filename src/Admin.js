import { useState, useEffect } from 'react';

function Admin() {
  const [tab, setTab] = useState('quotes');
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">管理员登录</h2>
          <input
            type="password"
            placeholder="输入密码"
            onChange={function(e) { setPassword(e.target.value); }}
            className="border rounded p-3 w-full mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800">
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-red-700 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">网站管理后台</h1>
        <div className="flex gap-4">
          <button onClick={function() { setTab('quotes'); }} className={tab === 'quotes' ? 'bg-white text-red-700 px-4 py-2 rounded' : 'text-white px-4 py-2 rounded'}>
            报价管理
          </button>
          <button onClick={function() { setTab('content'); }} className={tab === 'content' ? 'bg-white text-red-700 px-4 py-2 rounded' : 'text-white px-4 py-2 rounded'}>
            内容管理
          </button>
        </div>
      </div>

      <div className="p-8">
        {tab === 'quotes' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">报价申请列表</h2>
            {loading ? (
              <p>加载中...</p>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 text-left">姓名</th>
                      <th className="p-4 text-left">邮箱</th>
                      <th className="p-4 text-left">电话</th>
                      <th className="p-4 text-left">产品</th>
                      <th className="p-4 text-left">项目</th>
                      <th className="p-4 text-left">状态</th>
                      <th className="p-4 text-left">时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.length === 0 ? (
                      <tr><td colSpan="7" className="p-4 text-center text-gray-500">暂无报价申请</td></tr>
                    ) : (
                      quotes.map(function(quote) {
                        return (
                          <tr key={quote.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{quote.name}</td>
                            <td className="p-4">{quote.email}</td>
                            <td className="p-4">{quote.phone}</td>
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
          </div>
        )}

        {tab === 'content' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">网站内容管理</h2>
            <div className="bg-white rounded-lg shadow p-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">公司名称</label>
                  <input
                    value={content.company_name || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { company_name: e.target.value })); }}
                    className="border rounded p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">电话</label>
                  <input
                    value={content.phone || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { phone: e.target.value })); }}
                    className="border rounded p-3 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">网站口号</label>
                  <input
                    value={content.slogan || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { slogan: e.target.value })); }}
                    className="border rounded p-3 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">公司描述</label>
                  <textarea
                    value={content.description || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { description: e.target.value })); }}
                    className="border rounded p-3 w-full"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">邮箱</label>
                  <input
                    value={content.email || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { email: e.target.value })); }}
                    className="border rounded p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">地址</label>
                  <input
                    value={content.address || ''}
                    onChange={function(e) { setContent(Object.assign({}, content, { address: e.target.value })); }}
                    className="border rounded p-3 w-full"
                  />
                </div>
              </div>
              <button
                onClick={saveContent}
                className="mt-8 bg-red-700 text-white px-8 py-3 rounded hover:bg-red-800"
              >
                {saved ? '保存成功！' : '保存修改'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

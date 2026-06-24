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
    fetch(`${API}/api/quotes`)
      .then(res => res.json())
      .then(data => { setQuotes(data); setLoading(false); });
    fetch(`${API}/api/content`)
      .then(res => res.json())
      .then(data => setContent(data));
  }, [loggedIn]);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
  };

  const saveContent = async () => {
    await fetch(`${API}/api/content`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const statusColors = {
    '待跟进': 'bg-yellow-100 text-yellow-800',
    '已联系': 'bg-blue-100 text-blue-800',
    '已成交': 'bg-green-100 text-green-800'
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔐 管理员登录</h2>
          <input
            type="password"
            placeholder="输入密码"
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
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
        <h1 className="text-2xl font-bold">🏠 网站管理后台</h1>
        <div className="flex gap-4">
          <button onClick={() => setTab('quotes')} className={`px-4 py-2 rounded ${tab === 'quotes' ? 'bg-white text-red-700' : 'text-white'}`}>
            报价管理
          </button>
          <button onClick={() => setTab('content')} className={`px-4 py-2 rounded ${tab === 'content' ? 'bg-white text-red-700' : 'text-white'}`}>
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
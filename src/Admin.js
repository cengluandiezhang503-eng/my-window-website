import { useState, useEffect } from 'react';

function Admin() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (password === 'admin123') {
      setLoggedIn(true);
    } else {
      alert('密码错误！');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetch('https://window-server.onrender.com/api/quotes')
        .then(res => res.json())
        .then(data => {
          setQuotes(data);
          setLoading(false);
        });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">管理员登录</h2>
          <input
            type="password"
            placeholder="输入密码"
            onChange={e => setPassword(e.target.value)}
            className="border rounded p-3 w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800"
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">报价申请管理</h1>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-4 text-left">姓名</th>
                <th className="p-4 text-left">邮箱</th>
                <th className="p-4 text-left">电话</th>
                <th className="p-4 text-left">产品</th>
                <th className="p-4 text-left">项目</th>
                <th className="p-4 text-left">时间</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">暂无报价申请</td>
                </tr>
              ) : (
                quotes.map(quote => (
                  <tr key={quote.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{quote.name}</td>
                    <td className="p-4">{quote.email}</td>
                    <td className="p-4">{quote.phone}</td>
                    <td className="p-4">{quote.productType}</td>
                    <td className="p-4">{quote.projectType}</td>
                    <td className="p-4">{new Date(quote.createdAt).toLocaleString('zh-CN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
import { useState, useEffect } from 'react';

function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', image: '' });

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products')
      .then(function(res) { return res.json(); })
      .then(function(data) { setProducts(data); setLoading(false); });
    fetch('https://window-server.onrender.com/api/quotes')
      .then(function(res) { return res.json(); })
      .then(function(data) { setQuotes(data); });
  }, []);

  const pendingQuotes = quotes.filter(function(q) { return q.status === '待跟进'; }).length;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f', color: '#e0e0e8', fontFamily: 'system-ui, sans-serif', fontSize: '13px' }}>

      {/* 侧边栏 */}
      <div style={{ width: '220px', flexShrink: 0, background: '#0d0d14', borderRight: '1px solid #1e1e2e', display: 'flex', flexDirection: 'column' }}>

        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1e1e2e', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🏠
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>WindowOS</div>
            <div style={{ fontSize: '10px', color: '#4a4a6a', letterSpacing: '2px' }}>ADMIN v2.0</div>
          </div>
        </div>

        {/* 导航 */}
        <div style={{ flex: 1, padding: '12px 0' }}>
          <div style={{ padding: '8px 16px 4px', fontSize: '10px', color: '#3a3a5a', letterSpacing: '2px', textTransform: 'uppercase' }}>主菜单</div>

          {[
            { id: 'dashboard', icon: '📊', label: '控制台' },
            { id: 'products', icon: '📦', label: '产品管理', badge: products.length },
            { id: 'series', icon: '🗂️', label: '产品系列' },
            { id: 'quotes', icon: '📋', label: '报价管理', badge: pendingQuotes },
          ].map(function(item) {
            return (
              <div
                key={item.id}
                onClick={function() { setActiveNav(item.id); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 16px', cursor: 'pointer',
                  color: activeNav === item.id ? '#818cf8' : '#6060a0',
                  background: activeNav === item.id ? '#13132a' : 'transparent',
                  borderLeft: activeNav === item.id ? '2px solid #818cf8' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1, fontSize: '12px' }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{ background: '#4f46e5', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}

          <div style={{ padding: '8px 16px 4px', marginTop: '8px', fontSize: '10px', color: '#3a3a5a', letterSpacing: '2px', textTransform: 'uppercase' }}>系统</div>

          {[
            { id: 'customers', icon: '👥', label: '客户管理' },
            { id: 'analytics', icon: '📈', label: '数据分析' },
            { id: 'emails', icon: '✉️', label: '邮件记录' },
            { id: 'settings', icon: '⚙️', label: '系统设置' },
          ].map(function(item) {
            return (
              <div
                key={item.id}
                onClick={function() { setActiveNav(item.id); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 16px', cursor: 'pointer',
                  color: activeNav === item.id ? '#818cf8' : '#6060a0',
                  background: activeNav === item.id ? '#13132a' : 'transparent',
                  borderLeft: activeNav === item.id ? '2px solid #818cf8' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span>{item.icon}</span>
                <span style={{ fontSize: '12px' }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* 底部用户 */}
        <div style={{ padding: '16px', borderTop: '1px solid #1e1e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', fontWeight: '700' }}>A</div>
            <div>
              <div style={{ fontSize: '12px', color: '#a0a0c0' }}>Admin</div>
              <div style={{ fontSize: '10px', color: '#4a4a6a' }}>超级管理员</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* 顶部栏 */}
        <div style={{ height: '56px', background: '#0d0d14', borderBottom: '1px solid #1e1e2e', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px' }}>
          <div style={{ flex: 1, fontSize: '16px', fontWeight: '600', color: '#e0e0f0' }}>
            {activeNav === 'dashboard' && '控制台'}
            {activeNav === 'products' && '产品管理'}
            {activeNav === 'series' && '产品系列'}
            {activeNav === 'quotes' && '报价管理'}
            {activeNav === 'customers' && '客户管理'}
            {activeNav === 'analytics' && '数据分析'}
            {activeNav === 'settings' && '系统设置'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#12121e', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '6px 12px', width: '200px' }}>
            <span style={{ color: '#3a3a5a' }}>🔍</span>
            <input
              value={searchQuery}
              onChange={function(e) { setSearchQuery(e.target.value); }}
              placeholder="搜索..."
              style={{ background: 'none', border: 'none', outline: 'none', color: '#8080b0', fontSize: '12px', width: '100%' }}
            />
          </div>
          <div style={{ width: '32px', height: '32px', background: '#12121e', border: '1px solid #1e1e2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🔔</div>
        </div>

        {/* 内容区域 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#0a0a0f' }}>

          {/* 控制台 */}
          {activeNav === 'dashboard' && (
            <div>
              {/* 统计卡片 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: '总产品数', value: products.length, change: '+12%', color: '#4f46e5', up: true },
                  { label: '报价申请', value: quotes.length, change: '+8%', color: '#059669', up: true },
                  { label: '待跟进', value: pendingQuotes, change: '-3%', color: '#d97706', up: false },
                  { label: '转化率', value: '34%', change: '+5%', color: '#dc2626', up: true },
                ].map(function(stat, i) {
                  return (
                    <div key={i} style={{ background: '#0d0d14', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: stat.color }}></div>
                      <div style={{ fontSize: '11px', color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{stat.label}</div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#e0e0f0', marginBottom: '4px' }}>{stat.value}</div>
                      <div style={{ fontSize: '11px', color: stat.up ? '#34d399' : '#f87171' }}>{stat.up ? '↑' : '↓'} {stat.change} 本月</div>
                    </div>
                  );
                })}
              </div>

              {/* 最近报价 */}
              <div style={{ background: '#0d0d14', border: '1px solid #1e1e2e', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e1e2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#c0c0e0' }}>📋 最新报价申请</div>
                  <button onClick={function() { setActiveNav('quotes'); }} style={{ fontSize: '11px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}>查看全部 →</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['客户姓名', '邮箱', '电话', '产品类型', '状态', '时间'].map(function(h) {
                        return <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', color: '#3a3a5a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #1a1a2e' }}>{h}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.slice(0, 5).map(function(quote) {
                      return (
                        <tr key={quote.id}>
                          <td style={{ padding: '12px 16px', color: '#c0c0e0', borderBottom: '1px solid #13131e' }}>{quote.name}</td>
                          <td style={{ padding: '12px 16px', color: '#6060a0', borderBottom: '1px solid #13131e' }}>{quote.email}</td>
                          <td style={{ padding: '12px 16px', color: '#6060a0', borderBottom: '1px solid #13131e' }}>{quote.phone}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <span style={{ background: '#13132a', color: '#818cf8', padding: '3px 8px', borderRadius: '20px', fontSize: '10px' }}>{quote.product_type || '未指定'}</span>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <span style={{ color: quote.status === '待跟进' ? '#fbbf24' : quote.status === '已联系' ? '#34d399' : '#818cf8', fontSize: '12px' }}>
                              {quote.status === '待跟进' ? '⏳' : quote.status === '已联系' ? '✅' : '🎉'} {quote.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#3a3a5a', borderBottom: '1px solid #13131e', fontSize: '11px' }}>
                            {new Date(quote.created_at).toLocaleDateString('zh-CN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 产品管理 */}
          {activeNav === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ color: '#6060a0', fontSize: '12px' }}>共 {products.length} 个产品</div>
                <button
                  onClick={function() { setShowAddProduct(!showAddProduct); }}
                  style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                >
                  + 添加产品
                </button>
              </div>

              {/* 添加产品表单 */}
              {showAddProduct && (
                <div style={{ background: '#0d0d14', border: '1px solid #4f46e5', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#c0c0e0', marginBottom: '16px' }}>添加新产品</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { key: 'name', label: '产品名称', placeholder: '例：双层隔热窗' },
                      { key: 'price', label: '价格', placeholder: '例：从 ¥2,999 起' },
                      { key: 'category', label: '分类', placeholder: '例：窗户' },
                      { key: 'image', label: '图片链接', placeholder: 'https://...' },
                    ].map(function(field) {
                      return (
                        <div key={field.key}>
                          <div style={{ fontSize: '11px', color: '#4a4a6a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{field.label}</div>
                          <input
                            value={newProduct[field.key]}
                            onChange={function(e) { setNewProduct(Object.assign({}, newProduct, { [field.key]: e.target.value })); }}
                            placeholder={field.placeholder}
                            style={{ width: '100%', background: '#12121e', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '8px 12px', color: '#c0c0e0', fontSize: '12px', outline: 'none' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#4a4a6a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>产品描述</div>
                    <textarea
                      value={newProduct.description}
                      onChange={function(e) { setNewProduct(Object.assign({}, newProduct, { description: e.target.value })); }}
                      placeholder="产品详细描述..."
                      rows={3}
                      style={{ width: '100%', background: '#12121e', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '8px 12px', color: '#c0c0e0', fontSize: '12px', outline: 'none', resize: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>保存产品</button>
                    <button onClick={function() { setShowAddProduct(false); }} style={{ background: '#1e1e2e', color: '#6060a0', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontSize: '12px' }}>取消</button>
                  </div>
                </div>
              )}

              {/* 产品表格 */}
              <div style={{ background: '#0d0d14', border: '1px solid #1e1e2e', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['产品', '分类', '价格', '状态', '操作'].map(function(h) {
                        return <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', color: '#3a3a5a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #1a1a2e' }}>{h}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(function(p) {
                      return !searchQuery || p.name.includes(searchQuery) || p.category.includes(searchQuery);
                    }).map(function(product) {
                      return (
                        <tr key={product.id} style={{ transition: 'background 0.2s' }}>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', background: '#1a1a2e' }} />
                              <div>
                                <div style={{ color: '#c0c0e0', fontWeight: '500', fontSize: '13px' }}>{product.name}</div>
                                <div style={{ color: '#4a4a6a', fontSize: '11px', marginTop: '2px' }}>{product.description?.slice(0, 30)}...</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <span style={{
                              background: product.category === '窗户' ? '#13132a' : product.category === '门' ? '#0a2a1a' : '#2a1a0a',
                              color: product.category === '窗户' ? '#818cf8' : product.category === '门' ? '#34d399' : '#fbbf24',
                              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600'
                            }}>{product.category}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#e0e0f0', borderBottom: '1px solid #13131e', fontWeight: '600' }}>{product.price}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <span style={{ color: '#34d399', fontSize: '12px' }}>● 上架</span>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{ background: '#13132a', color: '#818cf8', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '11px' }}>编辑</button>
                              <button style={{ background: '#2a0a0a', color: '#f87171', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '11px' }}>删除</button>
                            </div>
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
          {activeNav === 'quotes' && (
            <div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: '全部', count: quotes.length, color: '#818cf8' },
                  { label: '待跟进', count: quotes.filter(function(q) { return q.status === '待跟进'; }).length, color: '#fbbf24' },
                  { label: '已联系', count: quotes.filter(function(q) { return q.status === '已联系'; }).length, color: '#34d399' },
                  { label: '已成交', count: quotes.filter(function(q) { return q.status === '已成交'; }).length, color: '#4f46e5' },
                ].map(function(tab, i) {
                  return (
                    <div key={i} style={{ background: '#0d0d14', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: tab.color, fontSize: '16px', fontWeight: '700' }}>{tab.count}</span>
                      <span style={{ color: '#6060a0', fontSize: '12px' }}>{tab.label}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: '#0d0d14', border: '1px solid #1e1e2e', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['客户', '联系方式', '产品', '项目', '状态', '时间', '操作'].map(function(h) {
                        return <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', color: '#3a3a5a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #1a1a2e' }}>{h}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map(function(quote) {
                      return (
                        <tr key={quote.id}>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <div style={{ color: '#c0c0e0', fontWeight: '500' }}>{quote.name}</div>
                            <div style={{ color: '#4a4a6a', fontSize: '11px' }}>{quote.zip_code}</div>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <div style={{ color: '#6060a0', fontSize: '12px' }}>{quote.email}</div>
                            <div style={{ color: '#4a4a6a', fontSize: '11px' }}>{quote.phone}</div>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <span style={{ background: '#13132a', color: '#818cf8', padding: '3px 8px', borderRadius: '20px', fontSize: '11px' }}>{quote.product_type || '未指定'}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#6060a0', borderBottom: '1px solid #13131e', fontSize: '12px' }}>{quote.project_type || '-'}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <select
                              value={quote.status}
                              onChange={async function(e) {
                                await fetch('https://window-server.onrender.com/api/quotes/' + quote.id, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: e.target.value })
                                });
                                setQuotes(quotes.map(function(q) { return q.id === quote.id ? Object.assign({}, q, { status: e.target.value }) : q; }));
                              }}
                              style={{
                                background: '#12121e', border: '1px solid #1e1e2e', borderRadius: '6px',
                                color: quote.status === '待跟进' ? '#fbbf24' : quote.status === '已联系' ? '#34d399' : '#818cf8',
                                padding: '4px 8px', fontSize: '11px', cursor: 'pointer', outline: 'none'
                              }}
                            >
                              <option value="待跟进">⏳ 待跟进</option>
                              <option value="已联系">✅ 已联系</option>
                              <option value="已成交">🎉 已成交</option>
                            </select>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#3a3a5a', borderBottom: '1px solid #13131e', fontSize: '11px' }}>
                            {new Date(quote.created_at).toLocaleDateString('zh-CN')}
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #13131e' }}>
                            <button style={{ background: '#13132a', color: '#818cf8', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '11px' }}>详情</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 其他页面占位 */}
          {['customers', 'analytics', 'series', 'emails', 'settings'].includes(activeNav) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', color: '#3a3a5a' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <div style={{ fontSize: '16px', color: '#6060a0' }}>正在开发中...</div>
              <div style={{ fontSize: '12px', color: '#3a3a5a', marginTop: '8px' }}>Coming Soon</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
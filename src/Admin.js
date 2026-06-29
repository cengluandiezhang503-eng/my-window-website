import { useState, useEffect } from 'react';

const PURPLE = {
  border: '1.5px solid rgba(139,63,212,0.8)',
  shadow: '0 0 0 1px rgba(192,132,252,0.5), 0 4px 24px rgba(91,15,168,0.3), 0 8px 32px rgba(58,8,117,0.2), inset 0 1px 0 rgba(192,132,252,0.4), inset 0 -1px 0 rgba(58,8,117,0.3)',
};

const C = {
  bg: '#f6f6f7',
  white: '#fff',
  border: '#e1e3e5',
  text: '#202223',
  textMuted: '#6d7175',
  textLight: '#8c9196',
  green: '#008060',
  greenBg: '#aee9d1',
  greenText: '#003d29',
  red: '#d72c0d',
  amber: '#ffd79d',
  amberText: '#3d1e00',
  blue: '#b4e1fa',
  blueText: '#0d3554',
  purple: '#5c6ac4',
  sidebar: '#fff',
  sidebarBorder: '#e1e3e5',
  sidebarText: '#202223',
  sidebarActive: '#f0f1ff',
};

const Card = ({ children, style, padding }) => (
  <div style={{
    background: C.white,
    borderRadius: '12px',
    border: PURPLE.border,
    boxShadow: PURPLE.shadow,
    backdropFilter: 'blur(10px)',
    marginBottom: '16px',
    overflow: 'hidden',
    padding: padding || 0,
    ...style
  }}>{children}</div>
);

const CardHeader = ({ title, action, actionLabel }) => (
  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>{title}</div>
    {actionLabel && <button onClick={action} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple, fontSize: '14px' }}>{actionLabel}</button>}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    '已上架': { bg: '#aee9d1', c: '#003d29' },
    '草稿': { bg: '#e4e5e7', c: '#4a4a4a' },
    '已下架': { bg: '#ffd79d', c: '#3d1e00' },
    '待跟进': { bg: '#ffd79d', c: '#3d1e00' },
    '已联系': { bg: '#aee9d1', c: '#003d29' },
    '已成交': { bg: '#b4e1fa', c: '#0d3554' },
    '有效': { bg: '#aee9d1', c: '#003d29' },
  };
  const s = map[status] || { bg: '#e4e5e7', c: '#4a4a4a' };
  return <span style={{ background: s.bg, color: s.c, padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>{status}</span>;
};

const Toggle = ({ checked }) => (
  <div style={{ width: '36px', height: '20px', background: checked ? '#008060' : '#e1e3e5', borderRadius: '10px', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
    <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '18px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
  </div>
);

const Btn = ({ children, onClick, primary, danger, style }) => (
  <button onClick={onClick} style={{
    background: primary ? C.text : danger ? '#fff' : '#fff',
    color: primary ? '#fff' : danger ? C.red : C.text,
    border: primary ? 'none' : danger ? `1px solid ${C.red}` : `1px solid ${C.border}`,
    borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: primary ? '500' : '400', ...style
  }}>{children}</button>
);

const Field = ({ label, children, sub }) => (
  <div style={{ marginBottom: '16px' }}>
    {label && <label style={{ fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '6px', display: 'block' }}>{label}</label>}
    {children}
    {sub && <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '4px' }}>{sub}</div>}
  </div>
);

const Input = ({ value, onChange, placeholder, type }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type || 'text'}
    style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white, fontFamily: 'inherit' }}
    onFocus={e => e.target.style.borderColor = '#8b3fd4'}
    onBlur={e => e.target.style.borderColor = C.border} />
);

const Select = ({ value, onChange, options }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white, cursor: 'pointer' }}>
    {options.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
  </select>
);

const Th = ({ children }) => (
  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', color: C.textMuted, fontWeight: '500', borderBottom: `1px solid ${C.border}`, background: '#fafafa', whiteSpace: 'nowrap' }}>{children}</th>
);

const Td = ({ children, style }) => (
  <td style={{ padding: '12px 16px', borderBottom: `1px solid #f1f2f3`, fontSize: '14px', color: C.text, ...style }}>{children}</td>
);

const EmptyState = ({ icon, title, desc, btnText, onBtn, btnText2 }) => (
  <Card padding="60px 20px" style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '72px', marginBottom: '16px', opacity: 0.7 }}>{icon}</div>
    <div style={{ fontSize: '16px', fontWeight: '600', color: C.text, marginBottom: '8px' }}>{title}</div>
    <div style={{ fontSize: '14px', color: C.textMuted, marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>{desc}</div>
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {btnText && <Btn primary onClick={onBtn}>{btnText}</Btn>}
      {btnText2 && <Btn>{btnText2}</Btn>}
    </div>
  </Card>
);

const Toolbar = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '6px 10px', borderBottom: `1px solid ${C.border}`, background: '#fafafa', flexWrap: 'wrap' }}>
    <select style={{ border: `1px solid ${C.border}`, borderRadius: '4px', padding: '3px 6px', fontSize: '13px', outline: 'none', background: C.white, cursor: 'pointer', marginRight: '4px' }}>
      <option>段落</option><option>标题1</option><option>标题2</option>
    </select>
    <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', fontWeight: '700', color: C.text }}>B</button>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', fontStyle: 'italic', color: C.text }}>I</button>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', textDecoration: 'underline', color: C.text }}>U</button>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>A<span style={{ display: 'inline-block', width: '8px', height: '2px', background: '#e00', marginLeft: '1px', verticalAlign: 'bottom' }}></span></button>
    <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>≡ ▾</button>
    <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
    {['🔗', '😊', '▶'].map((b, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 6px', borderRadius: '4px', fontSize: '14px' }}>{b}</button>)}
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>⊞▾</button>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>•••</button>
    <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '12px', color: C.text, fontFamily: 'monospace' }}>{'</>'}</button>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <Card style={{ padding: '20px', borderTop: `3px solid ${color}`, marginBottom: 0 }}>
    <div style={{ fontSize: '12px', color: C.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '600', color: C.text }}>{value}</div>
  </Card>
);

export default function Admin() {
  const [page, setPage] = useState('dashboard');
  const [subPage, setSubPage] = useState('');
  const [expanded, setExpanded] = useState({ orders: true, products: true, customers: false, content: false });
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [series, setSeries] = useState([]);
  const [np, setNp] = useState({ name: '', description: '', price: '', category: '', image: '', status: '已上架', type: '', vendor: '', tags: '' });
  const [ns, setNs] = useState({ name: '', description: '', image: '', type: 'manual' });
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/products').then(r => r.json()).then(setProducts).catch(() => {});
    fetch('https://window-server.onrender.com/api/quotes').then(r => r.json()).then(setQuotes).catch(() => {});
    fetch('https://window-server.onrender.com/api/series').then(r => r.json()).then(setSeries).catch(() => {});
  }, []);

  const pending = quotes.filter(q => q.status === '待跟进').length;

  const navItem = (id, label, badge_count, indent) => {
    const on = page === id && subPage === '';
    return (
      <div onClick={() => { setPage(id); setSubPage(''); }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: indent ? '6px 12px 6px 32px' : '7px 12px', cursor: 'pointer', borderRadius: '8px', margin: '1px 6px', fontSize: '13px', color: on ? '#5b0fa8' : indent ? C.textMuted : C.sidebarText, background: on ? '#f0e8ff' : 'transparent', fontWeight: on ? '600' : '400', transition: 'all 0.15s' }}>
        <span style={{ flex: 1 }}>{label}</span>
        {badge_count > 0 && <span style={{ background: '#d82c0d', color: '#fff', fontSize: '11px', padding: '1px 6px', borderRadius: '10px', fontWeight: '600' }}>{badge_count}</span>}
      </div>
    );
  };

  const navGroup = (id, label, children) => {
    const isActive = page === id;
    return (
      <>
        <div onClick={() => { setPage(id); setSubPage(''); setExpanded(e => ({ ...e, [id]: !e[id] })); }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', cursor: 'pointer', borderRadius: '8px', margin: '1px 6px', fontSize: '13px', color: isActive ? '#5b0fa8' : C.sidebarText, background: isActive ? '#f0e8ff' : 'transparent', fontWeight: isActive ? '600' : '400' }}>
          <span style={{ flex: 1 }}>{label}</span>
          <span style={{ fontSize: '10px', color: C.textLight }}>{expanded[id] ? '▾' : '▸'}</span>
        </div>
        {expanded[id] && children}
      </>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0e8ff', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', fontSize: '14px', color: C.text }}>

      {/* 侧边栏 */}
      <div style={{ width: '240px', flexShrink: 0, background: C.white, borderRight: PURPLE.border, boxShadow: '4px 0 20px rgba(91,15,168,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${C.sidebarBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5b0fa8, #8b3fd4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: '700', flexShrink: 0, boxShadow: '0 2px 8px rgba(91,15,168,0.4)' }}>W</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>我的窗户公司</div>
            <div style={{ fontSize: '11px', color: C.textLight }}>2026 年春季</div>
          </div>
          <span style={{ color: C.textLight, fontSize: '10px' }}>▾</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navItem('dashboard', '🏠 主页', 0)}

          {navGroup('orders', '📋 订单', <>
            {navItem('orders', '订单', pending, true)}
            {navItem('drafts', '草稿', 0, true)}
            {navItem('abandoned', '弃单', 0, true)}
          </>)}

          {navGroup('products', '🏷️ 产品', <>
            {navItem('products', '产品', 0, true)}
            {navItem('collections', '产品系列', 0, true)}
            {navItem('inventory', '库存', 0, true)}
            {navItem('purchase_orders', '采购订单', 0, true)}
            {navItem('transfers', '转移', 0, true)}
            {navItem('gift_cards', '礼品卡', 0, true)}
          </>)}

          {navGroup('customers', '👤 客户', <>
            {navItem('customers', '客户', 0, true)}
            {navItem('segments', '细分', 0, true)}
            {navItem('companies', '公司', 0, true)}
          </>)}

          {navItem('growth', '📈 增长', 0)}
          {navItem('discounts', '🏷️ 折扣', 0)}

          {navGroup('content', '📝 内容', <>
            {navItem('menus', '菜单', 0, true)}
            {navItem('files', '文件', 0, true)}
            {navItem('blog_posts', '博客文章', 0, true)}
          </>)}

          {navItem('markets', '🌍 Markets', 0)}
          {navItem('finance', '💰 财务', 0)}
          {navItem('analytics', '📊 分析', 0)}

          <div style={{ padding: '8px 16px 4px', fontSize: '11px', color: C.textLight, letterSpacing: '0.5px', marginTop: '4px', borderTop: `1px solid ${C.sidebarBorder}` }}>销售渠道</div>
          {navItem('online_store', '🛍️ 在线商店', 0)}
          {navItem('ai_agent', '🤖 智能体', 0)}

          <div style={{ padding: '8px 16px 4px', fontSize: '11px', color: C.textLight, letterSpacing: '0.5px', borderTop: `1px solid ${C.sidebarBorder}` }}>应用</div>
          {navItem('apps', '📦 应用', 0)}
        </div>

        <div style={{ borderTop: `1px solid ${C.sidebarBorder}`, padding: '8px 0' }}>
          {navItem('settings', '⚙️ 设置', 0)}
          <div style={{ padding: '8px 16px', fontSize: '12px', color: C.textLight, borderTop: `1px solid ${C.sidebarBorder}`, marginTop: '4px' }}>
            <div style={{ color: '#8b3fd4', marginBottom: '2px', cursor: 'pointer' }}>Sidekick 对话 &gt;</div>
            <div style={{ fontSize: '11px' }}>Adding products to your Sho...</div>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* 顶部栏 */}
        <div style={{ height: '56px', background: C.white, borderBottom: PURPLE.border, display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', flexShrink: 0, boxShadow: '0 2px 8px rgba(91,15,168,0.06)' }}>
          {subPage === 'add_product' || subPage === 'add_collection' ? (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '400px' }}>
                <span style={{ color: C.textLight }}>🔍</span>
                <span style={{ color: C.textMuted, fontSize: '14px' }}>未保存的{subPage === 'add_product' ? '产品' : '产品系列'}</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <Btn onClick={() => setSubPage('')}>放弃</Btn>
              <Btn primary>保存</Btn>
            </>
          ) : (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '480px' }}>
                <span style={{ color: C.textLight }}>🔍</span>
                <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="搜索" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '14px', width: '100%', color: C.text }} />
                <span style={{ color: C.textLight, fontSize: '12px' }}>⌘ K</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <div style={{ width: '32px', height: '32px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>🔔</div>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#5b0fa8,#8b3fd4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>A</div>
            </>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* 主页 */}
          {page === 'dashboard' && (
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px', color: C.text }}>主页</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
                <StatCard label="总产品数" value={products.length} color="#5b0fa8" />
                <StatCard label="报价申请" value={quotes.length} color="#8b3fd4" />
                <StatCard label="待跟进" value={pending} color="#d97706" />
                <StatCard label="转化率" value="34%" color="#007ace" />
              </div>
              <Card>
                <CardHeader title="最新报价申请" actionLabel="查看全部" action={() => setPage('orders')} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['客户', '邮箱', '产品', '状态', '时间'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                  <tbody>
                    {quotes.slice(0, 5).map(q => (
                      <tr key={q.id} onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ fontWeight: '500' }}>{q.name}</Td>
                        <Td style={{ color: C.textMuted }}>{q.email}</Td>
                        <Td><Badge status={q.product_type || '未指定'} /></Td>
                        <Td><Badge status={q.status} /></Td>
                        <Td style={{ color: C.textMuted }}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* 订单 */}
          {page === 'orders' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Orders</h1>
                <Btn>更多操作 ▾</Btn>
              </div>
              {quotes.length === 0
                ? <EmptyState icon="📋" title="您的订单将显示在此处" desc="您可以在此处为订单发货、收取付款以及跟踪订单进度。" btnText="创建订单" />
                : <Card>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                      {['全部', '待跟进', '已联系', '已成交'].map((t, i) => (
                        <div key={t} style={{ padding: '6px 14px', fontSize: '13px', cursor: 'pointer', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', background: i === 0 ? C.bg : C.white }}>
                          {t} <span style={{ background: C.border, padding: '1px 5px', borderRadius: '8px', fontSize: '11px' }}>
                            {[quotes.length, pending, quotes.filter(q => q.status === '已联系').length, quotes.filter(q => q.status === '已成交').length][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>{['客户', '联系方式', '产品', '状态', '时间', '操作'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                    <tbody>
                      {quotes.map(q => (
                        <tr key={q.id} onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Td><div style={{ fontWeight: '500' }}>{q.name}</div><div style={{ fontSize: '12px', color: C.textMuted }}>{q.zip_code}</div></Td>
                          <Td><div>{q.email}</div><div style={{ fontSize: '12px', color: C.textMuted }}>{q.phone}</div></Td>
                          <Td><Badge status={q.product_type || '未指定'} /></Td>
                          <Td>
                            <select value={q.status} onChange={async e => {
                              const s = e.target.value;
                              await fetch('https://window-server.onrender.com/api/quotes/' + q.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) });
                              setQuotes(quotes.map(x => x.id === q.id ? { ...x, status: s } : x));
                            }} style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '5px 10px', fontSize: '13px', cursor: 'pointer', outline: 'none', background: C.white }}>
                              <option>待跟进</option><option>已联系</option><option>已成交</option>
                            </select>
                          </Td>
                          <Td style={{ color: C.textMuted }}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</Td>
                          <Td><Btn style={{ padding: '5px 10px', fontSize: '12px' }}>详情</Btn></Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              }
            </div>
          )}

          {/* 草稿 */}
          {page === 'drafts' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Drafts</h1><EmptyState icon="📝" title="手动创建订单和发票" desc="使用草稿订单接收电话订单、通过电子邮件向客户发送发票，并收取付款。" btnText="创建草稿订单" /></div>}

          {/* 产品列表 */}
          {page === 'products' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Products</h1>
                <Btn>更多行动 ▾</Btn>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg, cursor: 'pointer' }}>全部 ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1, maxWidth: '300px' }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                  <button style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px', marginLeft: 'auto' }}>⊞</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['产品', '状态', '库存', '分类', '价格'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSubPage('add_product')}
                        onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td onClick={e => e.stopPropagation()}><input type="checkbox" /></Td>
                        <Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0 }}>
                              <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ color: '#5b0fa8', fontWeight: '500' }}>{p.name}</span>
                          </div>
                        </Td>
                        <Td><Badge status="已上架" /></Td>
                        <Td style={{ color: C.textMuted }}>有库存</Td>
                        <Td style={{ color: C.textMuted }}>{p.category}</Td>
                        <Td style={{ fontWeight: '500' }}>{p.price}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', color: C.textMuted }}>共 {products.length} 个产品</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <Btn style={{ padding: '5px 10px', fontSize: '12px' }}>上一页</Btn>
                    <Btn style={{ padding: '5px 10px', fontSize: '12px' }}>下一页</Btn>
                  </div>
                </div>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Btn primary onClick={() => setSubPage('add_product')}>添加产品</Btn>
                <Btn>导入</Btn>
              </div>
            </div>
          )}

          {/* 添加产品 */}
          {page === 'products' && subPage === 'add_product' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: '#8b3fd4', fontSize: '13px' }}>◎ 产品</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Add product</h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="标题"><Input value={np.name} onChange={v => setNp({ ...np, name: v })} placeholder="短袖T恤" /></Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                          <Toolbar />
                          <textarea value={np.description} onChange={e => setNp({ ...np, description: e.target.value })} rows={8}
                            style={{ width: '100%', border: 'none', outline: 'none', padding: '12px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', color: C.text, fontFamily: 'inherit' }} />
                        </div>
                      </Field>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="媒体文件" />
                    <div style={{ padding: '20px' }}>
                      <div style={{ border: `2px dashed ${C.border}`, borderRadius: '8px', padding: '40px', textAlign: 'center', background: C.bg, marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                          <Btn>上传新文件</Btn>
                          <Btn>选择现有文件</Btn>
                        </div>
                        <div style={{ fontSize: '12px', color: C.textMuted }}>支持图片、视频或 3D 模型</div>
                      </div>
                      <Field label="图片链接"><Input value={np.image} onChange={v => setNp({ ...np, image: v })} placeholder="https://..." /></Field>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="类别" sub="确定税率并添加元字段，以改进搜索、筛选和跨渠道销售">
                        <Select value={np.category} onChange={v => setNp({ ...np, category: v })} options={[{ v: '', l: '选择产品类别' }, '窗户', '门', '天窗']} />
                      </Field>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="价格" />
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <Field label="价格">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                            <span style={{ padding: '8px 12px', background: C.bg, color: C.textMuted, borderRight: `1px solid ${C.border}` }}>$</span>
                            <input value={np.price} onChange={e => setNp({ ...np, price: e.target.value })} placeholder="0.00" style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px' }} />
                          </div>
                        </Field>
                        <Field label="原价">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                            <span style={{ padding: '8px 12px', background: C.bg, color: C.textMuted, borderRight: `1px solid ${C.border}` }}>$</span>
                            <input placeholder="0.00" style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px' }} />
                          </div>
                        </Field>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['原价', '单价', '收取税款 是', '单件成本'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: '#5b0fa8', cursor: 'pointer', padding: '4px 10px', background: '#f0e8ff', borderRadius: '4px', border: '1px solid rgba(91,15,168,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>库存</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>已跟踪库存 <Toggle checked={true} /></label>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '8px 16px', background: C.bg, borderBottom: `1px solid ${C.border}`, fontSize: '13px', color: C.textMuted, fontWeight: '500' }}>
                          <span>数量</span><span>数量</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '12px 16px', alignItems: 'center' }}>
                          <span>Shop location</span>
                          <input defaultValue="0" style={{ width: '80px', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', fontSize: '14px', outline: 'none', textAlign: 'right' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['SKU', '条码', '缺货时继续销售 关闭'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: '#5b0fa8', cursor: 'pointer', padding: '4px 10px', background: '#f0e8ff', borderRadius: '4px', border: '1px solid rgba(91,15,168,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发货</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>实体产品 <Toggle checked={true} /></label>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="包装">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', alignItems: 'center' }}>
                            <span style={{ padding: '8px', background: C.bg, borderRight: `1px solid ${C.border}` }}>📦</span>
                            <select style={{ flex: 1, border: 'none', outline: 'none', padding: '8px', background: 'none', fontSize: '12px', cursor: 'pointer' }}>
                              <option>商店默认 · 样品箱 - 22 × 13.7 × 4.2 厘米，0 kg</option>
                            </select>
                          </div>
                        </Field>
                        <Field label="产品重量">
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input placeholder="0.0" style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none' }} />
                            <select style={{ width: '70px', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px', fontSize: '13px', outline: 'none', background: C.white }}>
                              <option>lb</option><option>kg</option>
                            </select>
                          </div>
                        </Field>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        {['原产国/地区', 'HS 编码'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: '#5b0fa8', cursor: 'pointer', padding: '4px 10px', background: '#f0e8ff', borderRadius: '4px', border: '1px solid rgba(91,15,168,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="多属性" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b0fa8', cursor: 'pointer' }}>
                        <span style={{ fontSize: '18px' }}>⊕</span> 添加尺寸或颜色等选项
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>搜索引擎列表</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>✏️</button>
                    </div>
                    <div style={{ padding: '0 20px 16px', fontSize: '13px', color: C.textMuted }}>添加标题和描述以查看此产品在搜索引擎列表中的显示效果。</div>
                  </Card>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                    <Btn onClick={() => setSubPage('')}>取消</Btn>
                    <Btn primary>保存产品</Btn>
                  </div>
                </div>

                <div>
                  <Card>
                    <CardHeader title="状态" />
                    <div style={{ padding: '16px' }}>
                      <Select value={np.status} onChange={v => setNp({ ...np, status: v })} options={['已上架', '草稿', '已下架']} />
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5b0fa8', fontSize: '13px' }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: C.textMuted }}>销售渠道</div>
                    <div style={{ padding: '0 16px 16px' }}>
                      {['在线商店', 'POS'].map(ch => (
                        <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>{ch}</span><span>🔒</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>产品组织</div>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <Field label="类型"><Input value={np.type} onChange={v => setNp({ ...np, type: v })} placeholder="无" /></Field>
                      <Field label="厂商"><Input value={np.vendor} onChange={v => setNp({ ...np, vendor: v })} placeholder="无" /></Field>
                      <Field label="产品系列">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#5b0fa8', cursor: 'pointer' }}>⊕ Add 产品系列</div>
                      </Field>
                      <Field label="标记">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#5b0fa8', cursor: 'pointer' }}>⊕ Add 标记</div>
                      </Field>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="模板样式" />
                    <div style={{ padding: '16px' }}>
                      <Select value="默认产品" onChange={() => {}} options={['默认产品']} />
                    </div>
                  </Card>
                </div>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: C.white, borderTop: `1px solid ${C.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Btn primary>保存</Btn>
              </div>
            </div>
          )}

          {/* 产品系列 */}
          {page === 'collections' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>产品系列</h1>
                <Btn primary onClick={() => setSubPage('add_collection')}>添加产品系列</Btn>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg }}>全部 ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['标题', '产品', '产品条件'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    {series.length === 0
                      ? <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: C.textMuted }}>暂无产品系列</td></tr>
                      : series.map(s => (
                        <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'} style={{ cursor: 'pointer' }}>
                          <Td><input type="checkbox" /></Td>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {s.image && <div style={{ width: '36px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0 }}><img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
                              <span style={{ color: '#5b0fa8', fontWeight: '500' }}>{s.name}</span>
                            </div>
                          </Td>
                          <Td style={{ color: C.textMuted }}>0</Td>
                          <Td style={{ color: C.textMuted }}>—</Td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* 添加产品系列 */}
          {page === 'collections' && subPage === 'add_collection' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: '#8b3fd4', fontSize: '13px' }}>◎ 产品系列</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>添加产品系列</h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="标题"><Input value={ns.name} onChange={v => setNs({ ...ns, name: v })} placeholder="例如，夏季产品系列、100 美元以下、官方推荐" /></Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                          <Toolbar />
                          <textarea value={ns.description} onChange={e => setNs({ ...ns, description: e.target.value })} rows={8}
                            style={{ width: '100%', border: 'none', outline: 'none', padding: '12px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', color: C.text, fontFamily: 'inherit' }} />
                        </div>
                      </Field>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="产品系列类型" />
                    <div style={{ padding: '16px 20px' }}>
                      {[{ v: 'manual', l: '手动', d: '将产品逐个添加到此产品系列。' }, { v: 'smart', l: '智能', d: '符合您所设条件的现有和未来产品将自动添加到此产品系列。' }].map(t => (
                        <label key={t.v} style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                          <input type="radio" name="type" value={t.v} checked={ns.type === t.v} onChange={() => setNs({ ...ns, type: t.v })} style={{ marginTop: '2px', accentColor: '#5b0fa8' }} />
                          <div>
                            <div style={{ fontWeight: '500', marginBottom: '4px' }}>{t.l}</div>
                            <div style={{ fontSize: '13px', color: C.textMuted }}>{t.d}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="产品" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                          <span style={{ color: C.textLight }}>🔍</span>
                          <input placeholder="搜索 产品" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                        </div>
                        <Btn>浏览</Btn>
                      </div>
                      <div style={{ textAlign: 'center', padding: '40px', color: C.textMuted }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏷️</div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>此产品系列中没有任何产品。</div>
                        <div style={{ fontSize: '13px' }}>搜索或浏览以添加产品。</div>
                      </div>
                    </div>
                  </Card>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                    <Btn onClick={() => setSubPage('')}>取消</Btn>
                    <Btn primary onClick={async () => {
                      const res = await fetch('https://window-server.onrender.com/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ns) });
                      if (res.ok) { const d = await res.json(); setSeries([...series, d.data || { ...ns, id: Date.now() }]); setNs({ name: '', description: '', image: '', type: 'manual' }); setSubPage(''); }
                    }}>保存</Btn>
                  </div>
                </div>
                <div>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5b0fa8', fontSize: '13px' }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      {['在线商店', 'POS'].map(ch => (
                        <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>{ch}</span><span>🔒</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="图片" />
                    <div style={{ padding: '16px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '32px', textAlign: 'center', background: C.bg, marginBottom: '12px' }}>
                        <Btn>添加图片</Btn>
                        <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '8px' }}>或拖放图片进行上传</div>
                      </div>
                      <Input value={ns.image} onChange={v => setNs({ ...ns, image: v })} placeholder="https://..." />
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="模板样式" />
                    <div style={{ padding: '16px' }}>
                      <Select value="默认产品系列" onChange={() => {}} options={['默认产品系列']} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* 空状态页面 */}
          {page === 'inventory' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Inventory</h1><EmptyState icon="🔍" title="未找到库存" desc="请尝试更改筛选条件或搜索词。" btnText="清除搜索和筛选条件" /></div>}
          {page === 'purchase_orders' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Purchase orders</h1><EmptyState icon="📦" title="管理您的采购订单" desc="跟踪和接收从供应商处订购的库存。" btnText="创建采购订单" /></div>}
          {page === 'transfers' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Transfers</h1><EmptyState icon="🔄" title="在不同地点之间移动库存" desc="在您的各个业务地点之间移动并跟踪库存。" btnText="创建转移" /></div>}
          {page === 'gift_cards' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Gift cards</h1><EmptyState icon="🎁" title="开始销售礼品卡" desc="添加要销售的礼品卡产品，或创建礼品卡并将其直接发送给您的客户。" btnText="创建礼品卡" btnText2="添加礼品卡产品" /></div>}
          {page === 'customers' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Customers</h1><EmptyState icon="👤" title="所有客户相关内容，尽在一处" desc="管理客户详细信息、查看客户订单历史记录，并将客户分组到不同的细分中。" btnText="添加客户" btnText2="导入客户" /></div>}
          {page === 'discounts' && <div><h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Discounts</h1><EmptyState icon="✂️" title="管理折扣和促销" desc="添加在结账时适用的折扣码和自动折扣。" btnText="创建折扣" /></div>}

          {/* 细分 */}
          {page === 'segments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Segments</h1>
                <Btn primary>创建细分</Btn>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px' }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索细分" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['名称', '客户百分比', '上次活动', '创建者'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    {['Customers who have purchased at least once', 'Email subscribers', 'Abandoned checkouts in the last 30 days', 'Customers who have purchased more than once', "Customers who haven't purchased"].map((seg, i) => (
                      <tr key={i} onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td><input type="checkbox" /></Td>
                        <Td style={{ color: '#5b0fa8', cursor: 'pointer' }}>{seg}</Td>
                        <Td style={{ color: C.textMuted }}>0%</Td>
                        <Td style={{ color: C.textMuted }}>创建于 2026年6月27日</Td>
                        <Td><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '20px', background: C.green, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '11px', color: '#fff' }}>S</span></div><span style={{ fontSize: '12px', color: C.textMuted }}>Shopify</span></div></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* 菜单 */}
          {page === 'menus' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Menus</h1>
                <div style={{ display: 'flex', gap: '8px' }}><Btn>URL 重定向</Btn><Btn primary>创建菜单</Btn></div>
              </div>
              <Card>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['菜单', '菜单项'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                  <tbody>
                    {[{ menu: 'Main menu', items: 'Home，Catalog，Contact' }, { menu: 'Footer menu', items: 'Search' }, { menu: 'Customer account main menu', items: 'Orders，Profile' }].map((m, i) => (
                      <tr key={i} onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ color: '#5b0fa8', cursor: 'pointer', fontWeight: '500' }}>{m.menu}</Td>
                        <Td style={{ color: C.textMuted }}>{m.items}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* Markets */}
          {page === 'markets' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Markets</h1>
                <div style={{ display: 'flex', gap: '8px' }}><Btn>⊞ 图表视图</Btn><Btn primary>创建市场</Btn></div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Card style={{ width: '200px', flexShrink: 0 }} padding="12px">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#f0e8ff', borderRadius: '6px', marginBottom: '8px', cursor: 'pointer' }}>
                    <span>📦</span><span style={{ fontSize: '13px' }}>商店默认设置</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer' }}>
                    <span style={{ color: C.textLight }}>+</span><span style={{ fontSize: '13px', color: C.textMuted }}>📁 区域</span>
                  </div>
                </Card>
                <Card style={{ flex: 1 }}>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px' }}>
                      <span style={{ color: C.textLight }}>🔍</span>
                      <input placeholder="在所有市场中搜索" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>{['市场', '状态', '包括', '自定义'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                    <tbody>
                      <tr onMouseEnter={e => e.currentTarget.style.background = '#faf8ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ color: '#5b0fa8', cursor: 'pointer' }}>🌐 China</Td>
                        <Td><Badge status="有效" /></Td>
                        <Td>🇨🇳 1 个区域</Td>
                        <Td></Td>
                      </tr>
                      {['United States', 'European Union'].map(m => (
                        <tr key={m} style={{ background: '#faf8ff' }}>
                          <Td><span style={{ color: '#5b0fa8', cursor: 'pointer' }}>✦ 创建 {m} 市场</span> <span style={{ color: '#5b0fa8' }}>+</span></Td>
                          <Td></Td><Td></Td>
                          <Td><span style={{ color: C.textMuted, cursor: 'pointer' }}>✕</span></Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          )}

          {/* 增长 */}
          {page === 'growth' && (
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>Growth</h1>
              <Card padding="20px">
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>自动开展营销活动</div>
                <p style={{ fontSize: '14px', color: C.textMuted, lineHeight: '1.6', marginBottom: '16px' }}>宣传活动 Autopilot 可在主要渠道推广您的产品，并不断优化策略，同时一切由您掌控。</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Btn primary>加入等候列表</Btn>
                  <Btn>详细了解</Btn>
                </div>
              </Card>
            </div>
          )}

          {/* 在线商店 */}
          {page === 'online_store' && (
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px' }}>在线商店</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                {[
                  { icon: '🎨', title: '主题', desc: '选择和自定义您的前端模板' },
                  { icon: '✏️', title: '自定义首页', desc: '编辑Hero图、标题、描述等内容' },
                  { icon: '🔗', title: '导航设置', desc: '管理网站导航菜单和链接' },
                  { icon: '🎯', title: '产品展示', desc: '设置首页热门产品和推荐' },
                  { icon: '📝', title: '博客文章', desc: '创建和管理博客内容' },
                  { icon: '⚙️', title: '偏好设置', desc: '网站标题、SEO和社交分享' },
                ].map((item, i) => (
                  <Card key={i} padding="24px" style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: C.text, marginBottom: '6px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: C.textMuted }}>{item.desc}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {['abandoned', 'companies', 'files', 'blog_posts', 'finance', 'analytics', 'ai_agent', 'apps', 'settings'].includes(page) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
              <Card padding="60px 40px" style={{ textAlign: 'center', maxWidth: '400px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
                <div style={{ fontSize: '18px', color: C.textMuted, fontWeight: '500' }}>正在开发中</div>
                <div style={{ fontSize: '13px', color: C.textLight, marginTop: '6px' }}>Coming Soon</div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

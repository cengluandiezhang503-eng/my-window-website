import { useState, useEffect } from 'react';

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
  sidebarActive: '#f6f6f7',
};

const badge = (status) => {
  const map = {
    '已上架': { bg: C.greenBg, c: C.greenText },
    '草稿': { bg: '#e4e5e7', c: '#4a4a4a' },
    '已下架': { bg: C.amber, c: C.amberText },
    '待跟进': { bg: C.amber, c: C.amberText },
    '已联系': { bg: C.greenBg, c: C.greenText },
    '已成交': { bg: C.blue, c: C.blueText },
    '有效': { bg: C.greenBg, c: C.greenText },
  };
  const s = map[status] || { bg: '#e4e5e7', c: '#4a4a4a' };
  return <span style={{ background: s.bg, color: s.c, padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>{status}</span>;
};

const Toggle = ({ checked }) => (
  <div style={{ width: '36px', height: '20px', background: checked ? '#008060' : '#e1e3e5', borderRadius: '10px', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
    <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '18px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
  </div>
);

const EmptyState = ({ icon, title, desc, btnText, onBtn, btnText2 }) => (
  <div style={{ background: C.white, borderRadius: '8px', border: `1px solid ${C.border}`, padding: '60px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: '80px', marginBottom: '16px', opacity: 0.7 }}>{icon}</div>
    <div style={{ fontSize: '16px', fontWeight: '600', color: C.text, marginBottom: '8px' }}>{title}</div>
    <div style={{ fontSize: '14px', color: C.textMuted, marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>{desc}</div>
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {btnText && <button onClick={onBtn} style={{ background: C.text, color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>{btnText}</button>}
      {btnText2 && <button style={{ background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px' }}>{btnText2}</button>}
    </div>
  </div>
);

export default function Admin() {
  const [page, setPage] = useState('dashboard');
  const [subPage, setSubPage] = useState('');
  const [expanded, setExpanded] = useState({ orders: true, products: true, customers: false, content: false });
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [series, setSeries] = useState([]);
  const [np, setNp] = useState({ name: '', description: '', price: '', category: '', image: '', status: '已上架', type: '', vendor: '', tags: '', sku: '', barcode: '', qty: '0', weight: '0.0' });
  const [ns, setNs] = useState({ name: '', description: '', image: '', type: 'manual' });
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/products').then(r => r.json()).then(setProducts).catch(() => {});
    fetch('https://window-server.onrender.com/api/quotes').then(r => r.json()).then(setQuotes).catch(() => {});
    fetch('https://window-server.onrender.com/api/series').then(r => r.json()).then(setSeries).catch(() => {});
  }, []);

  const pending = quotes.filter(q => q.status === '待跟进').length;

  const inp = (val, set, ph, type = 'text') => (
    <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={type}
      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white, fontFamily: 'inherit' }}
      onFocus={e => e.target.style.borderColor = C.purple}
      onBlur={e => e.target.style.borderColor = C.border} />
  );

  const sel = (val, set, opts) => (
    <select value={val} onChange={e => set(e.target.value)}
      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white, cursor: 'pointer' }}>
      {opts.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
    </select>
  );

  const Card = ({ children, style }) => (
    <div style={{ background: C.white, borderRadius: '8px', border: '1.5px solid rgba(139,92,246,0.7)', marginBottom: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 0 0 1px rgba(167,139,250,0.4), 0 4px 20px rgba(139,92,246,0.25), 0 1px 3px rgba(109,40,217,0.15), inset 0 1px 0 rgba(255,255,255,0.8)', ...style }}>{children}</div>
  );

  const CardHeader = ({ title, action, actionLabel, actionStyle }) => (
    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>{title}</div>
      {actionLabel && <button onClick={action} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple, fontSize: '14px', ...actionStyle }}>{actionLabel}</button>}
    </div>
  );

  const Field = ({ label, children, sub }) => (
    <div style={{ marginBottom: '16px' }}>
      {label && <label style={{ fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '6px', display: 'block' }}>{label}</label>}
      {children}
      {sub && <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '4px' }}>{sub}</div>}
    </div>
  );

  const BtnPrimary = ({ children, onClick, style }) => (
    <button onClick={onClick} style={{ background: C.text, color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', ...style }}>{children}</button>
  );

  const BtnSecondary = ({ children, onClick, style }) => (
    <button onClick={onClick} style={{ background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', ...style }}>{children}</button>
  );

  const Th = ({ children }) => (
    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', color: C.textMuted, fontWeight: '500', borderBottom: `1px solid ${C.border}`, background: C.bg, whiteSpace: 'nowrap' }}>{children}</th>
  );

  const Td = ({ children, style }) => (
    <td style={{ padding: '12px 16px', borderBottom: `1px solid #f1f2f3`, fontSize: '14px', color: C.text, ...style }}>{children}</td>
  );

  const navItem = (id, label, badge_count, indent = false) => {
    const on = page === id && subPage === '';
    return (
      <div onClick={() => { setPage(id); setSubPage(''); }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: indent ? '6px 12px 6px 36px' : '7px 12px', cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: on ? '#fff' : indent ? C.textLight : C.sidebarText, background: on ? C.sidebarActive : 'transparent', fontWeight: on ? '500' : '400' }}>
        <span style={{ flex: 1 }}>{label}</span>
        {badge_count > 0 && <span style={{ background: '#d82c0d', color: '#fff', fontSize: '11px', padding: '1px 6px', borderRadius: '10px', fontWeight: '600' }}>{badge_count}</span>}
      </div>
    );
  };

  const navGroup = (id, label, children, indent_children = []) => {
    const isActive = page === id || indent_children.includes(page);
    return (
      <>
        <div onClick={() => { setPage(id); setSubPage(''); setExpanded(e => ({ ...e, [id]: !e[id] })); }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: isActive ? '#fff' : C.sidebarText, background: isActive ? C.sidebarActive : 'transparent' }}>
          <span style={{ flex: 1 }}>{label}</span>
          <span style={{ fontSize: '10px', color: C.textLight }}>{expanded[id] ? '▾' : '▸'}</span>
        </div>
        {expanded[id] && children}
      </>
    );
  };

  const Toolbar = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderBottom: `1px solid ${C.border}`, background: C.white, flexWrap: 'wrap' }}>
      <select style={{ border: `1px solid ${C.border}`, borderRadius: '4px', padding: '3px 6px', fontSize: '13px', outline: 'none', background: C.white, cursor: 'pointer', marginRight: '4px' }}>
        <option>段落</option><option>标题1</option><option>标题2</option>
      </select>
      <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
      {[
        { t: 'B', s: { fontWeight: '700' } },
        { t: 'I', s: { fontStyle: 'italic' } },
        { t: 'U', s: { textDecoration: 'underline' } },
        { t: 'A', s: {}, color: true },
      ].map((b, i) => (
        <button key={i} title={b.t} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text, ...b.s }}>
          {b.t}{b.color && <span style={{ display: 'inline-block', width: '8px', height: '2px', background: '#e00', marginLeft: '1px', verticalAlign: 'bottom' }}></span>}
        </button>
      ))}
      <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>≡ ▾</button>
      <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
      {['🔗', '😊', '▶', '⊞'].map((b, i) => (
        <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 6px', borderRadius: '4px', fontSize: '14px' }}>{b}{i === 3 && <span style={{ fontSize: '10px' }}>▾</span>}</button>
      ))}
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '13px', color: C.text }}>•••</button>
      <div style={{ width: '1px', height: '18px', background: C.border, margin: '0 4px' }}></div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 7px', borderRadius: '4px', fontSize: '12px', color: C.text, fontFamily: 'monospace' }}>{'</>'}</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', fontSize: '14px', color: C.text }}>

      {/* 侧边栏 */}
      <div style={{ width: '240px', flexShrink: 0, background: "#fff", display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* 顶部品牌 */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.sidebarBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: C.purple, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: '700', flexShrink: 0 }}>W</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>我的窗户公司</div>
            <div style={{ fontSize: '11px', color: C.textLight }}>2026 年春季</div>
          </div>
          <span style={{ color: C.textLight, fontSize: '10px' }}>▾</span>
        </div>

        {/* 导航 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navItem('dashboard', '🏠 主页', 0)}

          {navGroup('orders', '📋 订单', <>
            {navItem('orders', '订单', pending, true)}
            {navItem('drafts', '草稿', 0, true)}
            {navItem('abandoned', '弃单', 0, true)}
          </>, ['drafts', 'abandoned'])}

          {navGroup('products', '🏷️ 产品', <>
            {navItem('products', '产品', 0, true)}
            {navItem('collections', '产品系列', 0, true)}
            {navItem('inventory', '库存', 0, true)}
            {navItem('purchase_orders', '采购订单', 0, true)}
            {navItem('transfers', '转移', 0, true)}
            {navItem('gift_cards', '礼品卡', 0, true)}
          </>, ['collections', 'inventory', 'purchase_orders', 'transfers', 'gift_cards'])}

          {navGroup('customers', '👤 客户', <>
            {navItem('customers', '客户', 0, true)}
            {navItem('segments', '细分', 0, true)}
            {navItem('companies', '公司', 0, true)}
          </>, ['segments', 'companies'])}

          {navItem('growth', '📈 增长', 0)}
          {navItem('discounts', '🏷️ 折扣', 0)}

          {navGroup('content', '📝 内容', <>
            {navItem('content', '内容', 0, true)}
            {navItem('meta_objects', '元对象', 0, true)}
            {navItem('files', '文件', 0, true)}
            {navItem('menus', '菜单', 0, true)}
            {navItem('blog_posts', '博客文章', 0, true)}
          </>, ['meta_objects', 'files', 'menus', 'blog_posts'])}

          {navItem('markets', '🌍 Markets', 0)}
          {navItem('finance', '💰 财务', 0)}
          {navItem('analytics', '📊 分析', 0)}

          <div style={{ padding: '12px 16px 4px', fontSize: '11px', color: C.textLight, letterSpacing: '0.5px', marginTop: '4px', borderTop: `1px solid ${C.sidebarBorder}` }}>销售渠道</div>
          {navItem('online_store', '🛍️ 在线商店', 0)}
          {navItem('ai_agent', '🤖 智能体', 0)}

          <div style={{ padding: '12px 16px 4px', fontSize: '11px', color: C.textLight, letterSpacing: '0.5px', marginTop: '4px', borderTop: `1px solid ${C.sidebarBorder}` }}>应用</div>
          {navItem('apps', '📦 应用', 0)}
        </div>

        {/* 底部 */}
        <div style={{ borderTop: `1px solid ${C.sidebarBorder}`, padding: '8px 0' }}>
          {navItem('settings', '⚙️ 设置', 0)}
          <div style={{ padding: '8px 12px', fontSize: '12px', color: C.textLight, borderTop: `1px solid ${C.sidebarBorder}`, marginTop: '4px' }}>
            <div style={{ marginBottom: '2px' }}>Sidekick 对话 &gt;</div>
            <div style={{ color: '#4a4a6a', fontSize: '11px' }}>Adding products to your Sho...</div>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* 顶部栏 */}
        <div style={{ height: '56px', background: C.white, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', flexShrink: 0 }}>
          {(subPage === 'add_product' || subPage === 'add_collection') ? (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '400px' }}>
                <span style={{ color: C.textLight }}>🔍</span>
                <span style={{ color: C.textMuted, fontSize: '14px' }}>未保存的{subPage === 'add_product' ? '产品' : '产品系列'}</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <BtnSecondary onClick={() => setSubPage('')}>放弃</BtnSecondary>
              <BtnPrimary>保存</BtnPrimary>
            </>
          ) : (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '480px' }}>
                <span style={{ color: C.textLight }}>🔍</span>
                <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="搜索" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '14px', width: '100%', color: C.text }} />
                <span style={{ color: C.textLight, fontSize: '12px' }}>⌘ K</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <div style={{ width: '32px', height: '32px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
                🔔
                {pending > 0 && <div style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: C.red, borderRadius: '50%', border: '2px solid white' }}></div>}
              </div>
              <div style={{ width: '32px', height: '32px', background: '#e91e8c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>MS4</div>
              <span style={{ fontSize: '13px', color: C.text }}>My Store 4</span>
            </>
          )}
        </div>

        {/* 页面内容 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* 主页 */}
          {page === 'dashboard' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>主页</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' }}>
                {[{ l: '总产品数', v: products.length, c: C.green }, { l: '报价申请', v: quotes.length, c: C.purple }, { l: '待跟进', v: pending, c: '#d97706' }, { l: '转化率', v: '34%', c: '#007ace' }].map((s, i) => (
                  <Card key={i} style={{ padding: '20px', borderTop: `3px solid ${s.c}`, marginBottom: 0 }}>
                    <div style={{ fontSize: '12px', color: C.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
                    <div style={{ fontSize: '28px', fontWeight: '600' }}>{s.v}</div>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader title="最新报价申请" actionLabel="查看全部" action={() => setPage('orders')} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['客户', '邮箱', '产品', '状态', '时间'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                  <tbody>
                    {quotes.slice(0, 5).map(q => (
                      <tr key={q.id} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ fontWeight: '500' }}>{q.name}</Td>
                        <Td style={{ color: C.textMuted }}>{q.email}</Td>
                        <Td>{badge(q.product_type || '未指定')}</Td>
                        <Td>{badge(q.status)}</Td>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Orders</h1>
                <BtnSecondary>更多操作 ▾</BtnSecondary>
              </div>
              {quotes.length === 0 ? (
                <EmptyState icon="📋" title="您的订单将显示在此处" desc="您可以在此处为订单发货、收取付款以及跟踪订单进度。" btnText="创建订单" />
              ) : (
                <Card>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '0', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', background: C.white }}>
                      {['全部', '待跟进', '已联系', '已成交'].map((t, i) => (
                        <div key={t} style={{ padding: '6px 14px', fontSize: '13px', cursor: 'pointer', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', background: i === 0 ? C.bg : C.white }}>
                          {t} <span style={{ background: C.border, padding: '1px 5px', borderRadius: '8px', fontSize: '11px' }}>
                            {i === 0 ? quotes.length : i === 1 ? pending : i === 2 ? quotes.filter(q => q.status === '已联系').length : quotes.filter(q => q.status === '已成交').length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>{['客户', '联系方式', '产品', '状态', '时间', '操作'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                    <tbody>
                      {quotes.map(q => (
                        <tr key={q.id} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Td>
                            <div style={{ fontWeight: '500' }}>{q.name}</div>
                            <div style={{ fontSize: '12px', color: C.textMuted }}>{q.zip_code}</div>
                          </Td>
                          <Td>
                            <div style={{ fontSize: '13px' }}>{q.email}</div>
                            <div style={{ fontSize: '12px', color: C.textMuted }}>{q.phone}</div>
                          </Td>
                          <Td>{badge(q.product_type || '未指定')}</Td>
                          <Td>
                            <select value={q.status} onChange={async e => {
                              const s = e.target.value;
                              await fetch('https://window-server.onrender.com/api/quotes/' + q.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) });
                              setQuotes(quotes.map(x => x.id === q.id ? { ...x, status: s } : x));
                            }} style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '5px 10px', fontSize: '13px', cursor: 'pointer', outline: 'none', background: C.white }}>
                              <option>待跟进</option><option>已联系</option><option>已成交</option>
                            </select>
                          </Td>
                          <Td style={{ color: C.textMuted, fontSize: '13px' }}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</Td>
                          <Td><BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }}>详情</BtnSecondary></Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              )}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解订单</span>
              </div>
            </div>
          )}

          {/* 草稿 */}
          {page === 'drafts' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Drafts</h1>
              <EmptyState icon="📝" title="手动创建订单和发票" desc="使用草稿订单接收电话订单、通过电子邮件向客户发送发票，并收取付款。" btnText="创建草稿订单" />
              <div style={{ textAlign: 'center', marginTop: '16px' }}><span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解创建草稿订单</span></div>
            </div>
          )}

          {/* 产品列表 */}
          {page === 'products' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Products</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary>更多行动 ▾</BtnSecondary>
                </div>
              </div>
              {products.length === 0 ? (
                <EmptyState icon="👕" title="添加您的产品" desc="先为您的商店补充客户喜欢的产品" btnText="添加产品" onBtn={() => setSubPage('add_product')} btnText2="导入" />
              ) : (
                <Card>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', background: C.white, marginRight: '8px' }}>
                      <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg, borderRight: `1px solid ${C.border}`, cursor: 'pointer' }}>全部 ▾</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1, maxWidth: '300px' }}>
                      <span style={{ color: C.textLight }}>🔍</span>
                      <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                      <button style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>⊞</button>
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>
                      <th style={{ padding: '10px 16px', width: '32px' }}><input type="checkbox" /></th>
                      {['产品', '状态', '库存', '分类', '价格'].map(h => <Th key={h}>{h}</Th>)}
                    </tr></thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSubPage('add_product')}
                          onMouseEnter={e => e.currentTarget.style.background = C.bg}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Td onClick={e => e.stopPropagation()}><input type="checkbox" /></Td>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0, background: C.bg }}>
                                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <span style={{ color: C.purple, fontWeight: '500' }}>{p.name}</span>
                            </div>
                          </Td>
                          <Td>{badge('已上架')}</Td>
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
                      <BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }}>上一页</BtnSecondary>
                      <BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }}>下一页</BtnSecondary>
                    </div>
                  </div>
                </Card>
              )}
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <BtnPrimary onClick={() => setSubPage('add_product')} style={{ marginRight: '8px' }}>添加产品</BtnPrimary>
                <BtnSecondary>导入</BtnSecondary>
              </div>
            </div>
          )}

          {/* 添加产品 */}
          {page === 'products' && subPage === 'add_product' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: C.text, fontSize: '16px' }}>◎</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Add product</h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '16px 20px' }}>
                      <Field label="标题">{inp(np.name, v => setNp({ ...np, name: v }), '短袖T恤')}</Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                          <Toolbar />
                          <textarea value={np.description} onChange={e => setNp({ ...np, description: e.target.value })} rows={8}
                            style={{ width: '100%', border: 'none', outline: 'none', padding: '12px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', color: C.text, fontFamily: 'inherit' }} />
                        </div>
                      </Field>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="媒体文件" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ border: `2px dashed ${C.border}`, borderRadius: '8px', padding: '40px 20px', textAlign: 'center', background: C.bg }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                          <BtnSecondary>上传新文件</BtnSecondary>
                          <BtnSecondary>选择现有文件</BtnSecondary>
                        </div>
                        <div style={{ fontSize: '12px', color: C.textMuted }}>支持图片、视频或 3D 模型</div>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <Field label="图片链接">{inp(np.image, v => setNp({ ...np, image: v }), 'https://...')}</Field>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px' }}>
                      <Field label="类别" sub="确定税率并添加元字段，以改进搜索、筛选和跨渠道销售">
                        {sel(np.category, v => setNp({ ...np, category: v }), [{ v: '', l: '选择产品类别' }, '窗户', '门', '天窗'])}
                      </Field>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="价格" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <Field label="价格">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
                            <span style={{ padding: '8px 12px', background: C.bg, color: C.textMuted, borderRight: `1px solid ${C.border}` }}>$</span>
                            <input value={np.price} onChange={e => setNp({ ...np, price: e.target.value })} placeholder="0.00" style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit' }} />
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
                          <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '4px', border: `1px solid #c4caf6` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>库存</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                        已跟踪库存 <Toggle checked={true} />
                      </label>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '8px 16px', background: C.bg, borderBottom: `1px solid ${C.border}`, fontSize: '13px', color: C.textMuted, fontWeight: '500' }}>
                          <span>数量</span><span>数量</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '12px 16px', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px' }}>Shop location</span>
                          <input defaultValue="0" style={{ width: '80px', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', fontSize: '14px', outline: 'none', textAlign: 'right' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['SKU', '条码', '缺货时继续销售 关闭'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '4px', border: `1px solid #c4caf6` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发货</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                        实体产品 <Toggle checked={true} />
                      </label>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="包装">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', alignItems: 'center' }}>
                            <span style={{ padding: '8px', background: C.bg, borderRight: `1px solid ${C.border}` }}>📦</span>
                            <select style={{ flex: 1, border: 'none', outline: 'none', padding: '8px', background: 'none', fontSize: '13px', cursor: 'pointer' }}>
                              <option>商店默认 · 样品箱 - 22 × 13.7 × 4.2 厘米，0 kg</option>
                            </select>
                          </div>
                        </Field>
                        <Field label="产品重量">
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input placeholder="0.0" style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none' }} />
                            <select style={{ width: '70px', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '8px', fontSize: '13px', outline: 'none', background: C.white }}>
                              <option>lb</option><option>kg</option><option>g</option>
                            </select>
                          </div>
                        </Field>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {['原产国/地区', 'HS 编码'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '4px', border: `1px solid #c4caf6` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="多属性" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.purple, cursor: 'pointer', fontSize: '14px' }}>
                        <span style={{ fontSize: '18px' }}>⊕</span> 添加尺寸或颜色等选项
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>产品元字段</div>
                      <BtnSecondary style={{ fontSize: '12px', padding: '5px 10px' }}>添加定义</BtnSecondary>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '4px', border: `1px solid #c4caf6` }}>+ 披露信息</span>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>搜索引擎列表</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '16px' }}>✏️</button>
                    </div>
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: C.textMuted }}>
                      添加标题和描述以查看此产品在搜索引擎列表中的显示效果。
                    </div>
                  </Card>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                    <BtnSecondary onClick={() => setSubPage('')}>取消</BtnSecondary>
                    <BtnPrimary>保存产品</BtnPrimary>
                  </div>
                </div>

                {/* 右边栏 */}
                <div>
                  <Card>
                    <CardHeader title="状态" />
                    <div style={{ padding: '16px' }}>
                      {sel(np.status, v => setNp({ ...np, status: v }), ['已上架', '草稿', '已下架'])}
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple, fontSize: '13px' }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: C.textMuted }}>销售渠道</div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>在线商店</span>
                        <span style={{ fontSize: '16px' }}>🔒</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
                        <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>POS</span>
                        <span style={{ fontSize: '16px' }}>🔒</span>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>产品组织</div>
                      <span style={{ fontSize: '14px', color: C.textMuted, cursor: 'pointer' }}>ⓘ</span>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <Field label="类型">{inp(np.type, v => setNp({ ...np, type: v }), '无')}</Field>
                      <Field label="厂商">{inp(np.vendor, v => setNp({ ...np, vendor: v }), '无')}</Field>
                      <Field label="产品系列">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: C.purple, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>⊕</span> Add 产品系列
                        </div>
                      </Field>
                      <Field label="标记">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: C.purple, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>⊕</span> Add 标记
                        </div>
                      </Field>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="模板样式" />
                    <div style={{ padding: '16px' }}>
                      {sel('默认产品', () => {}, ['默认产品'])}
                    </div>
                  </Card>
                </div>
              </div>

              {/* 底部保存 */}
              <div style={{ position: 'sticky', bottom: 0, background: C.white, borderTop: `1px solid ${C.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary>保存</BtnPrimary>
              </div>
            </div>
          )}

          {/* 产品系列列表 */}
          {page === 'collections' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>产品系列</h1>
                <BtnPrimary onClick={() => setSubPage('add_collection')}>添加产品系列</BtnPrimary>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', background: C.white, marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg, borderRight: `1px solid ${C.border}`, cursor: 'pointer' }}>全部 ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                  <button style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>⊞</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px' }}><input type="checkbox" /></th>
                    {['标题', '产品', '产品条件'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    {series.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: C.textMuted }}>暂无产品系列</td></tr>
                    ) : series.map(s => (
                      <tr key={s.id} style={{ cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = C.bg}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td><input type="checkbox" /></Td>
                        <Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0, background: C.bg }}>
                              {s.image && <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <span style={{ color: C.purple, fontWeight: '500' }}>{s.name}</span>
                          </div>
                        </Td>
                        <Td style={{ color: C.textMuted }}>0</Td>
                        <Td style={{ color: C.textMuted }}>—</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解产品系列</span>
              </div>
            </div>
          )}

          {/* 添加产品系列 */}
          {page === 'collections' && subPage === 'add_collection' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: C.text, fontSize: '16px' }}>◎</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>添加产品系列</h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '16px 20px' }}>
                      <Field label="标题">{inp(ns.name, v => setNs({ ...ns, name: v }), '例如，夏季产品系列、100 美元以下、官方推荐')}</Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }}>
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
                      <label style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input type="radio" name="type" value="manual" checked={ns.type === 'manual'} onChange={() => setNs({ ...ns, type: 'manual' })} style={{ marginTop: '2px', accentColor: C.green }} />
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>手动</div>
                          <div style={{ fontSize: '13px', color: C.textMuted }}>将产品逐个添加到此产品系列。详细了解<span style={{ color: C.purple, cursor: 'pointer' }}>手动产品系列</span>。</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
                        <input type="radio" name="type" value="smart" checked={ns.type === 'smart'} onChange={() => setNs({ ...ns, type: 'smart' })} style={{ marginTop: '2px', accentColor: C.green }} />
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>智能</div>
                          <div style={{ fontSize: '13px', color: C.textMuted }}>符合您所设条件的现有和未来产品将自动添加到此产品系列。详细了解<span style={{ color: C.purple, cursor: 'pointer' }}>智能产品系列</span>。</div>
                        </div>
                      </label>
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
                        <BtnSecondary>浏览</BtnSecondary>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', color: C.textMuted }}>排序：</span>
                          <select style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', fontSize: '13px', outline: 'none', background: C.white }}>
                            <option>最相关</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '40px 20px', color: C.textMuted }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏷️</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>此产品系列中没有任何产品。</div>
                        <div style={{ fontSize: '13px' }}>搜索或浏览以添加产品。</div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>搜索引擎列表</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '16px' }}>✏️</button>
                    </div>
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: C.textMuted }}>
                      添加标题和描述以查看此产品系列在搜索引擎列表中的显示效果。
                    </div>
                  </Card>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                    <BtnSecondary onClick={() => setSubPage('')}>取消</BtnSecondary>
                    <BtnPrimary onClick={async () => {
                      const res = await fetch('https://window-server.onrender.com/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ns) });
                      if (res.ok) { const d = await res.json(); setSeries([...series, d.data || { ...ns, id: Date.now() }]); setNs({ name: '', description: '', image: '', type: 'manual' }); setSubPage(''); }
                    }}>保存</BtnPrimary>
                  </div>
                </div>

                <div>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple, fontSize: '13px' }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 4px', fontSize: '13px', color: C.textMuted }}>销售渠道</div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: '16px' }}>○</span><span style={{ flex: 1, fontSize: '13px' }}>在线商店</span>
                        <span style={{ fontSize: '16px' }}>🔒</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
                        <span style={{ fontSize: '16px' }}>○</span><span style={{ flex: 1, fontSize: '13px' }}>POS</span>
                        <span style={{ fontSize: '16px' }}>🔒</span>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="图片" />
                    <div style={{ padding: '16px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '40px 20px', textAlign: 'center', background: C.bg }}>
                        <BtnSecondary>添加图片</BtnSecondary>
                        <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '8px' }}>或拖放图片进行上传</div>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        {inp(ns.image, v => setNs({ ...ns, image: v }), 'https://...')}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <CardHeader title="模板样式" />
                    <div style={{ padding: '16px' }}>
                      {sel('默认产品系列', () => {}, ['默认产品系列'])}
                    </div>
                  </Card>
                </div>
              </div>

              <div style={{ position: 'sticky', bottom: 0, background: C.white, borderTop: `1px solid ${C.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary>保存</BtnPrimary>
              </div>
            </div>
          )}

          {/* 库存 */}
          {page === 'inventory' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Inventory</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary>导出</BtnSecondary>
                  <BtnSecondary>导入</BtnSecondary>
                </div>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '0', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg, borderRight: `1px solid ${C.border}` }}>All ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                  <button style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>⊞</button>
                </div>
                <div style={{ padding: '60px', textAlign: 'center', color: C.textMuted }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>未找到库存</div>
                  <div style={{ fontSize: '13px', marginBottom: '16px' }}>请尝试更改筛选条件或搜索词。</div>
                  <BtnPrimary>清除搜索和筛选条件</BtnPrimary>
                </div>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解管理库存</span>
              </div>
            </div>
          )}

          {/* 采购订单 */}
          {page === 'purchase_orders' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Purchase orders</h1>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '0', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.bg }}>全部 ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                  <button style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', fontSize: '16px' }}>⊞</button>
                </div>
                <EmptyState icon="📦" title="管理您的采购订单" desc="跟踪和接收从供应商处订购的库存。" btnText="创建采购订单" />
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解采购订单</span>
              </div>
            </div>
          )}

          {/* 转移 */}
          {page === 'transfers' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Transfers</h1>
              <EmptyState icon="🔄" title="在不同地点之间移动库存" desc="在您的各个业务地点之间移动并跟踪库存。" btnText="创建转移" />
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解转移</span>
              </div>
            </div>
          )}

          {/* 礼品卡 */}
          {page === 'gift_cards' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gift cards</h1>
                <BtnSecondary>导出</BtnSecondary>
              </div>
              <EmptyState icon="🎁" title="开始销售礼品卡" desc="添加要销售的礼品卡产品，或创建礼品卡并将其直接发送给您的客户。" btnText="创建礼品卡" btnText2="添加礼品卡产品" />
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解礼品卡</span>
              </div>
            </div>
          )}

          {/* 客户 */}
          {page === 'customers' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Customers</h1>
              <EmptyState icon="👤" title="所有客户相关内容，尽在一处" desc="管理客户详细信息、查看客户订单历史记录，并将客户分组到不同的细分中。" btnText="添加客户" btnText2="导入客户" />
              <div style={{ padding: '20px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', marginTop: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>通过应用获取客户</div>
                <div style={{ fontSize: '13px', color: C.textMuted, marginBottom: '12px' }}>通过将潜在客户捕获表单添加到您的商店和营销活动中来扩充您的客户列表。</div>
                <BtnSecondary>查看应用推荐</BtnSecondary>
              </div>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解客户</span>
              </div>
            </div>
          )}

          {/* 细分 */}
          {page === 'segments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Segments</h1>
                <BtnPrimary>创建细分</BtnPrimary>
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
                    <th style={{ padding: '10px 16px', width: '32px' }}><input type="checkbox" /></th>
                    {['名称', '客户百分比', '上次活动', '创建者'].map(h => <Th key={h}>{h}</Th>)}
                    <th style={{ padding: '10px 16px' }}></th>
                  </tr></thead>
                  <tbody>
                    {['Customers who have purchased at least once', 'Email subscribers', 'Abandoned checkouts in the last 30 days', 'Customers who have purchased more than once', "Customers who haven't purchased"].map((seg, i) => (
                      <tr key={i} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td><input type="checkbox" /></Td>
                        <Td style={{ color: C.purple, cursor: 'pointer' }}>{seg}</Td>
                        <Td style={{ color: C.textMuted }}>0%</Td>
                        <Td style={{ color: C.textMuted }}>创建于 2026年6月27日</Td>
                        <Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '20px', height: '20px', background: C.green, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '12px', color: '#fff' }}>S</span>
                            </div>
                            <span style={{ fontSize: '12px', color: C.textMuted }}>Shopify</span>
                          </div>
                        </Td>
                        <Td><button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>•••</button></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解细分</span>
              </div>
            </div>
          )}

          {/* 折扣 */}
          {page === 'discounts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Discounts</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary>↑ 导出</BtnSecondary>
                  <BtnPrimary>创建折扣</BtnPrimary>
                </div>
              </div>
              <EmptyState icon="✂️" title="管理折扣和促销" desc="添加在结账时适用的折扣码和自动折扣。您还可以将折扣与原价搭配使用。" btnText="创建折扣" />
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解折扣</span>
              </div>
            </div>
          )}

          {/* 内容/菜单 */}
          {page === 'menus' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Menus</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary>URL 重定向</BtnSecondary>
                  <BtnPrimary>创建菜单</BtnPrimary>
                </div>
              </div>
              <Card>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['菜单', '菜单项'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                  <tbody>
                    {[{ menu: 'Main menu', items: 'Home，Catalog，Contact' }, { menu: 'Footer menu', items: 'Search' }, { menu: 'Customer account main menu', items: 'Orders，Profile' }].map((m, i) => (
                      <tr key={i} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ color: C.purple, cursor: 'pointer', fontWeight: '500' }}>{m.menu}</Td>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Markets</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary>⊞ 图表视图</BtnSecondary>
                  <BtnPrimary>创建市场</BtnPrimary>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '200px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: C.bg, borderRadius: '6px', marginBottom: '8px', cursor: 'pointer' }}>
                    <span>📦</span><span style={{ fontSize: '13px' }}>商店默认设置</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer' }}>
                    <span style={{ color: C.textLight }}>+</span>
                    <span style={{ fontSize: '13px', color: C.textMuted }}>📁 区域</span>
                  </div>
                </div>
                <Card style={{ flex: 1 }}>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', flex: 1 }}>
                      <span style={{ color: C.textLight }}>🔍</span>
                      <input placeholder="在所有市场 中搜索" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>{['市场', '状态', '包括', '自定义'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                    <tbody>
                      <tr>
                        <Td style={{ color: C.purple, cursor: 'pointer' }}>🌐 China</Td>
                        <Td>{badge('有效')}</Td>
                        <Td>🇨🇳 1 个区域</Td>
                        <Td></Td>
                      </tr>
                      <tr style={{ background: '#f0f1ff' }}>
                        <Td><span style={{ color: C.purple, cursor: 'pointer' }}>✦ 创建 United States 市场</span> <span style={{ color: C.purple }}>+</span></Td>
                        <Td></Td><Td></Td>
                        <Td><span style={{ color: C.textMuted, cursor: 'pointer' }}>✕</span></Td>
                      </tr>
                      <tr style={{ background: '#f0f1ff' }}>
                        <Td><span style={{ color: C.purple, cursor: 'pointer' }}>✦ 创建 European Union 市场</span> <span style={{ color: C.purple }}>+</span></Td>
                        <Td></Td><Td></Td>
                        <Td><span style={{ color: C.textMuted, cursor: 'pointer' }}>✕</span></Td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解市场</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* 增长 */}
          {page === 'growth' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Growth</h1>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>ℹ️</span>
                <span style={{ fontSize: '13px', color: C.textMuted, flex: 1 }}>"增长"是宣传活动、归因和宣传活动 Autopilot 的新主页。<span style={{ color: C.purple, cursor: 'pointer' }}>详细了解</span></span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>✕</button>
              </div>
              <Card style={{ padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'inline-block', background: '#f0f1ff', color: C.purple, fontSize: '12px', padding: '3px 8px', borderRadius: '4px', marginBottom: '12px' }}>抢先体验</div>
                    <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>自动开展营销活动</h2>
                    <p style={{ fontSize: '14px', color: C.textMuted, maxWidth: '400px', lineHeight: '1.6' }}>宣传活动 Autopilot 可在主要渠道推广您的产品，并不断优化策略，同时一切由您掌控。</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <BtnPrimary>加入等候列表</BtnPrimary>
                      <BtnSecondary>详细了解</BtnSecondary>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 默认空状态页面 */}
          {['abandoned', 'companies', 'content', 'meta_objects', 'files', 'blog_posts', 'finance', 'analytics', 'online_store', 'ai_agent', 'apps', 'settings'].includes(page) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <div style={{ fontSize: '18px', color: C.textMuted, fontWeight: '500' }}>正在开发中</div>
              <div style={{ fontSize: '13px', color: C.textLight, marginTop: '6px' }}>Coming Soon</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

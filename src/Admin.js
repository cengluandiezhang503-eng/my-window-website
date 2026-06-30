import React, { useState, useEffect } from 'react';
import AdminSettings from './AdminSettings';
import RichEditor from './RichEditor';

const PURPLE = {
  border: 'rgba(139,63,212,0.6)',
  shadow: '0 0 0 1px rgba(192,132,252,0.4), 0 4px 24px rgba(91,15,168,0.15), 0 8px 32px rgba(58,8,117,0.1), inset 0 1px 0 rgba(192,132,252,0.3)',
  main: '#5c6ac4',
  light: '#8B3FD4',
};

const C = {
  bg: '#f6f6f7',
  white: '#fff',
  border: '#e1e3e5',
  text: '#202223',
  textMuted: '#6d7175',
  textLight: '#8c9196',
  green: '#008060',
  greenBg: '#d1fae5',
  greenText: '#065f46',
  red: '#d72c0d',
  amber: '#fef3c7',
  amberText: '#92400e',
  blue: '#dbeafe',
  blueText: '#1e40af',
  purple: '#5c6ac4',
};

const cardStyle = {
  background: C.white,
  borderRadius: '12px',
  border: `1.5px solid ${PURPLE.border}`,
  marginBottom: '16px',
  boxShadow: PURPLE.shadow,
  overflow: 'hidden',
};

const Icons = {
  home: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 1.293a1 1 0 00-1.414 0L1.586 9H3v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9h1.414L10.707 1.293z"/></svg>,
  orders: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd"/></svg>,
  products: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"/></svg>,
  customers: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>,
  growth: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>,
  discounts: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>,
  content: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>,
  markets: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>,
  finance: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>,
  analytics: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  store: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/><path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  ai: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v1a1 1 0 11-2 0v-1zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd"/></svg>,
  apps: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>,
  drag: <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M7 2a2 2 0 110 4 2 2 0 010-4zM7 8a2 2 0 110 4 2 2 0 010-4zM7 14a2 2 0 110 4 2 2 0 010-4zM13 2a2 2 0 110 4 2 2 0 010-4zM13 8a2 2 0 110 4 2 2 0 010-4zM13 14a2 2 0 110 4 2 2 0 010-4z"/></svg>,
};

const Badge = ({ status }) => {
  const map = {
    '已上架': { bg: C.greenBg, c: C.greenText },
    '草稿': { bg: '#f3f4f6', c: '#4a4a4a' },
    '已下架': { bg: C.amber, c: C.amberText },
    '待跟进': { bg: C.amber, c: C.amberText },
    '已联系': { bg: C.greenBg, c: C.greenText },
    '已成交': { bg: C.blue, c: C.blueText },
    '有效': { bg: C.greenBg, c: C.greenText },
    '可见': { bg: C.greenBg, c: C.greenText },
  };
  const s = map[status] || { bg: '#f3f4f6', c: '#4a4a4a' };
  return <span style={{ background: s.bg, color: s.c, padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>{status}</span>;
};

const Toggle = ({ checked }) => (
  <div style={{ width: '36px', height: '20px', background: checked ? C.green : '#e1e3e5', borderRadius: '10px', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
    <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '18px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
  </div>
);

const EmptyState = ({ icon, title, desc, btnText, onBtn, btnText2 }) => (
  <div style={{ ...cardStyle, padding: '60px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: '72px', marginBottom: '16px', opacity: 0.7 }}>{icon}</div>
    <div style={{ fontSize: '16px', fontWeight: '600', color: C.text, marginBottom: '8px' }}>{title}</div>
    <div style={{ fontSize: '14px', color: C.textMuted, marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>{desc}</div>
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {btnText && <button onClick={onBtn} style={{ background: C.text, color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>{btnText}</button>}
      {btnText2 && <button style={{ background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px' }}>{btnText2}</button>}
    </div>
  </div>
);

function Inp({ val, set, ph }) {
  return (
    <input
      value={val}
      onChange={e => set(e.target.value)}
      placeholder={ph}
      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white }} />
  );
}

function Sel({ val, set, opts }) {
  return (
    <select value={val} onChange={e => set(e.target.value)}
      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: C.text, background: C.white, cursor: 'pointer' }}>
      {opts.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
    </select>
  );
}

function Card({ children, style }) {
  return <div style={{ ...cardStyle, ...style }}>{children}</div>;
}

function CardHeader({ title, action, actionLabel }) {
  return (
    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>{title}</div>
      {actionLabel && <button onClick={action} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple, fontSize: '14px' }}>{actionLabel}</button>}
    </div>
  );
}

function Field({ label, children, sub }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && <label style={{ fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '6px', display: 'block' }}>{label}</label>}
      {children}
      {sub && <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function BtnPrimary({ children, onClick, style }) {
  return <button onClick={onClick} style={{ background: C.text, color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', ...style }}>{children}</button>;
}

function BtnSecondary({ children, onClick, style }) {
  return <button onClick={onClick} style={{ background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', ...style }}>{children}</button>;
}

function Th({ children }) {
  return <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '13px', color: C.textMuted, fontWeight: '500', borderBottom: `1px solid ${C.border}`, background: '#fafafa', whiteSpace: 'nowrap' }}>{children}</th>;
}

function Td({ children, style }) {
  return <td style={{ padding: '12px 16px', borderBottom: `1px solid #f1f2f3`, fontSize: '14px', color: C.text, ...style }}>{children}</td>;
}

export default function Admin() {
  const [page, setPage] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [subPage, setSubPage] = useState('');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [expanded, setExpanded] = useState({ orders: true, products: true, customers: false, content: true, online_store: false });
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [series, setSeries] = useState([]);
  const [np, setNp] = useState({ name: '', description: '', price: '', category: '', image: '', status: '已上架', type: '', vendor: '', tags: '' });
  const [ns, setNs] = useState({ name: '', description: '', image: '', type: 'manual' });
  const [searchVal, setSearchVal] = useState('');

  const menus = [
    { id: 1, name: 'Main menu', handle: 'main-menu', items: ['Home', 'Catalog', 'Contact'] },
    { id: 2, name: 'Footer menu', handle: 'footer-menu', items: ['Search'] },
    { id: 3, name: 'Customer account main menu', handle: 'customer-account-main-menu', items: ['Orders', 'Profile'] },
  ];

  useEffect(() => {
    fetch('https://window-server.onrender.com/api/products').then(r => r.json()).then(setProducts).catch(() => {});
    fetch('https://window-server.onrender.com/api/quotes').then(r => r.json()).then(setQuotes).catch(() => {});
    fetch('https://window-server.onrender.com/api/series').then(r => r.json()).then(setSeries).catch(() => {});
  }, []);

  const pending = quotes.filter(q => q.status === '待跟进').length;

  const navItem = (id, label, icon, badge_count = 0, indent = false, customClick) => {
    const on = page === id && subPage === '' && !selectedMenu;
    return (
      <div onClick={() => { if (customClick) { customClick(); } else { setPage(id); setSubPage(''); setSelectedMenu(null); } }}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: indent ? '6px 12px 6px 40px' : '7px 14px', cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: on ? C.text : indent ? C.textMuted : C.text, background: on ? C.bg : 'transparent', fontWeight: on ? '500' : '400' }}>
        {!indent && <span style={{ color: on ? C.text : C.textMuted, display: 'flex' }}>{icon}</span>}
        <span style={{ flex: 1 }}>{label}</span>
        {badge_count > 0 && <span style={{ background: '#d82c0d', color: '#fff', fontSize: '11px', padding: '1px 6px', borderRadius: '10px', fontWeight: '600' }}>{badge_count}</span>}
      </div>
    );
  };

  const navGroup = (id, label, icon, children, subIds = []) => {
    const isActive = page === id || subIds.includes(page);
    return (
      <>
        <div onClick={() => { setPage(id); setSubPage(''); setSelectedMenu(null); setExpanded(e => ({ ...e, [id]: !e[id] })); }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', cursor: 'pointer', borderRadius: '6px', margin: '1px 6px', fontSize: '13px', color: C.text, background: isActive ? C.bg : 'transparent', fontWeight: isActive ? '500' : '400' }}>
          <span style={{ color: isActive ? C.text : C.textMuted, display: 'flex' }}>{icon}</span>
          <span style={{ flex: 1 }}>{label}</span>
          <span style={{ fontSize: '10px', color: C.textMuted }}>{expanded[id] ? '▾' : '▸'}</span>
        </div>
        {expanded[id] && children}
      </>
    );
  };

  if (showSettings) return <AdminSettings onBack={() => { setShowSettings(false); setPage('dashboard'); }} />;

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.white, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', fontSize: '14px', color: C.text }}>

      <div style={{ width: '240px', flexShrink: 0, background: C.white, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${PURPLE.main}, ${PURPLE.light})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: '700', flexShrink: 0 }}>W</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>我的窗户公司</div>
            <div style={{ fontSize: '11px', color: C.textMuted }}>2026 年春季</div>
          </div>
          <span style={{ color: C.textMuted, fontSize: '10px' }}>▾</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {navItem('dashboard', '主页', Icons.home)}
          {navGroup('orders', '订单', Icons.orders, <>
            {navItem('orders', '订单', null, pending, true)}
            {navItem('drafts', '草稿', null, 0, true)}
            {navItem('abandoned', '弃单', null, 0, true)}
          </>, ['drafts', 'abandoned'])}
          {navGroup('products', '产品', Icons.products, <>
            {navItem('products', '产品', null, 0, true)}
            {navItem('collections', '产品系列', null, 0, true)}
            {navItem('inventory', '库存', null, 0, true)}
            {navItem('purchase_orders', '采购订单', null, 0, true)}
            {navItem('transfers', '转移', null, 0, true)}
            {navItem('gift_cards', '礼品卡', null, 0, true)}
          </>, ['collections', 'inventory', 'purchase_orders', 'transfers', 'gift_cards'])}
          {navGroup('customers', '客户', Icons.customers, <>
            {navItem('customers', '客户', null, 0, true)}
            {navItem('segments', '细分', null, 0, true)}
            {navItem('companies', '公司', null, 0, true)}
          </>, ['segments', 'companies'])}
          {navItem('growth', '增长', Icons.growth)}
          {navItem('discounts', '折扣', Icons.discounts)}
          {navGroup('content', '内容', Icons.content, <>
            {navItem('meta_objects', '元对象', null, 0, true)}
            {navItem('files', '文件', null, 0, true)}
            {navItem('menus', '菜单', null, 0, true)}
            {navItem('blog_posts', '博客文章', null, 0, true)}
          </>, ['meta_objects', 'files', 'menus', 'blog_posts'])}
          {navItem('markets', 'Markets', Icons.markets)}
          {navItem('finance', '财务', Icons.finance)}
          {navItem('analytics', '分析', Icons.analytics)}

          <div style={{ padding: '8px 14px 4px', fontSize: '11px', color: C.textMuted, letterSpacing: '0.3px', marginTop: '4px', borderTop: `1px solid ${C.border}` }}>销售渠道</div>
          {navGroup('online_store', '在线商店', Icons.store, <>
            {navItem('pages', '页面', null, 0, true)}
            {navItem('preferences', '偏好设置', null, 0, true)}
          </>, ['pages', 'preferences'])}
          {navItem('ai_agent', '智能体', Icons.ai)}

          <div style={{ padding: '8px 14px 4px', fontSize: '11px', color: C.textMuted, letterSpacing: '0.3px', marginTop: '4px', borderTop: `1px solid ${C.border}` }}>应用</div>
          {navItem('apps', '应用', Icons.apps)}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, padding: '6px 0' }}>
          {navItem('settings', '设置', Icons.settings, 0, false, () => setShowSettings(true))}
          <div style={{ padding: '8px 14px', fontSize: '12px', color: C.textMuted, borderTop: `1px solid ${C.border}`, marginTop: '4px' }}>
            <div style={{ marginBottom: '2px', cursor: 'pointer' }}>Sidekick 对话 &gt;</div>
            <div style={{ color: C.textLight, fontSize: '11px' }}>Adding products to your Sho...</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '56px', background: C.white, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', flexShrink: 0 }}>
          {(subPage === 'add_product' || subPage === 'add_collection') ? (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '400px' }}>
                <span style={{ color: C.textLight, fontSize: '13px' }}>🔍</span>
                <span style={{ color: C.textMuted }}>未保存的{subPage === 'add_product' ? '产品' : '产品系列'}</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <BtnSecondary onClick={() => setSubPage('')}>放弃</BtnSecondary>
              <BtnPrimary onClick={() => {}}>保存</BtnPrimary>
            </>
          ) : (
            <>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '7px 12px', maxWidth: '480px' }}>
                <span style={{ color: C.textLight }}>🔍</span>
                <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="搜索" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '14px', width: '100%', color: C.text }} />
                <span style={{ color: C.textLight, fontSize: '12px' }}>⌘ K</span>
              </div>
              <div style={{ flex: 1 }}></div>
              <div style={{ width: '32px', height: '32px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                🔔
                {pending > 0 && <div style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: C.red, borderRadius: '50%', border: '2px solid white' }}></div>}
              </div>
              <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${PURPLE.main}, ${PURPLE.light})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>MS4</div>
              <span style={{ fontSize: '13px' }}>My Store 4</span>
            </>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: C.bg }}>

          {page === 'dashboard' && (
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>主页</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' }}>
                {[{ l: '总产品数', v: products.length, c: PURPLE.main }, { l: '报价申请', v: quotes.length, c: '#059669' }, { l: '待跟进', v: pending, c: '#d97706' }, { l: '转化率', v: '34%', c: '#007ace' }].map((s, i) => (
                  <Card key={i} style={{ padding: '20px', marginBottom: 0, borderTop: `3px solid ${s.c}` }}>
                    <div style={{ fontSize: '12px', color: C.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
                    <div style={{ fontSize: '28px', fontWeight: '600', color: s.c }}>{s.v}</div>
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

          {page === 'orders' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Orders</h1>
                <BtnSecondary onClick={() => {}}>更多操作 ▾</BtnSecondary>
              </div>
              {quotes.length === 0 ? <EmptyState icon="📋" title="您的订单将显示在此处" desc="您可以在此处为订单发货、收取付款以及跟踪订单进度。" btnText="创建订单" /> : (
                <Card>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                      {['全部', '待跟进', '已联系', '已成交'].map((t, i) => (
                        <div key={t} style={{ padding: '6px 14px', fontSize: '13px', cursor: 'pointer', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', background: C.white, color: i === 0 ? C.text : C.textMuted }}>
                          {t} <span style={{ background: C.bg, padding: '1px 5px', borderRadius: '8px', fontSize: '11px' }}>
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
                        <tr key={q.id} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Td><div style={{ fontWeight: '500' }}>{q.name}</div><div style={{ fontSize: '12px', color: C.textMuted }}>{q.zip_code}</div></Td>
                          <Td><div>{q.email}</div><div style={{ fontSize: '12px', color: C.textMuted }}>{q.phone}</div></Td>
                          <Td><Badge status={q.product_type || '未指定'} /></Td>
                          <Td>
                            <select value={q.status} onChange={async e => {
                              const s = e.target.value;
                              await fetch('https://window-server.onrender.com/api/quotes/' + q.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) });
                              setQuotes(quotes.map(x => x.id === q.id ? { ...x, status: s } : x));
                            }} style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 10px', fontSize: '13px', cursor: 'pointer', outline: 'none', background: C.white }}>
                              <option>待跟进</option><option>已联系</option><option>已成交</option>
                            </select>
                          </Td>
                          <Td style={{ color: C.textMuted }}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</Td>
                          <Td><BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => {}}>详情</BtnSecondary></Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              )}
            </div>
          )}

          {page === 'drafts' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Drafts</h1><EmptyState icon="📝" title="手动创建订单和发票" desc="使用草稿订单接收电话订单、通过电子邮件向客户发送发票，并收取付款。" btnText="创建草稿订单" /></div>}

          {page === 'products' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Products</h1>
                <BtnSecondary onClick={() => {}}>更多行动 ▾</BtnSecondary>
              </div>
              {products.length === 0 ? <EmptyState icon="📦" title="添加您的产品" desc="先为您的商店补充客户喜欢的产品" btnText="添加产品" onBtn={() => setSubPage('add_product')} btnText2="导入" /> : (
                <Card>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginRight: '8px' }}>
                      <div style={{ padding: '6px 12px', fontSize: '13px', background: C.white, cursor: 'pointer' }}>全部 ▾</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 12px', flex: 1, maxWidth: '300px', background: C.white }}>
                      <span style={{ color: C.textLight }}>🔍</span>
                      <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <button style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>⊞</button>
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr>
                      <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                      {['产品', '状态', '库存', '分类', '价格', '操作'].map(h => <Th key={h}>{h}</Th>)}
                    </tr></thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSubPage('add_product')}
                          onMouseEnter={e => e.currentTarget.style.background = C.bg}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Td onClick={e => e.stopPropagation()}><input type="checkbox" /></Td>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0 }}>
                                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <span style={{ color: C.purple, fontWeight: '500' }}>{p.name}</span>
                            </div>
                          </Td>
                          <Td><Badge status="已上架" /></Td>
                          <Td style={{ color: C.textMuted }}>有库存</Td>
                          <Td style={{ color: C.textMuted }}>{p.category}</Td>
                          <Td style={{ fontWeight: '500' }}>{p.price}</Td>
                          <Td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={e => { e.stopPropagation(); setNp({ name: p.name, description: p.description || '', price: p.price || '', category: p.category || '', image: p.image || '', status: '已上架', type: '', vendor: '', tags: '' }); setSubPage('add_product'); }} style={{ background: 'white', color: '#202223', border: '1px solid #e1e3e5', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>编辑</button>
                              <button onClick={async e => { e.stopPropagation(); if (window.confirm('确定删除？')) { const r = await fetch('https://window-server.onrender.com/api/products/' + p.id, { method: 'DELETE' }); if (r.ok) setProducts(prev => prev.filter(x => x.id !== p.id)); } }} style={{ background: 'white', color: '#d72c0d', border: '1px solid #d72c0d', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>删除</button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: C.textMuted }}>共 {products.length} 个产品</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => {}}>上一页</BtnSecondary>
                      <BtnSecondary style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => {}}>下一页</BtnSecondary>
                    </div>
                  </div>
                </Card>
              )}
              <div style={{ textAlign: 'center', marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <BtnPrimary onClick={() => setSubPage('add_product')}>添加产品</BtnPrimary>
                <BtnSecondary onClick={() => {}}>导入</BtnSecondary>
              </div>
            </div>
          )}

          {page === 'products' && subPage === 'add_product' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: C.purple }}>◎</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Add product</h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="标题"><Inp val={np.name} set={v => setNp(prev => ({ ...prev, name: v }))} ph="短袖T恤" /></Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                          <RichEditor value={np.description} onChange={html => setNp(prev => ({ ...prev, description: html }))} placeholder="输入产品描述..." />
                        </div>
                      </Field>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="媒体文件" />
                    <div style={{ padding: '20px' }}>
                      <div style={{ border: `2px dashed ${C.border}`, borderRadius: '8px', padding: '40px 20px', textAlign: 'center', background: C.bg }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                          <BtnSecondary onClick={() => {}}>上传新文件</BtnSecondary>
                          <BtnSecondary onClick={() => {}}>选择现有文件</BtnSecondary>
                        </div>
                        <div style={{ fontSize: '12px', color: C.textMuted }}>支持图片、视频或 3D 模型</div>
                      </div>
                      <div style={{ marginTop: '12px' }}><Field label="图片链接"><Inp val={np.image} set={v => setNp(prev => ({ ...prev, image: v }))} ph="https://..." /></Field></div>
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="类别" sub="确定税率并添加元字段，以改进搜索、筛选和跨渠道销售">
                        <Sel val={np.category} set={v => setNp(prev => ({ ...prev, category: v }))} opts={[{ v: '', l: '选择产品类别' }, '窗户', '门', '天窗']} />
                      </Field>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="价格" />
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <Field label="价格">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                            <span style={{ padding: '8px 12px', background: C.bg, color: C.textMuted, borderRight: `1px solid ${C.border}` }}>$</span>
                            <input value={np.price} onChange={e => setNp(prev => ({ ...prev, price: e.target.value }))} placeholder="0.00" style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px' }} />
                          </div>
                        </Field>
                        <Field label="原价">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                            <span style={{ padding: '8px 12px', background: C.bg, color: C.textMuted, borderRight: `1px solid ${C.border}` }}>$</span>
                            <input placeholder="0.00" style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px' }} />
                          </div>
                        </Field>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['原价', '单价', '收取税款 是', '单件成本'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '6px', border: '1px solid #c4caf6' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>库存</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>已跟踪库存 <Toggle checked={true} /></label>
                    </div>
                    <div style={{ padding: '0 20px 20px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '8px 16px', background: '#fafafa', borderBottom: `1px solid ${C.border}`, fontSize: '13px', color: C.textMuted, fontWeight: '500' }}>
                          <span>数量</span><span>数量</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '12px 16px', alignItems: 'center' }}>
                          <span>Shop location</span>
                          <input defaultValue="0" style={{ width: '80px', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 10px', fontSize: '14px', outline: 'none', textAlign: 'right' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['SKU', '条码', '缺货时继续销售 关闭'].map(t => (
                          <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '6px', border: '1px solid #c4caf6' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发货</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>实体产品 <Toggle checked={true} /></label>
                    </div>
                    <div style={{ padding: '0 20px 20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="包装">
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', alignItems: 'center' }}>
                            <span style={{ padding: '8px', background: C.bg, borderRight: `1px solid ${C.border}` }}>📦</span>
                            <select style={{ flex: 1, border: 'none', outline: 'none', padding: '8px', background: 'none', fontSize: '13px' }}><option>商店默认 · 样品箱 - 22 × 13.7 × 4.2 厘米，0 kg</option></select>
                          </div>
                        </Field>
                        <Field label="产品重量">
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input placeholder="0.0" style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none' }} />
                            <select style={{ width: '70px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px', fontSize: '13px', outline: 'none', background: C.white }}><option>lb</option><option>kg</option></select>
                          </div>
                        </Field>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['原产国/地区', 'HS 编码'].map(t => <span key={t} style={{ fontSize: '13px', color: C.purple, cursor: 'pointer', padding: '4px 10px', background: '#f0f1ff', borderRadius: '6px', border: '1px solid #c4caf6' }}>{t}</span>)}
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="多属性" />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.purple, cursor: 'pointer' }}>
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
                    <BtnSecondary onClick={() => setSubPage('')}>取消</BtnSecondary>
                    <BtnPrimary onClick={async () => {
                      const res = await fetch('https://window-server.onrender.com/api/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: np.name, description: np.description, price: np.price, category: np.category, image: np.image })
                      });
                      const saved = await res.json();
                      setProducts(prev => [...prev, saved]);
                      setNp({ name: '', description: '', price: '', category: '', image: '', status: '已上架', type: '', vendor: '', tags: '' });
                      setSubPage('');
                    }}>保存产品</BtnPrimary>
                  </div>
                </div>
                <div>
                  <Card><CardHeader title="状态" /><div style={{ padding: '16px' }}><Sel val={np.status} set={v => setNp(prev => ({ ...prev, status: v }))} opts={['已上架', '草稿', '已下架']} /></div></Card>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      {['在线商店', 'POS'].map((ch, i) => (
                        <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                          <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>{ch}</span><span>🔒</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="产品组织" />
                    <div style={{ padding: '16px' }}>
                      <Field label="类型"><Inp val={np.type} set={v => setNp(prev => ({ ...prev, type: v }))} ph="无" /></Field>
                      <Field label="厂商"><Inp val={np.vendor} set={v => setNp(prev => ({ ...prev, vendor: v }))} ph="无" /></Field>
                      <Field label="产品系列"><div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: C.purple, cursor: 'pointer' }}>⊕ Add 产品系列</div></Field>
                      <Field label="标记"><div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: C.purple, cursor: 'pointer' }}>⊕ Add 标记</div></Field>
                    </div>
                  </Card>
                  <Card><CardHeader title="模板样式" /><div style={{ padding: '16px' }}><Sel val="默认产品" set={() => {}} opts={['默认产品']} /></div></Card>
                </div>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: C.white, borderTop: `1px solid ${C.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => {}}>保存</BtnPrimary>
              </div>
            </div>
          )}

          {page === 'collections' && subPage === '' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>产品系列</h1>
                <BtnPrimary onClick={() => setSubPage('add_collection')}>添加产品系列</BtnPrimary>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginRight: '8px' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.white, cursor: 'pointer' }}>全部 ▾</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 12px', flex: 1, background: C.white }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索和筛选" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                  <button style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 10px', fontSize: '16px' }}>⊞</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['标题', '产品', '产品条件'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    {series.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: C.textMuted }}>暂无产品系列</td></tr>
                    ) : series.map(s => (
                      <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td><input type="checkbox" /></Td>
                        <Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.border}`, background: C.bg }}>
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
            </div>
          )}

          {page === 'collections' && subPage === 'add_collection' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span onClick={() => setSubPage('')} style={{ cursor: 'pointer', color: C.purple }}>◎</span>
                <span style={{ color: C.textMuted }}>›</span>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>添加产品系列</h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
                <div>
                  <Card>
                    <div style={{ padding: '20px' }}>
                      <Field label="标题"><Inp val={ns.name} set={v => setNs(prev => ({ ...prev, name: v }))} ph="例如，夏季产品系列" /></Field>
                      <Field label="描述">
                        <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                          <RichEditor value={ns.description} onChange={html => setNs(prev => ({ ...prev, description: html }))} placeholder="输入系列描述..." />
                        </div>
                      </Field>
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="产品系列类型" />
                    <div style={{ padding: '20px' }}>
                      {[{ v: 'manual', l: '手动', desc: '将产品逐个添加到此产品系列。详细了解手动产品系列。' }, { v: 'smart', l: '智能', desc: '符合您所设条件的现有和未来产品将自动添加到此产品系列。详细了解智能产品系列。' }].map(t => (
                        <label key={t.v} style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                          <input type="radio" name="type" value={t.v} checked={ns.type === t.v} onChange={() => setNs(prev => ({ ...prev, type: t.v }))} style={{ marginTop: '2px', accentColor: C.green }} />
                          <div><div style={{ fontWeight: '500', marginBottom: '4px' }}>{t.l}</div><div style={{ fontSize: '13px', color: C.textMuted }}>{t.desc}</div></div>
                        </label>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="产品" />
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 12px', flex: 1, background: C.white }}>
                          <span style={{ color: C.textLight }}>🔍</span>
                          <input placeholder="搜索 产品" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                        </div>
                        <BtnSecondary onClick={() => {}}>浏览</BtnSecondary>
                        <select style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 12px', fontSize: '13px', outline: 'none', background: C.white }}><option>排序：最相关</option></select>
                      </div>
                      <div style={{ textAlign: 'center', padding: '40px', color: C.textMuted }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏷️</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>此产品系列中没有任何产品。</div>
                        <div style={{ fontSize: '13px' }}>搜索或浏览以添加产品。</div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>搜索引擎列表</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>✏️</button>
                    </div>
                    <div style={{ padding: '0 20px 16px', fontSize: '13px', color: C.textMuted }}>添加标题和描述以查看此产品系列在搜索引擎列表中的显示效果。</div>
                  </Card>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                    <BtnSecondary onClick={() => setSubPage('')}>取消</BtnSecondary>
                    <BtnPrimary onClick={async () => {
                      const res = await fetch('https://window-server.onrender.com/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ns) });
                      if (res.ok) { const d = await res.json(); setSeries(prev => [...prev, d.data || { ...ns, id: Date.now() }]); setNs({ name: '', description: '', image: '', type: 'manual' }); setSubPage(''); }
                    }}>保存</BtnPrimary>
                  </div>
                </div>
                <div>
                  <Card>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>发布</div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.purple }}>管理</button>
                    </div>
                    <div style={{ padding: '0 16px 4px', fontSize: '13px', color: C.textMuted }}>销售渠道</div>
                    <div style={{ padding: '0 16px 16px' }}>
                      {['在线商店', 'POS'].map((ch, i) => (
                        <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                          <span>○</span><span style={{ flex: 1, fontSize: '13px' }}>{ch}</span><span>🔒</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader title="图片" />
                    <div style={{ padding: '16px' }}>
                      <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', padding: '40px 20px', textAlign: 'center', background: C.bg }}>
                        <BtnSecondary onClick={() => {}}>添加图片</BtnSecondary>
                        <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '8px' }}>或拖放图片进行上传</div>
                      </div>
                      <div style={{ marginTop: '12px' }}><Inp val={ns.image} set={v => setNs(prev => ({ ...prev, image: v }))} ph="https://..." /></div>
                    </div>
                  </Card>
                  <Card><CardHeader title="模板样式" /><div style={{ padding: '16px' }}><Sel val="默认产品系列" set={() => {}} opts={['默认产品系列']} /></div></Card>
                </div>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: C.white, borderTop: `1px solid ${C.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => {}}>保存</BtnPrimary>
              </div>
            </div>
          )}

          {page === 'menus' && !selectedMenu && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Menus</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <BtnSecondary onClick={() => {}}>URL 重定向</BtnSecondary>
                  <BtnPrimary onClick={() => {}}>创建菜单</BtnPrimary>
                </div>
              </div>
              <Card>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['菜单', '菜单项'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                  <tbody>
                    {menus.map(m => (
                      <tr key={m.id} style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedMenu(m)}
                        onMouseEnter={e => e.currentTarget.style.background = C.bg}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td style={{ color: C.purple, fontWeight: '500' }}>{m.name}</Td>
                        <Td style={{ color: C.textMuted }}>{m.items.join('，')}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解菜单</span>
              </div>
            </div>
          )}

          {page === 'menus' && selectedMenu && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: C.textMuted, cursor: 'pointer' }} onClick={() => setSelectedMenu(null)}>
                    {Icons.menu}
                  </div>
                  <span style={{ color: C.textMuted }}>›</span>
                  <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>{selectedMenu.name}</h1>
                </div>
                <BtnSecondary onClick={() => {}}>复制</BtnSecondary>
              </div>

              <Card>
                <div style={{ padding: '20px' }}>
                  <Field label="名称">
                    <input defaultValue={selectedMenu.name} style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </Field>
                  <div style={{ fontSize: '13px', color: C.textMuted }}>名称：{selectedMenu.handle}</div>
                </div>
              </Card>

              <Card>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>菜单项</div>
                </div>
                <div style={{ padding: '8px 0' }}>
                  {selectedMenu.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderBottom: i < selectedMenu.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ color: C.textMuted, cursor: 'grab' }}>{Icons.drag}</div>
                      <span style={{ flex: 1, fontSize: '14px' }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.purple, cursor: 'pointer', fontSize: '14px' }}>
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>⊕</span>
                      <span>添加菜单项</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '14px' }}>保存</button>
              </div>
            </div>
          )}

          {page === 'pages' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Pages</h1>
                <BtnPrimary onClick={() => {}}>添加页面</BtnPrimary>
              </div>
              <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>商店访问受限。</div>
                  <div style={{ fontSize: '13px', color: C.textMuted, marginBottom: '8px' }}>只有拥有密码的访客才能访问您的在线商店。</div>
                  <BtnSecondary style={{ fontSize: '13px', padding: '5px 12px' }} onClick={() => {}}>管理访问权限</BtnSecondary>
                </div>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ padding: '6px 12px', fontSize: '13px', background: C.white, cursor: 'pointer' }}>全部</div>
                    <div style={{ padding: '6px 8px', borderLeft: `1px solid ${C.border}`, cursor: 'pointer', color: C.textMuted }}>+</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '16px' }}>🔍</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '16px' }}>⚙️</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '16px' }}>↕️</button>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['标题', '可见性', '内容', '更新时间'].map(h => <Th key={h}>{h}</Th>)}
                  </tr></thead>
                  <tbody>
                    <tr onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <Td><input type="checkbox" /></Td>
                      <Td style={{ color: C.purple, fontWeight: '500', cursor: 'pointer' }}>Contact</Td>
                      <Td><Badge status="可见" /></Td>
                      <Td style={{ color: C.textMuted }}></Td>
                      <Td style={{ color: C.textMuted, fontSize: '13px' }}>星期六 19:14</Td>
                    </tr>
                  </tbody>
                </table>
              </Card>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: C.purple, cursor: 'pointer' }}>详细了解 页面</span>
              </div>
            </div>
          )}

          {page === 'customers' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Customers</h1><EmptyState icon="👤" title="所有客户相关内容，尽在一处" desc="管理客户详细信息、查看客户订单历史记录，并将客户分组到不同的细分中。" btnText="添加客户" btnText2="导入客户" /></div>}
          {page === 'segments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Segments</h1>
                <BtnPrimary onClick={() => {}}>创建细分</BtnPrimary>
              </div>
              <Card>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 12px', background: C.white }}>
                    <span style={{ color: C.textLight }}>🔍</span>
                    <input placeholder="搜索细分" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }} />
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '10px 16px', width: '32px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><input type="checkbox" /></th>
                    {['名称', '客户百分比', '上次活动', '创建者'].map(h => <Th key={h}>{h}</Th>)}
                    <th style={{ padding: '10px 16px', background: '#fafafa', borderBottom: `1px solid ${C.border}` }}></th>
                  </tr></thead>
                  <tbody>
                    {['Customers who have purchased at least once', 'Email subscribers', 'Abandoned checkouts in the last 30 days', 'Customers who have purchased more than once', "Customers who haven't purchased"].map((seg, i) => (
                      <tr key={i} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Td><input type="checkbox" /></Td>
                        <Td style={{ color: C.purple, cursor: 'pointer' }}>{seg}</Td>
                        <Td style={{ color: C.textMuted }}>0%</Td>
                        <Td style={{ color: C.textMuted }}>创建于 2026年6月27日</Td>
                        <Td><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '20px', background: C.green, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '12px', color: '#fff' }}>S</span></div><span style={{ fontSize: '12px', color: C.textMuted }}>Shopify</span></div></Td>
                        <Td><button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>•••</button></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {page === 'discounts' && <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Discounts</h1><div style={{ display: 'flex', gap: '8px' }}><BtnSecondary onClick={() => {}}>↑ 导出</BtnSecondary><BtnPrimary onClick={() => {}}>创建折扣</BtnPrimary></div></div><EmptyState icon="✂️" title="管理折扣和促销" desc="添加在结账时适用的折扣码和自动折扣。" btnText="创建折扣" /></div>}
          {page === 'growth' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Growth</h1><Card><div style={{ padding: '40px', textAlign: 'center' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div><div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>自动开展营销活动</div><div style={{ fontSize: '13px', color: C.textMuted, marginBottom: '16px' }}>宣传活动 Autopilot 可在主要渠道推广您的产品。</div><BtnPrimary onClick={() => {}}>加入等候列表</BtnPrimary></div></Card></div>}
          {page === 'markets' && <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Markets</h1><BtnPrimary onClick={() => {}}>创建市场</BtnPrimary></div><Card><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr>{['市场', '状态', '包括', '自定义'].map(h => <Th key={h}>{h}</Th>)}</tr></thead><tbody><tr onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><Td style={{ color: C.purple }}>🌐 China</Td><Td><Badge status="有效" /></Td><Td>🇨🇳 1 个区域</Td><Td></Td></tr></tbody></table></Card></div>}
          {page === 'inventory' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Inventory</h1><EmptyState icon="🔍" title="未找到库存" desc="请尝试更改筛选条件或搜索词。" btnText="清除搜索和筛选条件" /></div>}
          {page === 'purchase_orders' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Purchase orders</h1><EmptyState icon="📦" title="管理您的采购订单" desc="跟踪和接收从供应商处订购的库存。" btnText="创建采购订单" /></div>}
          {page === 'transfers' && <div><h1 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px' }}>Transfers</h1><EmptyState icon="🔄" title="在不同地点之间移动库存" desc="在您的各个业务地点之间移动并跟踪库存。" btnText="创建转移" /></div>}
          {page === 'gift_cards' && <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Gift cards</h1><BtnSecondary onClick={() => {}}>导出</BtnSecondary></div><EmptyState icon="🎁" title="开始销售礼品卡" desc="添加要销售的礼品卡产品，或创建礼品卡并将其直接发送给您的客户。" btnText="创建礼品卡" btnText2="添加礼品卡产品" /></div>}

          {['abandoned', 'companies', 'meta_objects', 'files', 'blog_posts', 'finance', 'analytics', 'online_store', 'preferences', 'ai_agent', 'apps'].includes(page) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
              <Card style={{ padding: '60px 40px', textAlign: 'center', minWidth: '300px' }}>
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

import { useState } from 'react';

const C = {
  border: '#e1e3e5',
  text: '#202223',
  textMuted: '#6d7175',
  textLight: '#8c9196',
  bg: '#f6f6f7',
  white: '#fff',
  purple: '#5c6ac4',
  green: '#008060',
};


const Icons = {
  general: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>,
  plan: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>,
  billing: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" clipRule="evenodd"/></svg>,
  payments: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" clipRule="evenodd"/></svg>,
  checkout: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/><path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  customer_accounts: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>,
  shipping: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707l-3-3A1 1 0 0016 4H3z"/></svg>,
  taxes: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/></svg>,
  locations: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>,
  apps: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
  sales_channels: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.998.523-1.907 1.318-2.418A5 5 0 1010 5a5 5 0 012.318 8.581C13.477 14.093 13.985 15.002 14 16H12z"/></svg>,
  domains: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>,
  customer_events: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>,
  notifications: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>,
  metafields: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>,
  languages: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.554-.6 19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-3.754 1 1 0 111.924-.558c.29.997.718 1.927 1.25 2.77a17.116 17.116 0 001.104-3.197H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd"/></svg>,
  privacy: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>,
  policies: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>,
};

export default function AdminSettings({ onBack }) {
  const [activeSetting, setActiveSetting] = useState('customer_events');
  const [activePixelTab, setActivePixelTab] = useState('app');

  const navItem = (id, label) => {
    const on = activeSetting === id;
    return (
      <div onClick={() => setActiveSetting(id)}
        style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 14px', cursor:'pointer', borderRadius:'6px', margin:'1px 6px', fontSize:'13px', color: on ? C.text : C.text, background: on ? C.bg : 'transparent', fontWeight: on ? '500' : '400' }}>
        <span style={{ color: on ? C.text : C.textMuted, display:'flex', flexShrink:0 }}>{Icons[id] || Icons.general}</span>
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div style={{ display:'flex', height:'100vh', background: C.white, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', fontSize:'14px', color: C.text }}>

      {/* 设置侧边栏 */}
      <div style={{ width:'260px', flexShrink:0, background: C.white, borderRight:`1px solid ${C.border}`, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* 顶部账号 */}
        <div style={{ padding:'16px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:'12px', color: C.textMuted, marginBottom:'12px', fontWeight:'500', textTransform:'uppercase', letterSpacing:'0.5px' }}>组织</div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
            <div style={{ width:'32px', height:'32px', background:'linear-gradient(135deg,#667eea,#764ba2)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'#fff', fontWeight:'700', flexShrink:0 }}>C</div>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'600' }}>Cengluandiezhang</div>
              <div style={{ fontSize:'11px', color: C.textMuted }}>2 家商店</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px', flexDirection:'column', paddingLeft:'42px' }}>
            {navItem('users', '用户')}
            {navItem('billing', '账单')}
          </div>
        </div>

        {/* 商店选择 */}
        <div style={{ padding:'12px 14px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'28px', height:'28px', background:'linear-gradient(135deg,#e91e8c,#c2185b)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', color:'#fff', fontWeight:'700', flexShrink:0 }}>MS4</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'13px', fontWeight:'500' }}>My Store 4</div>
            <div style={{ fontSize:'11px', color: C.textMuted, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>wm8dkv-ng.myshopify.com</div>
          </div>
        </div>

        {/* 设置导航 */}
        <div style={{ flex:1, overflowY:'auto', padding:'8px 0' }}>
          {navItem('general', '常规')}
          {navItem('plan', '套餐')}
          {navItem('payments', '支付')}
          {navItem('checkout', '结账')}
          {navItem('customer_accounts', '客户账户')}
          {navItem('shipping', '发货和配送')}
          {navItem('taxes', '税款和关税')}
          {navItem('locations', '地点')}
          {navItem('apps', '应用')}
          {navItem('sales_channels', '销售渠道')}
          {navItem('domains', '域名')}
          {navItem('customer_events', '客户事件')}
          {navItem('notifications', '通知')}
          {navItem('metafields', '元字段和元对象')}
          {navItem('languages', '语言')}
          {navItem('privacy', '客户隐私')}
          {navItem('policies', '政策')}
        </div>
      </div>

      {/* 设置内容 */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background: C.bg }}>

        {/* 顶部栏 */}
        <div style={{ height:'56px', background: C.white, borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', padding:'0 20px', gap:'12px' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color: C.textMuted, display:'flex', alignItems:'center', gap:'4px', fontSize:'14px', padding:'4px 8px', borderRadius:'6px' }}>
            ← 返回
          </button>
          <div style={{ height:'20px', width:'1px', background: C.border }}></div>
          <div style={{ fontSize:'15px', fontWeight:'600' }}>设置</div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>

          {/* 客户事件 */}
          {activeSetting === 'customer_events' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <span style={{ color: C.textMuted }}>{Icons.customer_events}</span>
                  <h1 style={{ fontSize:'20px', fontWeight:'600', margin:0 }}>Customer events</h1>
                </div>
                <button style={{ background: C.text, color:'#fff', border:'none', borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'14px', fontWeight:'500' }}>浏览像素应用</button>
              </div>

              <div style={{ background: C.white, borderRadius:'12px', border:`1px solid ${C.border}`, overflow:'hidden' }}>
                <div style={{ padding:'16px 20px', borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:'15px', fontWeight:'600' }}>像素</div>
                </div>
                <div style={{ padding:'0 20px' }}>
                  <div style={{ display:'flex', borderBottom:`1px solid ${C.border}` }}>
                    {['应用像素', '自定义像素'].map((tab, i) => (
                      <button key={tab} onClick={() => setActivePixelTab(i === 0 ? 'app' : 'custom')}
                        style={{ background:'none', border:'none', borderBottom: (i === 0 ? activePixelTab === 'app' : activePixelTab === 'custom') ? `2px solid ${C.text}` : '2px solid transparent', padding:'12px 16px', cursor:'pointer', fontSize:'14px', fontWeight: (i === 0 ? activePixelTab === 'app' : activePixelTab === 'custom') ? '600' : '400', color: C.text, marginBottom:'-1px' }}>
                        {tab}
                      </button>
                    ))}
                    <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'8px', padding:'8px 0' }}>
                      <button style={{ background:'none', border:'none', cursor:'pointer', color: C.textMuted }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
                      </button>
                      <button style={{ background:'none', border:'none', cursor:'pointer', color: C.textMuted }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ padding:'60px 20px', textAlign:'center' }}>
                  <div style={{ fontSize:'15px', fontWeight:'600', marginBottom:'8px' }}>无应用像素</div>
                  <div style={{ fontSize:'14px', color: C.textMuted, marginBottom:'20px' }}>通过像素应用收集客户事件，这是最安全的集成选项。</div>
                  <button style={{ background: C.white, color: C.text, border:`1px solid ${C.border}`, borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'14px' }}>浏览像素应用</button>
                </div>
              </div>

              <div style={{ textAlign:'center', marginTop:'12px' }}>
                <span style={{ fontSize:'13px', color: C.purple, cursor:'pointer' }}>详细了解像素</span>
              </div>
            </div>
          )}

          {/* 常规 */}
          {activeSetting === 'general' && (
            <div>
              <h1 style={{ fontSize:'20px', fontWeight:'600', margin:'0 0 20px' }}>常规</h1>
              <div style={{ background: C.white, borderRadius:'12px', border:`1px solid ${C.border}`, padding:'20px', marginBottom:'16px' }}>
                <div style={{ fontSize:'15px', fontWeight:'600', marginBottom:'16px' }}>商店详细信息</div>
                <div style={{ marginBottom:'12px' }}>
                  <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>商店名称</label>
                  <input defaultValue="My Store 4" style={{ width:'100%', border:`1px solid ${C.border}`, borderRadius:'8px', padding:'8px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
                </div>
                <div style={{ marginBottom:'12px' }}>
                  <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>商店电子邮件</label>
                  <input defaultValue="cengluandiezhang503@gmail.com" style={{ width:'100%', border:`1px solid ${C.border}`, borderRadius:'8px', padding:'8px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
                </div>
              </div>
            </div>
          )}

          {/* 其他设置页面 */}
          {!['customer_events', 'general'].includes(activeSetting) && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh' }}>
              <div style={{ background: C.white, borderRadius:'12px', border:`1px solid ${C.border}`, padding:'60px 40px', textAlign:'center' }}>
                <div style={{ fontSize:'48px', marginBottom:'16px' }}>🚧</div>
                <div style={{ fontSize:'18px', color: C.textMuted, fontWeight:'500' }}>正在开发中</div>
                <div style={{ fontSize:'13px', color: C.textLight, marginTop:'6px' }}>Coming Soon</div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

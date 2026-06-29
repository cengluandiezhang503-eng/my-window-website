import React from 'react';

const C = { border: '#e1e3e5', text: '#202223', muted: '#6d7175' };

const Btn = ({ children, title }) => (
  <button title={title} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px 6px', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted }}>
    {children}
  </button>
);

const Sep = () => <div style={{ width:'1px', height:'20px', background: C.border, margin:'0 4px', flexShrink:0 }}></div>;

export default function Toolbar() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1px', padding:'5px 10px', borderBottom:`1px solid ${C.border}`, background:'#fff', flexWrap:'nowrap', overflowX:'auto' }}>

      {/* ✦ AI */}
      <Btn title="AI助手">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L9.2 5.3L13 6.5L9.2 7.7L8 11.5L6.8 7.7L3 6.5L6.8 5.3Z" stroke="#6d7175" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
          <path d="M12.5 10L13.2 12L15 12.5L13.2 13L12.5 15L11.8 13L10 12.5L11.8 12Z" stroke="#6d7175" strokeWidth="1" strokeLinejoin="round" fill="none"/>
        </svg>
      </Btn>

      <Sep/>

      {/* 段落下拉 */}
      <button style={{ background:'none', border:'none', cursor:'pointer', padding:'4px 8px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'4px', color: C.text, fontSize:'13px', whiteSpace:'nowrap' }}>
        段落
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#6d7175" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <Sep/>

      {/* B 加粗 */}
      <Btn title="加粗">
        <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
          <path d="M4.5 2.5H9C10.657 2.5 12 3.843 12 5.5C12 6.416 11.582 7.234 10.924 7.779C11.854 8.283 12.5 9.265 12.5 10.5C12.5 12.433 10.933 14 9 14H4.5V2.5ZM6.5 7H9C9.828 7 10.5 6.328 10.5 5.5C10.5 4.672 9.828 4 9 4H6.5V7ZM6.5 8.5V12.5H9C10.105 12.5 11 11.605 11 10.5C11 9.395 10.105 8.5 9 8.5H6.5Z"/>
        </svg>
      </Btn>

      {/* I 斜体 */}
      <Btn title="斜体">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7 3H11" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 13H9" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9.5 3L6.5 13" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </Btn>

      {/* U 下划线 */}
      <Btn title="下划线">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 3V8.5C4 10.709 5.791 12.5 8 12.5C10.209 12.5 12 10.709 12 8.5V3" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2.5" y1="14.5" x2="13.5" y2="14.5" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </Btn>

      {/* A 字体颜色 */}
      <Btn title="字体颜色">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2.5L11.5 11H9.8L9 9H7L6.2 11H4.5L8 2.5Z" fill={C.text}/>
          <path d="M7.4 7.5H8.6L8 5.5L7.4 7.5Z" fill="white"/>
          <rect x="2" y="12.5" width="12" height="1.8" rx="0.9" fill="#e00"/>
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill={C.muted}><path d="M1.5 2.5L4 5.5L6.5 2.5H1.5Z"/></svg>
      </Btn>

      <Sep/>

      {/* 对齐 */}
      <Btn title="对齐">
        <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
          <rect x="2" y="3" width="12" height="1.5" rx="0.75"/>
          <rect x="2" y="7.25" width="9" height="1.5" rx="0.75"/>
          <rect x="2" y="11.5" width="12" height="1.5" rx="0.75"/>
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill={C.muted}><path d="M1.5 2.5L4 5.5L6.5 2.5H1.5Z"/></svg>
      </Btn>

      <Sep/>

      {/* 🔗 链接 */}
      <Btn title="插入链接">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7 9C7.552 9.552 8.448 9.552 9 9L11 7C11.552 6.448 11.552 5.552 11 5C10.448 4.448 9.552 4.448 9 5L8.5 5.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M9 7C8.448 6.448 7.552 6.448 7 7L5 9C4.448 9.552 4.448 10.448 5 11C5.552 11.552 6.448 11.552 7 11L7.5 10.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </Btn>

      {/* 🖼️ 图片 */}
      <Btn title="插入图片">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke={C.muted} strokeWidth="1.4"/>
          <circle cx="5.5" cy="6.5" r="1" fill={C.muted}/>
          <path d="M2 10.5L5.5 7L7.5 9L10 6.5L14 10.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Btn>

      {/* ▶ 视频 */}
      <Btn title="插入视频">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke={C.muted} strokeWidth="1.4"/>
          <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill={C.muted}/>
        </svg>
      </Btn>

      {/* ⊞ 表格 */}
      <Btn title="插入表格">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="1.5" stroke={C.muted} strokeWidth="1.4"/>
          <line x1="2" y1="6" x2="14" y2="6" stroke={C.muted} strokeWidth="1.1"/>
          <line x1="2" y1="10" x2="14" y2="10" stroke={C.muted} strokeWidth="1.1"/>
          <line x1="6" y1="2" x2="6" y2="14" stroke={C.muted} strokeWidth="1.1"/>
          <line x1="10" y1="2" x2="10" y2="14" stroke={C.muted} strokeWidth="1.1"/>
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill={C.muted}><path d="M1.5 2.5L4 5.5L6.5 2.5H1.5Z"/></svg>
      </Btn>

      {/* ••• 更多 */}
      <Btn title="更多">
        <svg width="16" height="16" viewBox="0 0 16 16" fill={C.muted}>
          <circle cx="3.5" cy="8" r="1.2"/>
          <circle cx="8" cy="8" r="1.2"/>
          <circle cx="12.5" cy="8" r="1.2"/>
        </svg>
      </Btn>

      <Sep/>

      {/* </> 源码 */}
      <Btn title="源代码">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 5L2 8L5 11" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 5L14 8L11 11" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 3L6.5 13" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </Btn>

    </div>
  );
}

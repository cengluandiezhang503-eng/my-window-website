import React, { useRef, useEffect, useCallback } from 'react';

const C = { border: '#e1e3e5', text: '#202223', muted: '#6d7175' };

function Btn({ children, title, onClick, active }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      style={{ background: active ? '#f0f1ff' : 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#5c6ac4' : C.muted }}>
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: '1px', height: '20px', background: C.border, margin: '0 4px', flexShrink: 0 }}></div>;
}

export default function RichEditor({ value, onChange, placeholder }) {
  const ref = useRef(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (ref.current && value !== lastValue.current && document.activeElement !== ref.current) {
      ref.current.innerHTML = value || '';
      lastValue.current = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    const html = ref.current.innerHTML;
    lastValue.current = html;
    onChange(html);
  }, [onChange]);

  const exec = (cmd, arg) => {
    ref.current.focus();
    document.execCommand(cmd, false, arg);
    handleInput();
  };

  const insertLink = () => {
    const url = window.prompt('请输入链接地址：', 'https://');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = window.prompt('请输入图片链接：', 'https://');
    if (url) exec('insertImage', url);
  };

  const setBlock = (tag) => {
    exec('formatBlock', tag);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1px', padding: '5px 10px', borderBottom: `1px solid ${C.border}`, background: '#fff', flexWrap: 'nowrap', overflowX: 'auto' }}>

        <select
          onMouseDown={e => e.stopPropagation()}
          onChange={e => setBlock(e.target.value)}
          defaultValue="p"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', color: C.text, fontSize: '13px', outline: 'none' }}>
          <option value="p">段落</option>
          <option value="h1">标题 1</option>
          <option value="h2">标题 2</option>
          <option value="h3">标题 3</option>
        </select>

        <Sep />

        <Btn title="加粗" onClick={() => exec('bold')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
            <path d="M4.5 2.5H9C10.657 2.5 12 3.843 12 5.5C12 6.416 11.582 7.234 10.924 7.779C11.854 8.283 12.5 9.265 12.5 10.5C12.5 12.433 10.933 14 9 14H4.5V2.5ZM6.5 7H9C9.828 7 10.5 6.328 10.5 5.5C10.5 4.672 9.828 4 9 4H6.5V7ZM6.5 8.5V12.5H9C10.105 12.5 11 11.605 11 10.5C11 9.395 10.105 8.5 9 8.5H6.5Z"/>
          </svg>
        </Btn>

        <Btn title="斜体" onClick={() => exec('italic')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 3H11" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5 13H9" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9.5 3L6.5 13" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </Btn>

        <Btn title="下划线" onClick={() => exec('underline')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 3V8.5C4 10.709 5.791 12.5 8 12.5C10.209 12.5 12 10.709 12 8.5V3" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2.5" y1="14.5" x2="13.5" y2="14.5" stroke={C.text} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </Btn>

        <Sep />

        <Btn title="左对齐" onClick={() => exec('justifyLeft')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
            <rect x="2" y="3" width="12" height="1.5" rx="0.75"/>
            <rect x="2" y="7.25" width="8" height="1.5" rx="0.75"/>
            <rect x="2" y="11.5" width="12" height="1.5" rx="0.75"/>
          </svg>
        </Btn>
        <Btn title="居中" onClick={() => exec('justifyCenter')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
            <rect x="2" y="3" width="12" height="1.5" rx="0.75"/>
            <rect x="4" y="7.25" width="8" height="1.5" rx="0.75"/>
            <rect x="2" y="11.5" width="12" height="1.5" rx="0.75"/>
          </svg>
        </Btn>
        <Btn title="右对齐" onClick={() => exec('justifyRight')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
            <rect x="2" y="3" width="12" height="1.5" rx="0.75"/>
            <rect x="6" y="7.25" width="8" height="1.5" rx="0.75"/>
            <rect x="2" y="11.5" width="12" height="1.5" rx="0.75"/>
          </svg>
        </Btn>

        <Sep />

        <Btn title="无序列表" onClick={() => exec('insertUnorderedList')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.text}>
            <circle cx="3" cy="4" r="1.2"/><rect x="6" y="3.2" width="9" height="1.6" rx="0.8"/>
            <circle cx="3" cy="8" r="1.2"/><rect x="6" y="7.2" width="9" height="1.6" rx="0.8"/>
            <circle cx="3" cy="12" r="1.2"/><rect x="6" y="11.2" width="9" height="1.6" rx="0.8"/>
          </svg>
        </Btn>

        <Btn title="插入链接" onClick={insertLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 9C7.552 9.552 8.448 9.552 9 9L11 7C11.552 6.448 11.552 5.552 11 5C10.448 4.448 9.552 4.448 9 5L8.5 5.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M9 7C8.448 6.448 7.552 6.448 7 7L5 9C4.448 9.552 4.448 10.448 5 11C5.552 11.552 6.448 11.552 7 11L7.5 10.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </Btn>

        <Btn title="插入图片" onClick={insertImage}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke={C.muted} strokeWidth="1.4"/>
            <circle cx="5.5" cy="6.5" r="1" fill={C.muted}/>
            <path d="M2 10.5L5.5 7L7.5 9L10 6.5L14 10.5" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Btn>

        <Sep />

        <Btn title="清除格式" onClick={() => exec('removeFormat')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 5L2 8L5 11" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 5L14 8L11 11" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 3L6.5 13" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </Btn>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        style={{
          minHeight: '180px',
          padding: '12px',
          fontSize: '14px',
          color: C.text,
          outline: 'none',
          lineHeight: '1.6',
        }}
        className="rich-editor-content"
      />
      <style>{`
        .rich-editor-content:empty:before {
          content: attr(data-placeholder);
          color: #8c9196;
        }
        .rich-editor-content a { color: #5c6ac4; text-decoration: underline; }
        .rich-editor-content img { max-width: 100%; }
      `}</style>
    </div>
  );
}

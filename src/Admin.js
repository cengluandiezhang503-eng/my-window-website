import { useState, useEffect } from 'react';

function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', image: '' });

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products')
      .then(function(res) { return res.json(); })
      .then(function(data) { setProducts(data); });
    fetch('https://window-server.onrender.com/api/quotes')
      .then(function(res) { return res.json(); })
      .then(function(data) { setQuotes(data); });
  }, []);

  const pendingQuotes = quotes.filter(function(q) { return q.status === '待跟进'; }).length;

  return (
    <div style={{ display:'flex', height:'100vh', background:'#0a0a0f', color:'#e0e0e8', fontFamily:'system-ui,sans-serif', fontSize:'13px', overflow:'hidden' }}>

      {/* 侧边栏 */}
      <div style={{ width:'220px', flexShrink:0, background:'#0d0d14', borderRight:'1px solid #1e1e2e', display:'flex', flexDirection:'column' }}>

        {/* Logo */}
        <div style={{ padding:'20px 16px', borderBottom:'1px solid #1e1e2e', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'32px', height:'32px', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🏠</div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'700', color:'#fff' }}>WindowOS</div>
            <div style={{ fontSize:'10px', color:'#4a4a6a', letterSpacing:'2px' }}>ADMIN v2.0</div>
          </div>
        </div>

        {/* 导航 */}
        <div style={{ flex:1, padding:'12px 0', overflowY:'auto' }}>
          <div style={{ padding:'8px 16px 4px', fontSize:'10px', color:'#3a3a5a', letterSpacing:'2px', textTransform:'uppercase' }}>Main</div>
          {[
            { id:'dashboard', icon:'⊞', label:'Dashboard' },
            { id:'products', icon:'◈', label:'Products', badge: products.length },
            { id:'series', icon:'◧', label:'Series' },
            { id:'quotes', icon:'◎', label:'Quotes', badge: pendingQuotes },
          ].map(function(item) {
            const active = activeNav === item.id;
            return (
              <div key={item.id} onClick={function() { setActiveNav(item.id); }}
                style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 16px', cursor:'pointer', color: active ? '#818cf8' : '#6060a0', background: active ? '#13132a' : 'transparent', borderLeft: active ? '2px solid #818cf8' : '2px solid transparent', transition:'all 0.15s' }}>
                <span style={{ fontSize:'16px', fontWeight:'300' }}>{item.icon}</span>
                <span style={{ flex:1, fontSize:'12px', letterSpacing:'0.3px' }}>{item.label}</span>
                {item.badge > 0 && <span style={{ background:'#4f46e5', color:'#fff', fontSize:'10px', padding:'2px 7px', borderRadius:'10px', fontWeight:'600' }}>{item.badge}</span>}
              </div>
            );
          })}

          <div style={{ padding:'16px 16px 4px', fontSize:'10px', color:'#3a3a5a', letterSpacing:'2px', textTransform:'uppercase' }}>System</div>
          {[
            { id:'customers', icon:'◉', label:'Customers' },
            { id:'analytics', icon:'◈', label:'Analytics' },
            { id:'emails', icon:'◎', label:'Emails' },
            { id:'settings', icon:'◧', label:'Settings' },
          ].map(function(item) {
            const active = activeNav === item.id;
            return (
              <div key={item.id} onClick={function() { setActiveNav(item.id); }}
                style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 16px', cursor:'pointer', color: active ? '#818cf8' : '#6060a0', background: active ? '#13132a' : 'transparent', borderLeft: active ? '2px solid #818cf8' : '2px solid transparent', transition:'all 0.15s' }}>
                <span style={{ fontSize:'16px', fontWeight:'300' }}>{item.icon}</span>
                <span style={{ fontSize:'12px', letterSpacing:'0.3px' }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* 用户 */}
        <div style={{ padding:'16px', borderTop:'1px solid #1e1e2e' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', color:'#fff', fontWeight:'700' }}>A</div>
            <div>
              <div style={{ fontSize:'12px', color:'#a0a0c0', fontWeight:'500' }}>Admin</div>
              <div style={{ fontSize:'10px', color:'#4a4a6a' }}>超级管理员</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* 顶部栏 */}
        <div style={{ height:'56px', background:'#0d0d14', borderBottom:'1px solid #1e1e2e', display:'flex', alignItems:'center', padding:'0 24px', gap:'16px', flexShrink:0 }}>
          <div style={{ flex:1, fontSize:'15px', fontWeight:'600', color:'#e0e0f0', letterSpacing:'0.3px' }}>
            {{ dashboard:'控制台', products:'产品管理', series:'产品系列', quotes:'报价管理', customers:'客户管理', analytics:'数据分析', emails:'邮件记录', settings:'系统设置' }[activeNav]}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#12121e', border:'1px solid #1e1e2e', borderRadius:'8px', padding:'7px 12px', width:'220px' }}>
            <span style={{ color:'#3a3a5a', fontSize:'13px' }}>🔍</span>
            <input value={searchQuery} onChange={function(e) { setSearchQuery(e.target.value); }} placeholder="搜索产品、报价..."
              style={{ background:'none', border:'none', outline:'none', color:'#8080b0', fontSize:'12px', width:'100%' }} />
          </div>
          <div style={{ width:'32px', height:'32px', background:'#12121e', border:'1px solid #1e1e2e', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
            <span style={{ fontSize:'15px' }}>🔔</span>
            <div style={{ position:'absolute', top:'6px', right:'6px', width:'6px', height:'6px', background:'#4f46e5', borderRadius:'50%' }}></div>
          </div>
        </div>

        {/* 内容区 */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px', background:'#0a0a0f' }}>

          {/* 控制台 */}
          {activeNav === 'dashboard' && (
            <div>
              {/* 统计卡片 */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'24px' }}>
                {[
                  { label:'总产品数', value: products.length, change:'+12%', color:'#4f46e5', up:true },
                  { label:'报价申请', value: quotes.length, change:'+8%', color:'#059669', up:true },
                  { label:'待跟进', value: pendingQuotes, change:'-3%', color:'#d97706', up:false },
                  { label:'转化率', value:'34%', change:'+5%', color:'#dc2626', up:true },
                ].map(function(stat, i) {
                  return (
                    <div key={i} style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'12px', padding:'16px', position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background: stat.color }}></div>
                      <div style={{ fontSize:'10px', color:'#4a4a6a', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px' }}>{stat.label}</div>
                      <div style={{ fontSize:'30px', fontWeight:'700', color:'#e0e0f0', marginBottom:'6px', letterSpacing:'-1px' }}>{stat.value}</div>
                      <div style={{ fontSize:'11px', color: stat.up ? '#34d399' : '#f87171', display:'flex', alignItems:'center', gap:'3px' }}>
                        <span>{stat.up ? '↑' : '↓'}</span>
                        <span>{stat.change} 本月</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 两列布局 */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'16px' }}>

                {/* 产品表格 */}
                <div style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'12px', overflow:'hidden' }}>
                  <div style={{ padding:'14px 16px', borderBottom:'1px solid #1e1e2e', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontSize:'13px', fontWeight:'600', color:'#c0c0e0' }}>📦 产品列表</div>
                    <button onClick={function() { setActiveNav('products'); }} style={{ fontSize:'11px', color:'#4f46e5', background:'none', border:'none', cursor:'pointer' }}>+ 添加产品</button>
                  </div>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead><tr>
                      {['产品名称','分类','价格','状态'].map(function(h) {
                        return <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:'10px', color:'#3a3a5a', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid #1a1a2e' }}>{h}</th>;
                      })}
                    </tr></thead>
                    <tbody>
                      {products.slice(0,5).map(function(p) {
                        return (
                          <tr key={p.id}>
                            <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                <div style={{ width:'32px', height:'32px', borderRadius:'6px', background:'#1a1a2e', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 }}>
                                  <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                                </div>
                                <span style={{ color:'#c0c0e0', fontWeight:'500', fontSize:'13px' }}>{p.name}</span>
                              </div>
                            </td>
                            <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                              <span style={{ background: p.category==='窗户'?'#13132a': p.category==='门'?'#0a2a1a':'#2a1a0a', color: p.category==='窗户'?'#818cf8': p.category==='门'?'#34d399':'#fbbf24', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>{p.category}</span>
                            </td>
                            <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e', color:'#e0e0f0', fontWeight:'600' }}>{p.price}</td>
                            <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                              <span style={{ color:'#34d399', fontSize:'12px' }}>● 上架</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 右侧活动 + 图表 */}
                <div style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'12px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                  <div style={{ padding:'14px 16px', borderBottom:'1px solid #1e1e2e', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontSize:'13px', fontWeight:'600', color:'#c0c0e0' }}>⚡ 最新动态</div>
                    <button onClick={function() { setActiveNav('quotes'); }} style={{ fontSize:'11px', color:'#4f46e5', background:'none', border:'none', cursor:'pointer' }}>查看全部</button>
                  </div>

                  <div style={{ flex:1 }}>
                    {quotes.slice(0,5).map(function(q, i) {
                      return (
                        <div key={q.id} style={{ padding:'11px 16px', borderBottom:'1px solid #13131e', display:'flex', alignItems:'center', gap:'10px' }}>
                          <div style={{ width:'28px', height:'28px', borderRadius:'50%', background: i%3===0?'#13132a': i%3===1?'#0a1a0f':'#1a1000', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'12px' }}>
                            {i%3===0?'📋': i%3===1?'✅':'📧'}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:'12px', color:'#8080a0', lineHeight:'1.4' }}>
                              <span style={{ color:'#b0b0d0', fontWeight:'500' }}>{q.name}</span> 提交报价
                            </div>
                            <div style={{ fontSize:'10px', color:'#3a3a5a', marginTop:'2px' }}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</div>
                          </div>
                          <span style={{ background: q.status==='待跟进'?'#1a1000': q.status==='已联系'?'#0a1a0f':'#13132a', color: q.status==='待跟进'?'#fbbf24': q.status==='已联系'?'#34d399':'#818cf8', padding:'2px 8px', borderRadius:'20px', fontSize:'10px', fontWeight:'600', flexShrink:0 }}>{q.status}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* 图表 */}
                  <div style={{ padding:'16px', borderTop:'1px solid #1e1e2e' }}>
                    <div style={{ fontSize:'10px', color:'#3a3a5a', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px' }}>报价趋势</div>
                    <div style={{ display:'flex', alignItems:'flex-end', gap:'4px', height:'64px' }}>
                      {[40,55,45,70,60,80,95].map(function(h, i) {
                        return <div key={i} style={{ flex:1, height: h+'%', background: i>=5?'#6366f1':'#4f46e5', borderRadius:'3px 3px 0 0', opacity: i>=5?1:0.6 }}></div>;
                      })}
                    </div>
                    <div style={{ display:'flex', gap:'4px', marginTop:'6px' }}>
                      {['一','二','三','四','五','六','日'].map(function(d) {
                        return <div key={d} style={{ flex:1, textAlign:'center', fontSize:'9px', color:'#3a3a5a' }}>周{d}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 产品管理 */}
          {activeNav === 'products' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                <div style={{ color:'#6060a0', fontSize:'12px' }}>共 {products.length} 个产品</div>
                <button onClick={function() { setShowAddProduct(!showAddProduct); }}
                  style={{ background:'#4f46e5', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'12px', fontWeight:'600' }}>
                  + 添加产品
                </button>
              </div>

              {showAddProduct && (
                <div style={{ background:'#0d0d14', border:'1px solid #4f46e5', borderRadius:'12px', padding:'20px', marginBottom:'16px' }}>
                  <div style={{ fontSize:'14px', fontWeight:'600', color:'#c0c0e0', marginBottom:'16px' }}>添加新产品</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                    {[{key:'name',label:'产品名称',ph:'例：双层隔热窗'},{key:'price',label:'价格',ph:'例：从 ¥2,999 起'},{key:'category',label:'分类',ph:'例：窗户'},{key:'image',label:'图片链接',ph:'https://...'}].map(function(f) {
                      return (
                        <div key={f.key}>
                          <div style={{ fontSize:'10px', color:'#4a4a6a', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'1.5px' }}>{f.label}</div>
                          <input value={newProduct[f.key]} onChange={function(e) { setNewProduct(Object.assign({}, newProduct, {[f.key]: e.target.value})); }} placeholder={f.ph}
                            style={{ width:'100%', background:'#12121e', border:'1px solid #1e1e2e', borderRadius:'8px', padding:'9px 12px', color:'#c0c0e0', fontSize:'12px', outline:'none', boxSizing:'border-box' }} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop:'12px' }}>
                    <div style={{ fontSize:'10px', color:'#4a4a6a', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'1.5px' }}>产品描述</div>
                    <textarea value={newProduct.description} onChange={function(e) { setNewProduct(Object.assign({}, newProduct, {description: e.target.value})); }}
                      placeholder="产品详细描述..." rows={3}
                      style={{ width:'100%', background:'#12121e', border:'1px solid #1e1e2e', borderRadius:'8px', padding:'9px 12px', color:'#c0c0e0', fontSize:'12px', outline:'none', resize:'none', boxSizing:'border-box' }} />
                  </div>
                  <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
                    <button style={{ background:'#4f46e5', color:'#fff', border:'none', borderRadius:'8px', padding:'9px 24px', cursor:'pointer', fontSize:'12px', fontWeight:'600' }}>保存产品</button>
                    <button onClick={function() { setShowAddProduct(false); }} style={{ background:'#1e1e2e', color:'#6060a0', border:'none', borderRadius:'8px', padding:'9px 24px', cursor:'pointer', fontSize:'12px' }}>取消</button>
                  </div>
                </div>
              )}

              <div style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'12px', overflow:'hidden' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>
                    {['产品','分类','价格','状态','操作'].map(function(h) {
                      return <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:'10px', color:'#3a3a5a', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid #1a1a2e' }}>{h}</th>;
                    })}
                  </tr></thead>
                  <tbody>
                    {products.filter(function(p) { return !searchQuery || p.name.includes(searchQuery) || p.category.includes(searchQuery); }).map(function(p) {
                      return (
                        <tr key={p.id}>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                              <div style={{ width:'40px', height:'40px', borderRadius:'8px', overflow:'hidden', flexShrink:0, background:'#1a1a2e' }}>
                                <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                              </div>
                              <div>
                                <div style={{ color:'#c0c0e0', fontWeight:'500', fontSize:'13px' }}>{p.name}</div>
                                <div style={{ color:'#4a4a6a', fontSize:'11px', marginTop:'2px' }}>{(p.description||'').slice(0,28)}...</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <span style={{ background: p.category==='窗户'?'#13132a': p.category==='门'?'#0a2a1a':'#2a1a0a', color: p.category==='窗户'?'#818cf8': p.category==='门'?'#34d399':'#fbbf24', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>{p.category}</span>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e', color:'#e0e0f0', fontWeight:'600' }}>{p.price}</td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}><span style={{ color:'#34d399', fontSize:'12px' }}>● 上架</span></td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <div style={{ display:'flex', gap:'6px' }}>
                              <button style={{ background:'#13132a', color:'#818cf8', border:'none', borderRadius:'6px', padding:'5px 12px', cursor:'pointer', fontSize:'11px', fontWeight:'500' }}>编辑</button>
                              <button style={{ background:'#2a0a0a', color:'#f87171', border:'none', borderRadius:'6px', padding:'5px 12px', cursor:'pointer', fontSize:'11px', fontWeight:'500' }}>删除</button>
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
              <div style={{ display:'flex', gap:'12px', marginBottom:'20px' }}>
                {[
                  { label:'全部', count: quotes.length, color:'#818cf8' },
                  { label:'待跟进', count: quotes.filter(function(q) { return q.status==='待跟进'; }).length, color:'#fbbf24' },
                  { label:'已联系', count: quotes.filter(function(q) { return q.status==='已联系'; }).length, color:'#34d399' },
                  { label:'已成交', count: quotes.filter(function(q) { return q.status==='已成交'; }).length, color:'#6366f1' },
                ].map(function(tab, i) {
                  return (
                    <div key={i} style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'10px', padding:'12px 20px', display:'flex', gap:'10px', alignItems:'center' }}>
                      <span style={{ color: tab.color, fontSize:'22px', fontWeight:'700', letterSpacing:'-1px' }}>{tab.count}</span>
                      <span style={{ color:'#6060a0', fontSize:'12px' }}>{tab.label}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ background:'#0d0d14', border:'1px solid #1e1e2e', borderRadius:'12px', overflow:'hidden' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>
                    {['客户','联系方式','产品','状态','时间','操作'].map(function(h) {
                      return <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:'10px', color:'#3a3a5a', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid #1a1a2e' }}>{h}</th>;
                    })}
                  </tr></thead>
                  <tbody>
                    {quotes.map(function(q) {
                      return (
                        <tr key={q.id}>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <div style={{ color:'#c0c0e0', fontWeight:'500', fontSize:'13px' }}>{q.name}</div>
                            <div style={{ color:'#4a4a6a', fontSize:'11px', marginTop:'1px' }}>{q.zip_code}</div>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <div style={{ color:'#7070a0', fontSize:'12px' }}>{q.email}</div>
                            <div style={{ color:'#4a4a6a', fontSize:'11px', marginTop:'1px' }}>{q.phone}</div>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <span style={{ background:'#13132a', color:'#818cf8', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>{q.product_type||'未指定'}</span>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <select value={q.status} onChange={async function(e) {
                              const s = e.target.value;
                              await fetch('https://window-server.onrender.com/api/quotes/'+q.id, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:s}) });
                              setQuotes(quotes.map(function(x) { return x.id===q.id ? Object.assign({},x,{status:s}) : x; }));
                            }} style={{ background:'#12121e', border:'1px solid #1e1e2e', borderRadius:'6px', color: q.status==='待跟进'?'#fbbf24': q.status==='已联系'?'#34d399':'#818cf8', padding:'5px 10px', fontSize:'11px', cursor:'pointer', outline:'none', fontWeight:'600' }}>
                              <option value="待跟进">⏳ 待跟进</option>
                              <option value="已联系">✅ 已联系</option>
                              <option value="已成交">🎉 已成交</option>
                            </select>
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e', color:'#3a3a5a', fontSize:'11px' }}>
                            {new Date(q.created_at).toLocaleDateString('zh-CN')}
                          </td>
                          <td style={{ padding:'12px 16px', borderBottom:'1px solid #13131e' }}>
                            <button style={{ background:'#13132a', color:'#818cf8', border:'none', borderRadius:'6px', padding:'5px 12px', cursor:'pointer', fontSize:'11px', fontWeight:'500' }}>详情</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['customers','analytics','series','emails','settings'].includes(activeNav) && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh' }}>
              <div style={{ fontSize:'56px', marginBottom:'20px' }}>🚧</div>
              <div style={{ fontSize:'18px', color:'#6060a0', fontWeight:'600' }}>正在开发中</div>
              <div style={{ fontSize:'12px', color:'#3a3a5a', marginTop:'8px', letterSpacing:'2px' }}>COMING SOON</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;

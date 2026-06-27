import { useState, useEffect } from 'react';

function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name:'', description:'', price:'', category:'', image:'' });
  const [editingQuote, setEditingQuote] = useState(null);

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products').then(r=>r.json()).then(setProducts);
    fetch('https://window-server.onrender.com/api/quotes').then(r=>r.json()).then(setQuotes);
  }, []);

  const pending = quotes.filter(q=>q.status==='待跟进').length;

  const navItems = [
    { section: null, items: [
      { id:'dashboard', icon:'🏠', label:'主页' },
      { id:'quotes', icon:'📋', label:'订单', badge: pending },
    ]},
    { section: null, items: [
      { id:'products', icon:'◎', label:'产品', children: ['产品系列','库存','采购订单','转移','礼品卡'] },
      { id:'customers', icon:'👤', label:'客户' },
      { id:'analytics', icon:'📈', label:'分析' },
    ]},
    { section: '销售渠道', items: [
      { id:'store', icon:'🛍️', label:'在线商店' },
    ]},
    { section: null, items: [
      { id:'settings', icon:'⚙️', label:'设置' },
    ]},
  ];

  const S = {
    wrap: { display:'flex', height:'100vh', background:'#f1f1f1', fontFamily:'-apple-system,BlinkMacSystemFont,system-ui,sans-serif', fontSize:'14px' },
    sb: { width:'240px', flexShrink:0, background:'#1a1a2e', display:'flex', flexDirection:'column', overflow:'hidden' },
    sbTop: { padding:'16px', display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid #252540' },
    sbStore: { width:'32px', height:'32px', background:'#4f46e5', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', color:'#fff' },
    sbNav: { flex:1, overflowY:'auto', padding:'8px 0' },
    ni: (active) => ({ display:'flex', alignItems:'center', gap:'10px', padding:'8px 12px', cursor:'pointer', color: active?'#fff':'#9090b0', background: active?'rgba(255,255,255,0.1)':'transparent', borderRadius:'8px', margin:'1px 8px', fontSize:'13px', fontWeight: active?'500':'400', transition:'all 0.15s' }),
    sec: { padding:'12px 20px 4px', fontSize:'11px', color:'#5050a0', letterSpacing:'0.5px' },
    child: { display:'flex', alignItems:'center', padding:'6px 12px 6px 42px', cursor:'pointer', color:'#7070a0', fontSize:'13px', borderRadius:'8px', margin:'1px 8px' },
    main: { flex:1, display:'flex', flexDirection:'column', overflow:'hidden' },
    topbar: { height:'56px', background:'#fff', borderBottom:'1px solid #e5e5e5', display:'flex', alignItems:'center', padding:'0 20px', gap:'12px' },
    content: { flex:1, overflowY:'auto', padding:'20px', background:'#f1f1f1' },
    card: { background:'#fff', borderRadius:'12px', border:'1px solid #e5e5e5', overflow:'hidden', marginBottom:'16px' },
    cardHeader: { padding:'16px 20px', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between' },
    cardTitle: { fontSize:'14px', fontWeight:'600', color:'#1a1a1a' },
    btn: (color) => ({ background: color||'#fff', color: color?'#fff':'#1a1a1a', border: color?'none':'1px solid #d0d0d0', borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'13px', fontWeight:'500' }),
    input: { width:'100%', border:'1px solid #d0d0d0', borderRadius:'8px', padding:'9px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1a1a1a' },
    label: { fontSize:'13px', fontWeight:'500', color:'#1a1a1a', marginBottom:'6px', display:'block' },
    badge: (color) => ({ background: color==='yellow'?'#fff3cd': color==='green'?'#d1fae5': '#ddd', color: color==='yellow'?'#92400e': color==='green'?'#065f46':'#555', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'500' }),
  };

  return (
    <div style={S.wrap}>

      {/* 侧边栏 */}
      <div style={S.sb}>
        <div style={S.sbTop}>
          <div style={S.sbStore}>🏠</div>
          <div>
            <div style={{ fontSize:'13px', fontWeight:'600', color:'#fff' }}>我的窗户公司</div>
            <div style={{ fontSize:'11px', color:'#5050a0' }}>管理后台</div>
          </div>
        </div>

        <div style={S.sbNav}>
          <div style={{ padding:'8px 8px 4px' }}>
            {[
              { id:'dashboard', icon:'🏠', label:'主页' },
              { id:'quotes', icon:'📋', label:'订单', badge: pending },
            ].map(item => (
              <div key={item.id} onClick={()=>setActiveNav(item.id)} style={S.ni(activeNav===item.id)}>
                <span>{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {item.badge>0 && <span style={{background:'#ef4444',color:'#fff',fontSize:'11px',padding:'1px 6px',borderRadius:'8px'}}>{item.badge}</span>}
              </div>
            ))}
          </div>

          <div style={{ padding:'4px 8px' }}>
            <div onClick={()=>setActiveNav('products')} style={S.ni(activeNav==='products'||activeNav==='addproduct')}>
              <span>◎</span>
              <span style={{flex:1}}>产品</span>
            </div>
            {['产品系列','库存','采购订单'].map(c=>(
              <div key={c} style={S.child}>{c}</div>
            ))}
          </div>

          <div style={{ padding:'4px 8px' }}>
            {[
              { id:'customers', icon:'👤', label:'客户' },
              { id:'growth', icon:'📊', label:'增长' },
              { id:'discounts', icon:'🏷️', label:'折扣' },
              { id:'content', icon:'📝', label:'内容' },
              { id:'analytics', icon:'📈', label:'分析' },
            ].map(item=>(
              <div key={item.id} onClick={()=>setActiveNav(item.id)} style={S.ni(activeNav===item.id)}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={S.sec}>销售渠道</div>
          <div style={{ padding:'4px 8px' }}>
            <div onClick={()=>setActiveNav('store')} style={S.ni(activeNav==='store')}>
              <span>🛍️</span>
              <span>在线商店</span>
            </div>
            <div onClick={()=>setActiveNav('ai')} style={S.ni(activeNav==='ai')}>
              <span>🤖</span>
              <span>智能体</span>
            </div>
          </div>

          <div style={{ padding:'4px 8px', marginTop:'8px', borderTop:'1px solid #252540', paddingTop:'12px' }}>
            <div onClick={()=>setActiveNav('settings')} style={S.ni(activeNav==='settings')}>
              <span>⚙️</span>
              <span>设置</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div style={S.main}>

        {/* 顶部搜索栏 */}
        <div style={S.topbar}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', background:'#f5f5f5', border:'1px solid #e0e0e0', borderRadius:'8px', padding:'7px 12px' }}>
            <span style={{color:'#888',fontSize:'14px'}}>🔍</span>
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="搜索..." style={{background:'none',border:'none',outline:'none',fontSize:'14px',width:'100%',color:'#333'}}/>
          </div>
          <div style={{width:'32px',height:'32px',background:'#f0f0f0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'16px'}}>🔔</div>
          <div style={{width:'32px',height:'32px',background:'#4f46e5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',color:'#fff',fontWeight:'700'}}>A</div>
        </div>

        <div style={S.content}>

          {/* 控制台 */}
          {activeNav==='dashboard' && (
            <div>
              <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>主页</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
                {[
                  {l:'总产品数',v:products.length,c:'#4f46e5'},
                  {l:'报价申请',v:quotes.length,c:'#059669'},
                  {l:'待跟进',v:pending,c:'#d97706'},
                  {l:'转化率',v:'34%',c:'#dc2626'},
                ].map((s,i)=>(
                  <div key={i} style={{background:'#fff',borderRadius:'12px',border:'1px solid #e5e5e5',padding:'20px',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:s.c}}></div>
                    <div style={{fontSize:'13px',color:'#888',marginBottom:'8px'}}>{s.l}</div>
                    <div style={{fontSize:'28px',fontWeight:'700',color:'#1a1a1a'}}>{s.v}</div>
                  </div>
                ))}
              </div>

              <div style={S.card}>
                <div style={S.cardHeader}>
                  <div style={S.cardTitle}>最新报价申请</div>
                  <button onClick={()=>setActiveNav('quotes')} style={S.btn()}>查看全部</button>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['客户','邮箱','产品','状态','时间'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.slice(0,5).map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f5f5f5'}}>
                        <td style={{padding:'12px 20px',fontWeight:'500',color:'#1a1a1a'}}>{q.name}</td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>{q.email}</td>
                        <td style={{padding:'12px 20px'}}><span style={S.badge()}>{q.product_type||'未指定'}</span></td>
                        <td style={{padding:'12px 20px'}}><span style={S.badge(q.status==='待跟进'?'yellow':'green')}>{q.status}</span></td>
                        <td style={{padding:'12px 20px',color:'#888',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 产品列表 */}
          {activeNav==='products' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>产品</div>
                <button onClick={()=>setActiveNav('addproduct')} style={{...S.btn('#4f46e5'),display:'flex',alignItems:'center',gap:'6px'}}>+ 添加产品</button>
              </div>

              <div style={S.card}>
                <div style={{padding:'12px 20px',borderBottom:'1px solid #f0f0f0',display:'flex',gap:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f5f5f5',border:'1px solid #e0e0e0',borderRadius:'8px',padding:'6px 12px',flex:1}}>
                    <span style={{color:'#888'}}>🔍</span>
                    <input placeholder="搜索产品..." style={{background:'none',border:'none',outline:'none',fontSize:'13px',width:'100%'}}/>
                  </div>
                  <select style={{border:'1px solid #e0e0e0',borderRadius:'8px',padding:'6px 12px',fontSize:'13px',outline:'none',background:'#fff',color:'#333'}}>
                    <option>全部分类</option>
                    <option>窗户</option>
                    <option>门</option>
                    <option>天窗</option>
                  </select>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['产品','状态','库存','分类','价格'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {products.map(p=>(
                      <tr key={p.id} style={{borderBottom:'1px solid #f5f5f5',cursor:'pointer'}} onClick={()=>setActiveNav('addproduct')}>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                            <div style={{width:'40px',height:'40px',borderRadius:'8px',overflow:'hidden',border:'1px solid #e5e5e5',flexShrink:0}}>
                              <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                            </div>
                            <span style={{fontWeight:'500',color:'#1a1a1a'}}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{padding:'12px 20px'}}><span style={S.badge('green')}>已上架</span></td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>有库存</td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>{p.category}</td>
                        <td style={{padding:'12px 20px',fontWeight:'600',color:'#1a1a1a'}}>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 添加产品 - Shopify风格 */}
          {activeNav==='addproduct' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
                <button onClick={()=>setActiveNav('products')} style={{background:'none',border:'none',cursor:'pointer',color:'#888',fontSize:'14px'}}>◎</button>
                <span style={{color:'#888'}}>›</span>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>添加产品</div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'16px'}}>
                <div>
                  <div style={S.card}>
                    <div style={{padding:'20px'}}>
                      <div style={{marginBottom:'16px'}}>
                        <label style={S.label}>标题</label>
                        <input value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} placeholder="短袖T恤" style={S.input}/>
                      </div>
                      <div>
                        <label style={S.label}>描述</label>
                        <div style={{border:'1px solid #d0d0d0',borderRadius:'8px',overflow:'hidden'}}>
                          <div style={{padding:'8px 12px',borderBottom:'1px solid #e5e5e5',display:'flex',gap:'6px',background:'#fafafa'}}>
                            {['B','I','U','A'].map(t=><button key={t} style={{background:'none',border:'none',cursor:'pointer',padding:'3px 6px',borderRadius:'4px',fontSize:'13px',fontWeight:'600',color:'#555'}}>{t}</button>)}
                          </div>
                          <textarea value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} placeholder="输入产品描述..." rows={6}
                            style={{width:'100%',border:'none',outline:'none',padding:'12px',fontSize:'14px',resize:'vertical',boxSizing:'border-box',color:'#333'}}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={S.card}>
                    <div style={{padding:'20px'}}>
                      <div style={S.cardTitle}>媒体文件</div>
                      <div style={{border:'2px dashed #d0d0d0',borderRadius:'8px',padding:'40px',textAlign:'center',marginTop:'12px',background:'#fafafa'}}>
                        <div style={{fontSize:'24px',marginBottom:'8px'}}>🖼️</div>
                        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'8px'}}>
                          <button style={S.btn()}>上传新文件</button>
                          <button style={S.btn()}>选择现有文件</button>
                        </div>
                        <div style={{fontSize:'12px',color:'#888'}}>支持图片、视频或 3D 模型</div>
                      </div>
                      <div style={{marginTop:'12px'}}>
                        <label style={S.label}>图片链接</label>
                        <input value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} placeholder="https://..." style={S.input}/>
                      </div>
                    </div>
                  </div>

                  <div style={S.card}>
                    <div style={{padding:'20px'}}>
                      <div style={{marginBottom:'16px'}}>
                        <label style={S.label}>类别</label>
                        <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})} style={{...S.input,background:'#fff'}}>
                          <option value="">选择产品类别</option>
                          <option value="窗户">窗户</option>
                          <option value="门">门</option>
                          <option value="天窗">天窗</option>
                        </select>
                        <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>确定税率并添加元字段，以改进搜索、筛选和跨渠道销售</div>
                      </div>
                    </div>
                  </div>

                  <div style={S.card}>
                    <div style={{padding:'20px'}}>
                      <div style={S.cardTitle}>价格</div>
                      <div style={{marginTop:'12px'}}>
                        <label style={S.label}>价格</label>
                        <div style={{display:'flex',alignItems:'center',border:'1px solid #d0d0d0',borderRadius:'8px',overflow:'hidden'}}>
                          <span style={{padding:'9px 12px',background:'#f5f5f5',color:'#555',borderRight:'1px solid #d0d0d0',fontSize:'14px'}}>¥</span>
                          <input value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} placeholder="0.00" style={{flex:1,border:'none',outline:'none',padding:'9px 12px',fontSize:'14px'}}/>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:'8px',marginTop:'10px'}}>
                        {['原价','单价','收取税款 是','单件成本'].map(t=>(
                          <span key={t} style={{fontSize:'12px',color:'#4f46e5',cursor:'pointer',padding:'4px 8px',background:'#f0f0ff',borderRadius:'6px'}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'8px'}}>
                    <button onClick={()=>setActiveNav('products')} style={S.btn()}>取消</button>
                    <button style={S.btn('#4f46e5')}>保存产品</button>
                  </div>
                </div>

                <div>
                  <div style={S.card}>
                    <div style={{padding:'16px'}}>
                      <div style={S.cardTitle}>状态</div>
                      <select style={{...S.input,marginTop:'10px',background:'#fff'}}>
                        <option>已上架</option>
                        <option>草稿</option>
                        <option>已下架</option>
                      </select>
                    </div>
                  </div>

                  <div style={S.card}>
                    <div style={{padding:'16px'}}>
                      <div style={S.cardTitle}>发布</div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'10px',color:'#555',fontSize:'13px'}}>
                        <span>📢</span>
                        <span>所有渠道</span>
                      </div>
                    </div>
                  </div>

                  <div style={S.card}>
                    <div style={{padding:'16px'}}>
                      <div style={S.cardTitle}>产品组织</div>
                      <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'10px'}}>
                        {[{l:'类型',ph:'无'},{l:'厂商',ph:'无'}].map(f=>(
                          <div key={f.l}>
                            <label style={{...S.label,fontSize:'12px',color:'#555'}}>{f.l}</label>
                            <select style={{...S.input,background:'#fff',fontSize:'13px'}}>
                              <option>{f.ph}</option>
                            </select>
                          </div>
                        ))}
                        <div>
                          <label style={{...S.label,fontSize:'12px',color:'#555'}}>产品系列</label>
                          <div style={{border:'1px solid #d0d0d0',borderRadius:'8px',padding:'9px 12px',fontSize:'13px',color:'#4f46e5',cursor:'pointer'}}>⊕ 添加产品系列</div>
                        </div>
                        <div>
                          <label style={{...S.label,fontSize:'12px',color:'#555'}}>标记</label>
                          <div style={{border:'1px solid #d0d0d0',borderRadius:'8px',padding:'9px 12px',fontSize:'13px',color:'#4f46e5',cursor:'pointer'}}>⊕ 添加标记</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 报价管理 */}
          {activeNav==='quotes' && (
            <div>
              <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>订单</div>
              <div style={{display:'flex',gap:'10px',marginBottom:'16px'}}>
                {[{l:'全部',v:quotes.length},{l:'待跟进',v:pending},{l:'已联系',v:quotes.filter(q=>q.status==='已联系').length},{l:'已成交',v:quotes.filter(q=>q.status==='已成交').length}].map((t,i)=>(
                  <div key={i} style={{background:'#fff',border:'1px solid #e5e5e5',borderRadius:'8px',padding:'10px 16px',display:'flex',gap:'8px',alignItems:'center',cursor:'pointer'}}>
                    <span style={{fontWeight:'700',color:'#1a1a1a',fontSize:'18px'}}>{t.v}</span>
                    <span style={{color:'#888',fontSize:'13px'}}>{t.l}</span>
                  </div>
                ))}
              </div>

              <div style={S.card}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['客户','联系方式','产品','状态','时间','操作'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f5f5f5'}}>
                        <td style={{padding:'12px 20px',fontWeight:'500',color:'#1a1a1a'}}>{q.name}</td>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{fontSize:'13px',color:'#555'}}>{q.email}</div>
                          <div style={{fontSize:'12px',color:'#888'}}>{q.phone}</div>
                        </td>
                        <td style={{padding:'12px 20px'}}><span style={S.badge()}>{q.product_type||'未指定'}</span></td>
                        <td style={{padding:'12px 20px'}}>
                          <select value={q.status} onChange={async e=>{
                            const s=e.target.value;
                            await fetch('https://window-server.onrender.com/api/quotes/'+q.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:s})});
                            setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s}:x));
                          }} style={{border:'1px solid #e0e0e0',borderRadius:'6px',padding:'5px 10px',fontSize:'12px',cursor:'pointer',outline:'none',background:'#fff',color:'#1a1a1a'}}>
                            <option value="待跟进">⏳ 待跟进</option>
                            <option value="已联系">✅ 已联系</option>
                            <option value="已成交">🎉 已成交</option>
                          </select>
                        </td>
                        <td style={{padding:'12px 20px',color:'#888',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                        <td style={{padding:'12px 20px'}}>
                          <button style={{background:'none',border:'1px solid #e0e0e0',borderRadius:'6px',padding:'5px 12px',cursor:'pointer',fontSize:'12px',color:'#555'}}>详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['customers','analytics','growth','discounts','content','store','ai','settings'].includes(activeNav) && (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>🚧</div>
              <div style={{fontSize:'18px',color:'#888',fontWeight:'500'}}>正在开发中</div>
              <div style={{fontSize:'13px',color:'#aaa',marginTop:'6px'}}>Coming Soon</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;

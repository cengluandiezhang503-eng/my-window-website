import { useState, useEffect } from 'react';

function Admin() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeSubPage, setActiveSubPage] = useState('');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [series, setSeries] = useState([]);
  const [expandedNav, setExpandedNav] = useState('products');
  const [newProduct, setNewProduct] = useState({ name:'', description:'', price:'', category:'', image:'', status:'已上架', series_id:'', tag:'' });
  const [newSeries, setNewSeries] = useState({ name:'', description:'', tag:'', image:'' });

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products').then(r=>r.json()).then(setProducts).catch(()=>{});
    fetch('https://window-server.onrender.com/api/quotes').then(r=>r.json()).then(setQuotes).catch(()=>{});
    fetch('https://window-server.onrender.com/api/series').then(r=>r.json()).then(setSeries).catch(()=>{});
  }, []);

  const pending = quotes.filter(q=>q.status==='待跟进').length;

  const F = {
    wrap: { display:'flex', height:'100vh', background:'#f6f6f7', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', fontSize:'14px', color:'#202223' },
    sb: { width:'240px', flexShrink:0, background:'#1c1c1c', display:'flex', flexDirection:'column', overflowY:'auto' },
    sbTop: { padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid #333' },
    sbStore: { width:'32px', height:'32px', background:'#5c6ac4', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', color:'#fff', fontWeight:'700', flexShrink:0 },
    main: { flex:1, display:'flex', flexDirection:'column', overflow:'hidden' },
    topbar: { height:'56px', background:'#fff', borderBottom:'1px solid #e1e3e5', display:'flex', alignItems:'center', padding:'0 20px', gap:'12px' },
    content: { flex:1, overflowY:'auto', padding:'20px', background:'#f6f6f7' },
    card: { background:'#fff', borderRadius:'8px', border:'1px solid #e1e3e5', marginBottom:'16px' },
    cardHeader: { padding:'16px 20px', borderBottom:'1px solid #e1e3e5' },
    cardTitle: { fontSize:'14px', fontWeight:'600', color:'#202223' },
    input: { width:'100%', border:'1px solid #8c9196', borderRadius:'6px', padding:'8px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#202223', background:'#fff', lineHeight:'1.5' },
    select: { width:'100%', border:'1px solid #8c9196', borderRadius:'6px', padding:'8px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#202223', background:'#fff', cursor:'pointer' },
    label: { fontSize:'14px', fontWeight:'500', color:'#202223', marginBottom:'4px', display:'block' },
    labelSub: { fontSize:'12px', color:'#6d7175', marginTop:'4px' },
    btnPrimary: { background:'#008060', color:'#fff', border:'none', borderRadius:'6px', padding:'8px 16px', cursor:'pointer', fontSize:'14px', fontWeight:'500' },
    btnSecondary: { background:'#fff', color:'#202223', border:'1px solid #8c9196', borderRadius:'6px', padding:'8px 16px', cursor:'pointer', fontSize:'14px' },
    btnDanger: { background:'#fff', color:'#d72c0d', border:'1px solid #d72c0d', borderRadius:'6px', padding:'8px 16px', cursor:'pointer', fontSize:'14px' },
  };

  const navItem = (id, label, badge) => {
    const on = activePage===id && activeSubPage==='';
    return (
      <div onClick={()=>{setActivePage(id);setActiveSubPage('');}} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 12px',cursor:'pointer',borderRadius:'6px',margin:'1px 8px',color:on?'#fff':'#b0b8c1',background:on?'rgba(255,255,255,0.15)':'transparent',fontSize:'13px',fontWeight:on?'500':'400'}}>
        <span style={{flex:1}}>{label}</span>
        {badge>0&&<span style={{background:'#d82c0d',color:'#fff',fontSize:'11px',padding:'1px 6px',borderRadius:'10px',fontWeight:'600'}}>{badge}</span>}
      </div>
    );
  };

  const subItem = (pageId, subId, label) => {
    const on = activePage===pageId && activeSubPage===subId;
    return (
      <div onClick={()=>{setActivePage(pageId);setActiveSubPage(subId);}} style={{display:'flex',alignItems:'center',padding:'7px 12px 7px 36px',cursor:'pointer',borderRadius:'6px',margin:'1px 8px',color:on?'#fff':'#8c9196',background:on?'rgba(255,255,255,0.15)':'transparent',fontSize:'13px'}}>
        {label}
      </div>
    );
  };

  const badge = (status) => {
    const map = {
      '已上架':{bg:'#aee9d1',c:'#003d29'},
      '草稿':{bg:'#e4e5e7',c:'#4a4a4a'},
      '已下架':{bg:'#ffd79d',c:'#3d1e00'},
      '待跟进':{bg:'#ffd79d',c:'#3d1e00'},
      '已联系':{bg:'#aee9d1',c:'#003d29'},
      '已成交':{bg:'#b4e1fa',c:'#0d3554'},
    };
    const s = map[status]||{bg:'#e4e5e7',c:'#4a4a4a'};
    return <span style={{background:s.bg,color:s.c,padding:'3px 8px',borderRadius:'4px',fontSize:'12px',fontWeight:'500'}}>{status}</span>;
  };

  const PageTitle = ({title, action, actionLabel}) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
      <h1 style={{fontSize:'20px',fontWeight:'600',color:'#202223',margin:0}}>{title}</h1>
      {action&&<button onClick={action} style={F.btnPrimary}>{actionLabel}</button>}
    </div>
  );

  const FormField = ({label, sub, children}) => (
    <div style={{marginBottom:'16px'}}>
      {label&&<label style={F.label}>{label}</label>}
      {children}
      {sub&&<div style={F.labelSub}>{sub}</div>}
    </div>
  );

  return (
    <div style={F.wrap}>

      {/* 侧边栏 */}
      <div style={F.sb}>
        <div style={F.sbTop}>
          <div style={F.sbStore}>W</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'13px',fontWeight:'600',color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>我的窗户公司</div>
            <div style={{fontSize:'11px',color:'#8c9196'}}>管理后台</div>
          </div>
          <span style={{color:'#8c9196',fontSize:'12px'}}>▼</span>
        </div>

        <div style={{padding:'8px 0',flex:1}}>
          {navItem('dashboard','🏠 主页',0)}
          {navItem('quotes','📋 订单',pending)}

          <div style={{margin:'4px 0',borderTop:'1px solid #333',paddingTop:'4px'}}>
            <div onClick={()=>setExpandedNav(expandedNav==='products'?'':'products')} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 12px',cursor:'pointer',borderRadius:'6px',margin:'1px 8px',color:activePage==='products'||activePage==='series'?'#fff':'#b0b8c1',background:activePage==='products'||activePage==='series'?'rgba(255,255,255,0.1)':'transparent',fontSize:'13px'}}>
              <span style={{flex:1}}>◎ 产品</span>
              <span style={{fontSize:'10px'}}>{expandedNav==='products'?'▲':'▼'}</span>
            </div>
            {expandedNav==='products'&&(
              <>
                {subItem('products','list','产品系列')}
                {subItem('series','list','系列管理')}
                {subItem('products','inventory','库存')}
                {subItem('products','purchase','采购订单')}
                {subItem('products','transfer','转移')}
                {subItem('products','gift','礼品卡')}
              </>
            )}
          </div>

          {navItem('customers','👤 客户',0)}
          {navItem('growth','📊 增长',0)}
          {navItem('discounts','🏷️ 折扣',0)}
          {navItem('content','📝 内容',0)}
          {navItem('markets','🌍 Markets',0)}
          {navItem('finance','💰 财务',0)}
          {navItem('analytics','📈 分析',0)}

          <div style={{margin:'4px 0',borderTop:'1px solid #333',paddingTop:'4px'}}>
            <div style={{padding:'8px 12px 4px',fontSize:'11px',color:'#6d7175',letterSpacing:'0.5px',textTransform:'uppercase'}}>销售渠道</div>
            {navItem('store','🛍️ 在线商店',0)}
            {navItem('ai','🤖 智能体',0)}
          </div>

          <div style={{margin:'4px 0',borderTop:'1px solid #333',paddingTop:'4px'}}>
            <div style={{padding:'8px 12px 4px',fontSize:'11px',color:'#6d7175',letterSpacing:'0.5px',textTransform:'uppercase'}}>应用</div>
            {navItem('apps','📦 应用',0)}
          </div>
        </div>

        <div style={{borderTop:'1px solid #333',padding:'8px 0'}}>
          {navItem('settings','⚙️ 设置',0)}
        </div>
      </div>

      {/* 主内容 */}
      <div style={F.main}>
        <div style={F.topbar}>
          <div style={{flex:1,display:'flex',alignItems:'center',gap:'8px',background:'#f6f6f7',border:'1px solid #e1e3e5',borderRadius:'8px',padding:'7px 12px',maxWidth:'480px'}}>
            <span style={{color:'#8c9196'}}>🔍</span>
            <input placeholder="搜索..." style={{background:'none',border:'none',outline:'none',fontSize:'14px',width:'100%',color:'#202223'}}/>
          </div>
          <div style={{flex:1}}></div>
          <div style={{width:'32px',height:'32px',background:'#f6f6f7',border:'1px solid #e1e3e5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'16px'}}>🔔</div>
          <div style={{width:'32px',height:'32px',background:'#5c6ac4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',color:'#fff',fontWeight:'700',cursor:'pointer'}}>A</div>
        </div>

        <div style={F.content}>

          {/* 主页 */}
          {activePage==='dashboard'&&(
            <div>
              <PageTitle title="主页" />
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'20px'}}>
                {[{l:'总产品数',v:products.length,c:'#008060'},{l:'报价申请',v:quotes.length,c:'#5c6ac4'},{l:'待跟进',v:pending,c:'#d72c0d'},{l:'转化率',v:'34%',c:'#007ace'}].map((s,i)=>(
                  <div key={i} style={{...F.card,padding:'20px',marginBottom:0,borderTop:`3px solid ${s.c}`}}>
                    <div style={{fontSize:'12px',color:'#6d7175',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>{s.l}</div>
                    <div style={{fontSize:'28px',fontWeight:'600',color:'#202223'}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={F.card}>
                <div style={{...F.cardHeader,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={F.cardTitle}>最新报价申请</div>
                  <button onClick={()=>setActivePage('quotes')} style={F.btnSecondary}>查看全部</button>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{background:'#f6f6f7'}}>{['客户','邮箱','产品','状态','时间'].map(h=><th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'12px',color:'#6d7175',fontWeight:'500',borderBottom:'1px solid #e1e3e5'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.slice(0,5).map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f1f2f3'}}>
                        <td style={{padding:'12px 16px',fontWeight:'500'}}>{q.name}</td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'13px'}}>{q.email}</td>
                        <td style={{padding:'12px 16px'}}>{badge(q.product_type||'未指定')}</td>
                        <td style={{padding:'12px 16px'}}>{badge(q.status)}</td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 产品列表 */}
          {activePage==='products'&&activeSubPage===''&&(
            <div>
              <PageTitle title="产品" action={()=>setActiveSubPage('add')} actionLabel="+ 添加产品" />
              <div style={F.card}>
                <div style={{padding:'12px 16px',borderBottom:'1px solid #e1e3e5',display:'flex',gap:'8px',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#fff',border:'1px solid #8c9196',borderRadius:'6px',padding:'6px 12px',flex:1,maxWidth:'300px'}}>
                    <span style={{color:'#8c9196',fontSize:'13px'}}>🔍</span>
                    <input placeholder="搜索产品..." style={{background:'none',border:'none',outline:'none',fontSize:'13px',width:'100%'}}/>
                  </div>
                  <select style={{...F.select,width:'auto',padding:'6px 12px'}}>
                    <option>全部状态</option>
                    <option>已上架</option><option>草稿</option><option>已下架</option>
                  </select>
                  <select style={{...F.select,width:'auto',padding:'6px 12px'}}>
                    <option>全部分类</option>
                    <option>窗户</option><option>门</option><option>天窗</option>
                  </select>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{background:'#f6f6f7'}}>{['产品','状态','库存','分类','价格','操作'].map(h=><th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'12px',color:'#6d7175',fontWeight:'500',borderBottom:'1px solid #e1e3e5'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {products.map(p=>(
                      <tr key={p.id} style={{borderBottom:'1px solid #f1f2f3',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                            <div style={{width:'40px',height:'40px',borderRadius:'6px',overflow:'hidden',border:'1px solid #e1e3e5',flexShrink:0,background:'#f6f6f7'}}>
                              <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                            </div>
                            <span style={{fontWeight:'500',color:'#202223'}}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{padding:'12px 16px'}}>{badge('已上架')}</td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'13px'}}>有库存</td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'13px'}}>{p.category}</td>
                        <td style={{padding:'12px 16px',fontWeight:'500',color:'#202223'}}>{p.price}</td>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{display:'flex',gap:'6px'}}>
                            <button onClick={()=>setActiveSubPage('add')} style={{...F.btnSecondary,padding:'5px 10px',fontSize:'12px'}}>编辑</button>
                            <button style={{...F.btnDanger,padding:'5px 10px',fontSize:'12px'}}>删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{padding:'12px 16px',borderTop:'1px solid #e1e3e5',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:'13px',color:'#6d7175'}}>共 {products.length} 个产品</div>
                  <div style={{display:'flex',gap:'4px'}}>
                    <button style={{...F.btnSecondary,padding:'6px 12px',fontSize:'12px'}}>上一页</button>
                    <button style={{...F.btnSecondary,padding:'6px 12px',fontSize:'12px'}}>下一页</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 添加产品 - 完全复刻 Shopify */}
          {activePage==='products'&&activeSubPage==='add'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
                <button onClick={()=>setActiveSubPage('')} style={{background:'none',border:'none',cursor:'pointer',color:'#5c6ac4',fontSize:'13px',display:'flex',alignItems:'center',gap:'4px'}}>
                  ◎ 产品
                </button>
                <span style={{color:'#8c9196'}}>›</span>
                <h1 style={{fontSize:'20px',fontWeight:'600',color:'#202223',margin:0}}>添加产品</h1>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'16px'}}>
                {/* 左边主内容 */}
                <div>
                  {/* 基本信息 */}
                  <div style={F.card}>
                    <div style={{padding:'16px 20px'}}>
                      <FormField label="标题">
                        <input value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} placeholder="短袖T恤" style={F.input}/>
                      </FormField>
                      <FormField label="描述">
                        <div style={{border:'1px solid #8c9196',borderRadius:'6px',overflow:'hidden'}}>
                          <div style={{padding:'6px 10px',borderBottom:'1px solid #e1e3e5',background:'#f6f6f7',display:'flex',gap:'2px',alignItems:'center',flexWrap:'wrap'}}>
                            {['✦','段落 ▼','|','B','I','U','A▼','|','≡▼','⇥','🔗','🖼️','▶','⊞','…','</>'].map((t,i)=>(
                              <button key={i} style={{background:'none',border:'none',cursor:'pointer',padding:'3px 6px',borderRadius:'4px',fontSize:'12px',color:'#202223',fontWeight:['B'].includes(t)?'700':'400'}}>{t}</button>
                            ))}
                          </div>
                          <textarea value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} rows={6}
                            style={{width:'100%',border:'none',outline:'none',padding:'12px',fontSize:'14px',resize:'vertical',boxSizing:'border-box',color:'#202223',fontFamily:'inherit'}}/>
                        </div>
                      </FormField>
                    </div>
                  </div>

                  {/* 媒体文件 */}
                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>媒体文件</div></div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{border:'2px dashed #8c9196',borderRadius:'8px',padding:'40px 20px',textAlign:'center',background:'#f6f6f7',marginBottom:'12px'}}>
                        <div style={{fontSize:'32px',marginBottom:'12px'}}>⬆️</div>
                        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'8px'}}>
                          <button style={F.btnSecondary}>上传新文件</button>
                          <button style={F.btnSecondary}>选择现有文件</button>
                        </div>
                        <div style={{fontSize:'12px',color:'#6d7175'}}>支持图片、视频或 3D 模型</div>
                      </div>
                      <FormField label="图片链接（URL）">
                        <input value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} placeholder="https://images.unsplash.com/..." style={F.input}/>
                      </FormField>
                    </div>
                  </div>

                  {/* 类别 */}
                  <div style={F.card}>
                    <div style={{padding:'16px 20px'}}>
                      <FormField label="类别" sub="确定税率并添加元字段，以改进搜索、筛选和跨渠道销售">
                        <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})} style={F.select}>
                          <option value="">选择产品类别</option>
                          <option value="窗户">窗户</option>
                          <option value="门">门</option>
                          <option value="天窗">天窗</option>
                        </select>
                      </FormField>
                    </div>
                  </div>

                  {/* 价格 */}
                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>价格</div></div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
                        <FormField label="价格">
                          <div style={{display:'flex',alignItems:'center',border:'1px solid #8c9196',borderRadius:'6px',overflow:'hidden'}}>
                            <span style={{padding:'8px 12px',background:'#f6f6f7',color:'#6d7175',borderRight:'1px solid #8c9196',fontSize:'14px'}}>¥</span>
                            <input value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} placeholder="0.00" style={{flex:1,border:'none',outline:'none',padding:'8px 12px',fontSize:'14px'}}/>
                          </div>
                        </FormField>
                        <FormField label="原价">
                          <div style={{display:'flex',alignItems:'center',border:'1px solid #8c9196',borderRadius:'6px',overflow:'hidden'}}>
                            <span style={{padding:'8px 12px',background:'#f6f6f7',color:'#6d7175',borderRight:'1px solid #8c9196',fontSize:'14px'}}>¥</span>
                            <input placeholder="0.00" style={{flex:1,border:'none',outline:'none',padding:'8px 12px',fontSize:'14px'}}/>
                          </div>
                        </FormField>
                      </div>
                      <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                        {['单价','收取税款 是','单件成本'].map(t=>(
                          <span key={t} style={{fontSize:'13px',color:'#5c6ac4',cursor:'pointer',padding:'4px 10px',background:'#f0f1ff',borderRadius:'4px',border:'1px solid #c4caf6'}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 库存 */}
                  <div style={F.card}>
                    <div style={{...F.cardHeader,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={F.cardTitle}>库存</div>
                      <label style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',cursor:'pointer'}}>
                        <input type="checkbox" defaultChecked style={{accentColor:'#008060'}}/>
                        已跟踪库存
                      </label>
                    </div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
                        <FormField label="SKU（库存单位）">
                          <input placeholder="" style={F.input}/>
                        </FormField>
                        <FormField label="条形码（ISBN、UPC、GTIN 等）">
                          <input placeholder="" style={F.input}/>
                        </FormField>
                        <FormField label="数量">
                          <input placeholder="0" type="number" style={F.input}/>
                        </FormField>
                      </div>
                    </div>
                  </div>

                  {/* 运费 */}
                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>运费</div></div>
                    <div style={{padding:'16px 20px'}}>
                      <label style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',cursor:'pointer',marginBottom:'12px'}}>
                        <input type="checkbox" defaultChecked style={{accentColor:'#008060'}}/>
                        这是一件实物商品
                      </label>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                        <FormField label="重量">
                          <div style={{display:'flex',gap:'8px'}}>
                            <input placeholder="0.0" style={{...F.input,flex:1}}/>
                            <select style={{...F.select,width:'80px'}}>
                              <option>kg</option><option>g</option><option>lb</option>
                            </select>
                          </div>
                        </FormField>
                      </div>
                    </div>
                  </div>

                  {/* SEO */}
                  <div style={F.card}>
                    <div style={{...F.cardHeader,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={F.cardTitle}>搜索引擎列表</div>
                      <button style={{...F.btnSecondary,fontSize:'12px',padding:'5px 10px'}}>编辑 SEO</button>
                    </div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{border:'1px solid #e1e3e5',borderRadius:'6px',padding:'12px',background:'#f6f6f7'}}>
                        <div style={{fontSize:'18px',color:'#1a0dab',marginBottom:'4px'}}>{newProduct.name||'产品标题'}</div>
                        <div style={{fontSize:'13px',color:'#006621',marginBottom:'4px'}}>mywindow.com › products › {newProduct.name?.toLowerCase().replace(/\s/g,'-')||'product-title'}</div>
                        <div style={{fontSize:'13px',color:'#4d5156'}}>{newProduct.description?.slice(0,160)||'产品描述会显示在这里...'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'8px',paddingBottom:'20px'}}>
                    <button onClick={()=>setActiveSubPage('')} style={F.btnSecondary}>取消</button>
                    <button style={F.btnPrimary}>保存产品</button>
                  </div>
                </div>

                {/* 右边侧边栏 */}
                <div>
                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>状态</div></div>
                    <div style={{padding:'16px'}}>
                      <select value={newProduct.status} onChange={e=>setNewProduct({...newProduct,status:e.target.value})} style={F.select}>
                        <option value="已上架">已上架</option>
                        <option value="草稿">草稿</option>
                        <option value="已下架">已下架</option>
                      </select>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{...F.cardHeader,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={F.cardTitle}>发布</div>
                      <button style={{background:'none',border:'none',cursor:'pointer',color:'#5c6ac4',fontSize:'12px'}}>管理</button>
                    </div>
                    <div style={{padding:'16px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',color:'#202223',fontSize:'13px',padding:'8px 0',borderBottom:'1px solid #f1f2f3'}}>
                        <span style={{fontSize:'16px'}}>🛍️</span>
                        <span>在线商店</span>
                        <span style={{marginLeft:'auto',color:'#008060',fontSize:'12px'}}>✓</span>
                      </div>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>产品组织</div></div>
                    <div style={{padding:'16px'}}>
                      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                        <FormField label="类型">
                          <input placeholder="例：窗户" style={F.input}/>
                        </FormField>
                        <FormField label="厂商">
                          <input placeholder="例：我的窗户公司" style={F.input}/>
                        </FormField>
                        <FormField label="产品系列">
                          <select style={F.select}>
                            <option value="">无</option>
                            {series.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        </FormField>
                        <FormField label="标记">
                          <input value={newProduct.tag} onChange={e=>setNewProduct({...newProduct,tag:e.target.value})} placeholder="复古、棉质、夏季" style={F.input}/>
                          <div style={F.labelSub}>用逗号分隔标记</div>
                        </FormField>
                      </div>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>模板样式</div></div>
                    <div style={{padding:'16px'}}>
                      <select style={F.select}>
                        <option>默认产品</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 产品系列列表 */}
          {activePage==='series'&&activeSubPage==='list'&&(
            <div>
              <PageTitle title="产品系列" action={()=>setActiveSubPage('add')} actionLabel="+ 创建系列" />
              <div style={F.card}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{background:'#f6f6f7'}}>{['系列名称','描述','标签','产品数','操作'].map(h=><th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'12px',color:'#6d7175',fontWeight:'500',borderBottom:'1px solid #e1e3e5'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {series.length===0?(
                      <tr><td colSpan={5} style={{padding:'40px',textAlign:'center',color:'#6d7175'}}>
                        <div style={{fontSize:'32px',marginBottom:'12px'}}>📂</div>
                        <div style={{fontSize:'14px',fontWeight:'500',marginBottom:'4px'}}>暂无产品系列</div>
                        <div style={{fontSize:'13px',marginBottom:'12px'}}>点击右上角创建第一个产品系列</div>
                        <button onClick={()=>setActiveSubPage('add')} style={F.btnPrimary}>创建产品系列</button>
                      </td></tr>
                    ):series.map(s=>(
                      <tr key={s.id} style={{borderBottom:'1px solid #f1f2f3'}} onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            {s.image&&<div style={{width:'36px',height:'36px',borderRadius:'6px',overflow:'hidden',border:'1px solid #e1e3e5',flexShrink:0}}><img src={s.image} alt={s.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>}
                            <span style={{fontWeight:'500',color:'#5c6ac4',cursor:'pointer'}}>{s.name}</span>
                          </div>
                        </td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'13px'}}>{(s.description||'').slice(0,40)}{s.description?.length>40?'...':''}</td>
                        <td style={{padding:'12px 16px'}}>{s.tag&&<span style={{background:'#f0f1ff',color:'#5c6ac4',padding:'3px 8px',borderRadius:'4px',fontSize:'12px'}}>{s.tag}</span>}</td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'13px'}}>0 个产品</td>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{display:'flex',gap:'6px'}}>
                            <button style={{...F.btnSecondary,padding:'5px 10px',fontSize:'12px'}}>编辑</button>
                            <button onClick={async()=>{
                              await fetch('https://window-server.onrender.com/api/series/'+s.id,{method:'DELETE'});
                              setSeries(series.filter(x=>x.id!==s.id));
                            }} style={{...F.btnDanger,padding:'5px 10px',fontSize:'12px'}}>删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 添加产品系列 */}
          {activePage==='series'&&activeSubPage==='add'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
                <button onClick={()=>setActiveSubPage('list')} style={{background:'none',border:'none',cursor:'pointer',color:'#5c6ac4',fontSize:'13px'}}>产品系列</button>
                <span style={{color:'#8c9196'}}>›</span>
                <h1 style={{fontSize:'20px',fontWeight:'600',color:'#202223',margin:0}}>创建产品系列</h1>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'16px'}}>
                <div>
                  <div style={F.card}>
                    <div style={{padding:'16px 20px'}}>
                      <FormField label="标题">
                        <input value={newSeries.name} onChange={e=>setNewSeries({...newSeries,name:e.target.value})} placeholder="例：400系列" style={F.input}/>
                      </FormField>
                      <FormField label="描述">
                        <textarea value={newSeries.description} onChange={e=>setNewSeries({...newSeries,description:e.target.value})} placeholder="系列描述..." rows={5}
                          style={{...F.input,resize:'vertical'}}/>
                      </FormField>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>系列图片</div></div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{border:'2px dashed #8c9196',borderRadius:'8px',padding:'32px',textAlign:'center',background:'#f6f6f7',marginBottom:'12px'}}>
                        <div style={{fontSize:'32px',marginBottom:'8px'}}>🖼️</div>
                        <button style={F.btnSecondary}>上传图片</button>
                        <div style={{fontSize:'12px',color:'#6d7175',marginTop:'8px'}}>支持 JPG、PNG、GIF 格式</div>
                      </div>
                      <FormField label="图片链接">
                        <input value={newSeries.image} onChange={e=>setNewSeries({...newSeries,image:e.target.value})} placeholder="https://..." style={F.input}/>
                      </FormField>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>搜索引擎列表</div></div>
                    <div style={{padding:'16px 20px'}}>
                      <div style={{border:'1px solid #e1e3e5',borderRadius:'6px',padding:'12px',background:'#f6f6f7'}}>
                        <div style={{fontSize:'18px',color:'#1a0dab',marginBottom:'4px'}}>{newSeries.name||'系列标题'}</div>
                        <div style={{fontSize:'13px',color:'#006621',marginBottom:'4px'}}>mywindow.com › collections › {newSeries.name?.toLowerCase().replace(/\s/g,'-')||'series-title'}</div>
                        <div style={{fontSize:'13px',color:'#4d5156'}}>{newSeries.description?.slice(0,160)||'系列描述...'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',paddingBottom:'20px'}}>
                    <button onClick={()=>setActiveSubPage('list')} style={F.btnSecondary}>取消</button>
                    <button onClick={async()=>{
                      const res = await fetch('https://window-server.onrender.com/api/series',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(newSeries)});
                      if(res.ok){
                        const data = await res.json();
                        setSeries([...series, data.data||{...newSeries,id:Date.now()}]);
                        setNewSeries({name:'',description:'',tag:'',image:''});
                        setActiveSubPage('list');
                      }
                    }} style={F.btnPrimary}>保存系列</button>
                  </div>
                </div>

                <div>
                  <div style={F.card}>
                    <div style={{...F.cardHeader}}><div style={F.cardTitle}>系列状态</div></div>
                    <div style={{padding:'16px'}}>
                      <select style={F.select}>
                        <option>已发布</option>
                        <option>草稿</option>
                      </select>
                    </div>
                  </div>

                  <div style={F.card}>
                    <div style={{padding:'16px'}}>
                      <FormField label="标签">
                        <input value={newSeries.tag} onChange={e=>setNewSeries({...newSeries,tag:e.target.value})} placeholder="例：最畅销、高端精选" style={F.input}/>
                      </FormField>
                    </div>
                  </div>

                  <div style={{...F.card,padding:'16px'}}>
                    <div style={{fontSize:'13px',color:'#6d7175',lineHeight:'1.6'}}>
                      <strong style={{color:'#202223',display:'block',marginBottom:'4px'}}>💡 提示</strong>
                      产品系列帮助您将产品分组，方便客户浏览。创建后可以在产品编辑页面将产品添加到对应系列。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 报价管理 */}
          {activePage==='quotes'&&(
            <div>
              <PageTitle title="订单" />
              <div style={{display:'flex',gap:'0',marginBottom:'16px',border:'1px solid #e1e3e5',borderRadius:'8px',overflow:'hidden',background:'#fff',width:'fit-content'}}>
                {[{l:'全部',v:quotes.length},{l:'待跟进',v:pending},{l:'已联系',v:quotes.filter(q=>q.status==='已联系').length},{l:'已成交',v:quotes.filter(q=>q.status==='已成交').length}].map((t,i)=>(
                  <div key={i} style={{padding:'8px 16px',cursor:'pointer',borderRight:'1px solid #e1e3e5',fontSize:'13px',color:'#202223',background:i===0?'#f6f6f7':'#fff'}}>
                    {t.l} <span style={{background:'#e1e3e5',color:'#6d7175',padding:'1px 6px',borderRadius:'10px',fontSize:'11px',marginLeft:'4px'}}>{t.v}</span>
                  </div>
                ))}
              </div>

              <div style={F.card}>
                <div style={{padding:'12px 16px',borderBottom:'1px solid #e1e3e5',display:'flex',gap:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#fff',border:'1px solid #8c9196',borderRadius:'6px',padding:'6px 12px',flex:1,maxWidth:'300px'}}>
                    <span style={{color:'#8c9196'}}>🔍</span>
                    <input placeholder="搜索订单..." style={{background:'none',border:'none',outline:'none',fontSize:'13px',width:'100%'}}/>
                  </div>
                  <button style={{...F.btnSecondary,fontSize:'13px'}}>导出</button>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{background:'#f6f6f7'}}>{['客户','联系方式','产品','状态','时间','操作'].map(h=><th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'12px',color:'#6d7175',fontWeight:'500',borderBottom:'1px solid #e1e3e5'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f1f2f3'}} onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{fontWeight:'500',color:'#202223'}}>{q.name}</div>
                          <div style={{fontSize:'12px',color:'#6d7175'}}>{q.zip_code}</div>
                        </td>
                        <td style={{padding:'12px 16px'}}>
                          <div style={{fontSize:'13px',color:'#202223'}}>{q.email}</div>
                          <div style={{fontSize:'12px',color:'#6d7175'}}>{q.phone}</div>
                        </td>
                        <td style={{padding:'12px 16px'}}>{badge(q.product_type||'未指定')}</td>
                        <td style={{padding:'12px 16px'}}>
                          <select value={q.status} onChange={async e=>{
                            const s=e.target.value;
                            await fetch('https://window-server.onrender.com/api/quotes/'+q.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:s})});
                            setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s}:x));
                          }} style={{border:'1px solid #8c9196',borderRadius:'6px',padding:'5px 10px',fontSize:'12px',cursor:'pointer',outline:'none',background:'#fff',color:'#202223'}}>
                            <option value="待跟进">待跟进</option>
                            <option value="已联系">已联系</option>
                            <option value="已成交">已成交</option>
                          </select>
                        </td>
                        <td style={{padding:'12px 16px',color:'#6d7175',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                        <td style={{padding:'12px 16px'}}>
                          <button style={{...F.btnSecondary,padding:'5px 10px',fontSize:'12px'}}>详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['customers','growth','discounts','content','markets','finance','analytics','store','ai','apps','settings'].includes(activePage)&&(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>🚧</div>
              <div style={{fontSize:'18px',color:'#6d7175',fontWeight:'500'}}>正在开发中</div>
              <div style={{fontSize:'13px',color:'#8c9196',marginTop:'6px'}}>Coming Soon</div>
            </div>
          )}

          {activePage==='products'&&['inventory','purchase','transfer','gift'].includes(activeSubPage)&&(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>🚧</div>
              <div style={{fontSize:'18px',color:'#6d7175',fontWeight:'500'}}>正在开发中</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;

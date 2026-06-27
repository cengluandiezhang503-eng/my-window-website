import { useState, useEffect } from 'react';

function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newProd, setNewProd] = useState({ name:'', description:'', price:'', category:'', image:'' });

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products').then(r=>r.json()).then(setProducts);
    fetch('https://window-server.onrender.com/api/quotes').then(r=>r.json()).then(setQuotes);
  }, []);

  const pending = quotes.filter(q=>q.status==='待跟进').length;
  const titles = {dashboard:'控制台',products:'产品管理',series:'产品系列',quotes:'报价管理',customers:'客户管理',analytics:'数据分析',emails:'邮件记录',settings:'系统设置'};

  const ni = (id,icon,label,badge) => {
    const on = activeNav===id;
    return (
      <div key={id} onClick={()=>setActiveNav(id)} style={{display:'flex',alignItems:'center',gap:'9px',padding:'8px 14px',cursor:'pointer',color:on?'#818cf8':'#5050a0',background:on?'#13132a':'transparent',borderLeft:on?'2px solid #818cf8':'2px solid transparent',transition:'all 0.15s',fontSize:'12px'}}>
        <span style={{fontSize:'15px'}}>{icon}</span>
        <span style={{flex:1}}>{label}</span>
        {badge>0&&<span style={{background:'#4f46e5',color:'#fff',fontSize:'10px',padding:'1px 6px',borderRadius:'8px'}}>{badge}</span>}
      </div>
    );
  };

  const pill = (cat) => {
    const map = {窗户:{bg:'#13132a',c:'#818cf8'},门:{bg:'#0a2a1a',c:'#34d399'}};
    const s = map[cat]||{bg:'#2a1a0a',c:'#fbbf24'};
    return <span style={{background:s.bg,color:s.c,padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'600'}}>{cat}</span>;
  };

  return (
    <div style={{display:'flex',height:'100vh',background:'#0a0a0f',color:'#e0e0e8',fontFamily:'system-ui,sans-serif',fontSize:'13px',overflow:'hidden'}}>

      <div style={{width:'200px',flexShrink:0,background:'#0d0d14',borderRight:'1px solid #1e1e2e',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'16px',borderBottom:'1px solid #1e1e2e',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'30px',height:'30px',background:'#4f46e5',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px'}}>🏠</div>
          <div>
            <div style={{fontSize:'13px',fontWeight:'700',color:'#fff'}}>WindowOS</div>
            <div style={{fontSize:'9px',color:'#3a3a5a',letterSpacing:'2px'}}>ADMIN v2.0</div>
          </div>
        </div>

        <div style={{flex:1,padding:'10px 0',overflowY:'auto'}}>
          <div style={{padding:'8px 14px 3px',fontSize:'9px',color:'#2a2a4a',letterSpacing:'2px',textTransform:'uppercase'}}>Main</div>
          {ni('dashboard','⊞','Dashboard',0)}
          {ni('products','◈','Products',products.length)}
          {ni('series','◧','Series',0)}
          {ni('quotes','◎','Quotes',pending)}
          <div style={{padding:'12px 14px 3px',fontSize:'9px',color:'#2a2a4a',letterSpacing:'2px',textTransform:'uppercase'}}>System</div>
          {ni('customers','◉','Customers',0)}
          {ni('analytics','▣','Analytics',0)}
          {ni('emails','◈','Emails',0)}
          {ni('settings','⚙','Settings',0)}
        </div>

        <div style={{padding:'14px',borderTop:'1px solid #1e1e2e',display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'#4f46e5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#fff',fontWeight:'700'}}>A</div>
          <div>
            <div style={{fontSize:'11px',color:'#a0a0c0'}}>Admin</div>
            <div style={{fontSize:'10px',color:'#3a3a5a'}}>超级管理员</div>
          </div>
        </div>
      </div>

      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{height:'52px',background:'#0d0d14',borderBottom:'1px solid #1e1e2e',display:'flex',alignItems:'center',padding:'0 20px',gap:'12px',flexShrink:0}}>
          <div style={{flex:1,fontSize:'14px',fontWeight:'600',color:'#e0e0f0'}}>{titles[activeNav]}</div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#12121e',border:'1px solid #1e1e2e',borderRadius:'7px',padding:'5px 10px',width:'180px'}}>
            <span style={{color:'#3a3a5a',fontSize:'13px'}}>🔍</span>
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="搜索..." style={{background:'none',border:'none',outline:'none',color:'#7070a0',fontSize:'12px',width:'100%'}}/>
          </div>
          <div style={{width:'30px',height:'30px',background:'#12121e',border:'1px solid #1e1e2e',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',position:'relative'}}>
            🔔<div style={{position:'absolute',top:'5px',right:'5px',width:'5px',height:'5px',background:'#4f46e5',borderRadius:'50%'}}></div>
          </div>
        </div>

        <div style={{flex:1,overflowY:'auto',padding:'20px',background:'#0a0a0f'}}>

          {activeNav==='dashboard'&&(
            <div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'18px'}}>
                {[{l:'总产品数',v:products.length,c:'#4f46e5',ch:'+12%',up:true},{l:'报价申请',v:quotes.length,c:'#059669',ch:'+8%',up:true},{l:'待跟进',v:pending,c:'#d97706',ch:'-3%',up:false},{l:'转化率',v:'34%',c:'#dc2626',ch:'+5%',up:true}].map((s,i)=>(
                  <div key={i} style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'10px',padding:'14px',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:s.c}}></div>
                    <div style={{fontSize:'10px',color:'#3a3a5a',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px'}}>{s.l}</div>
                    <div style={{fontSize:'26px',fontWeight:'700',color:'#e0e0f0',marginBottom:'4px',letterSpacing:'-1px'}}>{s.v}</div>
                    <div style={{fontSize:'11px',color:s.up?'#34d399':'#f87171'}}>{s.up?'↑':'↓'} {s.ch} 本月</div>
                  </div>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'14px'}}>
                <div style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'10px',overflow:'hidden'}}>
                  <div style={{padding:'12px 14px',borderBottom:'1px solid #1e1e2e',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#c0c0e0'}}>📦 产品列表</div>
                    <button onClick={()=>setActiveNav('products')} style={{fontSize:'11px',color:'#4f46e5',background:'none',border:'none',cursor:'pointer'}}>查看全部 →</button>
                  </div>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['产品名称','分类','价格','状态'].map(h=><th key={h} style={{padding:'8px 14px',textAlign:'left',fontSize:'9px',color:'#2a2a4a',textTransform:'uppercase',letterSpacing:'1px',borderBottom:'1px solid #151525'}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {products.slice(0,5).map(p=>(
                        <tr key={p.id}>
                          <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                              <div style={{width:'28px',height:'28px',borderRadius:'5px',background:'#1a1a2e',overflow:'hidden',flexShrink:0}}><img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
                              <span style={{color:'#c0c0e0',fontWeight:'500'}}>{p.name}</span>
                            </div>
                          </td>
                          <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>{pill(p.category)}</td>
                          <td style={{padding:'10px 14px',borderBottom:'1px solid #111120',color:'#e0e0f0',fontWeight:'600'}}>{p.price}</td>
                          <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}><span style={{color:'#34d399',fontSize:'11px'}}>● 上架</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'10px',overflow:'hidden',display:'flex',flexDirection:'column'}}>
                  <div style={{padding:'12px 14px',borderBottom:'1px solid #1e1e2e',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#c0c0e0'}}>⚡ 最新动态</div>
                    <button onClick={()=>setActiveNav('quotes')} style={{fontSize:'11px',color:'#4f46e5',background:'none',border:'none',cursor:'pointer'}}>全部</button>
                  </div>
                  <div style={{flex:1}}>
                    {quotes.slice(0,4).map((q,i)=>(
                      <div key={q.id} style={{padding:'10px 14px',borderBottom:'1px solid #111120',display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{width:'26px',height:'26px',borderRadius:'50%',background:i%3===0?'#13132a':i%3===1?'#0a1a0f':'#1a1000',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'12px'}}>
                          {i%3===0?'📋':i%3===1?'✅':'📧'}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:'11px',color:'#6060a0',lineHeight:'1.4'}}><span style={{color:'#b0b0d0',fontWeight:'500'}}>{q.name}</span> 提交报价</div>
                          <div style={{fontSize:'10px',color:'#2a2a4a',marginTop:'2px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</div>
                        </div>
                        <span style={{background:q.status==='待跟进'?'#1a1000':q.status==='已联系'?'#0a1a0f':'#13132a',color:q.status==='待跟进'?'#fbbf24':q.status==='已联系'?'#34d399':'#818cf8',padding:'2px 7px',borderRadius:'20px',fontSize:'10px',fontWeight:'600',flexShrink:0}}>{q.status}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{padding:'14px',borderTop:'1px solid #1e1e2e'}}>
                    <div style={{fontSize:'9px',color:'#2a2a4a',textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:'8px'}}>报价趋势</div>
                    <div style={{display:'flex',alignItems:'flex-end',gap:'3px',height:'56px'}}>
                      {[40,55,45,70,60,80,95].map((h,i)=><div key={i} style={{flex:1,height:h+'%',background:i>=5?'#6366f1':'#4f46e5',borderRadius:'2px 2px 0 0',opacity:i>=5?1:0.6}}></div>)}
                    </div>
                    <div style={{display:'flex',gap:'3px',marginTop:'4px'}}>
                      {['一','二','三','四','五','六','日'].map(d=><div key={d} style={{flex:1,textAlign:'center',fontSize:'9px',color:'#2a2a4a'}}>周{d}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav==='products'&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <div style={{color:'#5050a0',fontSize:'12px'}}>共 {products.length} 个产品</div>
                <button onClick={()=>setShowAdd(!showAdd)} style={{background:'#4f46e5',color:'#fff',border:'none',borderRadius:'7px',padding:'7px 14px',cursor:'pointer',fontSize:'12px',fontWeight:'600'}}>+ 添加产品</button>
              </div>

              {showAdd&&(
                <div style={{background:'#0d0d14',border:'1px solid #4f46e5',borderRadius:'10px',padding:'18px',marginBottom:'14px'}}>
                  <div style={{fontSize:'13px',fontWeight:'600',color:'#c0c0e0',marginBottom:'14px'}}>添加新产品</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                    {[{k:'name',l:'产品名称',p:'例：双层隔热窗'},{k:'price',l:'价格',p:'例：从 ¥2,999 起'},{k:'category',l:'分类',p:'例：窗户'},{k:'image',l:'图片链接',p:'https://...'}].map(f=>(
                      <div key={f.k}>
                        <div style={{fontSize:'9px',color:'#3a3a5a',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'1.5px'}}>{f.l}</div>
                        <input value={newProd[f.k]} onChange={e=>setNewProd({...newProd,[f.k]:e.target.value})} placeholder={f.p}
                          style={{width:'100%',background:'#12121e',border:'1px solid #1e1e2e',borderRadius:'7px',padding:'8px 10px',color:'#c0c0e0',fontSize:'12px',outline:'none',boxSizing:'border-box'}}/>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:'12px'}}>
                    <div style={{fontSize:'9px',color:'#3a3a5a',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'1.5px'}}>产品描述</div>
                    <textarea value={newProd.description} onChange={e=>setNewProd({...newProd,description:e.target.value})} placeholder="产品详细描述..." rows={3}
                      style={{width:'100%',background:'#12121e',border:'1px solid #1e1e2e',borderRadius:'7px',padding:'8px 10px',color:'#c0c0e0',fontSize:'12px',outline:'none',resize:'none',boxSizing:'border-box'}}/>
                  </div>
                  <div style={{display:'flex',gap:'8px',marginTop:'14px'}}>
                    <button style={{background:'#4f46e5',color:'#fff',border:'none',borderRadius:'7px',padding:'8px 20px',cursor:'pointer',fontSize:'12px',fontWeight:'600'}}>保存产品</button>
                    <button onClick={()=>setShowAdd(false)} style={{background:'#1e1e2e',color:'#6060a0',border:'none',borderRadius:'7px',padding:'8px 20px',cursor:'pointer',fontSize:'12px'}}>取消</button>
                  </div>
                </div>
              )}

              <div style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'10px',overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['产品','分类','价格','状态','操作'].map(h=><th key={h} style={{padding:'8px 14px',textAlign:'left',fontSize:'9px',color:'#2a2a4a',textTransform:'uppercase',letterSpacing:'1px',borderBottom:'1px solid #151525'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {products.filter(p=>!searchQuery||p.name.includes(searchQuery)||p.category.includes(searchQuery)).map(p=>(
                      <tr key={p.id}>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <div style={{width:'36px',height:'36px',borderRadius:'7px',overflow:'hidden',flexShrink:0,background:'#1a1a2e'}}><img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
                            <div>
                              <div style={{color:'#c0c0e0',fontWeight:'500'}}>{p.name}</div>
                              <div style={{color:'#3a3a5a',fontSize:'10px',marginTop:'1px'}}>{(p.description||'').slice(0,25)}...</div>
                            </div>
                          </div>
                        </td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>{pill(p.category)}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120',color:'#e0e0f0',fontWeight:'600'}}>{p.price}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}><span style={{color:'#34d399',fontSize:'11px'}}>● 上架</span></td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <div style={{display:'flex',gap:'6px'}}>
                            <button style={{background:'#13132a',color:'#818cf8',border:'none',borderRadius:'5px',padding:'4px 10px',cursor:'pointer',fontSize:'11px'}}>编辑</button>
                            <button style={{background:'#2a0a0a',color:'#f87171',border:'none',borderRadius:'5px',padding:'4px 10px',cursor:'pointer',fontSize:'11px'}}>删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav==='quotes'&&(
            <div>
              <div style={{display:'flex',gap:'10px',marginBottom:'16px'}}>
                {[{l:'全部',v:quotes.length,c:'#818cf8'},{l:'待跟进',v:pending,c:'#fbbf24'},{l:'已联系',v:quotes.filter(q=>q.status==='已联系').length,c:'#34d399'},{l:'已成交',v:quotes.filter(q=>q.status==='已成交').length,c:'#6366f1'}].map((t,i)=>(
                  <div key={i} style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'8px',padding:'10px 16px',display:'flex',gap:'8px',alignItems:'center'}}>
                    <span style={{color:t.c,fontSize:'20px',fontWeight:'700',letterSpacing:'-1px'}}>{t.v}</span>
                    <span style={{color:'#5050a0',fontSize:'12px'}}>{t.l}</span>
                  </div>
                ))}
              </div>

              <div style={{background:'#0d0d14',border:'1px solid #1e1e2e',borderRadius:'10px',overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['客户','联系方式','产品','状态','时间','操作'].map(h=><th key={h} style={{padding:'8px 14px',textAlign:'left',fontSize:'9px',color:'#2a2a4a',textTransform:'uppercase',letterSpacing:'1px',borderBottom:'1px solid #151525'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.map(q=>(
                      <tr key={q.id}>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <div style={{color:'#c0c0e0',fontWeight:'500',fontSize:'12px'}}>{q.name}</div>
                          <div style={{color:'#3a3a5a',fontSize:'10px'}}>{q.zip_code}</div>
                        </td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <div style={{color:'#6060a0',fontSize:'11px'}}>{q.email}</div>
                          <div style={{color:'#3a3a5a',fontSize:'10px'}}>{q.phone}</div>
                        </td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>{pill(q.product_type||'未指定')}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <select value={q.status} onChange={async e=>{
                            const s=e.target.value;
                            await fetch('https://window-server.onrender.com/api/quotes/'+q.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:s})});
                            setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s}:x));
                          }} style={{background:'#12121e',border:'1px solid #1e1e2e',borderRadius:'5px',color:q.status==='待跟进'?'#fbbf24':q.status==='已联系'?'#34d399':'#818cf8',padding:'4px 8px',fontSize:'11px',cursor:'pointer',outline:'none',fontWeight:'600'}}>
                            <option value="待跟进">⏳ 待跟进</option>
                            <option value="已联系">✅ 已联系</option>
                            <option value="已成交">🎉 已成交</option>
                          </select>
                        </td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120',color:'#3a3a5a',fontSize:'11px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid #111120'}}>
                          <button style={{background:'#13132a',color:'#818cf8',border:'none',borderRadius:'5px',padding:'4px 10px',cursor:'pointer',fontSize:'11px'}}>详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['series','customers','analytics','emails','settings'].includes(activeNav)&&(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>🚧</div>
              <div style={{fontSize:'16px',color:'#5050a0',fontWeight:'600'}}>正在开发中</div>
              <div style={{fontSize:'11px',color:'#2a2a4a',marginTop:'6px',letterSpacing:'2px'}}>COMING SOON</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;

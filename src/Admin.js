import { useState, useEffect } from 'react';

function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav2, setActiveNav2] = useState('');
  const [newProduct, setNewProduct] = useState({ name:'', description:'', price:'', category:'', image:'' });
  const [newSeries, setNewSeries] = useState({ name:'', description:'', tag:'', image:'' });

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products').then(r=>r.json()).then(setProducts).catch(()=>{});
    fetch('https://window-server.onrender.com/api/quotes').then(r=>r.json()).then(setQuotes).catch(()=>{});
    fetch('https://window-server.onrender.com/api/series').then(r=>r.json()).then(setSeries).catch(()=>{});
  }, []);

  const pending = quotes.filter(q=>q.status==='待跟进').length;

  const navStyle = (id) => ({
    display:'flex', alignItems:'center', gap:'10px', padding:'7px 10px',
    cursor:'pointer', borderRadius:'8px', margin:'1px 6px', fontSize:'13px',
    color: activeNav===id ? '#1a1a1a' : '#5c5c5c',
    background: activeNav===id ? '#f0f0f0' : 'transparent',
    fontWeight: activeNav===id ? '500' : '400',
    transition:'all 0.15s'
  });

  const card = { background:'#fff', borderRadius:'12px', border:'1px solid #e5e5e5', marginBottom:'16px' };
  const input = { width:'100%', border:'1px solid #d0d0d0', borderRadius:'8px', padding:'9px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1a1a1a', background:'#fff' };
  const label = { fontSize:'13px', fontWeight:'500', color:'#1a1a1a', marginBottom:'6px', display:'block' };
  const btnPrimary = { background:'#1a1a1a', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'13px', fontWeight:'500' };
  const btnSecondary = { background:'#fff', color:'#1a1a1a', border:'1px solid #d0d0d0', borderRadius:'8px', padding:'8px 16px', cursor:'pointer', fontSize:'13px' };

  const badge = (status) => {
    const map = { '已上架':{bg:'#d1fae5',c:'#065f46'}, '待审核':{bg:'#fef3c7',c:'#92400e'}, '已下架':{bg:'#fee2e2',c:'#991b1b'}, '待跟进':{bg:'#fef3c7',c:'#92400e'}, '已联系':{bg:'#d1fae5',c:'#065f46'}, '已成交':{bg:'#dbeafe',c:'#1e40af'} };
    const s = map[status] || {bg:'#f3f4f6',c:'#374151'};
    return <span style={{background:s.bg,color:s.c,padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'500'}}>{status}</span>;
  };

  return (
    <div style={{display:'flex',height:'100vh',background:'#f6f6f7',fontFamily:'-apple-system,BlinkMacSystemFont,system-ui,sans-serif',fontSize:'14px'}}>

      {/* 侧边栏 */}
      <div style={{width:'240px',flexShrink:0,background:'#fff',borderRight:'1px solid #e5e5e5',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'16px',display:'flex',alignItems:'center',gap:'10px',borderBottom:'1px solid #f0f0f0'}}>
          <div style={{width:'32px',height:'32px',background:'#1a1a1a',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px',color:'#fff'}}>🏠</div>
          <div>
            <div style={{fontSize:'13px',fontWeight:'600',color:'#1a1a1a'}}>我的窗户公司</div>
            <div style={{fontSize:'11px',color:'#888'}}>管理后台</div>
          </div>
        </div>

        <div style={{flex:1,overflowY:'auto',padding:'8px 0'}}>
          <div style={{padding:'4px 0'}}>
            <div style={navStyle('dashboard')} onClick={()=>setActiveNav('dashboard')}>
              <span style={{fontSize:'16px'}}>🏠</span><span>主页</span>
            </div>
            <div style={navStyle('quotes')} onClick={()=>setActiveNav('quotes')}>
              <span style={{fontSize:'16px'}}>📋</span><span style={{flex:1}}>订单</span>
              {pending>0&&<span style={{background:'#ef4444',color:'#fff',fontSize:'11px',padding:'1px 6px',borderRadius:'8px'}}>{pending}</span>}
            </div>
          </div>

          <div style={{borderTop:'1px solid #f0f0f0',margin:'4px 0',padding:'4px 0'}}>
            <div style={navStyle('products')} onClick={()=>{setActiveNav('products');setActiveNav2('');}}>
              <span style={{fontSize:'16px'}}>◎</span><span>产品</span>
            </div>
            <div style={{...navStyle('series'),paddingLeft:'32px',fontSize:'13px'}} onClick={()=>{setActiveNav('series');setActiveNav2('');}}>
              产品系列
            </div>
            <div style={{...navStyle(''),paddingLeft:'32px',fontSize:'13px',color:'#aaa'}}>
              库存
            </div>
            <div style={{...navStyle(''),paddingLeft:'32px',fontSize:'13px',color:'#aaa'}}>
              采购订单
            </div>
          </div>

          <div style={{borderTop:'1px solid #f0f0f0',margin:'4px 0',padding:'4px 0'}}>
            <div style={navStyle('customers')} onClick={()=>setActiveNav('customers')}>
              <span style={{fontSize:'16px'}}>👤</span><span>客户</span>
            </div>
            <div style={navStyle('analytics')} onClick={()=>setActiveNav('analytics')}>
              <span style={{fontSize:'16px'}}>📈</span><span>分析</span>
            </div>
            <div style={navStyle('content')} onClick={()=>setActiveNav('content')}>
              <span style={{fontSize:'16px'}}>📝</span><span>内容</span>
            </div>
          </div>

          <div style={{borderTop:'1px solid #f0f0f0',margin:'4px 0',padding:'4px 0'}}>
            <div style={{padding:'8px 16px 4px',fontSize:'11px',color:'#aaa',letterSpacing:'0.5px'}}>销售渠道</div>
            <div style={navStyle('store')} onClick={()=>setActiveNav('store')}>
              <span style={{fontSize:'16px'}}>🛍️</span><span>在线商店</span>
            </div>
          </div>
        </div>

        <div style={{borderTop:'1px solid #f0f0f0',padding:'8px 0'}}>
          <div style={navStyle('settings')} onClick={()=>setActiveNav('settings')}>
            <span style={{fontSize:'16px'}}>⚙️</span><span>设置</span>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>

        {/* 顶部栏 */}
        <div style={{height:'56px',background:'#fff',borderBottom:'1px solid #e5e5e5',display:'flex',alignItems:'center',padding:'0 20px',gap:'12px'}}>
          <div style={{flex:1,display:'flex',alignItems:'center',gap:'8px',background:'#f6f6f7',border:'1px solid #e5e5e5',borderRadius:'8px',padding:'7px 12px'}}>
            <span style={{color:'#888',fontSize:'14px'}}>🔍</span>
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="搜索..." style={{background:'none',border:'none',outline:'none',fontSize:'14px',width:'100%',color:'#333'}}/>
          </div>
          <div style={{width:'32px',height:'32px',background:'#f0f0f0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>🔔</div>
          <div style={{width:'32px',height:'32px',background:'#1a1a1a',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',color:'#fff',fontWeight:'700'}}>A</div>
        </div>

        <div style={{flex:1,overflowY:'auto',padding:'20px'}}>

          {/* 主页 */}
          {activeNav==='dashboard'&&(
            <div>
              <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a',marginBottom:'20px'}}>主页</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
                {[{l:'总产品数',v:products.length,c:'#4f46e5'},{l:'报价申请',v:quotes.length,c:'#059669'},{l:'待跟进',v:pending,c:'#d97706'},{l:'转化率',v:'34%',c:'#dc2626'}].map((s,i)=>(
                  <div key={i} style={{...card,padding:'20px',position:'relative',overflow:'hidden',marginBottom:0}}>
                    <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:s.c}}></div>
                    <div style={{fontSize:'12px',color:'#888',marginBottom:'8px'}}>{s.l}</div>
                    <div style={{fontSize:'28px',fontWeight:'700',color:'#1a1a1a'}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={card}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f0f0f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:'14px',fontWeight:'600'}}>最新报价申请</div>
                  <button onClick={()=>setActiveNav('quotes')} style={btnSecondary}>查看全部</button>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['客户','邮箱','产品','状态','时间'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.slice(0,5).map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f5f5f5'}}>
                        <td style={{padding:'12px 20px',fontWeight:'500'}}>{q.name}</td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>{q.email}</td>
                        <td style={{padding:'12px 20px'}}>{badge(q.product_type||'未指定')}</td>
                        <td style={{padding:'12px 20px'}}>{badge(q.status)}</td>
                        <td style={{padding:'12px 20px',color:'#888',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 产品列表 */}
          {activeNav==='products'&&activeNav2===''&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>产品</div>
                <button onClick={()=>setActiveNav2('addproduct')} style={btnPrimary}>+ 添加产品</button>
              </div>
              <div style={card}>
                <div style={{padding:'12px 20px',borderBottom:'1px solid #f0f0f0',display:'flex',gap:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f6f6f7',border:'1px solid #e5e5e5',borderRadius:'8px',padding:'6px 12px',flex:1}}>
                    <span style={{color:'#888'}}>🔍</span>
                    <input placeholder="搜索产品..." style={{background:'none',border:'none',outline:'none',fontSize:'13px',width:'100%'}}/>
                  </div>
                  <select style={{border:'1px solid #e0e0e0',borderRadius:'8px',padding:'6px 12px',fontSize:'13px',outline:'none',background:'#fff'}}>
                    <option>全部分类</option>
                    <option>窗户</option><option>门</option><option>天窗</option>
                  </select>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['产品','状态','分类','价格'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {products.map(p=>(
                      <tr key={p.id} style={{borderBottom:'1px solid #f5f5f5',cursor:'pointer'}} onClick={()=>setActiveNav2('addproduct')}>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                            <div style={{width:'40px',height:'40px',borderRadius:'8px',overflow:'hidden',border:'1px solid #e5e5e5',flexShrink:0}}>
                              <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                            </div>
                            <span style={{fontWeight:'500'}}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{padding:'12px 20px'}}>{badge('已上架')}</td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>{p.category}</td>
                        <td style={{padding:'12px 20px',fontWeight:'600'}}>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 添加产品 */}
          {activeNav==='products'&&activeNav2==='addproduct'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
                <button onClick={()=>setActiveNav2('')} style={{background:'none',border:'none',cursor:'pointer',color:'#888',fontSize:'20px'}}>←</button>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>添加产品</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'16px'}}>
                <div>
                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{marginBottom:'16px'}}>
                        <label style={label}>标题</label>
                        <input value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} placeholder="产品名称" style={input}/>
                      </div>
                      <div>
                        <label style={label}>描述</label>
                        <div style={{border:'1px solid #d0d0d0',borderRadius:'8px',overflow:'hidden'}}>
                          <div style={{padding:'8px 12px',borderBottom:'1px solid #e5e5e5',display:'flex',gap:'8px',background:'#fafafa'}}>
                            {['B','I','U','🔗','≡'].map(t=><button key={t} style={{background:'none',border:'none',cursor:'pointer',padding:'3px 8px',borderRadius:'4px',fontSize:'13px',fontWeight:'600',color:'#555',hover:'background:#f0f0f0'}}>{t}</button>)}
                          </div>
                          <textarea value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} placeholder="输入产品描述..." rows={5}
                            style={{width:'100%',border:'none',outline:'none',padding:'12px',fontSize:'14px',resize:'vertical',boxSizing:'border-box',color:'#333'}}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'12px'}}>媒体文件</div>
                      <div style={{border:'2px dashed #e0e0e0',borderRadius:'8px',padding:'32px',textAlign:'center',background:'#fafafa',marginBottom:'12px'}}>
                        <div style={{fontSize:'32px',marginBottom:'8px'}}>🖼️</div>
                        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'6px'}}>
                          <button style={btnSecondary}>上传新文件</button>
                          <button style={btnSecondary}>选择现有文件</button>
                        </div>
                        <div style={{fontSize:'12px',color:'#888'}}>支持图片、视频或 3D 模型</div>
                      </div>
                      <div>
                        <label style={label}>图片链接</label>
                        <input value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} placeholder="https://..." style={input}/>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{marginBottom:'16px'}}>
                        <label style={label}>类别</label>
                        <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})} style={{...input}}>
                          <option value="">选择产品类别</option>
                          <option value="窗户">窗户</option>
                          <option value="门">门</option>
                          <option value="天窗">天窗</option>
                        </select>
                        <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>确定税率并添加元字段，以改进搜索和筛选</div>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'12px'}}>价格</div>
                      <div>
                        <label style={label}>价格</label>
                        <div style={{display:'flex',alignItems:'center',border:'1px solid #d0d0d0',borderRadius:'8px',overflow:'hidden'}}>
                          <span style={{padding:'9px 12px',background:'#f5f5f5',color:'#555',borderRight:'1px solid #d0d0d0'}}>¥</span>
                          <input value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} placeholder="0.00" style={{flex:1,border:'none',outline:'none',padding:'9px 12px',fontSize:'14px'}}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'8px',justifyContent:'flex-end'}}>
                    <button onClick={()=>setActiveNav2('')} style={btnSecondary}>取消</button>
                    <button onClick={async function(){
                      const res = await fetch('https://window-server.onrender.com/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(newProduct)});
                      if(res.ok){
                        const data = await res.json();
                        setProducts([...products,data]);
                        setNewProduct({name:'',description:'',price:'',category:'',image:''});
                        setActiveNav2('');
                      }
                    }} style={btnPrimary}>保存产品</button>
                  </div>
                </div>

                <div>
                  <div style={card}>
                    <div style={{padding:'16px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'10px'}}>状态</div>
                      <select style={{...input}}>
                        <option>已上架</option>
                        <option>草稿</option>
                        <option>已下架</option>
                      </select>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'16px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'10px'}}>发布</div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',color:'#555',fontSize:'13px'}}>
                        <span>📢</span><span>所有渠道</span>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'16px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'12px'}}>产品组织</div>
                      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                        {[{l:'类型',ph:'无'},{l:'厂商',ph:'无'}].map(f=>(
                          <div key={f.l}>
                            <label style={{...label,fontSize:'12px',color:'#555'}}>{f.l}</label>
                            <select style={{...input,fontSize:'13px'}}><option>{f.ph}</option></select>
                          </div>
                        ))}
                        <div>
                          <label style={{...label,fontSize:'12px',color:'#555'}}>产品系列</label>
                          <select style={{...input,fontSize:'13px'}}>
                            <option value="">选择产品系列</option>
                            {series.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{...label,fontSize:'12px',color:'#555'}}>标记</label>
                          <input placeholder="添加标记..." style={{...input,fontSize:'13px'}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 产品系列 */}
          {activeNav==='series'&&activeNav2===''&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>产品系列</div>
                <button onClick={()=>setActiveNav2('addseries')} style={btnPrimary}>+ 创建系列</button>
              </div>
              <div style={card}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['系列名称','描述','标签','操作'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {series.length===0?(
                      <tr><td colSpan={4} style={{padding:'40px',textAlign:'center',color:'#888'}}>暂无产品系列，点击右上角创建</td></tr>
                    ):series.map(s=>(
                      <tr key={s.id} style={{borderBottom:'1px solid #f5f5f5'}}>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            {s.image&&<div style={{width:'40px',height:'40px',borderRadius:'8px',overflow:'hidden',border:'1px solid #e5e5e5',flexShrink:0}}><img src={s.image} alt={s.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>}
                            <span style={{fontWeight:'500'}}>{s.name}</span>
                          </div>
                        </td>
                        <td style={{padding:'12px 20px',color:'#555',fontSize:'13px'}}>{(s.description||'').slice(0,40)}...</td>
                        <td style={{padding:'12px 20px'}}>{s.tag&&<span style={{background:'#f0f0ff',color:'#4f46e5',padding:'3px 10px',borderRadius:'20px',fontSize:'12px'}}>{s.tag}</span>}</td>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{display:'flex',gap:'6px'}}>
                            <button style={{...btnSecondary,fontSize:'12px',padding:'5px 12px'}}>编辑</button>
                            <button onClick={async()=>{
                              await fetch('https://window-server.onrender.com/api/series/'+s.id,{method:'DELETE'});
                              setSeries(series.filter(x=>x.id!==s.id));
                            }} style={{background:'#fff',color:'#ef4444',border:'1px solid #fca5a5',borderRadius:'8px',padding:'5px 12px',cursor:'pointer',fontSize:'12px'}}>删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 创建产品系列 */}
          {activeNav==='series'&&activeNav2==='addseries'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
                <button onClick={()=>setActiveNav2('')} style={{background:'none',border:'none',cursor:'pointer',color:'#888',fontSize:'20px'}}>←</button>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#1a1a1a'}}>创建产品系列</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'16px'}}>
                <div>
                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{marginBottom:'16px'}}>
                        <label style={label}>系列名称</label>
                        <input value={newSeries.name} onChange={e=>setNewSeries({...newSeries,name:e.target.value})} placeholder="例：400系列" style={input}/>
                      </div>
                      <div style={{marginBottom:'16px'}}>
                        <label style={label}>描述</label>
                        <textarea value={newSeries.description} onChange={e=>setNewSeries({...newSeries,description:e.target.value})} placeholder="系列描述..." rows={4}
                          style={{...input,resize:'vertical'}}/>
                      </div>
                      <div>
                        <label style={label}>标签</label>
                        <input value={newSeries.tag} onChange={e=>setNewSeries({...newSeries,tag:e.target.value})} placeholder="例：最畅销、高端精选" style={input}/>
                      </div>
                    </div>
                  </div>

                  <div style={card}>
                    <div style={{padding:'20px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'12px'}}>系列图片</div>
                      <div style={{border:'2px dashed #e0e0e0',borderRadius:'8px',padding:'32px',textAlign:'center',background:'#fafafa',marginBottom:'12px'}}>
                        <div style={{fontSize:'32px',marginBottom:'8px'}}>🖼️</div>
                        <button style={btnSecondary}>上传图片</button>
                      </div>
                      <div>
                        <label style={label}>图片链接</label>
                        <input value={newSeries.image} onChange={e=>setNewSeries({...newSeries,image:e.target.value})} placeholder="https://..." style={input}/>
                      </div>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'8px',justifyContent:'flex-end'}}>
                    <button onClick={()=>setActiveNav2('')} style={btnSecondary}>取消</button>
                    <button onClick={async function(){
                      const res = await fetch('https://window-server.onrender.com/api/series',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(newSeries)});
                      if(res.ok){
                        const data = await res.json();
                        setSeries([...series,data.data||newSeries]);
                        setNewSeries({name:'',description:'',tag:'',image:''});
                        setActiveNav2('');
                      }
                    }} style={btnPrimary}>保存系列</button>
                  </div>
                </div>

                <div>
                  <div style={card}>
                    <div style={{padding:'16px'}}>
                      <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'10px'}}>系列状态</div>
                      <select style={input}>
                        <option>已发布</option>
                        <option>草稿</option>
                      </select>
                    </div>
                  </div>
                  <div style={{...card,padding:'16px'}}>
                    <div style={{fontSize:'13px',color:'#888',lineHeight:'1.6'}}>
                      产品系列可以帮助您将产品分组，方便客户浏览和筛选。创建系列后，可以在产品编辑页面将产品添加到对应系列。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 报价管理 */}
          {activeNav==='quotes'&&(
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
              <div style={card}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['客户','联系方式','产品','状态','时间','操作'].map(h=><th key={h} style={{padding:'10px 20px',textAlign:'left',fontSize:'12px',color:'#888',fontWeight:'500',borderBottom:'1px solid #f0f0f0',background:'#fafafa'}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {quotes.map(q=>(
                      <tr key={q.id} style={{borderBottom:'1px solid #f5f5f5'}}>
                        <td style={{padding:'12px 20px',fontWeight:'500'}}>{q.name}</td>
                        <td style={{padding:'12px 20px'}}>
                          <div style={{fontSize:'13px',color:'#555'}}>{q.email}</div>
                          <div style={{fontSize:'12px',color:'#888'}}>{q.phone}</div>
                        </td>
                        <td style={{padding:'12px 20px'}}>{badge(q.product_type||'未指定')}</td>
                        <td style={{padding:'12px 20px'}}>
                          <select value={q.status} onChange={async e=>{
                            const s=e.target.value;
                            await fetch('https://window-server.onrender.com/api/quotes/'+q.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:s})});
                            setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s}:x));
                          }} style={{border:'1px solid #e0e0e0',borderRadius:'6px',padding:'5px 10px',fontSize:'12px',cursor:'pointer',outline:'none',background:'#fff'}}>
                            <option value="待跟进">⏳ 待跟进</option>
                            <option value="已联系">✅ 已联系</option>
                            <option value="已成交">🎉 已成交</option>
                          </select>
                        </td>
                        <td style={{padding:'12px 20px',color:'#888',fontSize:'12px'}}>{new Date(q.created_at).toLocaleDateString('zh-CN')}</td>
                        <td style={{padding:'12px 20px'}}>
                          <button style={{...btnSecondary,fontSize:'12px',padding:'5px 12px'}}>详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['customers','analytics','content','store','settings'].includes(activeNav)&&(
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

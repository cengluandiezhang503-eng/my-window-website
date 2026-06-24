import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products/' + id)
      .then(function(res) { return res.json(); })
      .then(function(data) { setProduct(data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <p className="text-gray-500">加载中...</p>
    </div>
  );

  if (!product) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <p className="text-gray-500">产品不存在</p>
    </div>
  );

  const reasons = [
    {
      title: '引入更多光线',
      description: '多角度的玻璃设计，让更多自然光进入您的家。',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      title: '提升外观吸引力',
      description: '独特的外观设计，为您的家增添个性与魅力。',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400'
    },
    {
      title: '扩展室内空间',
      description: '向外延伸的设计，为您创造更多室内空间。',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400'
    },
    {
      title: '拓宽您的视野',
      description: '多窗组合设计，让您欣赏更广阔的景色。',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'
    }
  ];

  const projects = [
    {
      title: '早餐角的完美飘窗',
      description: '在这个厨房中，一扇巨大的飘窗将餐桌置于其中，让每顿饭都像野餐一样置身于自然之中。',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
    },
    {
      title: '经典传统美学飘窗',
      description: '白色漆木内饰和殖民格栅图案完美搭配，为这座经典风格的家增添永恒的传统美感。',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800'
    },
    {
      title: '落地弧形窗现代风格',
      description: '大型图片窗被用来创建这个令人印象深刻的弧形窗单元，营造出现代简约的视觉效果。',
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'
    },
    {
      title: '工匠风格经典飘窗',
      description: '这款400系列飘窗完美适合工匠风格的家，深色木纹和格栅设计彰显品位。',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
    }
  ];

  const faqs = [
    {
      question: '什么是飘窗？',
      answer: '飘窗是将三扇或更多窗户组合成一个单元，窗户以不同角度排列。一种流行的变体是弧形窗，四扇或更多窗户呈弧形排列。'
    },
    {
      question: '飘窗最适合安装在哪里？',
      answer: '由于其戏剧性和美观性，飘窗通常安装在家中的聚会空间。它们在客厅或餐厅中特别有影响力，也非常适合面向街道的房间。'
    },
    {
      question: '飘窗有多大？',
      answer: '飘窗的尺寸可以根据您的需求定制。我们提供多种尺寸选择，您可以联系我们的专家获取详细的尺寸信息。'
    },
    {
      question: '飘窗的优点是什么？',
      answer: '飘窗为家庭增添了很多价值，包括：多角度窗户创造的全景视野、多窗户带来的更多自然光、向外延伸创造的额外空间、独特外观增添的特色。'
    },
    {
      question: '飘窗的费用是多少？',
      answer: '飘窗的确切费用取决于许多不同因素，包括所选产品系列。一般来说，飘窗比其他类型的窗户更贵，因为它们由多个窗户组成。请联系我们获取免费报价。'
    }
  ];

  const series = [
    {
      name: '400系列',
      tag: '飘窗与弧形窗',
      price: '从 ¥12,999 起',
      features: ['可与平开窗组合：30°、45°和90°角', '可与上下推拉窗组合：30°、45°角', '木材由乙烯基或复合材料保护'],
      colors: ['#FFFFFF', '#000000', '#8B4513', '#808080', '#D2691E'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'
    },
    {
      name: 'E系列',
      tag: '飘窗与弧形窗',
      price: '从 ¥18,999 起',
      features: ['可与平开窗组合：30°、45°、90°角和10°弧形', '可与上下推拉窗组合：30°、45°角', '木材由铝材保护', '50种标准颜色，9种木材和11种染色'],
      colors: ['#FFFFFF', '#000000', '#8B4513', '#D2B48C', '#2F4F4F', '#8FBC8F'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">

      {/* 面包屑导航 */}
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={function() { navigate('/'); }} className="hover:text-red-700">首页</button>
          <span>›</span>
          <button onClick={function() { navigate('/products'); }} className="hover:text-red-700">窗户与门</button>
          <span>›</span>
          <button onClick={function() { navigate('/products'); }} className="hover:text-red-700">窗户</button>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* 产品标题区 */}
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          <div className="flex gap-4">
            <button className="border-2 border-red-700 text-red-700 px-6 py-3 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors">
              开始设计 →
            </button>
            <button
              onClick={function() { navigate('/'); }}
              className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-900 hover:text-white transition-colors"
            >
              获取报价 →
            </button>
          </div>
        </div>
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded"
          />
        </div>
      </div>

      {/* 产品系列卡片 */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">探索您的{product.name}选择</h2>
          <p className="text-gray-600 mb-10">虽然您可以通过墙体框架创建飘窗，但您也可以从我们的工厂订购预组装的飘窗或弧形窗。</p>
          <div className="grid grid-cols-2 gap-8">
            {series.map(function(s, index) {
              return (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={s.image} alt={s.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{s.tag}</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{s.name}</h3>
                    <div className="text-red-700 font-bold mb-4">{s.price}</div>
                    <ul className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                      {s.features.map(function(f, i) {
                        return <li key={i} className="flex items-start gap-2"><span className="text-red-700 mt-1">•</span>{f}</li>;
                      })}
                    </ul>
                    <div className="flex gap-2 mb-6">
                      {s.colors.map(function(color, i) {
                        return (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        );
                      })}
                    </div>
                    <button className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors">
                      查看产品 →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 为什么选择 */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-10">为什么选择{product.name}？</h2>
          <div className="grid grid-cols-4 gap-6">
            {reasons.map(function(reason, index) {
              return (
                <div key={index}>
                  <img src={reason.image} alt={reason.title} className="w-full h-48 object-cover rounded mb-4" />
                  <h3 className="font-black text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-gray-600 text-sm">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 灵感项目展示 */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-10">激发灵感的{product.name}</h2>
          <div className="relative">
            <img
              src={projects[activeSlide].image}
              alt={projects[activeSlide].title}
              className="w-full h-96 object-cover rounded"
            />
            <div className="mt-6">
              <h3 className="text-xl font-black text-gray-900 mb-2">{projects[activeSlide].title}</h3>
              <p className="text-gray-600 mb-4">{projects[activeSlide].description}</p>
            </div>
            <div className="flex gap-3 mt-4">
              {projects.map(function(_, index) {
                return (
                  <button
                    key={index}
                    onClick={function() { setActiveSlide(index); }}
                    className={
                      'w-8 h-8 rounded-full font-bold text-sm transition-colors ' +
                      (activeSlide === index ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')
                    }
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-10">{product.name}常见问题解答</h2>
          <div className="flex flex-col gap-2">
            {faqs.map(function(faq, index) {
              return (
                <div key={index} className="border-b">
                  <button
                    onClick={function() { setOpenFaq(openFaq === index ? null : index); }}
                    className="w-full text-left py-5 flex justify-between items-center font-bold text-gray-900 hover:text-red-700"
                  >
                    {faq.question}
                    <span className="text-2xl text-gray-400">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 联系专家 */}
      <div className="bg-gray-50 py-12 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-3">联系我们的专家</h2>
          <p className="text-gray-600 mb-6">从我们专业的代表处获得个性化指导——无压力，只有专家建议。</p>
          <button
            onClick={function() { navigate('/'); }}
            className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-red-700 hover:text-white transition-colors"
          >
            立即联系 →
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;
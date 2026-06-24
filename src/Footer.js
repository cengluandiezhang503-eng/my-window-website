function Footer() {
  const columns = [
    {
      title: '关于我们',
      links: ['关于', '我们的故事', '创新', '品质', '社区', '企业文化', '可持续发展', '新闻室', '招聘']
    },
    {
      title: '合作伙伴',
      links: ['访问合作伙伴', '合作伙伴招聘', '了解两者区别']
    },
    {
      title: '探索产品',
      links: ['探索窗户', '探索门', '创意与灵感', '节能效率', '产品发现工具', '海岸/防冲击解决方案', '材料']
    },
    {
      title: '开始使用',
      links: ['购买地点', '虚拟展厅', '成为经销商', '替换窗户', '替换门']
    },
    {
      title: '获得帮助',
      links: ['技术文档', '经销商门户', '我的账户', '联系我们', '常见问题', '窗户与门安全', '产品支持', '零件商店', '召回']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-6 gap-8">
          {/* 左侧品牌区 */}
          <div className="col-span-1">
            <h3 className="font-black text-lg leading-tight mb-4">
              信任您的家，<br />交给我们™
            </h3>
            <p className="text-gray-400 text-xs mb-6">
              ©2026 我的窗户公司<br />版权所有。
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '📌', '▶️', '🏠', '💼'].map(function(icon, i) {
                return (
                  <button key={i} className="text-gray-400 hover:text-white text-lg">
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 链接列 */}
          {columns.map(function(col, index) {
            return (
              <div key={index}>
                <h4 className="font-black text-xs tracking-widest text-white mb-4 uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map(function(link, i) {
                    return (
                      <li key={i}>
                        <button className="text-gray-400 hover:text-white text-sm text-left">
                          {link}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部法律信息 */}
      <div className="border-t border-gray-700 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-8">
            {/* 能源之星标志 */}
            <div className="bg-white p-3 rounded flex-shrink-0 text-center">
              <div className="text-xs font-bold text-gray-900 leading-tight">
                ⭐ 能源之星<br />
                <span className="text-gray-600">年度合作伙伴</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-400 text-xs mb-3">
                我们收集某些类别的个人信息。请查看链接了解更多信息。
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <button className="hover:text-white underline">条款</button>
                <span>|</span>
                <button className="hover:text-white underline">隐私政策</button>
                <span>|</span>
                <button className="hover:text-white underline">加州居民隐私声明</button>
                <span>|</span>
                <button className="hover:text-white underline">EEO政策</button>
                <span>|</span>
                <button className="hover:text-white underline">选择退出个人信息销售或共享</button>
              </div>
              <button className="text-gray-400 hover:text-white text-xs underline mt-2">
                Cookie偏好设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
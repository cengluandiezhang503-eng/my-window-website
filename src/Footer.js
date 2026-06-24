function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🏠 我的窗户公司</h3>
          <p className="text-gray-400">
            专业提供高品质窗户和门，让您的家更美更节能
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">快速链接</h3>
          <ul className="text-gray-400 flex flex-col gap-2">
            <li className="hover:text-white cursor-pointer">产品</li>
            <li className="hover:text-white cursor-pointer">灵感</li>
            <li className="hover:text-white cursor-pointer">经销商</li>
            <li className="hover:text-white cursor-pointer">关于我们</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">联系我们</h3>
          <ul className="text-gray-400 flex flex-col gap-2">
            <li>📞 400-123-4567</li>
            <li>📧 info@mywindows.com</li>
            <li>📍 上海市浦东新区</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        © 2024 我的窗户公司 版权所有
      </div>
    </footer>
  );
}

export default Footer;
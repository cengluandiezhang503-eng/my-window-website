function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-red-700">
        🏠 我的窗户公司
      </div>
      <ul className="flex gap-8 text-gray-600 font-medium">
        <li className="hover:text-red-700 cursor-pointer">产品</li>
        <li className="hover:text-red-700 cursor-pointer">灵感</li>
        <li className="hover:text-red-700 cursor-pointer">经销商</li>
        <li className="hover:text-red-700 cursor-pointer">关于我们</li>
      </ul>
      <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">
        获取报价
      </button>
    </nav>
  );
}

export default Navbar;
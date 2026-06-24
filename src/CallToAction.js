function CallToAction() {
  return (
    <div className="bg-red-700 py-16 px-8 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">
        准备好升级您的窗户了吗？
      </h2>
      <p className="text-xl text-red-200 mb-8">
        立即获取免费报价，专业团队24小时内联系您
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-red-700 px-10 py-4 rounded font-bold text-lg hover:bg-gray-100">
          获取免费报价
        </button>
        <button className="border-2 border-white text-white px-10 py-4 rounded font-bold text-lg hover:bg-red-800">
          联系我们
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
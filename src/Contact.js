function Contact() {
  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            联系我们
          </h2>
          <p className="text-gray-500 mb-8">
            我们的专业团队随时准备为您服务，请填写以下信息，我们会尽快回复您。
          </p>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <span>400-123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <span>info@mywindows.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span>上海市浦东新区</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🕐</span>
              <span>周一至周五 9:00 - 18:00</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="flex flex-col gap-4">
            <input
              placeholder="您的姓名"
              className="border rounded p-3 w-full bg-white"
            />
            <input
              placeholder="电子邮件"
              className="border rounded p-3 w-full bg-white"
            />
            <input
              placeholder="电话号码"
              className="border rounded p-3 w-full bg-white"
            />
            <textarea
              placeholder="您的留言"
              rows="4"
              className="border rounded p-3 w-full bg-white"
            />
            <button className="bg-red-700 text-white py-3 rounded hover:bg-red-800">
              发送留言
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
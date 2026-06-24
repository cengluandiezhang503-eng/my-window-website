import { useState } from 'react';

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: ''
  });

  const handleChange = function(e) {
    setFormData(Object.assign({}, formData, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async function() {
    try {
      const response = await fetch('https://window-server.onrender.com/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          phone: formData.phone,
          zipCode: formData.zipCode,
          productType: formData.role,
          projectType: '联系专家'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      alert('发送失败，请重试');
    }
  };

  if (submitted) {
    return (
      <div className="bg-gray-50 py-20 px-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">提交成功！</h2>
        <p className="text-gray-600">我们的专家会在24小时内联系您，感谢您的信任！</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-4">
          联系我们的专家
        </h2>
        <p className="text-gray-600 text-center mb-12">
          从我们专业的代表处获得个性化指导——无压力，只有专家建议。
        </p>

        <div className="flex flex-col gap-6">
          {/* 身份选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              我是... <span className="text-red-700">*</span>
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 outline-none focus:border-red-700"
            >
              <option value="">请选择</option>
              <option value="业主">业主</option>
              <option value="建筑师">建筑师</option>
              <option value="承包商">承包商</option>
              <option value="建筑商">建筑商</option>
              <option value="其他">其他</option>
            </select>
          </div>

          {/* 姓名和邮箱 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名 <span className="text-red-700">*</span>
              </label>
              <input
                name="firstName"
                placeholder="名"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓 <span className="text-red-700">*</span>
              </label>
              <input
                name="lastName"
                placeholder="姓"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                电子邮件 <span className="text-red-700">*</span>
              </label>
              <input
                name="email"
                placeholder="电子邮件"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-red-700"
              />
            </div>
          </div>

          {/* 电话和邮编 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                电话号码 <span className="text-red-700">*</span>
              </label>
              <input
                name="phone"
                placeholder="(XXX)-XXX-XXXX"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮政编码 <span className="text-red-700">*</span>
              </label>
              <input
                name="zipCode"
                placeholder="邮政编码"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-red-700"
              />
            </div>
          </div>

          {/* 提交按钮 */}
          <div>
            <button
              onClick={handleSubmit}
              className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-red-700 hover:text-white transition-colors"
            >
              提交 →
            </button>
          </div>

          {/* 免责声明 */}
          <p className="text-xs text-gray-500 leading-relaxed">
            *提交此表单，即表示您同意接收来自我们的定期信息和广告电话、短信和电子邮件。
            我们收集某些类别的个人信息，并以各种方式使用这些信息，包括履行订单和提供产品信息和服务。
            如需了解更多信息，请查看我们的
            <span className="text-red-700 cursor-pointer"> 隐私政策 </span>
            和
            <span className="text-red-700 cursor-pointer"> 条款与条件</span>。
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuoteForm;
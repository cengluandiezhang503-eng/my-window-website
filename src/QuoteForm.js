import { useState } from 'react';

function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productType: '',
    projectType: '',
    name: '',
    email: '',
    phone: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 py-16 px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          获取免费报价
        </h2>

        {/* 进度条 */}
        <div className="flex justify-between mb-10">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i}
            </div>
          ))}
        </div>

        {/* 第一步：选择产品 */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold mb-6">选择产品类型</h3>
            <div className="grid grid-cols-3 gap-4">
              {['窗户', '门', '天窗'].map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, productType: type })}
                  className={`border-2 rounded-lg p-4 text-center ${formData.productType === type ? 'border-red-700 text-red-700' : 'border-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-red-700 text-white py-3 rounded hover:bg-red-800"
            >
              下一步
            </button>
          </div>
        )}

        {/* 第二步：项目信息 */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold mb-6">项目类型</h3>
            <div className="grid grid-cols-2 gap-4">
              {['新建项目', '翻新改造'].map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, projectType: type })}
                  className={`border-2 rounded-lg p-4 text-center ${formData.projectType === type ? 'border-red-700 text-red-700' : 'border-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="w-full border border-gray-300 py-3 rounded hover:bg-gray-100"
              >
                上一步
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800"
              >
                下一步
              </button>
            </div>
          </div>
        )}

        {/* 第三步：联系方式 */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold mb-6">填写联系方式</h3>
            <div className="flex flex-col gap-4">
              <input
                name="name"
                placeholder="您的姓名"
                onChange={handleChange}
                className="border rounded p-3 w-full"
              />
              <input
                name="email"
                placeholder="电子邮件"
                onChange={handleChange}
                className="border rounded p-3 w-full"
              />
              <input
                name="phone"
                placeholder="电话号码"
                onChange={handleChange}
                className="border rounded p-3 w-full"
              />
              <input
                name="zipCode"
                placeholder="邮政编码"
                onChange={handleChange}
                className="border rounded p-3 w-full"
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="w-full border border-gray-300 py-3 rounded hover:bg-gray-100"
              >
                上一步
              </button>
              <button
                onClick={() => alert('提交成功！我们会尽快联系您！')}
                className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800"
              >
                提交报价申请
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteForm;
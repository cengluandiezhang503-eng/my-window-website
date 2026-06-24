import { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "安装需要多长时间？",
      answer: "一般单个窗户安装需要1-2小时，整套房子根据数量通常1-3天完成。"
    },
    {
      question: "产品有质保吗？",
      answer: "所有产品提供10年质量保证，安装服务提供2年保修。"
    },
    {
      question: "如何获取报价？",
      answer: "填写上方报价表单，我们会在24小时内联系您，提供免费上门测量和报价服务。"
    },
    {
      question: "可以自己安装吗？",
      answer: "建议由我们的专业团队安装，以确保产品性能和质保有效。"
    },
    {
      question: "有哪些颜色和款式可选？",
      answer: "我们提供超过50种颜色和多种款式，可根据您的需求定制。"
    }
  ];

  return (
    <div className="bg-white py-16 px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        常见问题
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-5 font-bold text-gray-800 flex justify-between items-center hover:bg-gray-50"
            >
              {faq.question}
              <span>{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div className="p-5 text-gray-600 bg-gray-50 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
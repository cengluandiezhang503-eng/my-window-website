function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "张先生",
      location: "上海",
      comment: "安装非常专业，窗户质量很好，隔音效果超出预期！",
      stars: 5
    },
    {
      id: 2,
      name: "Keith先生",
      location: "北京",
      comment: "服务态度很好，报价透明，安装团队非常认真负责！",
      stars: 5
    },
    {
      id: 3,
      name: "王先生",
      location: "深圳",
      comment: "产品质量一流，冬天明显感觉室内更暖和了，非常满意！",
      stars: 5
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        客户评价
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
        {reviews.map(review => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow">
            <div className="text-yellow-400 text-xl mb-4">
              {'⭐'.repeat(review.stars)}
            </div>
            <p className="text-gray-600 mb-6">"{review.comment}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">
                {review.name[0]}
              </div>
              <div>
                <div className="font-bold text-gray-800">{review.name}</div>
                <div className="text-gray-400 text-sm">{review.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
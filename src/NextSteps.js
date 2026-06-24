import { useNavigate } from 'react-router-dom';

function NextSteps() {
  const navigate = useNavigate();

  const steps = [
    {
      title: '找到展厅',
      description: '两种参观方式：在您附近找到展厅，或访问虚拟展厅，在家中探索窗户。',
      button: '参观展厅 →',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'
    },
    {
      title: '找到认证承包商',
      description: '经过审查、培训并得到行业领导者支持的认证承包商，拥有丰富的窗户和门知识，使任何项目都能成功。',
      button: '找到认证承包商 →',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600'
    },
    {
      title: '购买地点',
      description: '我们在这里帮助您开始。',
      button: '购买地点 →',
      image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=600'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-3">您的下一步</h2>
        <p className="text-gray-600 mb-10 max-w-3xl">
          在您附近找到值得信赖的经销商和承包商，将您的项目变为现实。无论您是在更换窗户还是计划全面翻新，我们的专业人员网络都可以帮助您选择合适的产品，提供专业安装，并在每一步中为您提供指导。
        </p>

        <div className="grid grid-cols-3 gap-8">
          {steps.map(function(step, index) {
            return (
              <div key={index}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-56 object-cover mb-4"
                />
                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{step.description}</p>
                <button
                  onClick={function() { navigate('/'); }}
                  className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 hover:text-white transition-colors"
                >
                  {step.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NextSteps;
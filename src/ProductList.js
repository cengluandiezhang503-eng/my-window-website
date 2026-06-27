import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedPrice, setSelectedPrice] = useState('全部');
  const [selectedColor, setSelectedColor] = useState('全部');
  const [sortBy, setSortBy] = useState('推荐');
  const [showFilters, setShowFilters] = useState(true);

  const categories = ['全部', '窗户', '门', '天窗'];
  const prices = ['全部', '¥1000以下', '¥1000-3000', '¥3000-5000', '¥5000以上'];
  const colors = ['全部', '白色', '黑色', '棕色', '灰色', '米色'];
  const sorts = ['推荐', '价格从低到高', '价格从高到低', '最新上架'];

  useEffect(function() {
    fetch('https://window-server.onrender.com/api/products')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setProducts(data);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, []);

  const filteredProducts = products.filter(function(p) {
    if (selectedCategory !== '全部' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">

      {/* 顶部标题和排序 */}
      <div className="border-b px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            所有产品
            <span className="text-gray-400 font-normal text-lg ml-2">
              ({filteredProducts.length})
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={function() { setShowFilters(!showFilters); }}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {showFilters ? '隐藏筛选' : '显示筛选'}
          </button>
          <select
            value={sortBy}
            onChange={function(e) { setSortBy(e.target.value); }}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none"
          >
            {sorts.map(function(s) {
              return <option key={s} value={s}>{s}</option>;
            })}
          </select>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="border-b px-8 py-3 flex gap-3 overflow-x-auto">
        {categories.map(function(cat) {
          return (
            <button
              key={cat}
              onClick={function() { setSelectedCategory(cat); }}
              className={
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ' +
                (selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex">
        {/* 左侧筛选栏 */}
        {showFilters && (
          <div className="w-64 flex-shrink-0 border-r px-6 py-6">

            {/* 价格筛选 */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">价格区间</h3>
              <div className="flex flex-col gap-2">
                {prices.map(function(price) {
                  return (
                    <label key={price} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={price}
                        checked={selectedPrice === price}
                        onChange={function() { setSelectedPrice(price); }}
                        className="accent-gray-900"
                      />
                      <span className="text-sm text-gray-700">{price}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 颜色筛选 */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">颜色</h3>
              <div className="flex flex-col gap-2">
                {colors.map(function(color) {
                  return (
                    <label key={color} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={function() { setSelectedColor(color); }}
                        className="accent-gray-900"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 重置筛选 */}
            <button
              onClick={function() {
                setSelectedCategory('全部');
                setSelectedPrice('全部');
                setSelectedColor('全部');
              }}
              className="w-full border border-gray-900 text-gray-900 py-2 rounded text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              重置筛选
            </button>
          </div>
        )}

        {/* 右侧产品网格 */}
        <div className="flex-1 px-8 py-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className={
              'grid gap-6 ' +
              (showFilters ? 'grid-cols-3' : 'grid-cols-4')
            }>
              {filteredProducts.map(function(product) {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={function() { navigate('/products/' + product.id); }}
                  />
                );
              })}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">没有找到相关产品</p>
              <button
                onClick={function() { setSelectedCategory('全部'); }}
                className="mt-4 text-gray-900 underline"
              >
                查看全部产品
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      onClick={onClick}
    >
      {/* 图片区域 */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 收藏按钮 */}
        <button
          onClick={function(e) {
            e.stopPropagation();
            setFavorite(!favorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill={favorite ? '#b91c1c' : 'none'}
            viewBox="0 0 24 24"
            stroke={favorite ? '#b91c1c' : 'currentColor'}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* 新品标签 */}
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">
            新品
          </span>
        </div>
      </div>

      {/* 产品信息 */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-1">{product.category}</p>
        <p className="text-gray-900 font-medium text-sm">{product.price}</p>
      </div>
    </div>
  );
}

export default ProductList;
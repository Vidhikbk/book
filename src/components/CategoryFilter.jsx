// src/components/CategoryFilter.jsx
const CategoryFilter = ({ categories, selected, setSelected }) => (
  <div className="flex gap-2 mb-4">
    {categories.map(cat => (
      <button 
        key={cat} 
        onClick={() => setSelected(cat)}
        className={`px-3 py-1 rounded ${selected === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;

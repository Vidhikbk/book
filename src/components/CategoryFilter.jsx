const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`
            px-4 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-200
            focus:outline-none 
            ${selected === cat
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

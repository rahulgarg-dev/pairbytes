import React from 'react'

function Filters({ categories, onFilter, onSort }) {
  return (
    <div className="filters">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="all">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
}

export default Filters;
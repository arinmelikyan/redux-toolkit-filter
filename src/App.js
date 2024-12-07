import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, filterByBrand, filterByCategory, clearFilters } from './features/productsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { filteredProducts, allProducts, selectedBrands, selectedCategory } = useSelector((state) => state.products);

  // Sample data
  const products = [
    { id: 1, name: 'iPhone 16', brand: 'Apple', category: 'phone' },
    { id: 2, name: 'Pixel 9 Pro', brand: 'Google', category: 'phone' },
    { id: 3, name: 'Galaxy S24 Ultra', brand: 'Samsung', category: 'phone' },
    { id: 4, name: 'MacBook Air', brand: 'Apple', category: 'laptop' },
    { id: 5, name: 'Galaxy Watch', brand: 'Samsung', category: 'smartwatch' },
    { id: 6, name: 'PixelBook', brand: 'Google', category: 'laptop' },
    { id: 7, name: 'iPhone 15 Max Pro', brand: 'Apple', category: 'phone' },
    { id: 8, name: 'Galaxy S23+', brand: 'Samsung', category: 'phone' },
    { id: 9, name: 'Pixel Watch', brand: 'Google', category: 'smartwatch' },
    { id: 10, name: 'Apple Watch', brand: 'Apple', category: 'smartwatch' },
  ];

  const filters = {
    brands: ['Apple', 'Google', 'Samsung'], 
    categories: ['phone', 'laptop', 'smartwatch']
  };

  useEffect(() => {
    // Set initial products data
    dispatch(setProducts(products));
  }, [dispatch]);

  const handleToggleBrand = (brand) => {
    dispatch(filterByBrand(brand));
  };

  const handleCategoryChange = (event) => {
    dispatch(filterByCategory(event.target.value));
  };

  const clearAllFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Filter by Brand</h2>
        {filters.brands.map((brand) => (
          <label key={brand} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleToggleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
      <div>
        <h2>Filter by Category</h2>
        <select value={selectedCategory || ''} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {filters.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={clearAllFilters}>Clear Filters</button>
      </div>

      <ul>
        {filteredProducts.length === 0 ? allProducts.map((product) => (
          <li key={product.id}>{product.brand}: {product.name}</li>
        )) : filteredProducts.map((product) => (
          <li key={product.id}>{product.brand}: {product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [], // Original list of products
    filteredProducts: [], // Filtered list
    selectedBrands: [], // Keep track of selected brands
    selectedCategory: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    filterByBrand: (state, action) => {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter((selectedBrand) => selectedBrand !== brand);
      } else {
        state.selectedBrands.push(brand);
      }

      // Filter products based on selected brands and category
      state.filteredProducts = state.allProducts.filter((product) => {
        const matchesBrand = state.selectedBrands.length === 0 || state.selectedBrands.includes(product.brand);
        const matchesCategory = !state.selectedCategory || product.category === state.selectedCategory;
        return matchesBrand && matchesCategory;
      });
    },
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;

      // Filter products based on selected brands and category
      state.filteredProducts = state.allProducts.filter((product) => {
        const matchesBrand = state.selectedBrands.length === 0 || state.selectedBrands.includes(product.brand);
        const matchesCategory = !state.selectedCategory || product.category === state.selectedCategory;
        return matchesBrand && matchesCategory;
      });
    }
  },
});

// our actions, no need to explicitly define them
export const { setProducts, filterByBrand, filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
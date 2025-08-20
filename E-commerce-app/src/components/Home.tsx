
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import { fetchCategories, fetchProducts } from '../api/api';
import '../App.css'

export default function Home() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: ()=> fetchProducts(selectedCategory)
  });
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="home">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>

      <select
        className="mb-4 p-2 border"
        onChange={e => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Categories</option>
        {categories?.map((cat: string) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto mb-2"/>
            <h2 className="font-semibold">{product.title}</h2>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <p className="text-sm">{product.description.slice(0, 100)}...</p>
            <p>Rating: {product.rating.rate} ⭐</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-2 bg-blue-500 text-white px-4 py-5 rounded mb-4 "
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

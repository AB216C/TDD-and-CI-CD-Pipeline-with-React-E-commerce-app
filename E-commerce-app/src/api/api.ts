
import axios from 'axios';

const products_URL = 'https://fakestoreapi.com/';

export const fetchProducts =async(category?:string)=>{
  const endpoint = category? `products/category/${encodeURIComponent(category)}`:'/products'
  const {data} = await axios.get(`${products_URL}${endpoint}`);
  return data;
};

export const fetchCategories = async()=>{
  const {data} = await axios.get(`${products_URL}products/categories`);
  return data;
}
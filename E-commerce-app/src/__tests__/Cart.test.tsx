
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import { vi } from 'vitest';

const mockCartItem = {
  id: 1,
  title: 'Mock Product',
  image: 'mock.jpg',
  price: 10.99,
  quantity: 2,
};

const renderCartWithState = (initialCart: any[]) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: initialCart },
  });

  return render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

test('displays cart items and handles removal', () => {
  renderCartWithState([mockCartItem]);

  expect(screen.getByText(/Mock Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

  const removeButton = screen.getByText(/Remove item/i);
  fireEvent.click(removeButton);

});


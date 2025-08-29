
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Home from '../components/Home';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

vi.mock('../api/api', () => ({
  fetchProducts: vi.fn(() => Promise.resolve([
    {
      id: 1,
      title: 'Test Product',
      image: 'test.jpg',
      price: 20,
      category: 'test-category',
      description: 'Short description',
      rating: { rate: 4 },
    }
  ])),
  fetchCategories: vi.fn(() => Promise.resolve(['test-category'])),
}));

const renderBoth = () =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <>
          <Home />
          <Cart />
        </>
      </QueryClientProvider>
    </Provider>
  );

test('adds product to cart and updates cart display', async () => {
  renderBoth();

  // At this step, there is a Wait for product list to render
  await waitFor(() => screen.getByText(/Test Product/i));

  // Stimulating the click "Add to Cart"
  fireEvent.click(screen.getByText(/Add to Cart/i));

  // Finding cart container
  const cartSection = screen.getByText(/Shopping Cart/i).closest('div');

  expect(within(cartSection!).getByText(/Test Product/i)).toBeInTheDocument();
  expect(within(cartSection!).getByText(/Qty: 1/i)).toBeInTheDocument();
  expect(within(cartSection!).getByText(/Final Price: \$20.00/i)).toBeInTheDocument();
});
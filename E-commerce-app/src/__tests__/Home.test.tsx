
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../components/Home';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest'; // Importing Vitest mock functions

// STEP1: Mock API using Vitest
vi.mock('../api/api', () => ({
  fetchProducts: vi.fn(() => Promise.resolve([
    {
      id: 1,
      title: 'Test Product',
      image: 'test.jpg',
      price: 19.99,
      category: 'test-category',
      description: 'Test description',
      rating: { rate: 4.5 },
    }
  ])),
  fetchCategories: vi.fn(() => Promise.resolve(['test-category'])),
}));

const renderHome = () =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>
    </Provider>
  );

test('renders product list and allows category change', async () => {
  renderHome();

  //STEP2: Loading state
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  //STEP3: Wait for product to load
  await waitFor(() => screen.getByText(/Test Product/i));
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

  //STEP4: Simulate category change
  const categorySelect = screen.getByRole('combobox');
  fireEvent.change(categorySelect, { target: { value: 'test-category' } });
  expect(categorySelect).toHaveValue('test-category');
});

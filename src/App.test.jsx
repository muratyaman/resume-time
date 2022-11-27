import { render } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Resume Time/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero and primary navigation', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Yeabsira/i);
  expect(screen.getByRole('button', { name: /story/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
});

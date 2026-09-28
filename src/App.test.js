import { render, screen, within } from '@testing-library/react';
import CinematicPortfolio from './Components/CinematicPortfolio';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

test('renders the portfolio hero and primary navigation', () => {
  render(<CinematicPortfolio />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Yeabsira/i);

  const nav = screen.getByRole('navigation');
  expect(within(nav).getByRole('button', { name: /^story$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('button', { name: /^projects$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('button', { name: /^contact$/i })).toBeInTheDocument();
});

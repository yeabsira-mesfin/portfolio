import { fireEvent, render, screen, within } from '@testing-library/react';
import CinematicPortfolio from './Components/CinematicPortfolio';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
});

test('renders the portfolio hero, recruiter actions, and primary navigation', () => {
  render(<CinematicPortfolio />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Yeabsira/i);
  expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/resume.html');

  const nav = screen.getByRole('navigation', { name: /portfolio sections/i });
  expect(within(nav).getByRole('button', { name: /^story$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('button', { name: /^projects$/i })).toBeInTheDocument();
  expect(within(nav).getByRole('button', { name: /^contact$/i })).toBeInTheDocument();
});

test('scene navigation updates visible content, accessibility state, and URL hash', () => {
  render(<CinematicPortfolio />);
  const nav = screen.getByRole('navigation', { name: /portfolio sections/i });
  const storyButton = within(nav).getByRole('button', { name: /^story$/i });

  fireEvent.click(storyButton);

  expect(screen.getByRole('heading', { level: 2, name: /the person/i })).toBeInTheDocument();
  expect(storyButton).toHaveAttribute('aria-current', 'page');
  expect(window.location.hash).toBe('#story');
});

test('project selector exposes pressed state and switches the selected project', () => {
  render(<CinematicPortfolio />);
  fireEvent.click(screen.getByRole('button', { name: /^projects$/i }));

  const windowsButton = screen.getByRole('button', { name: /windows infrastructure reliability console/i });
  fireEvent.click(windowsButton);

  expect(windowsButton).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('heading', { level: 3, name: /windows infrastructure reliability console/i })).toBeInTheDocument();
});

test('contact keeps direct email and resume actions visible', () => {
  render(<CinematicPortfolio />);
  fireEvent.click(screen.getByRole('button', { name: /^contact$/i }));

  expect(screen.getByRole('link', { name: /yeabsira\.mesfin29@gmail\.com/i })).toHaveAttribute('href', 'mailto:yeabsira.mesfin29@gmail.com');
  expect(screen.getByRole('link', { name: /view printable resume/i })).toHaveAttribute('href', '/resume.html');
});

test('portfolio assistant opens as an accessible dialog and handles greetings', () => {
  render(<CinematicPortfolio />);

  fireEvent.click(screen.getByRole('button', { name: /open portfolio assistant/i }));
  expect(screen.getByRole('dialog', { name: /ask about yeabsira/i })).toBeInTheDocument();

  const input = screen.getByLabelText(/ask yeabsira’s portfolio assistant/i);
  fireEvent.change(input, { target: { value: 'Hi' } });
  fireEvent.submit(input.closest('form'));

  expect(screen.getAllByText(/portfolio assistant/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/you can ask me about his engineering background/i)).toBeInTheDocument();
});

import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
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

test('scene navigation updates visible content, accessibility state, and URL hash', async () => {
  render(<CinematicPortfolio />);
  const nav = screen.getByRole('navigation', { name: /portfolio sections/i });
  const storyButton = within(nav).getByRole('button', { name: /^story$/i });

  fireEvent.click(storyButton);

  await screen.findByRole('heading', { level: 2, name: /the person/i });
  await waitFor(() => expect(storyButton).toHaveAttribute('aria-current', 'page'));
  expect(window.location.hash).toBe('#story');
});

test('project selector exposes pressed state and switches the selected project', async () => {
  render(<CinematicPortfolio />);
  const nav = screen.getByRole('navigation', { name: /portfolio sections/i });
  fireEvent.click(within(nav).getByRole('button', { name: /^projects$/i }));

  const windowsButton = await screen.findByRole('button', { name: /windows infrastructure reliability console/i });
  fireEvent.click(windowsButton);

  await waitFor(() => expect(windowsButton).toHaveAttribute('aria-pressed', 'true'));
  expect(await screen.findByRole('heading', { level: 3, name: /windows infrastructure reliability console/i })).toBeInTheDocument();
});

test('contact keeps direct email and resume actions visible', async () => {
  render(<CinematicPortfolio />);
  const nav = screen.getByRole('navigation', { name: /portfolio sections/i });
  fireEvent.click(within(nav).getByRole('button', { name: /^contact$/i }));

  expect(await screen.findByRole('link', { name: /yeabsira\.mesfin29@gmail\.com/i })).toHaveAttribute('href', 'mailto:yeabsira.mesfin29@gmail.com');
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
  expect(screen.getAllByText(/you can ask me about his engineering background/i).length).toBeGreaterThanOrEqual(1);
});

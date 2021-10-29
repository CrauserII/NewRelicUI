import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table present', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();

  const linkElement3 = screen.getByText(/Filter/i);
  expect(linkElement3).toBeInTheDocument();
});

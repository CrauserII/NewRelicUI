import { render, screen } from '@testing-library/react';
import App from './DropDown';

test('dropdown is present', () => {
    render(<App />);
    const linkElement = screen.getByText(/All/i);
    expect(linkElement).toBeInTheDocument();
});

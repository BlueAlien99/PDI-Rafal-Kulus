import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('features/counter/Counter', () => ({
    // __esModule: true,
    // eslint-disable-next-line react/display-name
    Counter: () => <div />,
}));

test('renders save to reload text', () => {
    render(<App />);
    const linkElement = screen.getByText(/save to reload/i);
    expect(linkElement).toBeInTheDocument();
});

import { render } from '@testing-library/react';
import Cortana from '../';

describe('Cortana', () => {
  test('renders correctly', () => {
    const { container } = render(<Cortana />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import Chip from '../';

describe('Chip', () => {
  test('renders correctly', () => {
    render(
      <Chip color="primary">
        <p>Hello World</p>
      </Chip>
    );

    const content = screen.getByText('Hello World');
    expect(content).toBeDefined();
  });
});

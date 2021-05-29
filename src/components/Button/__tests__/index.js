import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../';

describe('Button', () => {
  test('renders correctly', () => {
    render(
      <Button color="primary">
        <p>Hello</p>
      </Button>
    );

    const content = screen.getByText('Hello');
    expect(content).toBeDefined();
  });

  test('behaves correctly', () => {
    const onClick = jest.fn();
    render(
      <Button color="secondary" onClick={onClick}>
        <p>Hello</p>
      </Button>
    );
    const content = screen.getByText('Hello');
    fireEvent.click(content);

    expect(onClick).toHaveBeenCalled();
  });
});

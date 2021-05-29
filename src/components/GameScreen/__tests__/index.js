import { render, screen } from '@testing-library/react';
import GameScreen from '../';

describe('Chip', () => {
  test('renders correctly', () => {
    window.SpeechRecognition = jest.fn(() => ({
      start: jest.fn(),
    }));
    window.SpeechGrammarList = jest.fn();

    render(<GameScreen />);

    const content = screen.getByText(/attempts/gi);
    expect(content).toBeDefined();
  });
});

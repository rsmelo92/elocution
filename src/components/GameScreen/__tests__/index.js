import { render, screen } from '@testing-library/react';
import randomWord from 'random-words';

import GameScreen from '../';

jest.mock('random-words');

describe('GameScreen', () => {
  beforeEach(() => {
    window.SpeechRecognition = jest.fn(() => ({
      start: jest.fn(),
      onresult: jest.fn((e) => {
        console.log({e});
        return e;
      }),
    }));
    window.SpeechGrammarList = jest.fn();
    randomWord.mockImplementation(() => 'curiously')
  });

  test('renders correctly', () => {
    render(<GameScreen />);

    const points = screen.getByText(/0/gi);
    expect(points).toBeDefined();

    const attempts = screen.getByText(/3 attempts/gi);
    expect(attempts).toBeDefined();

    const word = screen.getByText(/Word is curiously/gi);
    expect(word).toBeDefined();
  });

  test.todo('behaves correctly');
});

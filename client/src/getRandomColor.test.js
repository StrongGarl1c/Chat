import { getRandomColor } from './Contact';

test('To be hex color', () => {
  expect(getRandomColor()[0]).toBe('#');
});

test('To be valid color', () => {
  for (let i = 0; i < 10000; i++) {
    expect(getRandomColor()).toHaveLength(7);
  }
});

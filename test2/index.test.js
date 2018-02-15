/* global describe, it */

describe('Avatar', () => {
  it('with avatar should be rendered correctly', () => {
    const tree = `
      hogea
    `
    expect(tree).toMatchSnapshot();
  });
});

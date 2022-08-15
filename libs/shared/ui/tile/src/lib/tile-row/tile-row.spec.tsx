import { render } from '@testing-library/react';

import TileRow from './tile-row';

describe('TileRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TileRow />);
    expect(baseElement).toBeTruthy();
  });
});

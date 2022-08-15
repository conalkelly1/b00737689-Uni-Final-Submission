import { render } from '@testing-library/react';

import WaitingRoom from './waiting-room';

describe('WaitingRoom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WaitingRoom />);
    expect(baseElement).toBeTruthy();
  });
});

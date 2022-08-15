import { render } from '@testing-library/react';

import AuthStatus from './auth-status';

describe('AuthStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthStatus />);
    expect(baseElement).toBeTruthy();
  });
});

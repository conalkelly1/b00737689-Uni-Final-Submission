import { render } from '@testing-library/react';

import ClassroomShell from './classroom-shell';

describe('ClassroomShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomShell />);
    expect(baseElement).toBeTruthy();
  });
});

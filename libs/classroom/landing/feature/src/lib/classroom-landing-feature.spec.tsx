import { render } from '@testing-library/react';

import ClassroomLandingFeature from './classroom-landing-feature';

describe('ClassroomLandingFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomLandingFeature />);
    expect(baseElement).toBeTruthy();
  });
});

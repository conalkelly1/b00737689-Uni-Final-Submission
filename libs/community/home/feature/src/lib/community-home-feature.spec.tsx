import { render } from '@testing-library/react';

import CommunityHomeFeature from './community-home-feature';

describe('CommunityHomeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommunityHomeFeature />);
    expect(baseElement).toBeTruthy();
  });
});

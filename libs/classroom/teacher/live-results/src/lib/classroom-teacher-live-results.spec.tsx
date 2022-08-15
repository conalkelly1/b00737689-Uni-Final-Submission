import { render } from '@testing-library/react';

import ClassroomTeacherLiveResults from './classroom-teacher-live-results';

describe('ClassroomTeacherLiveResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomTeacherLiveResults />);
    expect(baseElement).toBeTruthy();
  });
});

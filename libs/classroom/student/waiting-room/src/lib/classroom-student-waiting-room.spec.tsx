import { render } from '@testing-library/react';

import ClassroomStudentWaitingRoom from './classroom-student-waiting-room';

describe('ClassroomStudentWaitingRoom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomStudentWaitingRoom />);
    expect(baseElement).toBeTruthy();
  });
});

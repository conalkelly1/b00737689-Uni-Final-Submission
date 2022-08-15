import { render } from '@testing-library/react';

import ClassroomStudentRoomCodeEntry from './classroom-student-room-code-entry';

describe('ClassroomStudentRoomCodeEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomStudentRoomCodeEntry />);
    expect(baseElement).toBeTruthy();
  });
});

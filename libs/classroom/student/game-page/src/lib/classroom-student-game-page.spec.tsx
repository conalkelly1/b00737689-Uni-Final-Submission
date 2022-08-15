import { render } from '@testing-library/react';

import ClassroomStudentGamePage from './classroom-student-game-page';

describe('ClassroomStudentGamePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomStudentGamePage />);
    expect(baseElement).toBeTruthy();
  });
});

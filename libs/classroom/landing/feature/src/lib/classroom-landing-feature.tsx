import { Button, Page } from '@ewgg/shared/ui/core';
import { Link } from 'react-router-dom';

export function ClassroomLandingFeature() {
  return (
    <Page className="items-center justify-around">
      <h1 className="text-3xl text-black">Select Role</h1>
      <div className="flex flex-col justify-center items-center gap-6">
        <Link to="/student/room-code-entry">
          <Button>Student</Button>
        </Link>
        <Link to="/teacher/create-room">
          <Button color="secondary">Teacher</Button>
        </Link>
      </div>
    </Page>
  );
}

export default ClassroomLandingFeature;

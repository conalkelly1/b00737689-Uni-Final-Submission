import { Route, Routes } from 'react-router-dom';
import { ClassroomLandingFeature } from '@ewgg/classroom/landing/feature';
import { CreateRoom } from '@ewgg/classroom/teacher/create-room';
import { WaitingRoom } from '@ewgg/classroom/teacher/waiting-room';
import { LiveResults } from '@ewgg/classroom/teacher/live-results';
import { RoomCodeEntry } from '@ewgg/classroom/student/room-code-entry';
import { StudentWaitingRoom } from '@ewgg/classroom/student/waiting-room';
import { GamePage } from '@ewgg/classroom/student/game-page';
import { AuthStatus } from '@ewgg/shared/firebase/ui';
import { initializeFirebaseApp } from '@ewgg/shared/firebase/data-access';
import { firebaseConfig } from '@ewgg/classroom/data-access/firebase';

export function ClassroomShell() {
  initializeFirebaseApp(firebaseConfig);
  return (
    <>
      <AuthStatus></AuthStatus>
      <Routes>
        <Route path="/" element={<ClassroomLandingFeature />}></Route>
        <Route path="/teacher/create-room" element={<CreateRoom />}></Route>
        <Route path="/teacher/waiting-room" element={<WaitingRoom />}></Route>
        <Route path="/teacher/live-results" element={<LiveResults />}></Route>
        <Route path="/student/game-page" element={<GamePage />}></Route>
        <Route
          path="/student/room-code-entry"
          element={<RoomCodeEntry />}
        ></Route>
        <Route
          path="/student/waiting-room"
          element={<StudentWaitingRoom />}
        ></Route>
      </Routes>
    </>
  );
}

export default ClassroomShell;

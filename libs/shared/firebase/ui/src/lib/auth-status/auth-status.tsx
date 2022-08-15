import { useStore } from '@ewgg/shared/data-access';
import { Chip } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { signInAnon, useFirebase } from '@ewgg/shared/firebase/data-access';
import { useEffect } from 'react';
import { Auth } from 'firebase/auth';

export function AuthStatus() {
  const { user, setUser } = useStore();
  const { auth } = useFirebase();

  useEffect(() => {
    signInAnon(setUser, auth as Auth);
  }, []);
  return (
    <Chip
      icon={<CircleIcon sx={{ '&&': { color: user ? 'green' : 'red' } }} />}
      label={user ? 'Connected' : 'Disconnected'}
      size="small"
      onClick={async () => {
        if (auth && !user) {
          await signInAnon(setUser, auth);
        }
      }}
    />
  );
}

export default AuthStatus;

import { Auth, signInAnonymously } from 'firebase/auth';
import { User } from '@ewgg/shared/data-access';

export async function signInAnon(
  setUser: (user: User | null) => void,
  auth: Auth
) {
  try {
    const user = await signInAnonymously(auth);
    setUser({ id: user.user.uid });
  } catch (error) {
    console.error('Error during auth: ', error);
  }
}

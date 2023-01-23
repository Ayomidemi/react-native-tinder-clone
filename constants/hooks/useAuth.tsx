import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as env from '../../env';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  children?: ReactElement<any, any>;
};

const config = {
  clientId: env.WEB_CLIENT_ID,
  iosClientId: env.IOS_CLIENT_ID,
  androidClientId: env.ANDROID_CLIENT_ID,
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

  const [accessToken, setAccessToken] = useState<string | undefined>('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const authGoogle = async () => {
    await promptAsync()
      .then(async (res) => {
        if (res?.type === 'success') {
          const { id_token } = res.params;
          setAccessToken(id_token);

          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (userr) => {
        if (userr) {
          setUser(userr);
        } else {
          setUser(null);
        }
        setLoading(false);
      }),
    [],
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const memoedValued = useMemo(
    () => ({
      user,
      authGoogle,
      request,
      loading,
      error,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authGoogle, error, loading, user],
  );

  // console.log(user);

  return <AuthContext.Provider value={memoedValued}>{!loading && children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}

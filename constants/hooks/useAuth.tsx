import React, { createContext, ReactElement, useContext, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as env from '../../env';

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
  const [request, response, googlePromptLogin] = Google.useAuthRequest(config);

  const [accessToken, setAccessToken] = useState<string | undefined>('');
  const [user, setUser] = useState(null);

  const authGoogle = async () => {
    await googlePromptLogin();
  };

  async function fetchUserInfo() {
    const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await res.json();
    setUser(userInfo);
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log('successful');
      setAccessToken(response.authentication?.accessToken);
      accessToken && fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, response]);

  return (
    <AuthContext.Provider value={{ user: user, authGoogle, request }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

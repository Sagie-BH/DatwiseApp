import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AppState, AppStateStatus } from 'react-native';

interface AuthContextType {
    login: (credentials: CredentialsType, method: LoginMethod) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isFirstLogin: boolean | null;
    preferredLoginMethod: LoginMethod;
}

interface AuthProviderProps {
    children: ReactNode;
}

type CredentialsType = {
    username: string;
    password: string;
};

type LoginMethod = 'credentials' | 'biometric';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);
    const [preferredLoginMethod, setPreferredLoginMethod] = useState<LoginMethod>('credentials');

    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    const storeToken = async (token: string) => {
        await SecureStore.setItemAsync('userToken', token);
      };

      const getToken = async () => {
        return await SecureStore.getItemAsync('userToken');
      };

      
    useEffect(() => {
        checkFirstLogin();
        getPreferredLoginMethod();

        // Set up app state listener
        const subscription = AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('App has come to the foreground!');
            // App has come to the foreground, reset the logout timer
            resetSessionTimeout();
        } else if (
            appState === 'active' &&
            nextAppState.match(/inactive|background/)
        ) {
            console.log('App has gone to the background');
            // App goes to the background, start the logout countdown
            startLogoutCountdown();
        }
        setAppState(nextAppState);
    };

    let sessionTimeout: ReturnType<typeof setTimeout>;
    const resetSessionTimeout = () => {
        clearTimeout(sessionTimeout);
    };

    const startLogoutCountdown = () => {
        sessionTimeout = setTimeout(() => {
            console.log('Logging out due to inactivity');
            logout();
        }, 600000); // Adjust the timeout as needed
    };

    const checkFirstLogin = async () => {
        const isFirstLoginValue = await SecureStore.getItemAsync('isFirstLogin');
        setIsFirstLogin(isFirstLoginValue === null);
        if (isFirstLoginValue === null) {
            await SecureStore.setItemAsync('isFirstLogin', 'false');
        }
    };

    const getPreferredLoginMethod = async () => {
        const method = await SecureStore.getItemAsync('preferredLoginMethod');
        if (method) setPreferredLoginMethod(method as LoginMethod);
    };

    const login = async (credentials: CredentialsType, method: LoginMethod) => {
        // Example token generation based on credentials, in practice, this should be received from your backend
        const generatedToken = `token_based_on_${credentials.username}`;
        console.log(credentials.password, credentials.username);

        const onlineLoginSuccessful = credentials.password === '123' && credentials.username === 'sega'; 
        if (onlineLoginSuccessful) {
          setIsAuthenticated(true);
          await storeToken(generatedToken);
          setPreferredLoginMethod(method);
          resetSessionTimeout();
        } else {
          // Attempt offline login
          const storedToken = await getToken();
          if (storedToken && storedToken === generatedToken) {
            setIsAuthenticated(true);
            resetSessionTimeout();
          } else {
            // Offline login failed
            setIsAuthenticated(false);
            console.log('Offline login failed');
          }
        }
      };
      

    const logout = async () => {
        setIsAuthenticated(false);
    };

    useEffect(() => {
        resetSessionTimeout();
        return () => clearTimeout(sessionTimeout);
    }, [isAuthenticated]);

    const value = {
        login,
        logout,
        isAuthenticated,
        isFirstLogin,
        preferredLoginMethod,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

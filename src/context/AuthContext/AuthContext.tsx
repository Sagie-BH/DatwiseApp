import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AppState, AppStateStatus } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

interface AuthContextType {
    login: (credentials: CredentialsType, method: LoginMethod) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isFirstLogin: boolean | null;
    preferredLoginMethod: LoginMethod;
    isBiometricAble: boolean;
    isBiometricSetUp: boolean;
    authenticateBiometric: () => Promise<boolean>;
    isBiometricEnable: boolean;
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
    const [isBiometricSetUp, setIsBiometricSetUp] = useState<boolean>(false);
    const [isBiometricAble, setIsBiometricAble] = useState<boolean>(false);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);
    const [preferredLoginMethod, setPreferredLoginMethod] = useState<LoginMethod>('credentials');
    const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
    const [isBiometricExists, setIsBiometricExists] = useState<boolean>(false);
    const [isBiometricEnable, setIsBiometricEnable] = useState<boolean>(false);

    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    const storeToken = async (token: string) => {
        await SecureStore.setItemAsync('userToken', token);
    };

    const getToken = async () => {
        return await SecureStore.getItemAsync('userToken');
    };

    useEffect(() => {
        const checkBiometricSupport = async () => {
            const isUsingBiometric = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(isUsingBiometric);
        };

        checkBiometricSupport();
        const checkSavedBiometric = async () => {
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            setIsBiometricExists(savedBiometrics);
        }
        checkSavedBiometric();
    }, [])


    useEffect(() => {
        if (isBiometricSupported && isBiometricExists) {
          setIsBiometricEnable(true);
        } else {
          setIsBiometricEnable(false);
        }
      }, [isBiometricSupported, isBiometricExists]);;

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
            return true;
        } else {
            // Attempt offline login
            const storedToken = await getToken();
            if (storedToken && storedToken === generatedToken) {
                setIsAuthenticated(true);
                resetSessionTimeout();
                return true;
            } else {
                // Offline login failed
                setIsAuthenticated(false);
                console.log('Offline login failed');
                return false;
            }
        }
    };

    const authenticateBiometric = async () => {
        if (!isBiometricSupported) {
            console.log('Biometric authentication not supported');
            return false;
        }

        if (!isBiometricExists) {
            console.log('No Biometrics Found');
            return false;
        }
        setIsBiometricAble(true);
        const authResult = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            fallbackLabel: 'Enter Password', // iOS only
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        });

        if (authResult.success) {
            console.log('Authenticated using biometrics');
            setIsBiometricSetUp(true);
            const token = 'your_generated_token'; // Implement token generation or retrieval as needed
            await storeToken(token);
            setIsAuthenticated(true);
            setPreferredLoginMethod('biometric');
            return true;
        } else {
            console.log('Biometric authentication failed', authResult.error);
            return false;
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken');
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
        authenticateBiometric,
        isBiometricSetUp,
        isBiometricAble,
        isBiometricEnable
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

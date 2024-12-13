import { createContext, useContext, useEffect, useState } from "react";
import { JwtAuthenticationService } from "../api/Authentication";
import { apiClient } from "../api/ApiClient";
import Cookies from 'js-cookie';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children })
{
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  // New loading state
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    // Check token expiration on page load or refresh
    useEffect(() => {
        const savedToken = Cookies.get('token');
        const tokenExpiration = Cookies.get('tokenExpiration');
        const expirationDate = new Date(tokenExpiration);

        if (savedToken && new Date() < expirationDate) {
            // Token is still valid
            setAuthenticated(true);
            setToken(savedToken);
            setEmail(getUsernameFromToken(savedToken));

            // Set up Axios request interceptor to add token to headers
            apiClient.interceptors.request.use(
                (config) => {
                    const token = Cookies.get('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );
        } else {
            // Token expired or not found, log out
            logout();
        }
        setLoading(false); // Mark loading as finished
    }, []);

    // Login function
    async function login(email, password) {
        try {
            const response = await JwtAuthenticationService(email, password);
            if (response.status === 200) {

                const jwtToken = response.data.data.token;
                const expirationDate = getTokenExpirationDate(jwtToken);

                setAuthenticated(true);
                setEmail(email);
                setToken(jwtToken);

                // Store the token in cookies
                Cookies.set('token', jwtToken, { secure: true, sameSite: 'Strict' });
                Cookies.set('tokenExpiration', expirationDate.toISOString(), { secure: true, sameSite: 'Strict' });

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.log(error);
            logout();
            return false;
        }
    }

    // Logout function
    function logout() {
        Cookies.remove('token');
        Cookies.remove('tokenExpiration');
        setAuthenticated(false);
        setToken(null);
        setEmail(null);
    }

    // Get expiration date from JWT token
    function getTokenExpirationDate(token) {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        if (!decoded.exp) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp); // Set expiration date
        return date;
    }

    // Extract email from token
    function getUsernameFromToken(token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.sub || null; // Assuming 'sub' holds the email
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, email, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

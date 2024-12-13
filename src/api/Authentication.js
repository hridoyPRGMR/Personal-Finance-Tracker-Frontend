import { apiClient } from "./ApiClient";

export const JwtAuthenticationService = 
    (email,password) => apiClient.post(`/auth/login`, {email,password})

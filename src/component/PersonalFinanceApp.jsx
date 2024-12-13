import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Income from "./income/Income";
import Expense from "./expense/Expense";
import Debt from "./debt/Debt";
import AuthProvider, { useAuth } from "../security/AuthContext";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./home/Home";
import Report from "./report/Report";

function AuthenticatedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking auth state
    }

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/login" />;
}

export default function PersonalFinance() {
    return (
        <div className="PersonalFinanceApp">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/login"
                            element={
                                <AuthLayout>
                                    <Login />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <AuthLayout>
                                    <Login />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <AuthLayout>
                                    <Signup />
                                </AuthLayout>
                            }
                        />

                        {/* Protected Routes */}

                        <Route
                            path="/home"
                            element={
                                <AuthenticatedRoute>
                                    <MainLayout>
                                        <Home/>
                                    </MainLayout>
                                </AuthenticatedRoute>
                            }
                        />

                        <Route
                            path="/income"
                            element={
                                <AuthenticatedRoute>
                                    <MainLayout>
                                        <Income />
                                    </MainLayout>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/expense"
                            element={
                                <AuthenticatedRoute>
                                    <MainLayout>
                                        <Expense />
                                    </MainLayout>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/debt"
                            element={
                                <AuthenticatedRoute>
                                    <MainLayout>
                                        <Debt />
                                    </MainLayout>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/report"
                            element={
                                <AuthenticatedRoute>
                                    <MainLayout>
                                        <Report />
                                    </MainLayout>
                                </AuthenticatedRoute>
                            }
                        />
                    </Routes> 
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}


import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Auth.css'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useAuth } from '../../security/AuthContext';


export default function Login() {

    const authContext = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const location = useLocation();
    const navigate = useNavigate();

    const [message, setMessage] = useState(location.state?.message);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);

            navigate(location.pathname, { replace: true, state: {} });

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (await authContext.login(email, password)) {
            navigate(`/home`);
        }
        else {
            setError('Login Failed! Please check your credentials')
        }

    }

    return (
        <div className="Login">
            <div className="container-sm my-5 shadow-lg">
                <div className='head text-center mb-4'>
                    <img src={`${process.env.PUBLIC_URL}/personal-finance.png`} alt="app logo" />
                    <h4 className="font-weight-bold">Login To Personal Finance</h4>

                    {message &&
                        <Alert icon={<CheckIcon fontSize="inherit" severity="success" />}>
                            {message}
                        </Alert>
                    }

                </div>
                <form onSubmit={handleLogin}>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="form-group mb-2">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    placeholder='Enter Your Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group mt-3">
                                <button className='btn btn-md btn-primary btn-block'>Login</button>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="footer p-3">
                    <span>Din't have an account? <Link to="/signup">Sign Up</Link></span>
                </div>
            </div>
        </div>
    );

}
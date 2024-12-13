import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        // phoneNumber: Yup.string()
        // .matches(/^(?:\+8801|01)[3-9]\d{8}$/,'Please enter a valid Bangladeshi phone number')
        // .min(10,'Phone number must  be at least 10 digits')
        // .max(15,'Phone number cannot be more that 15 digits')
        // .required('Phone number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    function onSubmit(values) {

        setLoading(true);

        axios.post('http://localhost:9090/api/auth/signup', values)
            .then(({ data }) => handleSuccess('Signup Successful! Redirecting to login page...'))
            .catch((error) => handleError('Sorry! Something went wrong, please try again.'));
    }

    function handleSuccess(message) {

        setTimeout(() => {
            setMessage(message);
            setLoading(false);
        }, 2000)

        // Clear message after 2 seconds and navigate to login page
        setTimeout(() => {
            setMessage('');
            navigate('/login', { state: { message: "Signup Successfully! Please Login.." } });
        }, 2000);
    }

    function handleError(errorMessage) {
        setLoading(false);

        // Display error message
        setTimeout(() => {
            setMessage('Sorry something went wrong please try again');
        }, 2000);
    }


    return (
        <div className="Signup">
            <div className="container mt-5">
                <div className="row justify-content-center ">
                    <div className="col-md-4 form shadow-lg p-3 mb-5 bg-body rounded">
                        <div className='head text-center mb-4'>
                            <img src={`${process.env.PUBLIC_URL}/personal-finance.png`} alt="app logo" />
                            <h4 className="text-center mb-3 ">Signup</h4>
                        </div>

                        <Formik
                            initialValues={{ name, email, password, confirmPassword }}
                            enableReinitialize={true}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-2">
                                        <Field
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-2">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-2">
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-2">
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm your password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>

                                    <div className="d-flex justify-content-center signup-button">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-secondary"
                                        >
                                            {loading ? <CircularProgress size={24} /> : 'Signup'}
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                        <div className="footer p-3">
                            <span>Already have an account? <Link to="/login">Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

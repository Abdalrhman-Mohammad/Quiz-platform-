import React, {useState} from 'react';
import './login_css.css'
import validationLogin from "./validation_login";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const Login = () => {


    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const handleChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const [error, setError] = useState({});


    const [loginError, setLoginError] = useState('');


    const handleSubmit = (event) => {
        setError(validationLogin(values));
        if (Object.keys(error).length ===0){
            axios.post('http://localhost:5000/user/login', values).then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('type', res.data.type);
                console.log(res)
                if (res.data.type === 'teacher') {
                    navigate('/teacher/home');
                } else if(res.data.type === 'student') {
                    navigate('/student/home');
                }
                else {
                    navigate('/admin')
                }
            }).catch((err) => {
                if (err.response && err.response.status === 401) {
                    setLoginError('Invalid email or password');
                } else {
                    console.error('An unexpected error occurred:', err);
                }
            });
        }

    }


    return (
        <div className='vh-100 p-2 d-flex justify-content-center align-items-center'>
            <div className="container p-3  card col-12 col-md-7 col-lg-4 ">
                <h2 className='text-center'>LOGIN</h2>

                <div className="mb-3 mt-3  ">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                    { error.email && <span className={'text-danger'}>{error.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleChange}/>
                    { error.password && <span className={'text-danger'}>{error.password}</span> }
                </div>
                {loginError && <span className={'text-danger'}>{loginError}</span>}
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember"/> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>

            </div>
        </div>
    );
};

export default Login;


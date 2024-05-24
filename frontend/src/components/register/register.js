import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import validation from './register_validation';

const Register = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({

        name: '',
        email: '',
        password: '',

    })

    const [error, setError] = useState({})
    useEffect(() => {
        const storedValues = JSON.parse(localStorage.getItem('registerValues'));
        if (storedValues) {
            setValues(storedValues);
        }
    }, []);
    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
        localStorage.setItem('registerValues', JSON.stringify({...values, [event.target.name]: event.target.value}))
    };


    const submit = () => {
        setError(validation(values));
        if (Object.keys(error).length === 0) {
            axios.post('http://localhost:5000/user/signup', values).then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('type', res.data.type);
                navigate('/student/home')
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log(error);
        }

    }

    return (
        <div className={'container  vh-100'}>
            <div className='container mt-5 p-3 col-md-8 col-10 card d-flex justify-content-sm-center flex-row flex-wrap'
                 style={{borderRadius: '25px'}}>
                <div className='col-sm-12  '>
                    <h1 className={'signUp text-center'}>Register</h1>
                    <div className={'row d-flex justify-content-center'}>
                        <div className='col-10 col-md-8'>
                            <label htmlFor={'name'} className='form-label'> name :</label>
                            <input type={'text'} className='form-control' placeholder='enter your name . . . '
                                   id='name'
                                   name={'name'} value={values.name} onChange={handleChange}/>
                            <span className={'text-danger'}> {error.name && <span>{error.name}</span>}</span>
                        </div>

                        <div className='col-10 col-md-8'>
                            <label htmlFor={'email'} className='form-label'> email :</label>
                            <input type={'text'} className='form-control' placeholder='enter your email . . .'
                                   id='email' name={'email'} value={values.email} onChange={handleChange}/>

                            <span className={'text-danger'}> {error.email && <span>{error.email}</span>}</span>
                        </div>

                        <div className='col-10 col-md-8'>
                            <label htmlFor={'password'} className='form-label'> password :</label>
                            <input type={'text'} className='form-control' placeholder='enter your password . . . '
                                   id='password' name={'password'} value={values.password} onChange={handleChange}/>
                            <span className={'text-danger'}> {error.password &&
                                <span>{error.password}</span>}</span>
                        </div>

                        <div className={'text-center'}><p dir={'ltr'}>you have an account ?</p></div>
                        <div className={' d-flex justify-content-center '}>
                            <button type={'submit'} className='btn btn-primary col-5 col-md-3  '

                                    onClick={submit}>Sign Up
                            </button>


                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { auth, provider } from './Firebase';

const UserAuth = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data;

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => console.log(user))
            .catch((err) => console.log(err));
    };

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => console.log(user))
            .catch((err) => console.log(err));
    };

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    };

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center' id="rfc">
                <div className='col-10 col-md-4 col-lg-4' id="fg">
                    <h1 style={{ color: "purple" }}>Task Buddy</h1>
                    <p>Streamline your workflow and track progress effortlessly <br /> with our all-in-one task management app.</p>
                    <button className='btn btn-dark' onClick={signInWithGoogle}>Continue with Google</button>
                </div>
                <div className='col-10 col-md-6 col-lg-6'>
                    <div className='fb mx-auto'>
                        <div className='ft'><h2>Login</h2></div>
                        <div className='fc'>
                            <center>
                                <form className='f'>
                                    <label>Email/Username :</label>
                                    <input type="email" className='form-control' name="email" value={email} placeholder="Enter Email" onChange={changeHandler} style={{ width: "60%" }} autoComplete='off' /><br />
                                    <label>Password :</label>
                                    <input type="password" className='form-control' name="password" value={password} placeholder="Enter Password" onChange={changeHandler} style={{ width: "60%" }} /><br />
                                    <button className='btn btn-dark' onClick={signIn}>Signin</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className='btn btn-dark' onClick={signUp}>SignUp</button>
                                </form>
                            </center>
                        </div>
                        <div className='ff'>By “logging”, you agree to our <br /> Privacy Policy and Terms & Conditions.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAuth;

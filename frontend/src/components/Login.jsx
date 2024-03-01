import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser, fetchHighscore} from "../redux/slices/userSlice"
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).catch((error)=> {
            console.log(error)
        })

        const json = await response.json();

        if (response.ok) {
            //Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Set user in authcontext i.e dispatch action
            dispatch(setUser(json))
            // dispatch(fetchHighscore())
        } else{
            alert("No User Found! Please Register");
            window.location.href = '/Signup'
            

        }
    }

    return (
        <div className="bodyyyyyy">
            <div class="main">


                <div class="signup">
                    <form onSubmit={handleSubmit}>
                        <label for="chk" aria-hidden="true">Login</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required="true" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="true" />
                        <button className='buttonnnnn' type="submit">Login</button>
                        <button className='buttonnnnn' onClick={ () => navigate("/signup") }>New here? Create account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

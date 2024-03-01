import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, fetchHighscore } from "../redux/slices/userSlice"
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();

        if (response.ok) {
            //Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Set user in authcontext i.e dispatch action
            dispatch(setUser(json))
            dispatch(fetchHighscore())
        }
    }

    return (
        <div className="bodyyyyyy">
            <div class="main">


                <div class="signup">
                    <form onSubmit={handleSubmit}>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required="true" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="true" />
                        <button className='buttonnnnn' type="submit">Sign up</button>
                        <button className='buttonnnnn' onClick={ () => navigate("/login") }>Already a user? Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

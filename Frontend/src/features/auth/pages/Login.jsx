import React from 'react'
import "../auth.form.css"
import {useNavigate, Link} from 'react-router-dom'


const Login = () =>{

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return(
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter your email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter your password' />
                    </div>
                    <button className="button primary-button" type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login
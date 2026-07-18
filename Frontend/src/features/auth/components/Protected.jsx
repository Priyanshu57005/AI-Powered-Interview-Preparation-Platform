import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if (loading) {
    return (
        <main className="app-loader">
            <div className="loader-container">

                <div className="loader-badge">
                    <span className="status-dot"></span>
                    AI INTERVIEW PREPARATION PLATFORM
                </div>

                <div className="loader-circle">
                    <div className="loader-ring"></div>
                    <div className="loader-core"></div>
                </div>

                <h1>Preparing your workspace</h1>

                <p>
                    Verifying your account and connecting to the AI interview engine.
                </p>

                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>

                <div className="loader-steps">
                    <div>✓ Authenticating user</div>
                    <div>✓ Loading dashboard</div>
                    <div>✓ Connecting AI services</div>
                </div>

                <small>
                    First visit may take a few seconds while the server wakes up.
                </small>

            </div>
        </main>
    )
}

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const SparkIcon = () => (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.4 6.4 19.6l2.1-6.8L3 8.8h6.8z" />
    </svg>
)

const CheckIcon = () => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' xmlns='http://www.w3.org/2000/svg'>
        <path d="M20 6L9 17l-5-5" />
    </svg>
)

const FEATURES = [
    "Resume Analysis",
    "ATS Resume Builder",
    "Technical Questions",
    "Behavioral Questions",
    "Skill Gap Analysis",
    "Personalized Roadmap"
]

const GithubIcon = () => (
    <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
)

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleLogin({ email, password })
            navigate('/')
        } catch (err) {
            setError(err?.message || "Unable to login. Please check your credentials.")
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-bg-grid" />
            <div className="auth-bg-blob auth-bg-blob--one" />
            <div className="auth-bg-blob auth-bg-blob--two" />
            <div className="auth-bg-blob auth-bg-blob--three" />

            <div className="auth-grid">

                <section className="auth-hero">
                    <div className="auth-hero__brand">
                        <SparkIcon />
                        <strong>AI Interview Preparation Platform</strong>
                    </div>

                    <h1 className="auth-hero__title">
                        Prepare Smarter. <span>Get Hired Faster.</span>
                    </h1>

                    <p className="auth-hero__desc">
                        AI-powered interview preparation platform that analyzes resumes, compares them with job descriptions, generates technical & behavioral interview questions, identifies skill gaps, creates personalized preparation roadmaps, and builds ATS-friendly resumes.
                    </p>

                    <div className="feature-grid">
                        {FEATURES.map((feature) => (
                            <div className="feature-card" key={feature}>
                                <span className="feature-card__check"><CheckIcon /></span>
                                {feature}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-card__brand-mobile">
                            <SparkIcon />
                            <span>AI Interview Preparation Platform</span>
                        </div>

                        <h1 className="auth-card__title">Login</h1>
                        <p className="auth-card__subtitle">Login to continue your interview prep</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" name="email" id="email" placeholder='Enter your email' />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={(e) => { setPassword(e.target.value) }}
                                    type="password" name="password" id="password" placeholder='Enter your password' />
                            </div>
                            <button className="button primary-button" type='submit' disabled={loading}>
                                {loading ? <span className="btn-spinner" /> : "Login"}
                            </button>
                        </form>

                        <div className="auth-divider"><span>secure login</span></div>

                        <p className="auth-card__footer">Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </section>

            </div>
            <footer className="auth-page-footer">
                <p>© {new Date().getFullYear()} AI Interview Preparation Platform. Built by Priyanshu.</p>
                <div className="auth-page-footer__links">
                    <a href="https://github.com/Priyanshu57005/AI-Powered-Interview-Preparation-Platform" target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                        GitHub
                    </a>
                </div>
            </footer>
        </main>
    )
}

export default Login
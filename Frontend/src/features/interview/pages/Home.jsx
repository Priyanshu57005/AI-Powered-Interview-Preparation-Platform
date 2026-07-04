import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import LoadingScreen from '../components/LoadingScreen.jsx'

const FEATURE_CARDS = [
    {
        title: "AI Resume Analysis",
        description: "Reads your resume against the role and surfaces the strongest proof points to discuss.",
        icon: "scan"
    },
    {
        title: "ATS Resume Generator",
        description: "Turns your profile into a clean, recruiter-friendly resume built for modern ATS systems.",
        icon: "file"
    },
    {
        title: "AI Match Score",
        description: "Shows how closely your experience aligns with the job description before interview day.",
        icon: "score"
    },
    {
        title: "Technical Interview Questions",
        description: "Generates targeted technical prompts based on the stack, seniority, and role expectations.",
        icon: "code"
    },
    {
        title: "Behavioral Questions",
        description: "Prepares you for leadership, teamwork, ownership, and communication conversations.",
        icon: "chat"
    },
    {
        title: "Personalized Roadmap",
        description: "Creates a focused prep plan so every study session has a clear next move.",
        icon: "map"
    },
    {
        title: "Skill Gap Analysis",
        description: "Highlights missing skills and gives you a practical way to close the gap quickly.",
        icon: "gap"
    }
]

const STATS = [
    { value: "5-star", label: "Trusted by Developers" },
    { value: "AI", label: "Powered" },
    { value: "ATS", label: "Friendly" },
    { value: "Fast", label: "Analysis" },
    { value: "Modern", label: "Design" }
]

const Icon = ({ name }) => {
    const icons = {
        scan: <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M8 12h8M8 9h8M8 15h5" />,
        file: <><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5M9 13h6M9 17h4" /></>,
        score: <><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="m9 12 2 2 4-5" /></>,
        code: <><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>,
        chat: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
        map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>,
        gap: <><path d="M4 19V5M4 19h16" /><path d="M8 16v-5M12 16V8M16 16v-9" /></>,
        upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M20 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5" /></>,
        sparkle: <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.4 6.4 19.6l2.1-6.8L3 8.8h6.8z" />,
        briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
        user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>
    }

    return (
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[name]}
        </svg>
    )
}

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef(null)
    const [selectedFileName, setSelectedFileName] = useState("");

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (!data) return;
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='home-page'>

            {/* Premium SaaS hero keeps the original dashboard flow as the first action. */}
            <header className='page-header hero-section'>
                <div className='hero-section__content'>
                    <div className='hero-badge'>
                        <span className='hero-badge__dot' />
                        AI Interview Preparation Platform
                    </div>
                    <h1>Build a job-winning <span className='highlight'>interview strategy</span> in minutes.</h1>
                    <p>Upload your resume, paste the target job description, and let AI Interview Preparation Platform generate role-specific questions, match insights, and a practical preparation plan.</p>
                    <div className='hero-actions'>
                        <a href='#interview-builder' className='hero-link hero-link--primary'>Start Analysis</a>
                        <a href='#why-ai-platform' className='hero-link'>Explore Features</a>
                    </div>
                </div>

                <div className='hero-section__panel' aria-hidden='true'>
                    <div className='hero-score-card'>
                        <span className='hero-score-card__label'>AI Match Preview</span>
                        <strong>92%</strong>
                        <span>Role fit potential</span>
                    </div>
                </div>
            </header>

            {/* Original report generation surface, upgraded with glass styling. */}
            <div id='interview-builder' className='interview-card'>
                <div className='interview-card__eyebrow'>
                    <span>Resume + JD Intelligence</span>
                    <small>No route changes. Same secure workflow.</small>
                </div>

                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <Icon name='briefcase' />
                            </span>
                            <div>
                                <h2>Target Job Description</h2>
                                <p>Paste the role requirements and expectations.</p>
                            </div>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            value={jobDescription}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <Icon name='user' />
                            </span>
                            <div>
                                <h2>Your Profile</h2>
                                <p>Add a resume or describe your experience.</p>
                            </div>
                        </div>

                        {/* Upload Resume */}
                        <div className="upload-section">
                            <label className="section-label">
                                Upload Resume
                                <span className="badge badge--best">Best Results</span>
                            </label>

                            <label className="dropzone" htmlFor="resume">
                                <span className="dropzone__icon">
                                    <Icon name='upload' />
                                </span>

                                <p className="dropzone__title">
                                    {selectedFileName || "Click to upload or drag & drop"}
                                </p>

                                <p className="dropzone__subtitle">
                                    {selectedFileName
                                        ? "File selected successfully"
                                        : "PDF or DOC/DOCX (Max 5MB)"}
                                </p>

                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        console.log("Selected File:", file);

                                        setSelectedFileName(file.name);
                                    }}
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                value={selfDescription}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                i
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <Icon name='sparkle' />
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* New SaaS feature section requested for Task 1. */}
            <section id='why-ai-platform' className='why-section'>
                <div className='section-heading'>
                    <span>Why Choose AI Interview Preparation Platform?</span>
                    <h2>Everything you need to walk into the interview prepared.</h2>
                    <p>AI Interview Preparation Platform connects resume intelligence, ATS-ready output, and interview preparation in one focused workflow.</p>
                </div>

                <div className='feature-grid'>
                    {FEATURE_CARDS.map((feature, index) => (
                        <article className='feature-card' key={feature.title} style={{ '--delay': `${index * 70}ms` }}>
                            <span className='feature-card__icon'>
                                <Icon name={feature.icon} />
                            </span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className='stats-section' aria-label='AI ReS highlights'>
                {STATS.map((stat, index) => (
                    <div className='stat-card' key={`${stat.value}-${stat.label}`} style={{ '--delay': `${index * 80}ms` }}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>

                <span className="footer-credit">
                    Built with <span className="heart">❤️</span> by{" "}
                    <a
                        href="https://priyanshu-portf.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Priyanshu
                    </a>
                </span>
            </footer>
        </div>
    )
}

export default Home

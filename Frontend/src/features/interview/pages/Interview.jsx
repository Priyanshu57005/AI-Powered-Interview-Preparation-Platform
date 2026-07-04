import React, { useEffect, useMemo, useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import LoadingScreen from '../components/LoadingScreen.jsx'

const Icon = ({ name }) => {
    const icons = {
        code: <><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>,
        chat: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
        map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>,
        download: <><path d="M12 3v11" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
        user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
        score: <><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="m9 12 2 2 4-5" /></>,
        clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
        question: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 2-2.5 2-2.5 4" /><path d="M12 17h.01" /></>,
        skills: <><path d="M4 19V5M4 19h16" /><path d="M8 16v-5M12 16V8M16 16v-9" /></>,
        spark: <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.4 6.4 19.6l2.1-6.8L3 8.8h6.8z" />,
        chevron: <path d="m6 9 6 6 6-6" />
    }

    return (
        <svg className='icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            {icons[name]}
        </svg>
    )
}

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: 'code' },
    { id: 'behavioral', label: 'Behavioral Questions', icon: 'chat' },
    { id: 'roadmap', label: 'Road Map', icon: 'map' },
]

const extractTargetRole = (report) => {
    if (report?.title) return report.title

    const firstLine = report?.jobDescription
        ?.split('\n')
        ?.map(line => line.trim())
        ?.find(Boolean)

    if (!firstLine) return "Target Role"
    return firstLine.length > 72 ? `${firstLine.slice(0, 72)}...` : firstLine
}

const getDifficulty = (score) => {
    if (score >= 80) return "Focused"
    if (score >= 60) return "Moderate"
    return "Challenging"
}

const useAnimatedNumber = (value, duration = 900) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const safeValue = Number.isFinite(value) ? value : 0
        const start = performance.now()
        let frameId

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.round(safeValue * eased))

            if (progress < 1) {
                frameId = requestAnimationFrame(tick)
            }
        }

        frameId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frameId)
    }, [value, duration])

    return displayValue
}

const CounterCard = ({ icon, label, value, suffix = "" }) => {
    const animatedValue = useAnimatedNumber(value)

    return (
        <article className='counter-card'>
            <span className='counter-card__icon'>
                <Icon name={icon} />
            </span>
            <div>
                <strong>{animatedValue}{suffix}</strong>
                <span>{label}</span>
            </div>
        </article>
    )
}

const SummaryItem = ({ icon, label, value }) => (
    <div className='summary-item'>
        <span className='summary-item__icon'>
            <Icon name={icon} />
        </span>
        <div>
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    </div>
)

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <article className={`q-card ${open ? 'q-card--open' : ''}`}>
            <button className='q-card__header' onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span className='q-card__index'>Q{index + 1}</span>
                <span className='q-card__question'>{item.question}</span>
                <span className='q-card__chevron'>
                    <Icon name='chevron' />
                </span>
            </button>

            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </article>
    )
}

const RoadMapDay = ({ day, index }) => (
    <article className='roadmap-day' style={{ '--delay': `${index * 70}ms` }}>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </article>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    const summary = useMemo(() => {
        const technicalQuestions = report?.technicalQuestions ?? []
        const behavioralQuestions = report?.behavioralQuestions ?? []
        const skillGaps = report?.skillGaps ?? []
        const preparationPlan = report?.preparationPlan ?? []
        const questionsCount = technicalQuestions.length + behavioralQuestions.length
        const estimatedMinutes = Math.max(30, questionsCount * 5)

        return {
            candidateName: "Candidate Profile",
            targetRole: extractTargetRole(report),
            matchScore: report?.matchScore ?? 0,
            difficulty: getDifficulty(report?.matchScore ?? 0),
            estimatedMinutes,
            questionsCount,
            skillsCount: skillGaps.length,
            preparationDays: preparationPlan.length,
            technicalQuestions,
            behavioralQuestions,
            skillGaps,
            preparationPlan
        }
    }, [report])

    const animatedMatchScore = useAnimatedNumber(summary.matchScore)
    const scoreColor =
        summary.matchScore >= 80 ? 'score--high' :
            summary.matchScore >= 60 ? 'score--mid' : 'score--low'

    if (loading || !report) {
        return <LoadingScreen />
    }

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* Upgraded sidebar keeps section navigation and resume download intact. */}
                <nav className='interview-nav'>
                    <div className='interview-nav__brand'>
                        <span><Icon name='spark' /></span>
                        <div>
                            <strong>AI Interview Preparation Platform</strong>
                            <small>Interview Dashboard</small>
                        </div>
                    </div>

                    <div className='nav-content'>
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'><Icon name={item.icon} /></span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='download-resume-btn'>
                        <Icon name='download' />
                        Download ATS Resume
                    </button>
                </nav>

                <main className='interview-content'>
                    {/* New summary layer uses existing report data without changing backend contract. */}
                    <section className='dashboard-hero'>
                        <div className='dashboard-hero__copy'>
                            <span className='dashboard-kicker'>Interview Summary</span>
                            <h1>{summary.targetRole}</h1>
                            <p>Your AI-generated preparation dashboard is ready. Review your match score, skill gaps, questions, and roadmap before the interview.</p>
                        </div>

                        <div className={`match-score-card ${scoreColor}`}>
                            <span className='match-score-card__label'>Animated Match Score</span>
                            <div className='match-score-card__ring' style={{ '--score': `${summary.matchScore}%` }}>
                                <strong>{animatedMatchScore}</strong>
                                <span>%</span>
                            </div>
                            <small>{summary.matchScore >= 80 ? "Strong role alignment" : summary.matchScore >= 60 ? "Good fit with gaps" : "Prep focus needed"}</small>
                        </div>
                    </section>

                    <section className='summary-grid' aria-label='Interview summary'>
                        <SummaryItem icon='user' label='Candidate Name' value={summary.candidateName} />
                        <SummaryItem icon='target' label='Target Role' value={summary.targetRole} />
                        <SummaryItem icon='score' label='Resume Score' value={`${summary.matchScore}%`} />
                        <SummaryItem icon='spark' label='Interview Difficulty' value={summary.difficulty} />
                        <SummaryItem icon='clock' label='Estimated Interview Time' value={`${summary.estimatedMinutes} min`} />
                        <SummaryItem icon='question' label='Questions Count' value={summary.questionsCount} />
                    </section>

                    <section className='counter-grid' aria-label='Animated dashboard counters'>
                        <CounterCard icon='score' label='Match Score' value={summary.matchScore} suffix='%' />
                        <CounterCard icon='question' label='Questions' value={summary.questionsCount} />
                        <CounterCard icon='skills' label='Skills' value={summary.skillsCount} />
                        <CounterCard icon='map' label='Preparation Days' value={summary.preparationDays} />
                    </section>

                    <section className='skill-summary-card'>
                        <div className='section-title'>
                            <span><Icon name='skills' /></span>
                            <div>
                                <h2>Skill Summary</h2>
                                <p>Prioritized gaps from the AI report.</p>
                            </div>
                        </div>

                        <div className='skill-gaps__list'>
                            {summary.skillGaps.length > 0 ? summary.skillGaps.map((gap, i) => (
                                <span key={`${gap.skill}-${i}`} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            )) : <span className='empty-state'>No critical skill gaps found.</span>}
                        </div>
                    </section>

                    <section className='interview-workspace'>
                        <div className='content-header'>
                            <div>
                                <span>{activeNav === 'technical' ? 'Technical Prep' : activeNav === 'behavioral' ? 'Behavioral Prep' : 'Roadmap'}</span>
                                <h2>
                                    {activeNav === 'technical' && 'Technical Questions'}
                                    {activeNav === 'behavioral' && 'Behavioral Questions'}
                                    {activeNav === 'roadmap' && 'Preparation Road Map'}
                                </h2>
                            </div>
                            <span className='content-header__count'>
                                {activeNav === 'technical' && `${summary.technicalQuestions.length} questions`}
                                {activeNav === 'behavioral' && `${summary.behavioralQuestions.length} questions`}
                                {activeNav === 'roadmap' && `${summary.preparationDays}-day plan`}
                            </span>
                        </div>

                        {activeNav === 'technical' && (
                            <div className='q-list'>
                                {summary.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        )}

                        {activeNav === 'behavioral' && (
                            <div className='q-list'>
                                {summary.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        )}

                        {activeNav === 'roadmap' && (
                            <div className='roadmap-list'>
                                {summary.preparationPlan.map((day, index) => (
                                    <RoadMapDay key={day.day} day={day} index={index} />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Interview

import "../style/loading.scss"

const LOADING_STEPS = [
    "Uploading Resume",
    "Parsing Resume",
    "Analyzing Skills",
    "Matching Job Description",
    "Generating Questions",
    "Preparing Roadmap",
    "Finalizing Report"
]

const LoadingScreen = () => {
    return (
        <main className='loading-screen' aria-live='polite'>
            <section className='loading-card'>
                <div className='loading-card__visual' aria-hidden='true'>
                    <span className='loading-spinner' />
                    <span className='loading-glow loading-glow--one' />
                    <span className='loading-glow loading-glow--two' />
                </div>

                <div className='loading-card__content'>
                    <span className='loading-kicker'>AI Interview Preparation Platform is working</span>
                    <h1>Preparing your interview intelligence</h1>
                    <p>Estimated time: 30-45 seconds</p>
                </div>

                <div className='loading-progress' role='progressbar' aria-label='Generating interview report'>
                    <span />
                </div>

                <ol className='loading-steps'>
                    {LOADING_STEPS.map((step, index) => (
                        <li key={step} style={{ '--step-delay': `${index * 0.45}s` }}>
                            <span className='loading-steps__marker' />
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
            </section>
        </main>
    )
}

export default LoadingScreen

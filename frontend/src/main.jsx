import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Check, ChevronDown, FileText, Menu, Play, Sparkles, Upload, X } from 'lucide-react'
import './styles.css'

const reviews = [
  { name: 'Maya R.', role: 'Product designer', quote: 'Score spotted the two quiet gaps in my story. I landed three interviews the same week.' },
  { name: 'Jon Bell', role: 'Software engineer', quote: 'The feedback was specific, kind, and actually useful. No vague “add more impact” fluff.' },
]

function App() {
  const [file, setFile] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const fileInput = useRef(null)

  const handleFile = (event) => {
    const selected = event.target.files?.[0]
    if (selected) setFile(selected)
  }

  return (
    <main className="site-shell">
      <nav className="nav-wrap">
        <a className="brand" href="#top" aria-label="Score home"><span className="brand-mark">✳</span> score<span className="brand-dot">.</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#how">How it works</a>
          <a href="#why">Why Score</a>
          <a href="#stories">Stories</a>
          <a className="nav-login" href="#review">Log in <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> Your next role starts here</div>
          <h1>Your resume,<br /><em>seen clearly.</em></h1>
          <p className="hero-text">Get honest, actionable feedback on your resume from people who know what hiring teams look for.</p>
          <div className="hero-actions">
            <a href="#review" className="button button-dark">Get your resume reviewed <ArrowUpRight size={17} /></a>
            <a href="#how" className="watch-link"><span className="play-icon"><Play size={12} fill="currentColor" /></span> See how it works</a>
          </div>
          <div className="proof-row"><div className="avatar-stack"><span>AL</span><span>MR</span><span>JT</span><span>+</span></div><p><strong>4.9/5</strong> from 2,000+ career moves</p></div>
        </div>
        <div className="hero-art" aria-label="Resume review preview">
          <div className="art-note note-one">Make your impact<br /><strong>impossible to miss.</strong> <span>↗</span></div>
          <div className="paper-shadow"></div>
          <div className="resume-paper">
            <div className="paper-top"><span className="paper-label">RESUME / 2024</span><span className="paper-page">01</span></div>
            <div className="paper-name">Alex<br /><span>Lee.</span></div>
            <div className="paper-rule"></div>
            <div className="paper-grid"><div><small>EXPERIENCE</small><div className="line long"></div><div className="line medium"></div><div className="line long"></div><div className="line short"></div></div><div><small>PROFILE</small><div className="line medium"></div><div className="line long"></div><div className="line short"></div><div className="line medium"></div></div></div>
            <div className="score-stamp"><span>YOUR SCORE</span><strong>86</strong><small>/ 100</small></div>
          </div>
          <div className="art-note note-two"><span className="green-check"><Check size={13} /></span> Clear, confident<br /><strong>and very you.</strong></div>
        </div>
      </section>

      <section className="review-band" id="review"><div className="review-intro"><span className="section-kicker">01 / START HERE</span><h2>Bring your story.<br /><em>We’ll sharpen it.</em></h2><p>Upload your latest resume and tell us what you’re aiming for. A better version is a few minutes away.</p></div><div className="upload-card"><div className="upload-head"><span>RESUME REVIEW</span><span className="step-count">1 <i>/ 2</i></span></div><label className={`drop-zone ${file ? 'has-file' : ''}`} htmlFor="resume-upload"><input id="resume-upload" ref={fileInput} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} />{file ? <><div className="upload-icon success"><Check size={20} /></div><strong>{file.name}</strong><span>Ready to review · <button type="button" onClick={(event) => { event.preventDefault(); setFile(null) }}>Choose another</button></span></> : <><div className="upload-icon"><Upload size={20} /></div><strong>Drop your resume here</strong><span>or <u>browse files</u> · PDF, DOCX up to 10MB</span></>}</label><button className="button button-coral" onClick={() => fileInput.current?.click()}>{file ? 'Continue with this resume' : 'Choose a resume'} <ArrowUpRight size={17} /></button><p className="privacy"><Check size={14} /> Private by default. Your resume is yours.</p></div></section>

      <section className="how-section" id="how"><div className="section-heading"><span className="section-kicker">02 / HOW IT WORKS</span><h2>Less guessing.<br /><em>More getting hired.</em></h2></div><div className="steps"><div className="step"><span className="step-number">01</span><FileText size={24} /><h3>Share your resume</h3><p>Upload the version you have. Perfect is not a prerequisite.</p></div><div className="step"><span className="step-number">02</span><Sparkles size={24} /><h3>Get a real review</h3><p>We look at clarity, story, and the details hiring teams notice.</p></div><div className="step"><span className="step-number">03</span><ArrowUpRight size={24} /><h3>Move with confidence</h3><p>Leave with edits you can make today and a plan for tomorrow.</p></div></div></section>

      <section className="stories-section" id="stories"><div className="stories-head"><div><span className="section-kicker">03 / GOOD COMPANY</span><h2>Small edits.<br /><em>Big shifts.</em></h2></div><div className="stories-controls"><button aria-label="Previous story">←</button><button aria-label="Next story">→</button></div></div><div className="quote-grid">{reviews.map((review) => <article className="quote-card" key={review.name}><div className="quote-mark">“</div><p>{review.quote}</p><div className="quote-person"><span className="person-initials">{review.name.split(' ').map((part) => part[0]).join('')}</span><div><strong>{review.name}</strong><small>{review.role}</small></div></div></article>)}</div></section>

      <footer id="why"><a className="brand" href="#top"><span className="brand-mark">✳</span> score<span className="brand-dot">.</span></a><p>Make your next move count.</p><div><a href="#how">About</a><a href="#review">Privacy</a><a href="#review">Contact</a></div></footer>
    </main>
  )
}

export default App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

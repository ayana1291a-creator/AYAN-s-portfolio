import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  ArrowDown, ArrowRight, ArrowUpRight, AtSign, Check, Code2, Compass, Copy, Download, ExternalLink,
  FileDown, FileText, Film, Instagram, Layers3, Mail, Menu, Music2, PenTool, Presentation, Sparkles, X, Youtube,
} from 'lucide-react';

const profileImage = '/images/IMG-20261030-WA0032.jpg';
const emailAddress = 'ayana1291a@gmail.com';
const youtubeUrl = 'https://youtube.com/@orivoxs1?si=WyTZVCN8ApLSKLWX';
const instagramUrl = 'https://www.instagram.com/edinozze?dlrf=dmNqZ2g1YzEwZ2xv';
const collaborationMailto = `mailto:${emailAddress}?subject=${encodeURIComponent('Creative Collaboration — AYAN Portfolio')}&body=${encodeURIComponent('Hello AYAN,\n\nI discovered your portfolio and would like to discuss a potential creative collaboration.\n\nProject details:\n\nThank you.')}`;

const songs = [
  { number: '01', title: 'Song video / 01', text: 'An original music video from the AYAN creative archive.', url: 'https://youtu.be/FK-xzKGm2gg?si=j2F6akE65_bJIhCc' },
  { number: '02', title: 'Song video / 02', text: 'Another visual interpretation built around sound, rhythm and atmosphere.', url: 'https://youtu.be/UIW-TyJHJL4?si=ZkPBPYxjbGN0vTo_' },
];

const documents = [
  { title: 'Professional resume', type: 'PDF / 1 page', description: 'A concise overview of AYAN’s skills, projects, education and creative direction.', file: '/documents/AYAN_Professional_Resume_Updated.pdf', icon: FileText },
  { title: 'ORIVOX STUDIO portfolio', type: 'PPTX / studio archive', description: 'The wider ORIVOX STUDIO portfolio, presented as a downloadable deck.', file: '/documents/AYAN_ORIVOX_STUDIO_Portfolio.pptx', icon: Presentation },
  { title: 'ClassLink AI pitch deck', type: 'PPTX / project deck', description: 'A professional presentation for the ClassLink AI school communication concept.', file: '/documents/ClassLink_AI_Professional_Pitch_Deck.pptx', icon: Presentation },
];

const disciplines = [
  { number: '01', title: 'Video editing', text: 'Raw footage, rhythm, transitions, sound and cinematic presentation.', icon: Film, word: 'CUT' },
  { number: '02', title: 'Graphic design', text: 'Visual communication, composition, identity and digital aesthetics.', icon: PenTool, word: 'FORM' },
  { number: '03', title: 'AI filmmaking', text: 'Storyboards, visual concepts and new creative production workflows.', icon: Sparkles, word: 'IMAGINE' },
  { number: '04', title: 'Web development', text: 'Digital ideas transformed into functional experiences people can use.', icon: Code2, word: 'BUILD' },
  { number: '05', title: 'Creative direction', text: 'Connecting the idea, story, visuals and final presentation.', icon: Compass, word: 'DIRECT' },
  { number: '06', title: 'Technology & AI', text: 'Exploring how technology can solve problems and open possibilities.', icon: Layers3, word: 'EXPLORE' },
];

const projects = [
  { title: 'ORIVOX STUDIO', category: 'Creative brand / Digital media', status: 'Active creative identity', description: 'A creative brand and digital space for exploring visual storytelling, creative content and filmmaking.', tools: ['Visual storytelling', 'Video production', 'Creative branding'], art: 'art-orivox' },
  { title: 'FLUENTX', category: 'Education / English learning', status: 'Course development', description: 'An accessible English-learning project built around clear lessons, practical examples and AI-assisted narration.', tools: ['Beginner English', 'Grammar', 'Educational video'], art: 'art-fluentx' },
  { title: 'CLASSLINK AI', category: 'AI / School innovation', status: 'Prototype concept', description: 'A school communication concept that makes announcements, homework and key information easier to find.', tools: ['Communication', 'AI summaries', 'School community'], art: 'art-classlink' },
  { title: 'PROMESS', category: 'Digital product / Private communication', status: 'Product exploration', description: 'An experimental communication concept exploring private spaces, personalized encoding and conversation controls.', tools: ['Private spaces', 'Message design', 'Product thinking'], art: 'art-promess' },
  { title: 'OCEAN', category: 'AI filmmaking / Cinematic storytelling', status: 'Creative development', description: 'An atmospheric film concept exploring environmental storytelling, scene continuity and generative video.', tools: ['Storyboarding', 'Cinematic visuals', 'Sound design'], art: 'art-ocean' },
];

const timeline = [
  { year: '2020', title: 'The beginning', text: 'Started exploring filmmaking, creative writing, directing and video editing.' },
  { year: '—', title: 'Creative exploration', text: 'Began experimenting with editing applications, visual design and digital content.' },
  { year: '—', title: 'Digital creation', text: 'Expanded into graphic design, branding, storytelling and creative digital tools.' },
  { year: '—', title: 'AI exploration', text: 'Started exploring AI-assisted creative production, image generation and video tools.' },
  { year: '—', title: 'Digital product ideas', text: 'Began developing application concepts and exploring web technologies.' },
  { year: 'NOW', title: 'Building my identity', text: 'Still learning, experimenting, creating and developing independent projects.' },
];

const tools = ['CapCut', 'Alight Motion', 'KineMaster', 'Filmora', 'Canva', 'Picsart', 'ChatGPT', 'Gemini', 'Claude', 'ElevenLabs', 'Suno AI', 'Topview', 'Firebase', 'Supabase', 'React', 'Tailwind CSS', 'Microsoft Office'];

function HeroObject() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * .7) * .08;
  });
  return <mesh ref={mesh} rotation={[.3, .3, .3]}><icosahedronGeometry args={[1.35, 1]} /><meshStandardMaterial color="#d7d7d2" wireframe roughness={.35} metalness={.8} /></mesh>;
}

function MotionSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <motion.section id={id} className={className} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>{children}</motion.section>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorX = useMotionValue(-100); const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 35 }); const smoothY = useSpring(cursorY, { stiffness: 500, damping: 35 });
  const rotateX = useTransform(smoothY, [0, window.innerHeight], [4, -4]);
  const rotateY = useTransform(smoothX, [0, window.innerWidth], [-4, 4]);

  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 1150); return () => window.clearTimeout(timer); }, []);
  useEffect(() => {
    const move = (event: MouseEvent) => { cursorX.set(event.clientX); cursorY.set(event.clientY); setCursorVisible(true); };
    window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const handleCopyEmail = async () => { await navigator.clipboard.writeText(emailAddress); setCopied(true); window.setTimeout(() => setCopied(false), 2200); };
  const handleDownloadPortfolio = async () => {
    setPdfLoading(true);
    const { jsPDF } = await import('jspdf');
    const document = new jsPDF({ format: 'a4', unit: 'mm' });
    const addPage = (title: string, subtitle: string, body: string[]) => {
      document.setFillColor(5, 5, 5); document.rect(0, 0, 210, 297, 'F');
      document.setTextColor(245, 245, 245); document.setFont('helvetica', 'bold'); document.setFontSize(28); document.text(title, 20, 35);
      document.setTextColor(160, 160, 160); document.setFont('helvetica', 'normal'); document.setFontSize(10); document.text(subtitle, 20, 47);
      document.setDrawColor(38, 38, 38); document.line(20, 55, 190, 55); document.setTextColor(220, 220, 220); document.setFontSize(12);
      body.forEach((line, index) => document.text(line, 20, 78 + index * 11, { maxWidth: 165 }));
      document.setTextColor(110, 110, 110); document.setFontSize(8); document.text('AYAN / CREATIVE PORTFOLIO', 20, 282); document.text(String(document.getNumberOfPages()), 187, 282);
    };
    addPage('AYAN', 'INDEPENDENT CREATIVE / NEW DELHI, INDIA', ['CREATING IDEAS.', 'BUILDING EXPERIENCES.', '', 'Design · Film · Technology · Ideas']);
    addPage('About', 'A MIND. MANY MEDIUMS.', ['I am AYAN — an independent creative exploring filmmaking, design, technology', 'and digital experiences.', '', 'My journey began with filmmaking, directing, writing and editing, and keeps', 'expanding into AI, web technologies and digital products.']);
    addPage('Creative universe', 'CREATIVITY WITHOUT A SINGLE DIRECTION.', disciplines.map(item => `${item.number}  ${item.title.toUpperCase()} — ${item.text}`));
    addPage('Selected work', 'PROJECTS / CONCEPTS / WORK IN PROGRESS', projects.map(project => `${project.title} — ${project.status}`));
    addPage('Contact', 'LET\'S CREATE SOMETHING.', [`Email: ${emailAddress}`, 'YouTube: ORIVOX STUDIO', 'Instagram: EDINOZZE', '', 'For collaborations, creative enquiries and project discussions, feel free to reach out.']);
    document.setProperties({ title: 'AYAN Creative Portfolio', author: 'AYAN' });
    document.textWithLink('Email AYAN', 20, 255, { url: collaborationMailto });
    document.save('AYAN-Creative-Portfolio.pdf');
    setPdfLoading(false);
  };

  return <div className="portfolio-shell">
    <AnimatePresence>{loading && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}><motion.div className="loader-logo" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>AYAN</motion.div><div className="loader-rule"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} /></div><div className="loader-meta"><span>CREATIVE PORTFOLIO</span><span>2026</span></div></motion.div>}</AnimatePresence>
    {cursorVisible && <motion.div className="custom-cursor" style={{ x: smoothX, y: smoothY }} />}
    <header className="nav"><button className="nav-logo" onClick={() => scrollTo('top')}>AYAN</button><nav><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('work')}>Work</button><button onClick={() => scrollTo('music')}>Music</button><button onClick={() => scrollTo('resources')}>Archive</button></nav><button className="nav-contact" onClick={() => scrollTo('contact')}>Let&apos;s talk <ArrowUpRight size={15} /></button><button className="nav-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></header>
    <AnimatePresence>{menuOpen && <motion.div className="menu-overlay" initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: .55, ease: [.76, 0, .24, 1] }}>{['about', 'work', 'music', 'journey', 'resources', 'contact'].map((item, index) => <motion.button key={item} onClick={() => scrollTo(item)} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .07 }}><span>0{index + 1}</span>{item}</motion.button>)}</motion.div>}</AnimatePresence>

    <main id="top">
      <section className="hero-v2">
        <div className="hero-grid-lines" /><div className="hero-side-label">INDEPENDENT CREATIVE<br />NEW DELHI / INDIA</div><div className="hero-count">01 <span>/</span> 06</div>
        <motion.div className="hero-v2-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .12, delayChildren: .35 } } }}><motion.p className="kicker" variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}>Creative mind / visual explorer</motion.p><motion.h1 variants={{ hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [.22, 1, .36, 1] } } }}>Creating ideas.<br /><em>Building</em> experiences.</motion.h1><motion.p className="hero-v2-intro" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>I&apos;m AYAN — an independent creative exploring filmmaking, design, technology and digital experiences.</motion.p><motion.div className="hero-v2-actions" variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}><button className="pill-button" onClick={() => scrollTo('work')}>Explore my work <ArrowUpRight size={15} /></button><button className="ghost-button" onClick={() => scrollTo('about')}>Discover my story <ArrowDown size={14} /></button></motion.div></motion.div>
        <motion.div className="hero-v2-portrait" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.25, delay: .25, ease: [.76, 0, .24, 1] }}><img src={profileImage} alt="AYAN sitting in a red chair" /><div className="portrait-overlay" /><span className="portrait-label">PORTRAIT / 01</span></motion.div>
        <div className="hero-orb"><Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}><ambientLight intensity={1.5} /><directionalLight position={[2, 3, 4]} intensity={3} /><HeroObject /></Canvas></div>
        <motion.div className="hero-wordmark" initial={{ opacity: 0, letterSpacing: '.4em' }} animate={{ opacity: 1, letterSpacing: '-.09em' }} transition={{ delay: .85, duration: 1.1 }}>AYAN</motion.div><div className="scroll-line"><span>Scroll to explore</span><i /></div>
      </section>

      <MotionSection className="manifesto" id="about"><div className="page-width manifesto-grid"><p className="section-index">01 / ABOUT</p><div className="manifesto-main"><h2>Not one medium.<br /><span>A whole universe.</span></h2><div className="manifesto-copy"><p>I&apos;m someone who has never wanted to limit creativity to a single direction. My journey began with filmmaking, directing, writing and editing — and keeps expanding into design, AI, web technologies and digital products.</p><p>I&apos;m building more than a portfolio. I&apos;m building a creative identity — one experiment, one question, one idea at a time.</p></div><button className="under-button" onClick={() => scrollTo('contact')}>Start a conversation <ArrowRight size={15} /></button></div><div className="about-photo"><img src={profileImage} alt="AYAN portrait" /><span>STILL LEARNING.<br />STILL CREATING.</span></div></div></MotionSection>

      <MotionSection className="universe-v2"><div className="page-width"><div className="section-head-v2"><p className="section-index">02 / CREATIVE UNIVERSE</p><h2>Many mediums.<br /><span>One point of view.</span></h2></div><div className="universe-list">{disciplines.map(({ number, title, text, icon: Icon, word }, index) => <motion.article className="universe-row" key={title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span className="universe-number">{number}</span><Icon className="universe-icon" size={25} strokeWidth={1.3} /><div className="universe-title"><h3>{title}</h3><p>{text}</p></div><span className="universe-word">{word}</span><ArrowUpRight className="row-arrow" size={18} /></motion.article>)}</div></div></MotionSection>

      <MotionSection className="work-v2" id="work"><div className="page-width"><div className="section-head-v2 work-head"><div><p className="section-index">03 / SELECTED WORK</p><h2>Ideas in <span>progress.</span></h2></div><p>A living archive of projects, experiments and directions I&apos;m exploring.</p></div><div className="project-gallery">{projects.map((project, index) => <motion.button key={project.title} className="project-card-v2" onClick={() => setActiveProject(index)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .07 }}><div className={`project-art ${project.art}`}><span className="art-grid" /><span className="art-shape" /><span className="art-label">{String(index + 1).padStart(2, '0')} / CONCEPT</span></div><div className="project-card-meta"><span>{project.category}</span><ArrowUpRight size={16} /></div><h3>{project.title}</h3><p>{project.status}</p></motion.button>)}</div></div></MotionSection>

      <MotionSection className="music-v2" id="music"><div className="page-width"><div className="section-head-v2"><div><p className="section-index">04 / MUSIC & MOTION</p><h2>Sound into<br /><span>moving images.</span></h2></div><p>Two song videos from the creative archive — where rhythm, editing and visual atmosphere meet.</p></div><div className="music-grid">{songs.map((song, index) => <motion.a className={`music-card music-card-${index + 1}`} key={song.url} href={song.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .1 }}><div className="music-art"><span className="music-art-lines" /><span className="music-play"><Music2 size={19} /></span><span className="art-label">{song.number} / SONG VIDEO</span></div><div className="music-meta"><div><small>{song.title}</small><p>{song.text}</p></div><ArrowUpRight size={18} /></div></motion.a>)}</div></div></MotionSection>

      <MotionSection className="journey-v2" id="journey"><div className="page-width journey-layout"><div><p className="section-index">05 / THE JOURNEY</p><h2>Still learning.<br /><span>Still experimenting.</span></h2><p className="journey-note">There is no final version. Just a growing collection of questions, ideas and things I&apos;m learning to make.</p></div><div className="timeline-v2">{timeline.map((item, index) => <div className={`timeline-row ${index === timeline.length - 1 ? 'is-current' : ''}`} key={item.title}><span>{item.year}</span><div><small>{item.year === 'NOW' ? 'Present' : 'Chapter'}</small><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div></MotionSection>

      <MotionSection className="toolkit-v2"><div className="page-width toolkit-layout"><div><p className="section-index">06 / CREATIVE TOOLKIT</p><h2>Tools to<br /><span>explore with.</span></h2><p className="journey-note">Technologies and applications I explore across different creative directions — a map of curiosity, not a list of claims.</p></div><div className="tool-orbit"><div className="tool-orbit-ring" /><div className="tool-center">TOOLS<br />/ 019</div>{tools.map((tool, index) => <span key={tool} style={{ '--i': index } as React.CSSProperties}>{tool}</span>)}</div></div></MotionSection>

      <MotionSection className="resources-v2" id="resources"><div className="page-width"><div className="section-head-v2"><div><p className="section-index">07 / CREATIVE ARCHIVE</p><h2>More of the<br /><span>work behind me.</span></h2></div><p>Download the documents that give more context to the person, studio and ideas behind this portfolio.</p></div><div className="resource-list">{documents.map(({ title, type, description, file, icon: Icon }, index) => <motion.a className="resource-row" key={file} href={file} target="_blank" rel="noopener noreferrer" download initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><span className="resource-number">0{index + 1}</span><Icon size={22} strokeWidth={1.3} /><div className="resource-copy"><small>{type}</small><h3>{title}</h3><p>{description}</p></div><Download size={17} className="resource-download" /></motion.a>)}</div></div></MotionSection>

      <MotionSection className="identity-v2"><div className="page-width identity-layout-v2"><div><p className="section-index">07 / DIGITAL IDENTITY</p><h2>A card for<br /><span>the curious.</span></h2><p className="journey-note">A small, tactile expression of the world behind the work. Click it to flip.</p><button className="under-button" onClick={() => setCardFlipped(!cardFlipped)}>{cardFlipped ? 'See the front' : 'Flip the card'} <ArrowRight size={15} /></button></div><motion.button className="identity-object" style={{ rotateX, rotateY }} animate={{ rotateY: cardFlipped ? 180 : 0 }} transition={{ duration: .8 }} onClick={() => setCardFlipped(!cardFlipped)} aria-label="Flip identity card"><div className="identity-face identity-front"><div className="id-top"><b>AYAN</b><span>IDENTITY / 01</span></div><img src={profileImage} alt="Portrait of AYAN" /><div className="id-bottom"><b>INDEPENDENT<br />CREATIVE.</b><span>DELHI / IN</span></div></div><div className="identity-face identity-back"><div className="id-top"><b>AYAN</b><span>THE OTHER SIDE</span></div><div className="id-back-copy"><small>DISCIPLINES</small><b>FILM / DESIGN / AI<br />WEB / STORY / TECH</b><small>STUDIO</small><b>ORIVOX STUDIO</b><small>IDENTITY</small><b>EDINOZZE</b></div><div className="id-bottom"><span>CREATING IDEAS.<br />BUILDING EXPERIENCES.</span><AtSign size={22} /></div></div></motion.button></div></MotionSection>

      <MotionSection className="contact-v2" id="contact"><div className="page-width contact-layout"><div><p className="section-index">08 / CONTACT</p><h2>Let&apos;s create<br /><span>something.</span></h2><p className="journey-note">Have a thought, an idea or a project that needs a different point of view? I&apos;d like to hear about it.</p><div className="contact-social"><a href={youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube size={16} /> ORIVOX STUDIO <ExternalLink size={12} /></a><a href={instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> EDINOZZE <ExternalLink size={12} /></a></div></div><div className="email-contact"><p className="email-label">DIRECT EMAIL</p><a className="email-address" href={collaborationMailto}>{emailAddress}</a><div className="email-actions"><a className="pill-button" href={collaborationMailto}>Contact AYAN <Mail size={15} /></a><button className="ghost-button" onClick={handleCopyEmail}>{copied ? <><Check size={15} /> Email copied</> : <><Copy size={15} /> Copy email</>}</button></div><button className="download-button" onClick={handleDownloadPortfolio} disabled={pdfLoading}><FileDown size={16} /> {pdfLoading ? 'Preparing portfolio…' : 'Download portfolio PDF'}</button><p className="email-note">Opens your usual email app with a prepared collaboration note. The website does not send or store messages.</p></div></div></MotionSection>
    </main>

    <footer className="footer-v2"><div className="page-width footer-main"><span className="footer-logo">AYAN</span><p>Creating ideas.<br />Building experiences.</p><button onClick={() => scrollTo('top')} aria-label="Back to top"><ArrowUpRight size={17} /></button></div><div className="page-width footer-bottom-v2"><span>© {new Date().getFullYear()} AYAN — ALL RIGHTS RESERVED.</span><span>STILL LEARNING. STILL EXPERIMENTING. STILL CREATING.</span><a href={collaborationMailto}><Mail size={13} /> SAY HELLO</a></div></footer>

    <AnimatePresence>{activeProject !== null && <motion.div className="case-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}><motion.div className="case-study" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 25, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button className="case-close" onClick={() => setActiveProject(null)} aria-label="Close project"><X size={18} /></button><div className={`case-art ${projects[activeProject].art}`}><span className="art-grid" /><span className="art-shape" /></div><p className="section-index">CASE STUDY / 0{activeProject + 1}</p><small>{projects[activeProject].category}</small><h2>{projects[activeProject].title}</h2><p>{projects[activeProject].description}</p><div className="case-tools">{projects[activeProject].tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="case-footer"><span>{projects[activeProject].status}</span><span>EXPLORATION</span></div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}

export default App;

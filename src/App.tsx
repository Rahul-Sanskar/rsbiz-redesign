import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowRight, Menu, X, MessageSquareText, RadioTower, PhoneCall,
  Workflow, Megaphone, Code2, Check, Zap, Mail, MapPin, Phone,
  Instagram, Linkedin, Facebook
} from 'lucide-react'

const A = ({to,children,className='',onClick}:{to:string,children:React.ReactNode,className?:string,onClick?:()=>void}) =>
  <Link to={to} className={className} onClick={onClick}>{children}</Link>

/* ── Unsplash CDN helper (all IDs verified HTTP 200) ── */
const U = (id:string,w=600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const cardImages = {
  /* ── service cards ─────────────────────────────────────────────────────── */
  // Person holding phone with chat bubbles on screen → SMS/RCS
  sms:         U('1601972599720-36938d4ecd31'),
  // WhatsApp green chat on phone screen
  whatsapp:    U('1512314889357-e157c22f938d'),
  // Call-centre agent with headset at desk → IVR
  ivr:         U('1559526324-593bc073d938'),
  // CRM dashboard / analytics screen on laptop
  crm:         U('1607252650355-f7fd0460ccdb'),
  // Digital marketing / SEO analytics on screen
  marketing:   U('1460925895917-afdab827c52f'),
  // Developer typing on laptop — web dev
  webdev:      U('1526045612212-70caf35c14df'),

  /* ── SMS/RCS detail cards ──────────────────────────────────────────────── */
  // Person reading SMS on phone
  promo:       U('1488229297570-58520851e868'),
  // OTP / notification alert on phone
  transaction: U('1522542550221-31fd19575a2d'),
  // Voice waveform / speaker → voice messaging
  voice:       U('1516321318423-f06f85e504b3'),
  // Automated workflow / flowchart on screen
  automated:   U('1526628953301-3cd40e5a3d30'),
  // Virtual phone / VOIP desk phone
  virtual:     U('1576595580361-b8ad6b282200'),
  // Call routing / switch board operator
  routing:     U('1519389950473-47ba0277781c'),

  /* ── CRM detail cards ─────────────────────────────────────────────────── */
  // Leads list / contacts on screen
  crmLeads:    U('1607252650355-f7fd0460ccdb'),
  // Sales meeting / pipeline board
  crmSales:    U('1629904853716-f0bc54eea481'),
  // Marketing automation — email + phone icons
  crmAuto:     U('1613294326794-e7c74fe886e2'),
  // Reports chart / analytics dashboard
  crmReport:   U('1551288049-bebda4e38f71'),

  /* ── Digital Marketing detail cards ──────────────────────────────────── */
  // Search engine / SEO keywords on screen
  seo:         U('1559526324-593bc073d938'),
  // Social media feed on phone
  social:      U('1526628953301-3cd40e5a3d30'),
  // PPC / Google Ads campaign dashboard
  ads:         U('1573167507387-6b4b98cb7c13'),
  // Lead funnel / form on laptop
  lead:        U('1555421689-d68471e189f2'),

  /* ── Web & App dev detail cards ──────────────────────────────────────── */
  // Website design wireframes on screen
  website:     U('1517292987719-0369a794ec0f'),
  // Ecommerce / online store checkout page
  ecomImg:     U('1556742502-ec7c0e9f34b1'),
  // Developer building a mobile app on laptop + phone side by side
  mobileApp:   U('1522542550221-31fd19575a2d'),
  // Custom software / code on screen
  customDev:   U('1526045612212-70caf35c14df'),

  /* ── Page-hero art ───────────────────────────────────────────────────── */
  aboutHero:   U('1519389950473-47ba0277781c'),

  /* ── Our Works tiles ─────────────────────────────────────────────────── */
  workSms:     U('1601972599720-36938d4ecd31'),   // SMS on phone
  workWa:      U('1512314889357-e157c22f938d'),   // WhatsApp chat
  workIvr:     U('1519389950473-47ba0277781c'),   // call centre
  workCrm:     U('1607252650355-f7fd0460ccdb'),   // CRM dashboard
  workMktg:    U('1460925895917-afdab827c52f'),   // marketing analytics
  workWeb:     U('1526045612212-70caf35c14df'),   // web coding
  workMobile:  U('1615485500704-8e990f9900f7'),   // mobile app UI on phone
  workEcom:    U('1556742502-ec7c0e9f34b1'),      // ecommerce store
}

const services = [
  {n:'01',icon:MessageSquareText,title:'RCS & Bulk SMS',     text:'Reach customers instantly with reliable RCS and Bulk SMS solutions for promotional, transactional, and customer engagement campaigns.',to:'/bulk-sms',      tone:'pink',  img:cardImages.sms},
  {n:'02',icon:PhoneCall,        title:'WhatsApp & Voice',   text:'Connect with customers through WhatsApp Business API, Voice Messaging, and automated communication solutions for effective engagement.',to:'/whatsapp-voice', tone:'gold',  img:cardImages.whatsapp},
  {n:'03',icon:RadioTower,       title:'IVR Solutions',      text:'Cloud-based IVR solutions with virtual numbers and call management features to automate and streamline customer interactions.',         to:'/ivr-services',   tone:'plum',  img:cardImages.ivr},
  {n:'04',icon:Workflow,         title:'CRM Solutions',      text:'Powerful CRM solutions to manage leads, customer interactions, sales activities, and business communication from one platform.',         to:'/crm',            tone:'rose',  img:cardImages.crm},
  {n:'05',icon:Megaphone,        title:'Digital Marketing',  text:'Customized Digital Marketing solutions including SEO, social media, online advertising, and lead generation to improve your digital presence.',to:'/digital-marketing',tone:'orange',img:cardImages.marketing},
  {n:'06',icon:Code2,            title:'Web & App Dev',      text:'Professional Website and Mobile App Development with customized, scalable solutions using modern technologies for businesses of all sizes.',to:'/web-app-dev',    tone:'plum',  img:cardImages.webdev},
]

/* Our Works — covers every service RSBIZ offers */
const worksItems = [
  {title:'RCS & Bulk SMS',       sub:'Messaging Solutions',   img:cardImages.workSms,    to:'/bulk-sms'},
  {title:'WhatsApp & Voice',     sub:'Business Messaging',    img:cardImages.workWa,     to:'/whatsapp-voice'},
  {title:'IVR Solutions',        sub:'Voice Automation',      img:cardImages.workIvr,    to:'/ivr-services'},
  {title:'CRM Solutions',        sub:'Customer Management',   img:cardImages.workCrm,    to:'/crm'},
  {title:'Digital Marketing',    sub:'Growth & Visibility',   img:cardImages.workMktg,   to:'/digital-marketing'},
  {title:'Web Development',      sub:'Websites & Portals',    img:cardImages.workWeb,    to:'/web-app-dev'},
  {title:'Mobile Applications',  sub:'Android & iOS',         img:cardImages.workMobile, to:'/web-app-dev'},
  {title:'Ecommerce Development',sub:'Online Stores',         img:cardImages.workEcom,   to:'/web-app-dev'},
]

const images = {
  hero:'https://assets.website.toolzz.media/blog/toolzz-blog-chat-omnichannel-gratuito-a-chave-para-o-atendimento-ao-cliente-moderno-cover-close-up-slightly-low-angle-sh.png',
  team:'https://s.research.com/uploads/9508a53cc1e3d2a0e4fdeec12dbece03_9f09e59653.webp',
}

const fade = {hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1] as const}}}

/* ═══════════════════════════  LAYOUT COMPONENTS  ═══════════════════════════ */

function Header(){
  const [open,setOpen]=useState(false)
  const location=useLocation()
  const close=()=>setOpen(false)
  return <>
    <div className="topline">
      <span>Technology that brings people and businesses closer.</span>
      <A to="/contact">Let's build something meaningful <ArrowUpRight size={13}/></A>
    </div>
    <header className="nav-wrap">
      <nav className="nav container">
        <A to="/" className="brand"><img src="/images/rsbiz-logo.png" alt="RSBIZ"/></A>
        <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">
          {open?<X/>:<Menu/>}
        </button>
        <div className={`nav-links ${open?'open':''}`}>
          <A to="/"                onClick={close}>Home</A>
          <A to="/services"        onClick={close}>Services</A>
          <A to="/about-us"        onClick={close}>About Us</A>
          <A to="/bulk-sms"        onClick={close}>RCS &amp; SMS</A>
          <A to="/ivr-services"    onClick={close}>IVR Services</A>
          <A to="/clients"         onClick={close}>Our Clients</A>
          <A to="/contact"         onClick={close}>Contact Us</A>
          <A to="/contact" onClick={close} className="nav-cta">Talk to our team <ArrowUpRight size={16}/></A>
        </div>
      </nav>
    </header>
  </>
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-top">
        <A to="/" className="footer-brand"><img src="/images/rsbiz-logo.png" alt="RSBIZ logo"/></A>
        <p>Communications. Digital. Technology.<br/>A more connected way to move business forward.</p>
        <div className="socials">
          <a href="https://www.linkedin.com/"  aria-label="LinkedIn"><Linkedin  size={18}/></a>
          <a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={18}/></a>
          <a href="https://www.facebook.com/"  aria-label="Facebook"><Facebook  size={18}/></a>
        </div>
      </div>
      <div className="container footer-links">
        <div>
          <b>Explore</b>
          <A to="/">Home</A><A to="/about-us">About Us</A><A to="/services">Services</A>
          <A to="/portfolio">Portfolio</A><A to="/clients">Our Clients</A><A to="/contact">Contact Us</A>
        </div>
        <div>
          <b>Solutions</b>
          <A to="/bulk-sms">RCS, SMS &amp; IVR</A>
          <A to="/whatsapp-voice">WhatsApp &amp; Voice</A>
          <A to="/ivr-services">IVR Services</A>
          <A to="/crm">CRM Solutions</A>
          <A to="/digital-marketing">Digital Marketing</A>
          <A to="/web-app-dev">Web &amp; App Dev</A>
        </div>
        <div>
          <b>Information</b>
          <A to="/terms">Terms &amp; Conditions</A>
          <A to="/privacy">Privacy Policy</A>
        </div>
        <div>
          <b>Contact</b>
          <span>info@rsbiz.in</span>
          <span>+91 9999114347</span>
          <span>+91 8368115345</span>
          <span>111, Mahinder Chambers, Waman Tukaram Patil Marg, opposite Duke's Factory, Ghatla, Chembur, Mumbai – 400071</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} RS BIZ PVT LTD. All rights reserved.</span>
        <div><A to="/terms">Terms</A><A to="/privacy">Privacy</A><A to="/contact">Contact</A></div>
        <A to="/">Back to top ↑</A>
      </div>
    </footer>
  )
}

function PageHero({kicker,title,lead,img:heroImg}:{kicker:string,title:React.ReactNode,lead?:string,img?:string}){
  return (
    <section className="inner-hero">
      <div className="container inner-hero-grid">
        <div>
          <div className="eyebrow"><span className="eyebrow-line"/>{kicker}</div>
          <h1>{title}</h1>
          {lead&&<p>{lead}</p>}
        </div>
        <div className="inner-hero-art">
          {heroImg
            ? <><div className="hero-art-ring"/><div className="hero-art-photo"><img src={heroImg} alt=""/></div></>
            : <><div className="art-ring"/><div className="art-disc"><Zap size={40}/></div><span>RSBIZ<br/>COMMUNICATIONS<br/>DIGITAL<br/>TECHNOLOGY</span></>
          }
        </div>
      </div>
    </section>
  )
}

function Achievements(){
  return (
    <div className="container metric-row">
      <div className="metric"><strong>100</strong><small>Finished Project</small></div>
      <div className="metric"><strong>3</strong><small>Awards Won</small></div>
      <div className="metric"><strong>85</strong><small>Happy Customers</small></div>
      <div className="metric"><strong>100</strong><small>Design Ideas</small></div>
    </div>
  )
}

function EnquiryForm(){
  return (
    <form className="contact-form" action="/api/contact.php" method="POST">
      <div className="form-head">
        <span>QUICK QUERY</span>
        <strong>Tell us how we can help.</strong>
      </div>
      <div className="form-row">
        <label>Enter name<input name="name" required placeholder="Enter name"/></label>
        <label>Enter email<input name="email" type="email" required placeholder="Enter email"/></label>
      </div>
      <div className="form-row">
        <label>Mobile Number<input name="phone" required placeholder="Mobile Number"/></label>
        <label>I'm interested in
          <select name="service" required defaultValue="">
            <option value="" disabled>Select a service</option>
            <option>RCS &amp; Bulk SMS</option>
            <option>WhatsApp &amp; Voice</option>
            <option>IVR Solutions</option>
            <option>CRM Solutions</option>
            <option>Digital Marketing</option>
            <option>Web &amp; App Development</option>
          </select>
        </label>
      </div>
      <label>Message<textarea name="message" rows={3} placeholder="Tell us about your requirement"/></label>
      <label className="consent">
        <input type="checkbox" name="consent" required/>
        {' '}I hereby authorize to send notifications on SMS/ Messages/ RCS/ Promotional/ Informational Messages.
      </label>
      <div className="hp-field"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="form-bottom">
        <small>Your details will be used to respond to your enquiry.</small>
        <button className="btn btn-gold" type="submit">Submit <ArrowUpRight size={17}/></button>
      </div>
    </form>
  )
}

function ContactBand(){
  return (
    <section className="contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow light"><span className="eyebrow-line"/> QUICK QUERY</div>
          <h2>Let's talk about<br/><em>your next move.</em></h2>
          <p>RS BIZ PVT LTD<br/>111, Mahinder Chambers, Waman Tukaram Patil Marg, opposite Duke's Factory, Ghatla, Chembur, Mumbai – 400071</p>
          <div className="contact-detail">
            <span><Mail size={17}/></span>
            <div><b>Email</b><small>info@rsbiz.in</small></div>
          </div>
          <div className="contact-detail">
            <span><Phone size={17}/></span>
            <div><b>Phone</b><small>+91 9999114347 &nbsp;|&nbsp; +91 8368115345</small></div>
          </div>
        </div>
        <EnquiryForm/>
      </div>
    </section>
  )
}

function ServiceCard({s}:{s:any}){
  return (
    <motion.article className={`service-card ${s.tone}`} variants={fade} initial="hidden" whileInView="show" viewport={{once:true}}>
      <div className="service-img"><img src={s.img} alt={s.title} loading="lazy"/></div>
      <div className="service-top"><span>{s.n} / SERVICE</span><s.icon size={25} strokeWidth={1.6}/></div>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
      <A to={s.to} className="circle-arrow" aria-label={`Read about ${s.title}`}><ArrowUpRight size={19}/></A>
    </motion.article>
  )
}

function WorksTiles(){
  return (
    <div className="portfolio-grid">
      {worksItems.map((item,i)=>(
        <A to={item.to} key={item.title} className={`portfolio-tile tile-${i+1}`}>
          <img src={item.img} alt={item.title} loading="lazy"/>
          <div className="portfolio-tile-body">
            <span>{item.sub}</span>
            <strong>{item.title}</strong>
          </div>
          <ArrowUpRight size={19} className="portfolio-tile-arrow"/>
        </A>
      ))}
    </div>
  )
}

/* ═══════════════════════════  PAGE COMPONENTS  ═══════════════════════════ */

function Home(){
  return <>
    <section className="hero container" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> WELCOME TO RS BIZ</div>
        <div className="hero-authorised">AUTHORISED BUILDER</div>
        <h1>Connect.<br/><em>Communicate.</em><br/>Grow.</h1>
        <p className="hero-lead">We offer RCS, Bulk SMS, IVR and Web Development Services to clients across India. Our core services include Mobile Apps Development for Android, iOS and Windows, WhatsApp Business API, Voice Messaging, CRM Solutions, Digital Marketing, and Web Development on technologies including PHP, WordPress, Java, Laravel and Magento.</p>
        <div className="hero-actions">
          <A to="/about-us" className="btn btn-dark">Learn More <ArrowUpRight size={17}/></A>
          <A to="/services" className="text-link">Explore our services <ArrowRight size={16}/></A>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo"><img src={images.hero} alt="Business communication"/></div>
        <div className="hero-sticker"><Zap size={17}/><span>Ideas into<br/>impact</span></div>
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="floating-card message-card">
          <span className="mini-icon"><MessageSquareText size={16}/></span>
          <div><b>Connected communication</b><small>Across the channels customers use</small></div>
          <span className="check"><Check size={13}/></span>
        </div>
        <div className="floating-card stat-card">
          <small>OUR APPROACH</small>
          <strong>01 <i>→</i> ∞</strong>
          <span>One partner. More possibilities.</span>
        </div>
        <div className="hero-blob"/>
      </div>
    </section>

    <div className="marquee-band">
      <div className="marquee-track">
        <span>RCS MESSAGING <b>✳</b> BULK SMS <b>✳</b> WHATSAPP BUSINESS <b>✳</b> VOICE &amp; IVR <b>✳</b> CRM <b>✳</b> DIGITAL MARKETING <b>✳</b> WEB &amp; APP DEVELOPMENT <b>✳</b> </span>
        <span>RCS MESSAGING <b>✳</b> BULK SMS <b>✳</b> WHATSAPP BUSINESS <b>✳</b> VOICE &amp; IVR <b>✳</b> CRM <b>✳</b> DIGITAL MARKETING <b>✳</b> WEB &amp; APP DEVELOPMENT <b>✳</b> </span>
      </div>
    </div>

    <section className="section-pad">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="eyebrow-line"/> OUR SERVICES</div>
            <h2>Technology for<br/><em>every connection.</em></h2>
          </div>
          <p>RS BIZ PVT LTD offers a comprehensive suite of digital communication and technology services — from RCS &amp; Bulk SMS and WhatsApp &amp; Voice solutions to IVR, CRM, Digital Marketing, and Web &amp; App Development.</p>
        </div>
        <div className="services-grid">{services.map(s=><ServiceCard key={s.n} s={s}/>)}</div>
        <div className="center-cta"><A to="/services" className="btn btn-dark">View all services <ArrowUpRight size={17}/></A></div>
      </div>
    </section>

    <section className="showcase-section section-pad">
      <div className="container">
        <div className="showcase-head">
          <div>
            <div className="eyebrow"><span className="eyebrow-line"/> OUR WORKS</div>
            <h2>Our <em>works.</em></h2>
          </div>
          <p>From messaging solutions and IVR automation to digital marketing, CRM, website design, mobile applications and ecommerce development — explore every service we deliver.</p>
        </div>
        <WorksTiles/>
        <div className="center-cta"><A to="/services" className="underlined-link">Explore all services <ArrowUpRight size={16}/></A></div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container">
        <div className="eyebrow"><span className="eyebrow-line"/> OUR ACHIEVEMENTS</div>
        <Achievements/>
      </div>
    </section>

    <ContactBand/>
  </>
}

function About(){
  return <>
    <PageHero kicker="COMPANY / ABOUT US" title={<>Building better<br/><em>connections.</em></>}
      lead="We offer reliable Digital Communication and IT Solutions to help businesses connect with their customers, generate leads, and improve customer engagement."
      img={cardImages.aboutHero}/>
    <section className="section-pad">
      <div className="container about-grid">
        <div className="about-image"><img src={images.team} alt="Business team working together"/></div>
        <div>
          <div className="eyebrow"><span className="eyebrow-line"/> ABOUT RS BIZ PVT LTD</div>
          <h2 className="content-title">Digital communication.<br/><em>Technology that works.</em></h2>
          <p>We offer reliable Digital Communication and IT Solutions to help businesses connect with their customers, generate leads, and improve customer engagement. Our core services include RCS Messaging, Bulk SMS, WhatsApp Business API, Voice &amp; IVR Solutions, CRM Solutions, Mobile App Development, and Web Development.</p>
          <p>We provide scalable and customised solutions for businesses across various industries, helping them streamline communication, automate customer interactions, and build stronger customer relationships.</p>
          <p>RS BIZ PVT LTD Services IT Solutions is a leading firm in India, specialised in web development, e-commerce development, website design, Custom Development, Web Application, RCS, Bulk SMS and IVR Solutions.</p>
        </div>
      </div>
      <Achievements/>
    </section>
    <ContactBand/>
  </>
}

function Services(){
  return <>
    <PageHero kicker="WHAT WE DO" title={<>Our <em>Services.</em></>}
      lead="RS BIZ PVT LTD offers a comprehensive suite of digital communication and technology services designed to help businesses grow."
      img={cardImages.marketing}/>
    <section className="section-pad">
      <div className="container services-grid">{services.map(s=><ServiceCard key={s.n} s={s}/>)}</div>
    </section>
    <ContactBand/>
  </>
}

/* ── Generic detail page used by SMS, WhatsApp, IVR ── */
function DetailPage({kind}:{kind:'sms'|'whatsapp'|'ivr'}){
  const data = kind==='sms' ? {
    k:'RCS, SMS & IVR SOLUTIONS', title:'RCS & Bulk SMS Solutions',
    lead:"Reach your customers instantly with our reliable RCS (Rich Communication Services) and Bulk SMS solutions. Whether it's promotional campaigns, transactional alerts, or customer engagement messages, our platform ensures high deliverability and real-time reporting.",
    second:'Our Bulk SMS gateway supports Promotional SMS, Transactional SMS, API integration, Long Code, and Short Code services. Fully compliant with TRAI regulations, our platform lets you send millions of messages with a single click.',
    heroImg: cardImages.sms,
    items:[
      ['RCS Messaging',    'Engage customers with rich, branded RCS messages featuring images, carousels, quick replies, and verified sender identity.',cardImages.sms],
      ['Promotional SMS',  'Send bulk promotional SMS to millions of customers instantly. Best rates, high deliverability, and real-time campaign reports.',cardImages.promo],
      ['Transactional SMS','Deliver OTPs, alerts, and notifications via Transactional SMS Gateway — reaches DND and NDNC registered customers 24×7.',cardImages.transaction],
      ['IVR Solutions',    'Cloud-based IVR with virtual numbers, call routing, and automated voice responses to streamline customer interactions.',cardImages.ivr],
    ]
  } : kind==='whatsapp' ? {
    k:'WHATSAPP & VOICE SOLUTIONS', title:'WhatsApp & Voice Solutions',
    lead:'Connect with your customers through powerful WhatsApp Business API messaging, Voice Messaging, and automated communication workflows. Our platform enables businesses to send rich media messages, interactive templates, and transactional notifications.',
    second:'Combined with Voice Messaging solutions, you can reach customers via automated voice calls for OTPs, alerts, promotions, and customer support.',
    heroImg: cardImages.whatsapp,
    items:[
      ['WhatsApp Business API', 'Connect with customers through rich media messages, interactive templates, transactional notifications, and two-way conversations.',cardImages.whatsapp],
      ['Voice Messaging',       'Reach customers via automated voice calls for OTPs, alerts, promotions, and customer support.',cardImages.voice],
      ['Automated Communication','Run bulk voice broadcasts or personalised IVR-driven conversations for customer engagement at scale.',cardImages.automated],
    ]
  } : {
    k:'INTERACTIVE VOICE RESPONSE (IVR)', title:'IVR Solutions',
    lead:'Our cloud-based IVR solutions help businesses automate and streamline customer interactions with ease. With virtual numbers, intelligent call routing, and customisable menu flows, you can handle high call volumes efficiently.',
    second:'Whether you need inbound call management, outbound voice campaigns, missed call services, or a fully automated customer support system — our IVR solutions are flexible, scalable, and built for businesses of all sizes.',
    heroImg: cardImages.ivr,
    items:[
      ['Virtual Phone Number',   'A virtual number (DID/access number) is a telephone number without a directly associated telephone line.',cardImages.virtual],
      ['Office Call Routing',    'Create answering rules to forward important calls to all your numbers — home, office, or mobile.',cardImages.routing],
      ['Call Center Forwarding', 'Forward calls to any number you choose, including domestic long distance and cellular.',cardImages.transaction],
      ['Pre Recorded Voice',     'Use a pre-recorded message as the personalised greeting for voicemail or IVR menus.',cardImages.voice],
    ]
  }

  return <>
    <PageHero kicker={data.k}
      title={<>{data.title.split(' ').slice(0,-1).join(' ')} <em>{data.title.split(' ').slice(-1)}</em></>}
      lead={data.lead} img={data.heroImg}/>
    <section className="section-pad">
      <div className="container detail-layout">
        <div className="detail-main">
          <p>{data.lead}</p><p>{data.second}</p>
          <div className="detail-cards">
            {data.items.map(([t,d,ci],i)=>(
              <div className="detail-card" key={t}>
                <div className="detail-card-img"><img src={ci} alt={t} loading="lazy"/></div>
                <span>0{i+1}</span><h3>{t}</h3><p>{d}</p>
                <A to="/contact" className="underlined-link">Contact Now <ArrowUpRight size={15}/></A>
              </div>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <div className="aside-image"><img src={data.heroImg} alt={data.title}/></div>
          <h3>Let's find the right solution for your business.</h3>
          <p>Connect with RS BIZ PVT LTD to discuss your communication requirements.</p>
          <A to="/contact" className="btn btn-dark">Contact Now <ArrowUpRight size={16}/></A>
        </aside>
      </div>
    </section>
    <ContactBand/>
  </>
}

/* ── CRM Solutions detail page ── */
function CRMPage(){
  const items:[string,string,string][] = [
    ['Lead Management',      'Capture, track and nurture leads through every stage of the sales funnel with intelligent CRM tools.',          cardImages.crmLeads],
    ['Sales Pipeline',       'Visualise your entire sales pipeline in real time — manage deals, set follow-ups, and close faster.',          cardImages.crmSales],
    ['Marketing Automation', 'Automate email, SMS, and WhatsApp campaigns triggered by customer behaviour and lifecycle stages.',            cardImages.crmAuto],
    ['Reports & Analytics',  'Gain actionable insights with detailed reports on sales performance, customer activity, and team productivity.',cardImages.crmReport],
  ]
  return <>
    <PageHero kicker="CRM SOLUTIONS" title={<>CRM <em>Solutions.</em></>}
      lead="Powerful CRM solutions to manage leads, customer interactions, sales activities, and business communication from one unified platform."
      img={cardImages.crm}/>
    <section className="section-pad">
      <div className="container detail-layout">
        <div className="detail-main">
          <p>Powerful CRM solutions to manage leads, customer interactions, sales activities, and business communication from one platform. Our CRM integrates seamlessly with your existing communication channels — SMS, WhatsApp, Voice, and Email — giving your team a 360° view of every customer.</p>
          <p>Whether you're a startup looking to organise your first 100 leads or an enterprise managing thousands of relationships, our scalable CRM platform grows with your business and adapts to your workflow.</p>
          <div className="detail-cards">
            {items.map(([t,d,ci],i)=>(
              <div className="detail-card" key={t}>
                <div className="detail-card-img"><img src={ci} alt={t} loading="lazy"/></div>
                <span>0{i+1}</span><h3>{t}</h3><p>{d}</p>
                <A to="/contact" className="underlined-link">Contact Now <ArrowUpRight size={15}/></A>
              </div>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <div className="aside-image"><img src={cardImages.crm} alt="CRM Solutions"/></div>
          <h3>Ready to take control of your customer relationships?</h3>
          <p>Talk to us about a CRM solution that fits your business size and industry.</p>
          <A to="/contact" className="btn btn-dark">Get Started <ArrowUpRight size={16}/></A>
        </aside>
      </div>
    </section>
    <ContactBand/>
  </>
}

/* ── Digital Marketing detail page ── */
function DigitalMarketingPage(){
  const items:[string,string,string][] = [
    ['Search Engine Optimisation','Rank higher on Google and drive organic traffic with proven on-page, off-page, and technical SEO strategies.', cardImages.seo],
    ['Social Media Marketing',    'Build brand awareness and engage your audience across Instagram, Facebook, LinkedIn, and more.',              cardImages.social],
    ['Online Advertising (PPC)',  'Run targeted Google Ads and Meta campaigns that deliver measurable ROI for your budget.',                     cardImages.ads],
    ['Lead Generation',           'Attract, capture, and convert high-quality leads using optimised landing pages, forms, and funnels.',        cardImages.lead],
  ]
  return <>
    <PageHero kicker="DIGITAL MARKETING" title={<>Digital <em>Marketing.</em></>}
      lead="Customised Digital Marketing solutions including SEO, social media, online advertising, and lead generation to improve your digital presence."
      img={cardImages.marketing}/>
    <section className="section-pad">
      <div className="container detail-layout">
        <div className="detail-main">
          <p>Customised Digital Marketing solutions including SEO, social media, online advertising, and lead generation to improve your digital presence and grow revenue. We work with businesses across industries to build campaigns that are data-driven and results-focused.</p>
          <p>Our team combines creative content with analytical rigour — from keyword research and ad copy to A/B testing and performance reporting — ensuring every rupee you invest works harder.</p>
          <div className="detail-cards">
            {items.map(([t,d,ci],i)=>(
              <div className="detail-card" key={t}>
                <div className="detail-card-img"><img src={ci} alt={t} loading="lazy"/></div>
                <span>0{i+1}</span><h3>{t}</h3><p>{d}</p>
                <A to="/contact" className="underlined-link">Contact Now <ArrowUpRight size={15}/></A>
              </div>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <div className="aside-image"><img src={cardImages.marketing} alt="Digital Marketing"/></div>
          <h3>Let's grow your brand online.</h3>
          <p>Talk to our digital marketing team about a tailored strategy for your business.</p>
          <A to="/contact" className="btn btn-dark">Get Started <ArrowUpRight size={16}/></A>
        </aside>
      </div>
    </section>
    <ContactBand/>
  </>
}

/* ── Web & App Development detail page ── */
function WebAppPage(){
  const items:[string,string,string][] = [
    ['Website Design & Dev',    'Custom, responsive websites built on WordPress, Laravel, PHP, and modern frameworks — optimised for speed and SEO.', cardImages.website],
    ['Ecommerce Development',   'Scalable online stores on Magento, WooCommerce, and custom platforms with secure payment integration.',              cardImages.ecomImg],
    ['Mobile App Development',  'Native and hybrid Android &amp; iOS apps built to deliver seamless user experiences across all devices.',            cardImages.mobileApp],
    ['Custom Software',         'Bespoke web applications, portals, and enterprise software tailored to your exact business requirements.',           cardImages.customDev],
  ]
  return <>
    <PageHero kicker="WEB & APP DEVELOPMENT" title={<>Web &amp; App <em>Development.</em></>}
      lead="Professional Website and Mobile App Development with customised, scalable solutions using modern technologies for businesses of all sizes."
      img={cardImages.webdev}/>
    <section className="section-pad">
      <div className="container detail-layout">
        <div className="detail-main">
          <p>Professional Website and Mobile App Development with customised, scalable solutions using modern technologies including PHP, WordPress, Java, Laravel, and Magento. We build everything from brochure websites to complex enterprise portals.</p>
          <p>Our development process is transparent, collaborative, and focused on delivery — with dedicated project managers, UI/UX design, quality assurance, and post-launch support included in every engagement.</p>
          <div className="detail-cards">
            {items.map(([t,d,ci],i)=>(
              <div className="detail-card" key={t}>
                <div className="detail-card-img"><img src={ci} alt={t} loading="lazy"/></div>
                <span>0{i+1}</span><h3>{t}</h3><p>{d}</p>
                <A to="/contact" className="underlined-link">Contact Now <ArrowUpRight size={15}/></A>
              </div>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <div className="aside-image"><img src={cardImages.webdev} alt="Web & App Development"/></div>
          <h3>Ready to build something great?</h3>
          <p>Share your project brief and we'll come back with a proposal and timeline.</p>
          <A to="/contact" className="btn btn-dark">Start a Project <ArrowUpRight size={16}/></A>
        </aside>
      </div>
    </section>
    <ContactBand/>
  </>
}

/* ── Portfolio page ── */
function Portfolio(){
  /* 8 portfolio tiles linking to relevant detail pages */
  const tiles = [
    {title:'Website Design',       img:'https://rsbiz.in/img/portfolio/port1.jpg', to:'/web-app-dev'},
    {title:'Ecommerce Development',img:'https://rsbiz.in/img/portfolio/port2.jpg', to:'/web-app-dev'},
    {title:'Software Development', img:'https://rsbiz.in/img/portfolio/port3.jpg', to:'/web-app-dev'},
    {title:'Programming',          img:'https://rsbiz.in/img/portfolio/port4.jpg', to:'/web-app-dev'},
    {title:'Digital Marketing',    img:'https://rsbiz.in/img/portfolio/port5.jpg', to:'/digital-marketing'},
    {title:'Web Development',      img:'https://rsbiz.in/img/portfolio/port6.jpg', to:'/web-app-dev'},
    {title:'Mobile Application',   img:'https://rsbiz.in/img/portfolio/port7.jpg', to:'/web-app-dev'},
    {title:'Ecommerce Web-Portal', img:'https://rsbiz.in/img/portfolio/port8.jpg', to:'/web-app-dev'},
  ]
  return <>
    <PageHero kicker="OUR WORK" title={<>Our <em>Portfolio.</em></>}
      lead="Explore our work across Website Design, Ecommerce Development, Software Development, Programming, Digital Marketing, Web Development and Mobile Application."
      img={cardImages.website}/>
    <section className="section-pad">
      <div className="container">
        <div className="portfolio-filters">
          <span>All</span><span>Web Design</span><span>Graphic Design</span><span>Illustrator</span><span>Photography</span>
        </div>
        <div className="portfolio-grid">
          {tiles.map((item,i)=>(
            <A to={item.to} key={item.title} className={`portfolio-tile tile-${i+1}`}>
              <img src={item.img} alt={item.title} loading="lazy"/>
              <div className="portfolio-tile-body"><span>0{i+1}</span><strong>{item.title}</strong></div>
              <ArrowUpRight size={19} className="portfolio-tile-arrow"/>
            </A>
          ))}
        </div>
        <Achievements/>
        <div className="center-cta" style={{marginTop:'40px'}}>
          <A to="/contact" className="btn btn-dark">Start a Project <ArrowUpRight size={17}/></A>
        </div>
      </div>
    </section>
  </>
}

/* ── Clients page — ruparal.jpg and ajmera.jpg removed ── */
function Clients(){
  const logos = [
    'godrej.jpg','bajaj.jpg','suresd.jpg','clt10.jpeg',
    'clt123.jpeg','clt124.jpeg','clt125.png','clt126.jpeg',
    'clt127.jpeg','clt128.jpeg','clt129.jpeg','16.png',
  ]
  return <>
    <PageHero kicker="COMPANY / OUR CLIENTS" title={<>Our <em>Clients.</em></>}
      lead="RSbiz Pvt. Ltd. is a leading IT solutions firm in India specialised in web development, e-commerce, website design, RCS, Bulk SMS and IVR Solutions. Our objective is to provide the best services and improve the overall growth of our clients' businesses."
      img={cardImages.crmSales}/>
    <section className="section-pad">
      <div className="container">
        <div className="client-intro">
          <p>Our innovative strategies, unparalleled technical skills and years of working experience will really upgrade your business and give maximum visibility among customers. We provide the best and most affordable services of web development to companies of all sizes.</p>
        </div>
        <div className="client-logo-grid">
          {logos.map((logo,i)=>(
            <div className="client-logo" key={logo}>
              <img src={`https://rsbiz.in/images/${logo}`} alt={`RS BIZ client ${i+1}`} loading="lazy"/>
            </div>
          ))}
        </div>
      </div>
    </section>
    <ContactBand/>
  </>
}

/* ── Contact page ── */
function Contact(){
  return <>
    <PageHero kicker="CONTACT US" title={<>Let's start a<br/><em>conversation.</em></>}
      lead="Get in touch with RS BIZ PVT LTD for RCS, Bulk SMS, IVR, WhatsApp, Voice, CRM, Digital Marketing and Web & App Development services."
      img={cardImages.voice}/>
    <ContactBand/>
    <section className="address-section">
      <div className="container address-grid">
        <div>
          <div className="eyebrow"><span className="eyebrow-line"/> OUR ADDRESS</div>
          <h2 className="content-title">Visit <em>RS BIZ.</em></h2>
          <div className="office-list">
            <div className="office-item">
              <MapPin size={16}/>
              <div><b>Registered Office</b><p>Plot No-51, Gyan Khand I, Indirapuram, Ghaziabad – 201001</p></div>
            </div>
            <div className="office-item">
              <MapPin size={16}/>
              <div><b>Branch Office — Delhi</b><p>B 23, Somdutt Chambers 2, Bhikaji Cama Place, New Delhi – 110066</p></div>
            </div>
            <div className="office-item">
              <MapPin size={16}/>
              <div><b>Branch Office — Mumbai</b><p>111, Mahinder Chambers, Waman Tukaram Patil Marg, opposite Duke's Factory, Ghatla, Chembur, Mumbai – 400071</p></div>
            </div>
          </div>
          <p className="office-contact"><b>Phone:</b> +91 9999114347 &nbsp;|&nbsp; +91 8368115345 &nbsp;|&nbsp; <b>Email:</b> info@rsbiz.in</p>
        </div>
        <div className="map-panel">
          <iframe src="https://www.google.com/maps?q=111+Mahinder+Chambers+Chembur+Mumbai+400071&output=embed"
            title="RS BIZ location on map" loading="lazy"/>
        </div>
      </div>
    </section>
  </>
}

/* ── Legal pages ── */
function Legal({type}:{type:'terms'|'privacy'}){
  const terms = [
    'rsbiz.in website is created, updated and maintained independently by RS Biz Pvt. Ltd. All content on this site is the copyright of RS Biz Pvt. Ltd.',
    'The information contained in this website is intended solely to provide general information for the personal use of the reader, who accepts full responsibility for its use.',
    'We accept no responsibility for any errors or omissions, or for the results obtained from the use of this information. All information is provided "as is," with no guarantee of completeness, accuracy, or timeliness.',
    'Nothing herein shall substitute for the independent investigations and the sound technical and business judgment of the reader.',
    'In no event shall RS Biz Pvt. Ltd. be liable for any direct, indirect, incidental, punitive, or consequential damages of any kind with respect to the service, the materials, and the products.',
    'The information presented here has been compiled from publicly aired and published sources.',
    'rsbiz.in reserves the right, in its sole discretion and without any obligation, to make improvements to, or correct any error or omissions in any portion of the service or the materials.',
    '"By agreeing to our terms and conditions, the users acknowledge that they may receive instant messages, files, photos, videos through SMS/WhatsApp or RCS messaging service."',
  ]
  const privacy:[string,string][] = [
    ['Information Collection and Use','We collect information from users when they register to use our services or provide information during specific instances. This information includes names, email addresses, business details, and other personal information.'],
    ['Purpose of Information Collection','RS Biz Pvt. Ltd. collects personal and business information to provide a customised experience on our platform, including personalised services and interactive communications.'],
    ['Advertising and Third-Party Services','In order to provide free services, RS Biz Pvt. Ltd. displays advertisements based on site usage statistics and visitor trends.'],
    ['Disclosure of Information','RS Biz Pvt. Ltd. will not disclose or share any user\'s personally identifiable information unless explicitly permitted by the user or required by law.'],
    ['Emails and Direct Mails','We may send emails about our products and services to our users, and occasionally about third-party products and services of interest.'],
    ['Data Security','RS Biz Pvt. Ltd. takes necessary steps to secure user information, though we cannot guarantee 100% data transmission security over the internet.'],
    ['Updates to the Privacy Policy','RS Biz Pvt. Ltd. reserves the right to update and modify this Privacy Policy as needed.'],
  ]
  return <>
    <PageHero kicker="INFORMATION" title={type==='terms'?<>Terms &amp; <em>Conditions.</em></>:<>Privacy <em>Policy.</em></>}/>
    <section className="section-pad">
      <article className="container legal-content">
        {type==='terms'
          ? terms.map((p,i)=><p key={i}>{p}</p>)
          : <>
              <p>RS Biz Pvt. Ltd. is committed to protecting the privacy of its users. This Privacy Policy outlines how we collect, use, and safeguard personal and business information when you use our services.</p>
              {privacy.map(([h,p],i)=><section key={i}><h3>{h}</h3><p>{p}</p></section>)}
            </>
        }
      </article>
    </section>
  </>
}

/* ═══════════════════════════  ROUTER  ═══════════════════════════ */
function AppRoutes(){
  const loc=useLocation()
  return <>
    <Header/>
    <main key={loc.pathname}>
      <Routes>
        <Route path="/"                element={<Home/>}/>
        <Route path="/about-us"        element={<About/>}/>
        <Route path="/services"        element={<Services/>}/>
        <Route path="/bulk-sms"        element={<DetailPage kind="sms"/>}/>
        <Route path="/whatsapp-voice"  element={<DetailPage kind="whatsapp"/>}/>
        <Route path="/ivr-services"    element={<DetailPage kind="ivr"/>}/>
        <Route path="/crm"             element={<CRMPage/>}/>
        <Route path="/digital-marketing" element={<DigitalMarketingPage/>}/>
        <Route path="/web-app-dev"     element={<WebAppPage/>}/>
        <Route path="/portfolio"       element={<Portfolio/>}/>
        <Route path="/clients"         element={<Clients/>}/>
        <Route path="/contact"         element={<Contact/>}/>
        <Route path="/terms"           element={<Legal type="terms"/>}/>
        <Route path="/privacy"         element={<Legal type="privacy"/>}/>
        <Route path="*"                element={<Home/>}/>
      </Routes>
    </main>
    <Footer/>
  </>
}

export default function App(){return <BrowserRouter><AppRoutes/></BrowserRouter>}

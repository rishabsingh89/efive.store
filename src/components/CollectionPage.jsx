import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const collectionsData = {
  'luxury-living-room': {
    title: 'Luxury Living Room',
    tagline: 'Where Comfort Meets Elegance',
    hero: 'Your living room isn\'t just a room — it\'s where your story begins every single day.',
    sections: [
      {
        heading: 'Transform Your Space, Transform Your Life',
        content: 'Bhaiya, sochiye — jab aap thake-haare ghar aate ho, aur aapka sofa itna comfortable ho ki sab tension bhool jaaye. Yahi hai luxury living room ka magic. Efive Studio ka har furniture piece aapke ghar ko ek 5-star hotel jaisa feel deta hai. Humne design kiya hai — aapke comfort ke liye, aapke style ke liye, aapki family ke liye.'
      },
      {
        heading: 'Why Efive Living Room Furniture?',
        content: 'Humara har sofa, har coffee table, har TV unit — sab kuch premium quality materials se bana hai. Koi shortcut nahi, koi compromise nahi. Aap jab bhi guests ko bulayenge, unka pehla reaction hoga — "Bhai, ye furniture kahan se liya?" Aur aap proudly bolenge — Efive Studio se!'
      },
      {
        heading: 'Built for Generations, Designed for Today',
        content: 'Modern aesthetics ke saath timeless durability — yahi hai humara promise. Har piece ko 10+ saal chalane ke liye design kiya gaya hai. Aur agar kabhi mann badal jaaye? Efive ka re-sell program hai na — upgrade karo bina tension ke. Aapka ghar, aapki choice, humara commitment.'
      },
      {
        heading: 'Your Dream Living Room is Just One Click Away',
        content: 'Bhaiya, ab wait kyun karna? Aapka dream living room bas ek step dur hai. Efive Studio ke saath, aapko milega — best price, fastest delivery, aur 15 minute me DIY assemble. Haan, sahi padha — sirf 15 minute me aapka furniture ready! No tools needed, no headache. Bas kholo, lagao, aur enjoy karo.'
      }
    ]
  },
  'ergonomic-office-desks': {
    title: 'Ergonomic Office Desks',
    tagline: 'Work Smarter, Not Harder',
    hero: 'Aapka desk sirf ek furniture nahi hai — ye aapki productivity ka foundation hai.',
    sections: [
      {
        heading: 'Productivity Starts with the Right Desk',
        content: 'Bhaiya, sochiye — din ke 8-10 ghante aap apne desk pe baithe rehte ho. Agar desk sahi nahi hai toh back pain, neck pain, aur frustration — sab milta hai free me! Efive Studio ke ergonomic desks specially designed hain aapki health aur productivity dono ke liye. Sahi height, sahi angle, sahi comfort.'
      },
      {
        heading: 'Why Our Office Desks Are Different',
        content: 'Market me bahut saare desks milte hain — lekin Efive ka desk alag hai. Kyun? Because humne har detail pe dhyan diya hai. Cable management system built-in hai, adjustable height options hain, aur look itna premium hai ki aapka home office kisi corporate office se kam nahi lagega. Work from home ko work from heaven bana do!'
      },
      {
        heading: 'Invest in Your Health, Invest in Your Future',
        content: 'Ek accha desk sirf furniture nahi hai — ye ek investment hai aapki health me. Ergonomic design matlab kam strain, zyada focus, aur better results. Aap jab productive hote ho, toh success automatically follow karti hai. Efive Studio ka promise hai — humara desk aapko successful banane me help karega.'
      },
      {
        heading: 'Setup in Minutes, Use for Years',
        content: 'DIY assembly sirf 15 minute me — koi carpenter nahi chahiye, koi tools nahi chahiye. Box open karo, simple steps follow karo, aur done! Itna easy hai ki aapka bachcha bhi assemble kar sakta hai. Aur quality? 10+ saal guarantee ke saath. One time investment, lifetime satisfaction.'
      }
    ]
  },
  'premium-dining-tables': {
    title: 'Premium Dining Tables',
    tagline: 'Where Family Comes Together',
    hero: 'Dining table woh jagah hai jahan khana sirf pet nahi, dil bhi bharta hai.',
    sections: [
      {
        heading: 'More Than Just a Table',
        content: 'Bhaiya, yaad karo wo moments — jab puri family ek saath baith ke khana khati hai, hansti hai, baatein karti hai. Ye sab hota hai dining table pe. Efive Studio ka dining table sirf ek furniture nahi hai — ye aapke ghar ka dil hai. Har meal ko special banata hai, har gathering ko memorable banata hai.'
      },
      {
        heading: 'Crafted with Love, Built with Precision',
        content: 'Humara har dining table premium materials se bana hai — smooth finish, strong build, aur elegant design. Chai ka daag ho ya bachche ka paint — easy clean surface hai jo hamesha naya jaisa dikhta hai. Guests aayenge toh table dekh ke zaroor bolenge — "Kya piece hai yaar!"'
      },
      {
        heading: 'Perfect Size for Every Family',
        content: 'Chota family ho ya bada — hummare paas har size me options hain. 4-seater se lekar 8-seater tak, har need ke liye perfect fit. Aur design? Modern, classic, minimal — jo bhi aapka style ho, hummare paas hai. Aapka ghar, aapka table, aapki choice.'
      },
      {
        heading: 'Order Today, Celebrate Tomorrow',
        content: 'Fastest delivery ke saath, aapka dining table jaldi se jaldi aapke ghar pahunchega. 15 minute DIY assembly — matlab aaj order karo, kal se family dinners start! Koi wait nahi, koi hassle nahi. Efive Studio — jahan har meal ek celebration hai.'
      }
    ]
  },
  'elegant-bedroom-furniture': {
    title: 'Elegant Bedroom Furniture',
    tagline: 'Rest Like Royalty',
    hero: 'Aapka bedroom aapki duniya hai — ise utna khoobsurat banao jitne sapne aap dekhte ho.',
    sections: [
      {
        heading: 'Your Bedroom, Your Sanctuary',
        content: 'Bhaiya, din bhar ki bhaag-daud ke baad jab aap apne bedroom me jaate ho — woh feeling honi chahiye ki aap kisi luxury resort me aa gaye ho. Efive Studio ka bedroom furniture exactly woh feel deta hai. Premium beds, elegant wardrobes, aur stylish side tables — sab kuch jo aapke bedroom ko dream room banaye.'
      },
      {
        heading: 'Sleep Better, Live Better',
        content: 'Research kehta hai — acchi neend ke liye accha environment zaroori hai. Humara bedroom furniture aesthetically designed hai taaki aapko peace mile, calm mile, aur raat ki neend ekdum perfect ho. Jab neend acchi hogi, toh din bhi accha jayega. Ye simple formula hai success ka — aur Efive Studio isme aapki help karega.'
      },
      {
        heading: 'Style That Speaks Volumes',
        content: 'Aapka bedroom aapki personality reflect karta hai. Modern minimal pasand hai? Got it. Royal classic chahiye? Got it. Efive Studio ke paas har taste ke liye options hain — aur har option me quality compromise nahi hota. Premium wood, flawless finish, aur attention to every detail.'
      },
      {
        heading: 'Easy Setup, Instant Transformation',
        content: 'Imagine karo — ek din me aapka pura bedroom transform ho jaaye. New bed, new wardrobe, new vibe! Efive ka 15-minute DIY assembly aur fastest delivery ye possible banata hai. Aaj order karo, kal se apne naye bedroom me aram se so jao. Life is short — acche furniture me invest karo!'
      }
    ]
  },
  'modern-accent-furniture': {
    title: 'Modern Accent Furniture',
    tagline: 'Small Pieces, Big Impact',
    hero: 'Kabhi kabhi choti cheezein sabse bada farak dalti hain — accent furniture exactly wahi hai.',
    sections: [
      {
        heading: 'The Art of Small Details',
        content: 'Bhaiya, ek accha accent piece — chahe wo ek bookshelf ho, ek console table ho, ya ek decorative stand — ye aapke pure room ka look change kar deta hai. Efive Studio ke accent furniture pieces wo magic touch dete hain jo aapke ghar ko ordinary se extraordinary banata hai. Small investment, massive transformation!'
      },
      {
        heading: 'Conversation Starters',
        content: 'Jab guests aayenge aur ek unique accent piece dekhenge — baatcheet shuru ho jayegi. "Ye kahan se liya? Kitna khoobsurat hai!" — ye words aap sunoge har baar. Efive ke accent pieces sirf furniture nahi hain — ye aapke ghar ki kahani kehte hain. Har piece ek statement hai.'
      },
      {
        heading: 'Fill Every Corner with Character',
        content: 'Ghar me woh khali corner hai na jo boring lagta hai? Wahan ek Efive accent piece rakh do — magic dekho! Bookshelves, plant stands, side tables, shoe racks — har corner ke liye perfect solution. Space waste nahi hoga, aur ghar ka look level up ho jayega instantly.'
      },
      {
        heading: 'Affordable Luxury, Instant Impact',
        content: 'Accent furniture ka matlab ye nahi ki bahut paisa kharcha karna hai. Efive Studio ke prices itne reasonable hain ki aap shock ho jaoge — "Itna premium piece, itne me?" Haan bhaiya, yahi toh Efive ka funda hai — luxury for everyone! Order karo, 15 minute me assemble karo, aur apne ghar ko naya look do.'
      }
    ]
  }
};

export default function CollectionPage() {
  const { slug } = useParams();
  const data = collectionsData[slug];

  if (!data) {
    return (
      <>
        <Navbar />
        <div style={styles.notFound}>
          <h1 style={styles.notFoundTitle}>Page Not Found</h1>
          <p style={styles.notFoundText}>Sorry, this collection doesn't exist.</p>
          <Link to="/" style={styles.backBtn}>← Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div className="container">
            <span style={styles.breadcrumb}>
              <Link to="/" style={styles.breadcrumbLink}>Home</Link> / Collections / {data.title}
            </span>
            <h1 style={styles.heroTitle}>{data.title}</h1>
            <p style={styles.heroTagline}>{data.tagline}</p>
            <div style={styles.heroDivider}></div>
            <p style={styles.heroQuote}>"{data.hero}"</p>
          </div>
        </section>

        {/* Content Sections */}
        <section style={styles.contentSection}>
          <div className="container">
            {data.sections.map((section, index) => (
              <div
                key={index}
                style={{
                  ...styles.contentBlock,
                  ...(index % 2 === 1 ? styles.contentBlockAlt : {})
                }}
                className="collection-block"
              >
                <div style={styles.sectionNumber}>0{index + 1}</div>
                <h2 style={styles.sectionHeading}>{section.heading}</h2>
                <div style={styles.sectionDivider}></div>
                <p style={styles.sectionContent}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div className="container" style={styles.ctaContainer}>
            <h2 style={styles.ctaTitle}>Ready to Transform Your Space?</h2>
            <p style={styles.ctaText}>
              Efive Studio — jahan har furniture piece ek experience hai. Aaj hi explore karo aur apne ghar ko next level pe le jaao!
            </p>
            <Link to="/" style={styles.ctaBtn}>Explore Our Store →</Link>
          </div>
        </section>
      </main>
      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .collection-block {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .collection-block:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08) !important;
        }
      `}} />
    </>
  );
}

const styles = {
  main: {
    backgroundColor: 'hsl(var(--bg-color))',
    minHeight: '100vh',
  },
  // Hero
  heroSection: {
    padding: '8rem 0 4rem',
    textAlign: 'center',
  },
  breadcrumb: {
    fontSize: '0.85rem',
    color: 'hsl(var(--muted-color))',
    display: 'block',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  breadcrumbLink: {
    color: 'hsl(var(--primary-color))',
    textDecoration: 'none',
    fontWeight: 600,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: 900,
    color: '#000',
    lineHeight: 1.1,
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '-0.03em',
  },
  heroTagline: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    fontWeight: 500,
    color: 'hsl(var(--primary-color))',
    marginBottom: '2rem',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '0.02em',
  },
  heroDivider: {
    width: '80px',
    height: '4px',
    backgroundColor: 'hsl(var(--primary-color))',
    margin: '0 auto 2rem',
    borderRadius: '2px',
  },
  heroQuote: {
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
    fontStyle: 'italic',
    color: 'hsl(var(--muted-color))',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  // Content
  contentSection: {
    padding: '2rem 0 4rem',
  },
  contentBlock: {
    backgroundColor: 'hsl(var(--surface-color))',
    borderRadius: '20px',
    padding: 'clamp(2rem, 4vw, 3.5rem)',
    marginBottom: '2.5rem',
    border: '1px solid hsl(var(--border-color))',
    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentBlockAlt: {
    backgroundColor: 'rgba(72, 209, 130, 0.06)',
    border: '1px solid rgba(72, 209, 130, 0.15)',
  },
  sectionNumber: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 900,
    color: 'rgba(0, 0, 0, 0.04)',
    fontFamily: 'var(--font-heading)',
    marginBottom: '-1rem',
    letterSpacing: '-0.05em',
  },
  sectionHeading: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 800,
    color: '#000',
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1.2,
  },
  sectionDivider: {
    width: '50px',
    height: '3px',
    backgroundColor: 'hsl(var(--primary-color))',
    marginBottom: '1.5rem',
    borderRadius: '2px',
  },
  sectionContent: {
    fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
    lineHeight: 1.85,
    color: '#333',
    fontWeight: 400,
    maxWidth: '100%',
  },
  // CTA
  ctaSection: {
    padding: '4rem 0 5rem',
  },
  ctaContainer: {
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: '24px',
    padding: 'clamp(2.5rem, 5vw, 4rem)',
  },
  ctaTitle: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1.2,
  },
  ctaText: {
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    color: 'rgba(255,255,255,0.7)',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.7,
  },
  ctaBtn: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '100px',
    fontSize: '1.1rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
  },
  // Not Found
  notFound: {
    textAlign: 'center',
    padding: '10rem 2rem',
    backgroundColor: 'hsl(var(--bg-color))',
    minHeight: '60vh',
  },
  notFoundTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    color: '#000',
    marginBottom: '1rem',
  },
  notFoundText: {
    fontSize: '1.2rem',
    color: 'hsl(var(--muted-color))',
    marginBottom: '2rem',
  },
  backBtn: {
    display: 'inline-block',
    padding: '0.8rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '100px',
    fontSize: '1rem',
    fontWeight: 600,
  },
};

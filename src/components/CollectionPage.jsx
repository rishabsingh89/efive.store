import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

const collectionsData = {
  'luxury-living-room': {
    title: 'Luxury Living Room',
    tagline: 'Where Comfort Meets Elegance',
    hero: 'Your living room isn\'t just a room — it\'s where your story begins every single day.',
    sections: [
      {
        heading: 'Transform Your Space, Transform Your Life',
        content: 'Imagine coming home after a long, exhausting day and sinking into a sofa so comfortable that all your stress instantly melts away. That is the magic of a luxury living room. Every furniture piece by EFIVE Studio gives your home the feel of a 5-star hotel. We have designed it for your comfort, your style, and your family.'
      },
      {
        heading: 'Why EFIVE Living Room Furniture?',
        content: 'Every sofa, coffee table, and TV unit we make is crafted from premium quality materials. No shortcuts, no compromises. Whenever you host guests, their first reaction will be, "Wow, where did you get this furniture?" And you can proudly say — EFIVE Studio!'
      },
      {
        heading: 'Built for Generations, Designed for Today',
        content: 'Timeless durability paired with modern aesthetics — that is our promise. Each piece is designed to easily last for over 10 years. And if you ever change your mind? EFIVE has a re-sell program so you can upgrade without any tension. Your home, your choice, our commitment.'
      },
      {
        heading: 'Your Dream Living Room is Just One Click Away',
        content: 'Why wait? Your dream living room is just one step away. With EFIVE Studio, you get the best price, fastest delivery, and a hassle-free 15-minute DIY assembly. Yes, you read that right — your furniture is ready in just 15 minutes! No tools needed, no headaches. Just unpack, set it up, and enjoy.'
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
        content: 'Think about it — you spend 8 to 10 hours a day sitting at your desk. If your desk isn\'t right, back pain, neck strain, and frustration come absolutely free! EFIVE Studio\'s ergonomic desks are specially designed for both your health and your productivity. The right height, the perfect angle, and maximum comfort.'
      },
      {
        heading: 'Why Our Office Desks Are Different',
        content: 'There are many desks available in the market, but an EFIVE desk stands apart. Why? Because we have paid attention to every single detail. Built-in cable management systems, adjustable height options, and a premium look that makes your home office feel like an executive corporate suite. Turn "Work from Home" into "Work from Heaven"!'
      },
      {
        heading: 'Invest in Your Health, Invest in Your Future',
        content: 'A good desk is not just a piece of furniture; it is an investment in your health. Ergonomic design means less strain, more focus, and better results. When you are productive, success automatically follows. EFIVE Studio promises that our desks will help you achieve your goals comfortably.'
      },
      {
        heading: 'Setup in Minutes, Use for Years',
        content: 'Enjoy DIY assembly in just 15 minutes! No carpenter needed, no complicated tools required. Simply open the box, follow the easy steps, and you are done. It is so easy that anyone can assemble it. And the quality? It comes with a 10+ year guarantee. A one-time investment for a lifetime of satisfaction.'
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
        content: 'Remember those beautiful moments when the whole family sits together to eat, laugh, and share stories? It all happens around the dining table. EFIVE Studio\'s dining table is not just furniture — it is the heart of your home. It makes every meal special and turns every gathering into a cherished memory.'
      },
      {
        heading: 'Crafted with Love, Built with Precision',
        content: 'Every dining table we offer is made from premium materials, featuring a smooth finish, a strong build, and an elegant design. Whether it\'s a tea spill or a child\'s paint, our easy-to-clean surfaces stay looking brand new. When guests arrive, they will undoubtedly look at the table and say, "What an incredible piece!"'
      },
      {
        heading: 'Perfect Size for Every Family',
        content: 'Whether you have a small family or a large one, we have options for every need. From cozy 4-seaters to grand 8-seaters, you will find the perfect fit. Looking for modern, classic, or minimalist designs? Whatever your style is, we have it. Your home, your table, your choice.'
      },
      {
        heading: 'Order Today, Celebrate Tomorrow',
        content: 'With our lightning-fast delivery, your dining table will arrive at your home in record time. Thanks to the 15-minute DIY assembly, you can order today and start enjoying family dinners tomorrow! No waiting, no hassle. EFIVE Studio — where every meal is a celebration.'
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
        content: 'After a long, busy day, stepping into your bedroom should feel like arriving at a luxury resort. EFIVE Studio\'s bedroom furniture gives you exactly that feeling. Premium beds, elegant wardrobes, and stylish side tables — everything you need to turn your bedroom into the room of your dreams.'
      },
      {
        heading: 'Sleep Better, Live Better',
        content: 'Research shows that a good environment is essential for a good night\'s sleep. Our bedroom furniture is aesthetically designed to bring you peace, calm, and the perfect night\'s rest. When you sleep better, your days are automatically better. It\'s a simple formula for success, and EFIVE Studio is here to help you achieve it.'
      },
      {
        heading: 'Style That Speaks Volumes',
        content: 'Your bedroom reflects your unique personality. Love modern minimalism? We have it. Prefer a royal, classic touch? We have that too. EFIVE Studio offers options for every taste without ever compromising on quality. Expect premium wood, flawless finishes, and an uncompromising attention to every detail.'
      },
      {
        heading: 'Easy Setup, Instant Transformation',
        content: 'Imagine transforming your entire bedroom in a single day. A new bed, a new wardrobe, a completely new vibe! EFIVE\'s 15-minute DIY assembly and ultra-fast delivery make this possible. Order today and sleep comfortably in your brand-new bedroom tomorrow. Life is short — invest in great furniture!'
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
        content: 'A great accent piece — whether it\'s a bookshelf, a console table, or a decorative stand — can completely change the look of your entire room. EFIVE Studio\'s accent furniture provides that magic touch, turning your ordinary home into something extraordinary. A small investment for a massive transformation!'
      },
      {
        heading: 'Conversation Starters',
        content: 'When guests arrive and spot a unique accent piece, conversations naturally begin. "Where did you get this? It\'s so beautiful!" — you will hear these words every time. EFIVE\'s accent pieces are not just furniture; they tell the story of your home. Every single piece makes a powerful statement.'
      },
      {
        heading: 'Fill Every Corner with Character',
        content: 'Have a dull, empty corner in your home? Place an EFIVE accent piece there and watch the magic happen! Bookshelves, plant stands, side tables, and shoe racks provide the perfect solution for every nook. No space is wasted, and your home\'s aesthetic is instantly elevated.'
      },
      {
        heading: 'Affordable Luxury, Instant Impact',
        content: 'Buying accent furniture doesn\'t mean you have to spend a fortune. EFIVE Studio\'s prices are so reasonable that you will be pleasantly shocked. "Such a premium piece at this price?" Yes, that is the EFIVE philosophy — luxury for everyone! Order now, assemble it in 15 minutes, and give your home a fresh, new look.'
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
        <SEO title="Collection Not Found" description="This collection does not exist." path={`/collections/${slug}`} />
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
      <SEO 
        title={`${data.title} Collection`} 
        description={`${data.title}: ${data.hero}`} 
        path={`/collections/${slug}`} 
      />
      <Navbar />
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div className="container">
            <span style={styles.breadcrumb}>
              <Link to="/" style={styles.breadcrumbLink}>Home</Link> / <Link to="/collections" style={styles.breadcrumbLink}>Collections</Link> / {data.title}
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

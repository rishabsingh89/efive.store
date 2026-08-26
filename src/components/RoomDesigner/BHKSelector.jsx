import React from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { BHK_CONFIGS } from '../../data/roomDesignerData';
import { Home, Building2, Castle, Warehouse, Hotel } from 'lucide-react';

const BHK_ICONS = [Home, Building2, Castle, Warehouse, Hotel];

export default function BHKSelector() {
  const { dispatch } = useRoomDesigner();

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.badge}>ROOM PLANNER</span>
        <h1 style={styles.title}>
          Design Your <span style={styles.accent}>Dream Home</span>
        </h1>
        <p style={styles.sub}>
          Choose your home layout and start designing each room with our interactive planner.
          Add furniture, customize walls & floors — bring your vision to life.
        </p>
      </div>
      <div style={styles.grid}>
        {BHK_CONFIGS.map((bhk, idx) => {
          const Icon = BHK_ICONS[idx] || Home;
          return (
            <button
              key={bhk.id}
              onClick={() => dispatch({ type: 'SELECT_BHK', payload: bhk.id })}
              style={styles.card}
              className="rd-bhk-card"
            >
              <div style={styles.iconCircle}>
                <Icon size={32} color="#C5A880" />
              </div>
              <h3 style={styles.cardTitle}>{bhk.label}</h3>
              <p style={styles.cardDesc}>{bhk.description}</p>
              <span style={styles.roomCount}>{bhk.rooms.length} Rooms</span>
              <div style={styles.roomList}>
                {bhk.rooms.slice(0, 4).map((r) => (
                  <span key={r.id} style={styles.roomTag}>{r.label}</span>
                ))}
                {bhk.rooms.length > 4 && (
                  <span style={styles.roomTag}>+{bhk.rooms.length - 4} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '3rem 2rem 5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(197,168,128,0.12)',
    color: 'hsl(34,40%,52%)',
    padding: '0.35rem 1rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
    lineHeight: 1.2,
    marginBottom: '0.75rem',
  },
  accent: {
    color: 'hsl(34,40%,52%)',
  },
  sub: {
    fontSize: '1rem',
    color: 'hsl(40,4%,43%)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '2rem 1.5rem',
    borderRadius: '16px',
    border: '2px solid hsl(40,13%,88%)',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-body)',
    textAlign: 'center',
  },
  iconCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(197,168,128,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'hsl(40,9%,11%)',
  },
  cardDesc: {
    fontSize: '0.82rem',
    color: 'hsl(40,4%,43%)',
    lineHeight: 1.4,
  },
  roomCount: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
    backgroundColor: 'rgba(197,168,128,0.1)',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
  },
  roomList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
    justifyContent: 'center',
    marginTop: '0.25rem',
  },
  roomTag: {
    fontSize: '0.65rem',
    color: 'hsl(40,4%,43%)',
    backgroundColor: 'hsl(40,20%,96%)',
    padding: '0.15rem 0.5rem',
    borderRadius: '8px',
    fontWeight: 500,
  },
};

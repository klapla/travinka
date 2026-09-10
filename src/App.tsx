import { useState, useEffect, useRef, useCallback } from 'react';

const C = {
  dark:  '#1C231F',
  ivory: '#EAE5D9',
  black: '#111111',
  gold:  '#D4AF37',
  white: '#FFFFFF',
  muted: 'rgba(255,255,255,0.38)',
  serif: '"Cormorant Garamond", Georgia, serif',
  sans:  '"Inter", system-ui, sans-serif',
} as const;

const btnReset: React.CSSProperties = {
  background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer',
};

function useInView(threshold = 0.22) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── PRELOADER ─────────────────────────────────────────────────────────────────

function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 950);
    }, 2700);
    return () => clearTimeout(t);
  }, [onDone]);

  const draw = (delay: number, dur: number): React.CSSProperties => ({
    strokeDasharray: 1200,
    strokeDashoffset: 1200,
    animation: `preloaderDraw ${dur}s cubic-bezier(0.35,0.01,0.12,1) ${delay}s forwards`,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: C.dark,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: exiting ? 'opacity 0.95s ease' : 'none',
      opacity: exiting ? 0 : 1,
      pointerEvents: exiting ? 'none' : 'auto',
    }}>
      <div style={{
        position: 'absolute', width: 200, height: 420, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <svg width="84" height="330" viewBox="0 0 84 330" fill="none"
        style={{ filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.25))' }}
      >
        <path d="M42,322 C40,282 44,242 42,202 C40,162 43,122 42,88 C41,64 42,48 42,32"
          stroke={C.gold} strokeWidth="1.15" strokeLinecap="round" style={draw(0, 1.45)} />
        <path d="M42,268 C28,261 15,249 8,233"  stroke="rgba(98,122,84,0.88)" strokeWidth="1.05" strokeLinecap="round" style={draw(0.42, 0.72)}/>
        <path d="M42,208 C29,201 17,188 10,172" stroke="rgba(98,122,84,0.80)" strokeWidth="0.92" strokeLinecap="round" style={draw(0.82, 0.66)}/>
        <path d="M42,150 C30,143 19,130 13,114" stroke="rgba(103,128,89,0.70)" strokeWidth="0.82" strokeLinecap="round" style={draw(1.18, 0.60)}/>
        <path d="M42,244 C56,237 68,224 74,208"  stroke="rgba(98,122,84,0.88)" strokeWidth="1.05" strokeLinecap="round" style={draw(0.60, 0.72)}/>
        <path d="M42,184 C55,176 67,163 72,147"  stroke="rgba(98,122,84,0.80)" strokeWidth="0.92" strokeLinecap="round" style={draw(1.00, 0.66)}/>
        <path d="M42,126 C55,119 66,105 71,89"   stroke="rgba(103,128,89,0.70)" strokeWidth="0.82" strokeLinecap="round" style={draw(1.36, 0.60)}/>
        {([32,43,54,66,78,91,104] as number[]).map((cy, i) => (
          <ellipse key={i}
            cx={42 + [-3.5, 3.5, -4.5, 4.5, -2.5, 2.5, 0][i]}
            cy={cy} rx={4.0 - i * 0.18} ry={2.7 - i * 0.12}
            stroke={`rgba(152,112,184,${0.78 - i * 0.05})`} strokeWidth="0.9" fill="none"
            style={draw(1.56 + i * 0.10, 0.38)}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── MENU + HEADER ─────────────────────────────────────────────────────────────

const NAV = [
  { label: 'История',        id: 'scene2'      },
  { label: 'Коллекции',     id: 'collections' },
  { label: 'Мастер-классы', id: 'events'      },
  { label: 'Связаться',     id: 'footer'      },
];

function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scrollTo = useCallback((id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 380);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(14,18,15,0.97)', backdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.5s ease',
    }}>
      <button onClick={onClose} style={{
        ...btnReset, position: 'absolute',
        top: 'max(20px, env(safe-area-inset-top, 20px))', right: 24,
        fontFamily: C.sans, fontSize: 10, color: C.muted, letterSpacing: '0.18em', padding: 8,
      }}>[ ЗАКРЫТЬ ]</button>

      <div style={{ width: open ? 52 : 0, height: 1, background: C.gold, opacity: 0.45, marginBottom: 52, transition: 'width 0.65s ease 0.18s' }} />

      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        {NAV.map((item, i) => {
          const [active, setActive] = useState(false);
          return (
            <button key={item.id}
              onClick={() => scrollTo(item.id)}
              onTouchStart={() => setActive(true)}
              onTouchEnd={() => setActive(false)}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              style={{
                ...btnReset,
                fontFamily: C.serif,
                fontSize: 'clamp(34px, 10.5vw, 54px)',
                color: active ? C.gold : C.white,
                letterSpacing: '0.12em', fontWeight: 300,
                padding: '8px 24px',
                transform: open ? 'translateY(0)' : 'translateY(22px)',
                opacity: open ? 1 : 0,
                transition: [
                  `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08 + 0.14}s`,
                  `opacity 0.48s ease ${i * 0.08 + 0.14}s`,
                  'color 0.18s ease',
                ].join(', '),
              }}>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ width: open ? 52 : 0, height: 1, background: C.gold, opacity: 0.45, marginTop: 52, transition: 'width 0.65s ease 0.18s' }} />
    </div>
  );
}

function Header({
  onMenu, scrolled, showBack, onBack,
}: {
  onMenu: () => void; scrolled: boolean; showBack?: boolean; onBack?: () => void;
}) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      paddingTop: 'max(18px, env(safe-area-inset-top, 18px))',
      paddingBottom: 18, paddingLeft: 22, paddingRight: 22,
      background: scrolled ? 'rgba(28,35,31,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
    }}>
      {showBack ? (
        <button onClick={onBack} style={{
          ...btnReset, fontFamily: C.sans, fontSize: 11, color: C.white, letterSpacing: '0.15em', flexShrink: 0,
        }}>← НАЗАД</button>
      ) : (
        <button onClick={onMenu} style={{
          ...btnReset, fontFamily: C.sans, fontSize: 11, color: C.white, letterSpacing: '0.2em', flexShrink: 0,
        }}>[ MENU ]</button>
      )}

      <div style={{
        fontFamily: C.serif, fontSize: 'clamp(16px, 5.2vw, 26px)',
        color: C.white, letterSpacing: '0.44em', fontWeight: 300, whiteSpace: 'nowrap',
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
      }}>ТРАВИНКА</div>

      <div style={{ width: 56, flexShrink: 0 }} />
    </header>
  );
}

// ─── CINEMATIC SCENE COMPONENT ────────────────────────────────────────────────

interface SceneProps {
  id?: string;
  posterUrl: string;
  videoUrl?: string;
  kbClass: 'kenBurnsA' | 'kenBurnsB' | 'kenBurnsC' | 'kenBurnsD';
  kbDuration?: number;
  overlayGradient: string;
  children?: React.ReactNode;
  photoPosition?: string;
}

function CinematicScene({
  id, posterUrl, videoUrl, kbClass, kbDuration = 22,
  overlayGradient, children, photoPosition = 'center center',
}: SceneProps) {
  return (
    <section id={id} style={{ position: 'relative', height: '100svh', minHeight: 600, overflow: 'hidden' }}>
      {/* Always-visible ken-burns photo base */}
      <div style={{
        position: 'absolute', inset: '-5%',
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: photoPosition,
        animation: `${kbClass} ${kbDuration}s ease-in-out infinite alternate`,
        willChange: 'transform',
      }} />

      {/* Optional video enhancement */}
      {videoUrl && (
        <video autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1,
          }}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: overlayGradient, zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
        {children}
      </div>
    </section>
  );
}

// ─── STORY SCENES ─────────────────────────────────────────────────────────────

// Scene 1 — "один стебель" — single purple flower in darkness
function Scene1() {
  return (
    <CinematicScene
      id="hero"
      posterUrl="https://sun9-31.vkuserphoto.ru/s/v1/ig2/17CxlXQcXsAlYHvlq-pS2S3D2Z60V6T6wXe0E-vbSga0oh3cSJ-GH6NlBSAgQVIsdqj5wBZ0piRoD0M0Aa9845jg.jpg?quality=95&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,1080x1920&from=bu&cs=1080x0" loading="lazy"
      kbClass="kenBurnsA"
      kbDuration={24}
      photoPosition="center 40%"
      overlayGradient="linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 65%, rgba(28,35,31,0.65) 100%)"
    >
      {/* Bottom scroll cue */}
      <div style={{
        position: 'absolute', bottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <span style={{ fontFamily: C.sans, fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.16em' }}>
          [ Скролл для погружения ]
        </span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none"
          style={{ animation: 'bounce-arrow 2.3s ease-in-out infinite' }}>
          <line x1="6" y1="0" x2="6" y2="15" stroke={C.gold} strokeWidth="0.9" strokeLinecap="round"/>
          <polyline points="1,10 6,17 11,10" fill="none" stroke={C.gold} strokeWidth="0.9" strokeLinejoin="round"/>
        </svg>
      </div>
    </CinematicScene>
  );
}

// Scene 2 — "и к ней потянулись другие" — vase of dried flowers
function Scene2() {
  const { ref, inView } = useInView(0.15);
  return (
    <CinematicScene
      id="scene2"
      posterUrl="https://sun9-78.vkuserphoto.ru/s/v1/ig2/8ApapUGgXQkTSUk26-NE_MEWF05fK36gtKclPL5E0e1yNoKXNNCtpaFonPGzdsZG48EwrD8isPU4cpaCPJKfrc5i.jpg?quality=95&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,1080x1920&from=bu&cs=1080x0" loading="lazy"
      kbClass="kenBurnsB"
      kbDuration={20}
      photoPosition="center 35%"
      overlayGradient="linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.18) 70%, rgba(28,35,31,0.6) 100%)"
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{
          padding: '0 28px max(52px, env(safe-area-inset-bottom, 52px))',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 1.4s ease 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>
          <div style={{
            fontFamily: C.serif, fontSize: 'clamp(13px, 3.5vw, 17px)',
            fontStyle: 'italic', color: 'rgba(255,255,255,0.58)',
            letterSpacing: '0.06em', lineHeight: 1.6,
          }}>
            ...и к ней потянулись другие
          </div>
        </div>
      </div>
    </CinematicScene>
  );
}

// Scene 3 — "каждая — особенная" — individual stems on black
function Scene3() {
  const { ref, inView } = useInView(0.15);
  return (
    <CinematicScene
      id="scene3"
      videoUrl="https://static.vecteezy.com/system/resources/previews/045/628/878/watermarked/dried-blue-flowers-in-purple-hues-rotate-close-up-beautiful-lagurus-falyaris-and-spikelets-in-a-beautiful-bouquet-gift-bouquet-of-dried-flowers-video.mp4"
      kbClass="kenBurnsC"
      kbDuration={26}
      photoPosition="center center"
      overlayGradient="linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.22) 65%, rgba(28,35,31,0.65) 100%)"
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{
          padding: '0 28px max(52px, env(safe-area-inset-bottom, 52px))',
          textAlign: 'right',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 1.4s ease 0.5s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s',
        }}>
          <div style={{
            fontFamily: C.serif, fontSize: 'clamp(13px, 3.5vw, 17px)',
            fontStyle: 'italic', color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.06em', lineHeight: 1.6,
          }}>
            каждая — особенная
          </div>
        </div>
      </div>
    </CinematicScene>
  );
}

// Scene 4 — "природа. сохранённая навсегда." — lavender field payoff
function Scene4() {
  const { ref, inView } = useInView(0.12);
  return (
    <CinematicScene
      id="scene4"
      posterUrl="https://sun9-87.vkuserphoto.ru/s/v1/ig2/BdA78PFsWyy0QznY-SBb2S36YCKrFEKqtN7rmzu3jiRC7pyAEpq8-Qa9BWY3eGzZUridLePc3_Yr0Ht2bRPji-IC.jpg?quality=95&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,1920x1080&from=bu&u=itPzndhx7R899WC_q8EFnSqxb58Y9K3N6zeUjeS1j0Y&cs=1920x0" loading="lazy"
      kbClass="kenBurnsD"
      kbDuration={32}
      photoPosition="center 55%"
      overlayGradient="linear-gradient(to bottom, rgba(28,35,31,0.4) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.12) 55%, rgba(28,35,31,0.75) 100%)"
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{
          padding: '0 28px max(64px, env(safe-area-inset-bottom, 64px))',
          textAlign: 'center',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.6s ease 0.3s, transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}>
          <div style={{
            fontFamily: C.serif,
            fontSize: 'clamp(26px, 7.5vw, 44px)',
            color: C.white, fontWeight: 300, lineHeight: 1.35,
            letterSpacing: '0.04em',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}>
            природа.<br />сохранённая навсегда.
          </div>
          <div style={{
            marginTop: 20,
            fontFamily: C.sans, fontSize: 11,
            color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1.2s ease 1.2s',
          }}>
            3–5 ЛЕТ БЕЗУПРЕЧНОЙ ЭСТЕТИКИ
          </div>
          <div style={{
            width: 1, height: inView ? 40 : 0, background: C.gold, opacity: 0.45,
            margin: '24px auto 0',
            transition: 'height 1.4s cubic-bezier(0.16,1,0.3,1) 0.8s',
          }} />
        </div>
      </div>
    </CinematicScene>
  );
}

// ─── COLLECTIONS ──────────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    num: '01', title: 'Интерьерные букеты',
    img: 'https://sun9-8.vkuserphoto.ru/s/v1/ig2/yPnjirGGnVmGCS7Lp69wXaLJJ8lBcK6fTpinw52N9Re55liR3O4UQC5UlDhqbDvfjHCTGx3rqO2yEhhvpoFSL-hm.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,600x800&from=bu&cs=600x0',
    category: 'interior',
  },
  {
    num: '02', title: 'Свадебное оформление',
    img: 'https://sun9-13.vkuserphoto.ru/s/v1/ig2/n0GjDebISNsiUeec734NShRF7fnJo4MAwJS4OOz7GWaJN_IR5HSOrMLuT5gPjJDN8i8SQlgZDV07SnlB8PhPSEUW.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,600x800&from=bu&cs=600x0',
    category: 'wedding',
  },
  {
    num: '03', title: 'Авторский декор',
    img: 'https://sun9-71.vkuserphoto.ru/s/v1/ig2/C0091pcmkD0VZyLDZjW0PdxZHz4FJdSWHBnCIAozpNQ3IsRd7L6A3d7g51CEIRMzld2lm9cEzW1Q7uICO8e3RpDN.jpg?quality=95&as=32x18,48x27,72x41,108x61,160x91,240x136,360x204,480x272,540x306,600x340&from=bu&cs=600x0',
    category: 'handmade',
  },
];

function CollectionsSection({ onCatalog }: { onCatalog: (cat?: string) => void }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="collections" ref={ref as React.RefObject<HTMLElement>} style={{
      background: C.ivory, padding: '68px 20px 80px',
    }}>
      {/* Section label */}
      <div style={{
        overflow: 'hidden', marginBottom: 40, paddingLeft: 4,
      }}>
        <div style={{
          fontFamily: C.sans, fontSize: 9, color: 'rgba(0,0,0,0.38)',
          letterSpacing: '0.32em',
          transform: inView ? 'translateY(0)' : 'translateY(110%)',
          opacity: inView ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
        }}>
          КОЛЛЕКЦИИ
        </div>
      </div>

      {/* 2-col grid: cards 01 + 02 side by side, card 03 full width below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {COLLECTIONS.slice(0, 2).map((c, i) => (
            <CollectionCard key={i} card={c} inView={inView} delay={i * 0.1} onCatalog={() => onCatalog(c.category)} />
          ))}
        </div>
        <CollectionCard card={COLLECTIONS[2]} inView={inView} delay={0.2} onCatalog={() => onCatalog(COLLECTIONS[2].category)} wide />
      </div>
    </section>
  );
}

function CollectionCard({
  card, inView, delay, onCatalog, wide = false,
}: {
  card: typeof COLLECTIONS[0]; inView: boolean; delay: number; onCatalog: () => void; wide?: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={onCatalog}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseEnter={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        height: wide ? 180 : 280, background: '#141716',
        cursor: 'pointer',
        transform: pressed
          ? 'scale(0.97)'
          : inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(1)',
        opacity: inView ? 1 : 0,
        transition: pressed
          ? 'transform 0.2s ease'
          : `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.9s ease ${delay}s`,
      }}
    >
      <img src={card.img} alt={card.title} style={{
        width: '100%', height: '100%', objectFit: 'cover',
        transform: pressed ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.7s ease',
        filter: 'brightness(0.75) saturate(0.9)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 45%, transparent 70%)',
      }} />

      {/* Number top-left */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        fontFamily: C.sans, fontSize: 9, color: C.gold, letterSpacing: '0.22em',
      }}>{card.num}</div>

      {/* Title bottom-left */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px' }}>
        <div style={{
          fontFamily: C.serif, fontSize: wide ? 20 : 18,
          color: C.white, fontWeight: 400, lineHeight: 1.3,
        }}>{card.title}</div>
        <div style={{
          overflow: 'hidden', height: pressed ? 18 : 0, transition: 'height 0.35s ease',
        }}>
          <div style={{ fontFamily: C.sans, fontSize: 9, color: C.gold, letterSpacing: '0.18em', marginTop: 4 }}>
            СМОТРЕТЬ КАТАЛОГ →
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVENTS SECTION ───────────────────────────────────────────────────────────

const EVENTS = [
  {
    title: 'Объемное интерьерное панно',
    date: 'Каждая суббота, 16:00',
    price: '1 500 ₽',
    desc: 'Практический интенсив: объемное настенное панно из текстурной пасты, стабилизированного мха и ветвей корицы. Готовая работа — арт-объект вашего интерьера.',
    img: 'https://sun9-7.vkuserphoto.ru/s/v1/ig2/Nv49spBgFLehs2aufHriZrjLt6JIfo8SfKzmVLhWVGmYxxeFPsfxlYiSBVIPt6rx9AvQCqxOtlj9o_YZAveq6Fkb.jpg?quality=95&as=32x18,48x27,72x41,108x61,160x91,240x136,360x204,480x272,540x306,600x340&from=bu&cs=600x0',
  },
  {
    title: 'Свадебный венок & Бутоньерка',
    date: 'Каждое воскресенье, 14:00',
    price: '2 100 ₽',
    desc: 'Погружение в свадебную флористику. Хрупкий хлопок, воздушный лагурус, сухоцветы. Комплект, который сохранит память о главном дне.',
    img: 'https://sun9-71.vkuserphoto.ru/s/v1/ig2/C0091pcmkD0VZyLDZjW0PdxZHz4FJdSWHBnCIAozpNQ3IsRd7L6A3d7g51CEIRMzld2lm9cEzW1Q7uICO8e3RpDN.jpg?quality=95&as=32x18,48x27,72x41,108x61,160x91,240x136,360x204,480x272,540x306,600x340&from=bu&cs=600x0',
  },
  {
    title: 'Арома-диффузоры и ботаника',
    date: 'Каждая среда, 19:30',
    price: '1 800 ₽',
    desc: 'Вечерняя сессия. Индивидуальный интерьерный парфюм с ботаническими элементами: бутоны роз, лаванда, корица. Эстетика через аромат.',
    img: 'https://sun9-71.vkuserphoto.ru/s/v1/ig2/aMr7O2AUX6U-2PfaBTvjBzCCnA4MchvV-cZrypmvun-hgo9Yc7nuEaQALYxHJj-Rk1ZGMQ1Um5m3UhSpgSGYfIrc.jpg?quality=95&as=32x18,48x27,72x41,108x61,160x91,240x136,360x204,480x272,540x306,600x340&from=bu&cs=600x0',
  },
];

function EventCard({ event, onBook }: { event: typeof EVENTS[0]; onBook: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{
      flexShrink: 0, width: 'calc(82vw)', maxWidth: 340,
      border: `1px solid rgba(212,175,55,${pressed ? 0.48 : 0.2})`,
      background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.28s ease',
    }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseEnter={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
    >
      <div style={{ height: 190, overflow: 'hidden', background: '#0c0f0c', flexShrink: 0 }}>
        <img src={event.img} alt={event.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.77) grayscale(10%)',
          transform: pressed ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.65s ease',
        }} />
      </div>
      <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontFamily: C.sans, fontSize: 10, color: C.muted, letterSpacing: '0.09em', lineHeight: 1.5 }}>{event.date}</span>
          <span style={{ fontFamily: C.serif, fontSize: 18, color: C.gold, fontWeight: 500, flexShrink: 0 }}>{event.price}</span>
        </div>
        <div style={{ fontFamily: C.serif, fontSize: 17, color: C.white, fontWeight: 400, lineHeight: 1.35 }}>{event.title}</div>
        <div style={{ fontFamily: C.sans, fontSize: 11.5, color: 'rgba(255,255,255,0.46)', lineHeight: 1.72, fontWeight: 300, flex: 1 }}>{event.desc}</div>
        <button
          onClick={(e) => { e.stopPropagation(); onBook(); }}
          style={{
            marginTop: 6, padding: '13px 14px',
            border: `1px solid ${C.gold}`, background: 'transparent', color: C.white,
            fontFamily: C.sans, fontSize: 10, letterSpacing: '0.18em', cursor: 'pointer',
          }}>
          ЗАБРОНИРОВАТЬ МЕСТО
        </button>
      </div>
    </div>
  );
}

function EventsCarousel({ onBook }: { onBook: (i: number) => void }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const [delta, setDelta] = useState(0);
  const [drag, setDrag] = useState(false);
  const CARD_W = Math.min(window.innerWidth * 0.82, 340);
  const GAP = 14;

  const goTo = useCallback((i: number) => {
    setIdx(Math.max(0, Math.min(i, EVENTS.length - 1)));
    setDelta(0); setDrag(false);
  }, []);

  return (
    <div>
      <div style={{ overflow: 'hidden', paddingLeft: '9vw' }}>
        <div
          onTouchStart={(e) => { startX.current = e.touches[0].clientX; setDrag(true); }}
          onTouchMove={(e) => { if (drag) setDelta(e.touches[0].clientX - startX.current); }}
          onTouchEnd={() => {
            if (delta < -52) goTo(idx + 1);
            else if (delta > 52) goTo(idx - 1);
            else goTo(idx);
          }}
          style={{
            display: 'flex', gap: GAP,
            transform: `translateX(${-(idx * (CARD_W + GAP)) + delta}px)`,
            transition: drag ? 'none' : 'transform 0.46s cubic-bezier(0.4,0,0.2,1)',
          }}>
          {EVENTS.map((ev, i) => <EventCard key={i} event={ev} onBook={() => onBook(i)} />)}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {EVENTS.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            width: i === idx ? 22 : 6, height: 2, borderRadius: 1,
            background: i === idx ? C.gold : 'rgba(255,255,255,0.22)',
            transition: 'all 0.35s ease', cursor: 'pointer',
          }} />
        ))}
      </div>
    </div>
  );
}

function BookingModal({ event, onClose }: { event: typeof EVENTS[0]; onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);
  const inp: React.CSSProperties = {
    width: '100%', padding: '13px 0',
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.18)',
    color: C.white, fontFamily: C.sans, fontSize: 14, outline: 'none',
  };
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}>
      <div style={{
        background: C.dark, width: '100%', maxWidth: 480,
        paddingLeft: 28, paddingRight: 28,
        paddingBottom: 'max(40px, env(safe-area-inset-bottom, 40px))',
        border: '1px solid rgba(212,175,55,0.18)', borderBottom: 'none',
        borderRadius: '16px 16px 0 0', position: 'relative',
      }}>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.14)', margin: '16px auto 28px' }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 20, ...btnReset, color: C.muted, fontSize: 22, padding: 4 }}>×</button>
        {done ? (
          <div style={{ textAlign: 'center', padding: '24px 0 36px' }}>
            <div style={{ fontFamily: C.serif, fontSize: 38, color: C.gold, marginBottom: 16 }}>✦</div>
            <div style={{ fontFamily: C.serif, fontSize: 22, color: C.white, marginBottom: 12 }}>Место забронировано</div>
            <div style={{ fontFamily: C.sans, fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.72 }}>Мы свяжемся с вами для подтверждения.</div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: C.sans, fontSize: 9, color: C.gold, letterSpacing: '0.24em', marginBottom: 10 }}>БРОНИРОВАНИЕ</div>
            <div style={{ fontFamily: C.serif, fontSize: 21, color: C.white, fontWeight: 400, marginBottom: 6 }}>{event.title}</div>
            <div style={{ fontFamily: C.sans, fontSize: 12, color: C.muted, marginBottom: 38 }}>{event.date} · {event.price}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <input style={inp} placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
              <input style={inp} placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button
              onClick={() => { if (name.trim() && phone.trim()) setDone(true); }}
              style={{
                marginTop: 38, width: '100%', padding: '16px',
                background: name && phone ? C.gold : 'rgba(212,175,55,0.18)',
                border: 'none',
                color: name && phone ? C.black : 'rgba(255,255,255,0.28)',
                fontFamily: C.sans, fontSize: 10, letterSpacing: '0.2em',
                cursor: name && phone ? 'pointer' : 'default',
                transition: 'all 0.3s ease', marginBottom: 4,
              }}>
              ПОДТВЕРДИТЬ БРОНИРОВАНИЕ
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function EventsSection() {
  const [booking, setBooking] = useState<number | null>(null);
  return (
    <section id="events" style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', padding: '78px 0 80px' }}>
      {/* Photo background */}
      <div style={{
        position: 'absolute', inset: '-5%',
        backgroundImage: 'url(https://sun9-81.vkuserphoto.ru/s/v1/ig2/miFfLB-MehKKZjVrZmVq5pD_Bu-iQJ6AJBDvclQ14QIy-VqjqPnkjwpBPf92UQ1CdBda3Uf2Svy0Gm_XUXh9b8dL.jpg?quality=95&as=32x24,48x36,72x53,108x80,160x119,240x178,360x267,480x356,540x400,640x474,720x533,1080x800&from=bu&cs=1080x0)',
        backgroundSize: 'cover', backgroundPosition: 'center 60%',
        filter: 'brightness(0.22) saturate(0.5)',
        animation: 'kenBurnsC 30s ease-in-out infinite alternate',
      }} />
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,35,31,0.7)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          fontFamily: C.serif, fontSize: 20, color: C.white,
          letterSpacing: '0.28em', textAlign: 'center',
          marginBottom: 46, fontWeight: 400,
        }}>АФИША МЕРОПРИЯТИЙ</div>
        <EventsCarousel onBook={setBooking} />
      </div>

      {booking !== null && <BookingModal event={EVENTS[booking]} onClose={() => setBooking(null)} />}
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function ContactBtn({ href, icon, label, sub }: {
  href: string; icon: React.ReactNode; label: string; sub: string;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <a href={href}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseEnter={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '18px 18px',
        border: `1px solid ${pressed ? C.gold : 'rgba(212,175,55,0.2)'}`,
        background: pressed ? 'rgba(212,175,55,0.055)' : 'transparent',
        textDecoration: 'none', color: C.white,
        transition: 'all 0.24s ease',
      }}>
      <div style={{ color: pressed ? C.gold : 'rgba(255,255,255,0.5)', transition: 'color 0.24s ease', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: C.serif, fontSize: 17, color: C.white, fontWeight: 400 }}>{label}</div>
        <div style={{ fontFamily: C.sans, fontSize: 11, color: C.muted, marginTop: 2, letterSpacing: '0.05em' }}>{sub}</div>
      </div>
      <div style={{ marginLeft: 'auto', color: pressed ? C.gold : 'rgba(255,255,255,0.22)', fontSize: 18, transition: 'color 0.24s ease' }}>→</div>
    </a>
  );
}

function FooterSection({ onCatalog }: { onCatalog: () => void }) {
  return (
    <footer id="footer" style={{ background: C.black }}>
      <div style={{ padding: '64px 28px 48px' }}>
        <div style={{ fontFamily: C.sans, fontSize: 9, color: C.gold, letterSpacing: '0.28em', marginBottom: 20 }}>ФЛАГМАНСКОЕ ПРОСТРАНСТВО</div>
        <div style={{ fontFamily: C.serif, fontSize: 'clamp(22px, 7vw, 34px)', color: C.white, fontWeight: 300, lineHeight: 1.48 }}>
          Ярославль,<br />ул. Победы 38/27,<br />ТЦ Бутусовский
        </div>
        <div style={{ marginTop: 26, height: 1, background: 'linear-gradient(to right, rgba(212,175,55,0.35), transparent)', width: 110 }} />
        <div style={{ marginTop: 16, fontFamily: C.sans, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.09em' }}>Пн–Вс: 10:00–20:00</div>
      </div>

      <div style={{ padding: '0 28px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ContactBtn href="https://t.me/travinka_yaroslavl" label="Telegram" sub="@travinka_yaroslavl"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>}
        />
        <ContactBtn href="https://travinka.space/" label="VK" sub="Группа вконтакте"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>}
        />
        <ContactBtn href="tel:+79056459955" label="Телефон" sub="+7 (905) 645-99-55"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>}
        />
      </div>

      {/* Catalog shortcut */}
      <div style={{ padding: '0 28px 36px' }}>
        <button onClick={onCatalog} style={{
          ...btnReset, width: '100%', padding: '16px 18px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: C.serif, fontSize: 16, color: C.white, fontWeight: 400 }}>Каталог букетов</span>
          <span style={{ fontFamily: C.sans, fontSize: 10, color: C.gold, letterSpacing: '0.14em' }}>ОТКРЫТЬ →</span>
        </button>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', padding: '28px 28px', paddingBottom: 'max(28px, env(safe-area-inset-bottom, 28px))' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ ...btnReset, fontFamily: C.serif, fontSize: 17, color: C.gold, letterSpacing: '0.18em', textAlign: 'center' }}>
          [ ВЕРНУТЬСЯ К ИСТОКАМ ]
        </button>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 22, fontFamily: C.sans, fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em' }}>
        © 2020–2026 ТРАВИНКА. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

// ─── CATALOG PAGE ─────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, title: 'Лавандовый туман',    price: '2 800 ₽', tag: 'Интерьерный', img: 'https://sun9-74.vkuserphoto.ru/s/v1/ig2/WCdtNjrSPreFBKKTwd1xNqcDDu6bcaYLr13TzxsRL513btj9exQDOSWqfy5DhzjzEQYUrhTdQaIr0OqvyFg5hfM_.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&u=P1q3jOu17G7lC0kl26c7mkRCsl9mAvBDu2Rd4Z11tKU&cs=400x0' },
  { id: 2, title: 'Осенний сбор',        price: '3 400 ₽', tag: 'Интерьерный', img: 'https://sun9-9.vkuserphoto.ru/s/v1/ig2/JXqYLwEffCLjmobAIHCk2C_YcnL0xi_dM1w8OYBPrQYNh4BEiNWwjMNjkGlGGIAHlw5ztom5XgmBu0PC9xQlHBw0.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&u=epmFH7OOqj3sChO0sf0nDhhOKIFYUB2miiF8t0jbX2g&cs=400x0' },
  { id: 3, title: 'Белая роща',          price: '4 100 ₽', tag: 'Свадебный',   img: 'https://sun9-34.vkuserphoto.ru/s/v1/ig2/IiAQws4tIy_q2lI3_pScL-A5LRn-yk6mHu1_m6bMTjk42TzYvlrisAfTRt0mM_LGe-kDp7f7lFQD3qH8W5ySOr96.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
  { id: 4, title: 'Пшеничный закат',     price: '2 600 ₽', tag: 'Интерьерный', img: 'https://sun9-27.vkuserphoto.ru/s/v1/ig2/CUpEgPpLSKmSE3IjFAhnbP5MKQDHHnOjE-fgcooNzsVmAl_bdmcCbJt5H0XlmAHJTtU3Ydjp7A4jSRYg5uXLxqUi.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
  { id: 5, title: 'Ботаника №5',         price: '5 200 ₽', tag: 'Премиум',     img: 'https://sun9-32.vkuserphoto.ru/s/v1/ig2/nYOt16NYSQsUMpOVOzCOGnUDmZBBL4G20d-Q-geRtU_RoFTVIFp3uP5aMnn5yVaDprDBYApXooSXDGIVwVbMmx_F.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
  { id: 6, title: 'Свадебный букет',     price: '3 000 ₽', tag: 'Свадебный',   img: 'https://sun9-30.vkuserphoto.ru/s/v1/ig2/uUg9_YZ9iNdMmhOhim4WcE3vKv4ZdGEHXCKCuUFjz8E76RJobz4INk3zXtBSTso4SMBAn3nBaqTkZwHMxMk1jn45.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
  { id: 7, title: 'Вечная осень',        price: '3 800 ₽', tag: 'Интерьерный', img: 'https://sun9-32.vkuserphoto.ru/s/v1/ig2/nYOt16NYSQsUMpOVOzCOGnUDmZBBL4G20d-Q-geRtU_RoFTVIFp3uP5aMnn5yVaDprDBYApXooSXDGIVwVbMmx_F.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
  { id: 8, title: 'Лавандовый рай',      price: '4 500 ₽', tag: 'Интерьерный', img: 'https://sun9-75.vkuserphoto.ru/s/v1/ig2/ztJms-h4IGWwbZeLaxFP04GJC8FP3wpJg0RkEa5dXfwrNKGftyAd1uEkIoTV8vYHQJEemMqJNOzUj_AlKDqspE0j.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,400x560&from=bu&cs=400x0' },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      <div
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        onMouseEnter={() => setPressed(true)}
        onMouseLeave={() => setPressed(false)}
        style={{
          background: '#141716', overflow: 'hidden',
          transform: pressed ? 'scale(0.972)' : 'scale(1)',
          transition: 'transform 0.2s ease', cursor: 'pointer',
        }}
      >
        <div style={{ height: 220, overflow: 'hidden' }}>
          <img src={product.img} alt={product.title} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: pressed ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.7s ease',
            filter: 'brightness(0.82) saturate(0.85)',
          }} />
        </div>
      </div>
      <div style={{ padding: '14px 2px 0' }}>
        <div style={{ fontFamily: C.sans, fontSize: 8, color: C.gold, letterSpacing: '0.2em', marginBottom: 5 }}>{product.tag}</div>
        <div style={{ fontFamily: C.serif, fontSize: 16, color: C.white, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>{product.title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: C.serif, fontSize: 16, color: C.gold, fontWeight: 500 }}>{product.price}</span>
          <a href="https://wa.me/79201141104" style={{
            fontFamily: C.sans, fontSize: 9, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.14em', textDecoration: 'none',
          }}>Связаться →</a>
        </div>
      </div>
    </div>
  );
}

function CatalogPage({ onBack }: { onBack: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const { ref, inView } = useInView(0.05);

  return (
    <div style={{ background: C.dark, minHeight: '100dvh' }}>
      <Header onMenu={() => {}} scrolled={scrolled} showBack onBack={onBack} />

      {/* Hero */}
      <section style={{ position: 'relative', height: '62svh', minHeight: 380, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: '-5%',
          backgroundImage: 'url(https://s6.iimage.su/s/10/gy99b0ixeP6FMnRhTgcnnB9w9kPyJWJLQd9VOk4VF.png)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          animation: 'kenBurnsA 26s ease-in-out infinite alternate',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(28,35,31,0.3) 50%, rgba(28,35,31,0.9) 100%)' }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 28px 40px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          zIndex: 2,
        }}>
          <div style={{ fontFamily: C.sans, fontSize: 9, color: C.gold, letterSpacing: '0.3em', marginBottom: 12 }}>ТРАВИНКА</div>
          <div style={{ fontFamily: C.serif, fontSize: 'clamp(32px, 9vw, 54px)', color: C.white, fontWeight: 300, lineHeight: 1.2 }}>
            Каталог<br />букетов
          </div>
          <div style={{ marginTop: 20, height: 1, background: 'linear-gradient(to right, rgba(212,175,55,0.5), transparent)', width: 80 }} />
        </div>
      </section>

      {/* Grid */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        style={{ padding: '48px 20px', paddingBottom: 'max(60px, env(safe-area-inset-bottom, 60px))' }}
      >
        <div style={{
          overflow: 'hidden', marginBottom: 36,
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease',
        }}>
          <div style={{ fontFamily: C.sans, fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em' }}>
            {PRODUCTS.length} ПОЗИЦИЙ · РУЧНАЯ РАБОТА · ЯРОСЛАВЛЬ
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '28px 14px',
        }}>
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Contact CTA at bottom */}
        <div style={{
          marginTop: 60, padding: '28px 20px',
          border: '1px solid rgba(212,175,55,0.18)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: C.serif, fontSize: 22, color: C.white, marginBottom: 12, fontWeight: 300 }}>
            Индивидуальный заказ
          </div>
          <div style={{ fontFamily: C.sans, fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: 24 }}>
            Создадим букет под ваш интерьер,<br />повод и цветовую палитру
          </div>
          <a href="https://wa.me/79201141104" style={{
            display: 'inline-block', padding: '14px 32px',
            border: `1px solid ${C.gold}`,
            fontFamily: C.sans, fontSize: 10, letterSpacing: '0.2em',
            color: C.white, textDecoration: 'none',
          }}>
            НАПИСАТЬ В WHATSAPP
          </a>
        </div>

        <button onClick={onBack} style={{
          ...btnReset, display: 'block', margin: '40px auto 0',
          fontFamily: C.serif, fontSize: 15, color: C.gold, letterSpacing: '0.16em',
        }}>
          ← Вернуться на главную
        </button>
      </section>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<'home' | 'catalog'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      {!loaded && <Preloader onDone={onDone} />}
      {loaded && (
        <>
          {page === 'home' ? (
            <>
              <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
              <Header onMenu={() => setMenuOpen(true)} scrolled={scrolled} />
              <main className="site-enter">
                <Scene1 />
                <Scene2 />
                <Scene3 />
                <Scene4 />
                <CollectionsSection onCatalog={() => setPage('catalog')} />
                <EventsSection />
                <FooterSection onCatalog={() => setPage('catalog')} />
              </main>
            </>
          ) : (
            <CatalogPage onBack={() => setPage('home')} />
          )}
        </>
      )}
    </>
  );
}

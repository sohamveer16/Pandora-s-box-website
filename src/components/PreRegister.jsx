import React, { useState, useRef, useEffect } from 'react';
import { apiService } from '../services/api';
import { sound } from '../services/audio';
import { gameInfo } from '../data/game';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, Sparkles, Monitor, Gamepad2, Shield } from 'lucide-react';
import '../styles/PreRegister.css';

gsap.registerPlugin(ScrollTrigger);

export default function PreRegister() {
  const sectionRef = useRef(null);
  const altarRef = useRef(null);

  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('pc');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.prereg-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        altarRef.current,
        { opacity: 0, scale: 0.96, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: altarRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    sound.playSelect();

    if (!email || !email.includes('@')) {
      setErrorMsg('PLEASE ENTER A VALID RECIPIENT EMAIL ADDRESS.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call service layer (plugs directly into Java Spring Boot REST API later)
      const res = await apiService.submitPreRegistration({ email, platform });

      if (res.success) {
        sound.playRuneActivate();
        setSuccessData(res);
      } else {
        setErrorMsg(res.message || 'RITUAL FAILED. PLEASE RETRY.');
      }
    } catch (err) {
      setErrorMsg('COMMUNICATION SEAL INTERRUPTED. RETRY MOMENTARILY.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    sound.playHover();
    setEmail('');
    setSuccessData(null);
    setErrorMsg(null);
  };

  const platformOptions = [
    { id: 'pc', label: 'PC / STEAM / EPIC', icon: <Monitor size={16} /> },
    { id: 'console', label: 'CONSOLE EDITION', icon: <Gamepad2 size={16} /> },
    { id: 'other', label: 'OTHER PLATFORM', icon: <Sparkles size={16} /> }
  ];

  return (
    <section id="pre-register" className="preregister-section" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="prereg-ambient-flare" />

      <div className="section-wrapper">
        {/* Section Header */}
        <div className="preregister-header">
          <div className="section-kicker font-pixel-ui prereg-header-anim">
            <span className="kicker-seal">✦</span>
            <span>EXCLUSIVE ENLISTMENT</span>
            <span className="placeholder-tag">[PRE-REGISTRATION FORM]</span>
          </div>

          <h2 className="preregister-title font-pixel-title prereg-header-anim">
            CLAIM YOUR <span className="text-cyan-glow">LEGACY</span>
          </h2>

          <p className="preregister-subtitle font-body prereg-header-anim">
            Be among the first to breach the sealed sanctuary when Pandora's Box opens.
            Pre-register to unlock exclusive in-game celestial insignia and release notifications.
          </p>
        </div>

        {/* Ritual Altar / Game Terminal Form Card */}
        <div className="preregister-altar-card pixel-box" ref={altarRef}>
          {/* Altar Crest */}
          <div className="altar-header-strip">
            <div className="altar-seal-group">
              <span className="altar-dot" />
              <span className="altar-terminal-tag font-pixel-ui">
                ARCANE TERMINAL // ENLISTMENT RITE
              </span>
            </div>
            <span className="altar-protocol font-pixel-ui">PROTO: REST_V1</span>
          </div>

          {!successData ? (
            /* Active Enlistment Form */
            <form onSubmit={handleSubmit} className="prereg-form">
              {/* Email Input Field */}
              <div className="form-group">
                <label htmlFor="prereg-email" className="form-label font-pixel-ui">
                  <span>EMAIL ADDRESS:</span>
                  <span className="label-req font-pixel-ui">* REQUIRED</span>
                </label>
                <div className="pixel-input-wrapper">
                  <input
                    id="prereg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="CHAMPION@PANDORASBOX.REALM"
                    className="pixel-input font-pixel-ui"
                    disabled={isSubmitting}
                    required
                  />
                  <div className="input-focus-border" />
                </div>
              </div>

              {/* Platform Selector Buttons */}
              <div className="form-group">
                <label className="form-label font-pixel-ui">
                  <span>SELECT TARGET PLATFORM:</span>
                  <span className="placeholder-tag small">[PLATFORM SELECTION]</span>
                </label>
                <div className="platform-grid">
                  {platformOptions.map((opt) => {
                    const isSelected = platform === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        className={`platform-btn font-pixel-ui ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => {
                          sound.playHover();
                          setPlatform(opt.id);
                        }}
                      >
                        <span className="platform-icon">{opt.icon}</span>
                        <span>{opt.label}</span>
                        {isSelected && <span className="platform-check">✔</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="form-error-banner font-pixel-ui">
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pixel-btn primary prereg-submit-btn"
                  onMouseEnter={() => sound.playHover()}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-rune">ᛉ</span>
                      <span>INSCRIBING SOUL SEAL...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{gameInfo.primaryCtaText}</span>
                    </>
                  )}
                </button>

                <p className="form-disclaimer font-body">
                  By pre-registering, you agree to receive official transmission scrolls.
                  You can withdraw your soul mark at any time.
                </p>
              </div>
            </form>
          ) : (
            /* Game-Like Success State */
            <div className="prereg-success-state">
              <div className="success-seal-animation">
                <div className="success-rune-ring">
                  <CheckCircle2 size={48} className="success-check-icon text-cyan-glow" />
                </div>
              </div>

              <div className="success-badge font-pixel-ui">
                <span className="seal-dot" /> SEAL RECORDED
              </div>

              <h3 className="success-title font-pixel-title text-cyan-glow">
                REGISTRATION COMPLETE
              </h3>

              <p className="success-message font-body">
                {successData.message}
              </p>

              {/* Registration Receipt Badge */}
              <div className="success-receipt-box pixel-box">
                <div className="receipt-row font-pixel-ui">
                  <span>SEAL IDENTIFIER:</span>
                  <strong className="text-cyan-glow">{successData.registrationId}</strong>
                </div>
                <div className="receipt-row font-pixel-ui">
                  <span>REGISTERED EMAIL:</span>
                  <span>{successData.email}</span>
                </div>
                <div className="receipt-row font-pixel-ui">
                  <span>PLATFORM SANCTUARY:</span>
                  <span>{successData.platform.toUpperCase()}</span>
                </div>
                <div className="receipt-row font-pixel-ui">
                  <span>TIMESTAMP:</span>
                  <span className="text-muted">{new Date(successData.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              <p className="success-placeholder-note font-pixel-ui">
                [TEMPORARY SUCCESS MESSAGE - READY FOR SPRING BOOT CONFIRMATION EMAIL INTEGRATION]
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="pixel-btn"
              >
                <span>INSCRIBE ANOTHER CHAMPION</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

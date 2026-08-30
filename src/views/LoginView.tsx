import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Compass } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

interface LoginViewProps {
  onContinueAsGuest: () => void;
  onForgotPassword?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onContinueAsGuest, onForgotPassword }) => {
  const { login, signup } = useMCU();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'signup' && !acceptedTerms) {
      setErrorMsg('Debes aceptar la Política de Privacidad y los Términos de Uso.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccessMsg('¡Sesión iniciada con éxito! Redirigiendo...');
      } else {
        await signup(email, password, userName || 'Usuario');
        setSuccessMsg('¡Cuenta creada correctamente! Iniciando sesión...');
      }
    } catch (err: any) {
      console.error('Error en autenticación:', err);
      if (err.message?.includes('Invalid login credentials') || err.message?.includes('Credenciales inválidas')) {
        setErrorMsg('Credenciales inválidas. Verifica tus datos o crea una cuenta.');
      } else if (err.message?.includes('User already registered')) {
        setErrorMsg('Este email ya está registrado. Prueba a iniciar sesión.');
      } else if (err.message?.includes('Password should be at least')) {
        setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setErrorMsg(err.message || 'Credenciales inválidas. Verifica tus datos.');
      }
    } finally {
      setLoading(false);
    }
  };

  const communityAvatars = [
    '/avatares/Iron-Man.jpg',
    '/avatares/capitan-america2.jpg',
    '/avatares/Spiderman-TomHolland.jpg',
    '/avatares/Bruja-Escarlata.jpg',
    '/avatares/Thor.jpg',
    '/avatares/deadpool.jpg',
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#08090E] flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden font-sans text-white select-none">

      {/* Background Cinematic Wallpaper (Desktop) */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-center scale-105 opacity-70 pointer-events-none"
        style={{ backgroundImage: `url('/uatu-vigilante.png')` }}
      />

      {/* Background Cinematic Wallpaper (Mobile Responsive) */}
      <div
        className="block sm:hidden absolute inset-0 bg-cover bg-center scale-105 opacity-75 pointer-events-none"
        style={{ backgroundImage: `url('/uatu-vigilante-responsive.png')` }}
      />

      {/* Dark Vignette & Soft Scrim Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-black/40 to-[#08090E]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-[#08090E]/90 pointer-events-none" />

      {/* Deep Radial Nebula Behind Central Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-violet-900/20 via-red-900/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Horizontal Horizon Laser Filament Line (Matching Reference Image) */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none -translate-y-6" />

      {/* ────────────────────────────────────────────────────────── */}
      {/* MAIN CONTAINER: Centered Bento Glass Card */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center my-auto pt-4 pb-8">

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#141520]/75 backdrop-blur-3xl rounded-[32px] p-7 sm:p-8 border border-white/[0.08] border-t-white/[0.18] border-b-black/80 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden"
        >

          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src="/logo-marveltracker-blanco.png"
              alt="Marvel Tracker"
              className="h-10 sm:h-12 w-auto object-contain mb-2 drop-shadow-md"
            />
            <p className="text-[11px] text-zinc-400 font-normal">
              {mode === 'login' ? 'Accede a tu cuenta de seguimiento' : 'Crea tu perfil y guarda tu progreso'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5 text-left shadow-inner">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5 text-left shadow-inner">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1 text-left">
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Nombre de Usuario"
                  className="w-full h-11 px-4 bg-[#0A0B12]/80 border border-white/[0.08] border-t-black/70 border-b-white/[0.12] rounded-2xl text-xs sm:text-[13px] text-white placeholder:text-zinc-500 font-normal outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
                />
              </div>
            )}

            <div className="space-y-1 text-left">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-11 px-4 bg-[#0A0B12]/80 border border-white/[0.08] border-t-black/70 border-b-white/[0.12] rounded-2xl text-xs sm:text-[13px] text-white placeholder:text-zinc-500 font-normal outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
              />
            </div>

            <div className="space-y-1 text-left relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 px-4 bg-[#0A0B12]/80 border border-white/[0.08] border-t-black/70 border-b-white/[0.12] rounded-2xl text-xs sm:text-[13px] text-white placeholder:text-zinc-500 font-normal outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
              />

              {mode === 'login' && onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="absolute right-3.5 top-3 text-[10px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Recuperar contraseña"
                >
                  ?
                </button>
              )}
            </div>

            {mode === 'signup' && (
              <div className="flex items-start gap-2 pt-1 text-left px-1">
                <input
                  type="checkbox"
                  id="accept-terms-checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 accent-[#C81D25] rounded cursor-pointer shrink-0"
                />
                <label htmlFor="accept-terms-checkbox" className="text-[10px] text-zinc-400 font-normal leading-tight">
                  Acepto la{' '}
                  <button
                    type="button"
                    onClick={() => setShowLegalModal('privacy')}
                    className="text-zinc-200 underline hover:text-white font-medium cursor-pointer"
                  >
                    Política de Privacidad
                  </button>{' '}
                  y{' '}
                  <button
                    type="button"
                    onClick={() => setShowLegalModal('terms')}
                    className="text-zinc-200 underline hover:text-white font-medium cursor-pointer"
                  >
                    Términos
                  </button>.
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-2xl bg-gradient-to-b from-[#26283B] to-[#141524] hover:from-[#31344C] hover:to-[#1B1D2E] active:scale-[0.98] text-white text-xs font-semibold tracking-wide border-t border-white/[0.22] border-b border-black/80 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer mt-1 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Procesando...</span>
              ) : (
                <span>{mode === 'login' ? 'Sign in' : 'Sign up'}</span>
              )}
            </button>

            <button
              type="button"
              onClick={onContinueAsGuest}
              className="w-full h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/[0.08] border-t-white/[0.14] border-b-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-zinc-400" />
              <span>Explorar como Invitado</span>
            </button>

            <div className="text-center pt-2">
              {mode === 'login' ? (
                <p className="text-[11px] text-zinc-400 font-normal">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="font-semibold text-white hover:underline cursor-pointer"
                  >
                    Sign up, it's free!
                  </button>
                </p>
              ) : (
                <p className="text-[11px] text-zinc-400 font-normal">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="font-semibold text-white hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

          </form>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center mt-6 space-y-2 text-center"
        >
          <p className="text-[11px] text-zinc-400 font-normal tracking-tight">
            Únete a más de <strong className="text-white font-semibold">10K</strong> fans del MCU en todo el mundo
          </p>

          <div className="flex items-center -space-x-1.5 overflow-hidden p-0.5">
            {communityAvatars.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Community Member"
                className="w-6 h-6 rounded-full object-cover border-[1.5px] border-[#08090E] shadow-sm relative"
                style={{ zIndex: 10 - idx }}
              />
            ))}
          </div>
        </motion.div>

      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-[11px] text-zinc-500 text-center whitespace-nowrap mt-auto pb-4">
        <span>
          Desarrollado por{' '}
          <a
            href="https://www.gonzaorellana.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Gonzalo Orellana
          </a>
        </span>
        <span className="hidden sm:inline text-zinc-600">•</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLegalModal('privacy')}
            className="hover:text-zinc-300 transition-colors cursor-pointer"
          >
            Privacidad
          </button>
          <span className="text-zinc-600">•</span>
          <button
            type="button"
            onClick={() => setShowLegalModal('terms')}
            className="hover:text-zinc-300 transition-colors cursor-pointer"
          >
            Términos
          </button>
        </div>
      </div>

      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#141520] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setShowLegalModal(null)}
              className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Cerrar
            </button>

            {showLegalModal === 'privacy' ? (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <h2 className="text-lg font-bold text-white">Política de Privacidad (Ley 25.326)</h2>
                <p>
                  En Marvel Tracker, garantizamos la confidencialidad y protección de tus datos personales. Colectamos tu correo electrónico y nombre de usuario únicamente para la gestión de la cuenta y sincronización de progreso. Tus datos se alojan de forma segura en Supabase Inc.
                </p>
                <p>
                  Conforme a la Ley 25.326 y la AAIP, tenés derecho de acceso, rectificación, actualización y supresión de tus datos.
                </p>
                <p>Contacto del responsable: <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline">gonzaorellanajob@gmail.com</a></p>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <h2 className="text-lg font-bold text-white">Términos de Uso</h2>
                <p>
                  Marvel Tracker es una aplicación web independiente con fines informativos y de entretenimiento. No está afiliada, respaldada ni patrocinada por Marvel Entertainment, LLC, Marvel Studios o The Walt Disney Company.
                </p>
                <p>
                  Todo el contenido relacionado con el MCU es propiedad intelectual exclusiva de sus respectivos titulares.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

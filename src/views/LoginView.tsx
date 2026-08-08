import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useMCU } from '../context/MCUContext';
import { getSupabaseClient } from '../lib/supabase';

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
      setErrorMsg('Debes aceptar la Política de Privacidad y los Términos de Uso para crear tu cuenta.');
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
        setErrorMsg('Credenciales inválidas. Por favor verifica tus datos o crea una cuenta.');
      } else if (err.message?.includes('User already registered')) {
        setErrorMsg('Este email ya está registrado. Prueba a iniciar sesión.');
      } else if (err.message?.includes('Password should be at least')) {
        setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setErrorMsg(err.message || 'Credenciales inválidas. Por favor verifica tus datos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans text-white">

      {/* Background Cinematic Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-90 pointer-events-none"
        style={{ backgroundImage: `url('https://images.wallpapersden.com/image/download/marvel-legends_bGxuaGmUmZqaraWkpJRmbmdlrWZlbWU.jpg')` }}
      />

      {/* Fullscreen Layout Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 p-2 sm:p-6 items-center gap-6 lg:gap-10">

        {/* Left Column: Brand, Tagline & Guest Link (Staggered In-Place Fade) */}
        <div className="lg:col-span-7 space-y-4 text-left">
          {/* Step 1: Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          >
            <img
              src="/Logo-marvel-tracker.png"
              alt="Marvel Tracker"
              className="h-8 sm:h-10 w-auto object-contain mb-4 drop-shadow-md"
            />
          </motion.div>

          {/* Step 2: Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.05] drop-shadow-xl">
              Tu Universo Marvel<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-red-400 font-bold">
                siempre al día
              </span>
            </h1>
          </motion.div>

          {/* Step 3: Subtitle Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
          >
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-md">
              Seguí tu progreso, descubrí qué te falta ver y mantenete actualizado.
            </p>
          </motion.div>

          {/* Step 4: Guest Link Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: 'easeOut' }}
            className="pt-2"
          >
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white font-medium hover:underline transition-colors cursor-pointer group"
            >
              <span>Explorar como invitado</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Glass Form Card (Step 5: Final In-Place Slow Fade) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.3, ease: 'easeOut' }}
          className="lg:col-span-5 w-full max-w-[370px] mx-auto lg:ml-auto lg:mr-0 transform-gpu will-change-[opacity]"
        >
          <div className="bg-[#24273E]/40 backdrop-blur-3xl border border-white/25 rounded-[24px] p-5 sm:p-6 shadow-2xl text-white transform-gpu">

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Feedback Messages */}
              {errorMsg && (
                <div className="p-2 rounded-lg bg-rose-500/25 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-300" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-2 rounded-lg bg-emerald-500/25 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Field: User Name (Only in Signup Mode) */}
              {mode === 'signup' && (
                <div className="space-y-1 text-left">
                  <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                    className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-lg px-3.5 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                  />
                </div>
              )}

              {/* Field 1: Email */}
              <div className="space-y-1 text-left">
                <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-lg px-3.5 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                />
              </div>

              {/* Field 2: Password */}
              <div className="space-y-1 text-left">
                <label className="block text-[11px] font-normal text-white/90 tracking-tight">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white text-zinc-800 placeholder-zinc-400 font-normal text-xs rounded-lg px-3.5 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                />

                {/* Right-aligned Forgot Password Link */}
                {mode === 'login' && (
                  <div className="text-right pt-0.5">
                    <button
                      type="button"
                      onClick={() => onForgotPassword && onForgotPassword()}
                      className="text-[10px] text-zinc-200 hover:text-white underline font-normal cursor-pointer transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}
              </div>

              {/* Checkbox Obligatorio en Signup */}
              {mode === 'signup' && (
                <div className="flex items-start gap-2 pt-1 text-left">
                  <input
                    type="checkbox"
                    id="accept-terms-checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 accent-[#C81D25] rounded cursor-pointer shrink-0"
                  />
                  <label htmlFor="accept-terms-checkbox" className="text-[10px] text-zinc-300 font-normal leading-tight">
                    Acepto la{' '}
                    <button
                      type="button"
                      onClick={() => setShowLegalModal('privacy')}
                      className="text-white underline hover:text-red-300 font-medium cursor-pointer"
                    >
                      Política de Privacidad
                    </button>{' '}
                    y los{' '}
                    <button
                      type="button"
                      onClick={() => setShowLegalModal('terms')}
                      className="text-white underline hover:text-red-300 font-medium cursor-pointer"
                    >
                      Términos de Uso
                    </button>{' '}
                    (Ley 25.326).
                  </label>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#C81D25] hover:bg-[#a8151c] active:scale-[0.98] text-white font-normal text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer mt-0.5 disabled:opacity-50"
              >
                {loading
                  ? 'PROCESANDO...'
                  : mode === 'login'
                    ? 'INICIAR SESIÓN'
                    : 'CREAR MI CUENTA'}
              </button>

              {/* Bottom Switch Mode Link */}
              <div className="text-center pt-0.5">
                {mode === 'login' ? (
                  <p className="text-[11px] text-zinc-300 font-normal">
                    ¿Eres nuevo?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setErrorMsg(null);
                        setSuccessMsg(null);
                      }}
                      className="font-normal text-white underline cursor-pointer hover:text-zinc-100"
                    >
                      Crear una Cuenta
                    </button>
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-300 font-normal">
                    ¿Ya tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setErrorMsg(null);
                        setSuccessMsg(null);
                      }}
                      className="font-normal text-white underline cursor-pointer hover:text-zinc-100"
                    >
                      Iniciar Sesión
                    </button>
                  </p>
                )}
              </div>

            </form>

          </div>
        </motion.div>

      </div>

      {/* Footer Legal Links for Login View (Centrado horizontal en la zona inferior sin contenedor) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5 z-20 flex items-center gap-2.5 text-xs text-zinc-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-center whitespace-nowrap"
      >
        <button
          type="button"
          onClick={() => setShowLegalModal('privacy')}
          className="font-medium text-zinc-300 hover:text-white underline cursor-pointer transition-colors"
        >
          Política de Privacidad
        </button>
        <span className="text-zinc-500">•</span>
        <button
          type="button"
          onClick={() => setShowLegalModal('terms')}
          className="font-medium text-zinc-300 hover:text-white underline cursor-pointer transition-colors"
        >
          Términos de Uso
        </button>
      </motion.div>

      {/* Modal Overlay para ver Políticas desde el Login/Signup */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#1e2238] border border-white/20 rounded-2xl p-6 shadow-2xl text-left">
            <button
              onClick={() => setShowLegalModal(null)}
              className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Cerrar
            </button>

            {showLegalModal === 'privacy' ? (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-200">
                <h2 className="text-lg font-bold text-white">Política de Privacidad (Ley 25.326)</h2>
                <p>
                  En Marvel Tracker, garantizamos la confidencialidad y protección de tus datos personales. Colectamos tu correo electrónico y nombre de usuario únicamente para la gestión de la cuenta y sincronización de progreso. Tus datos se alojan de forma segura en Supabase Inc. fuera de Argentina.
                </p>
                <p>
                  Conforme a la Ley 25.326 y la AAIP, tenés derecho de acceso, rectificación, actualización y supresión de tus datos.
                </p>
                <p>Contacto del responsable: <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline">gonzaorellanajob@gmail.com</a></p>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-200">
                <h2 className="text-lg font-bold text-white">Términos y Condiciones de Uso</h2>
                <p>
                  Marvel Tracker es un proyecto de fan-tracking no oficial e independiente. El contenido del MCU (marcas, títulos, personajes) pertenece a Marvel Studios / Disney.
                </p>
                <p>
                  El servicio se presta "tal cual" sin fines de lucro para uso personal.
                </p>
                <p>Contacto: <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline">gonzaorellanajob@gmail.com</a></p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

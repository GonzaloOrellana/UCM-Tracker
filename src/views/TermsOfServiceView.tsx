import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Mail, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

export const TermsOfServiceView: React.FC = () => {
  const { setCurrentView } = useMCU();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 max-w-4xl mx-auto pb-12 text-white font-sans"
    >
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-medium text-white transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>Proyecto Fan-Made No Oficial</span>
        </div>
      </div>

      {/* Main Glassmorphic Document Card */}
      <div className="bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 text-left">
        
        {/* Header */}
        <div className="border-b border-white/15 pb-4 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#C81D25] shrink-0" />
            <span>Términos y Condiciones de Uso</span>
          </h1>
          <p className="text-xs text-zinc-300">
            Condiciones generales del servicio y exención de responsabilidad — Última actualización: Agosto 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">

          {/* Marvel / Disney Intellectual Property Alert Card */}
          <div className="p-4.5 rounded-xl bg-gradient-to-r from-red-950/60 via-[#24273E]/70 to-[#24273E]/60 border border-red-500/30 space-y-2">
            <div className="flex items-center gap-2 text-red-300 font-semibold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>Aviso Legal de Propiedad Intelectual (Marvel Studios / Disney)</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Todo el contenido relacionado con el Marvel Cinematic Universe (MCU), incluyendo nombres de películas, series, especiales, títulos, personajes, marcas comerciales, logotipos e imágenes descriptivas, son propiedad intelectual exclusiva de <strong className="text-white">Marvel Entertainment, LLC / Marvel Studios / The Walt Disney Company</strong>.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">Marvel Tracker</strong> es una aplicación web personal, independiente y sin fines de lucro, creada por y para fans. <strong className="text-white font-semibold">NO está afiliada, respaldada, patrocinada ni aprobada de manera oficial por Marvel Studios, Marvel Entertainment ni The Walt Disney Company.</strong>
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder, registrarte o hacer uso de la aplicación <strong className="text-white">Marvel Tracker</strong>, aceptás de forma plena y sin reservas los presentes Términos y Condiciones de Uso. Si no estás de acuerdo con alguno de los puntos establecidos, te solicitamos abstenerte de utilizar la plataforma.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              2. Naturaleza del Servicio y Uso Permitido
            </h2>
            <p>
              Marvel Tracker proporciona herramientas interactivas de seguimiento personal de producciones cinematográficas y televisivas del Universo Cinematográfico de Marvel. El servicio es de uso exclusivamente personal, individual y no comercial.
            </p>
            <p>El usuario se compromete a:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>Proporcionar información verdadera durante el registro de cuenta.</li>
              <li>Hacer un uso adecuado y lícito de las funciones de la app.</li>
              <li>Abstenerse de intentar vulnerar la seguridad, realizar extracción automatizada ilícita de datos (scraping) o alterar el funcionamiento de los servidores.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              3. Cuentas de Usuario y Seguridad
            </h2>
            <p>
              Sos responsable de mantener la confidencialidad de tus credenciales de acceso. En caso de detectar accesos no autorizados a tu cuenta, podés restablecer tu contraseña inmediatamente mediante la función de recuperación o contactarnos a través de nuestros canales de soporte.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              4. Limitación de Responsabilidad
            </h2>
            <p>
              Marvel Tracker se ofrece "tal cual" (<em>as is</em>) y "según disponibilidad". Si bien trabajamos para mantener la plataforma en óptimas condiciones, no se garantiza la disponibilidad ininterrumpida del servicio ni la ausencia de eventuales errores técnicos o discrepancias menores en las fechas de estreno de las producciones.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              5. Modificaciones a los Términos
            </h2>
            <p>
              Nos reservamos el derecho de actualizar o modificar estos Términos de Uso en cualquier momento para reflejar cambios normativos o nuevas funcionalidades de la aplicación (por ejemplo, incorporación de analíticas). El uso continuado del servicio tras la publicación de cambios implicará la aceptación implícita de los nuevos términos.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F5C842]" />
              6. Consultas y Contacto
            </h2>
            <p className="text-xs text-zinc-300">
              Para cualquier duda, comentario o consulta legal referente a estos Términos de Uso, podés comunicarte vía correo electrónico a:
            </p>
            <div className="p-3 rounded-lg bg-black/30 border border-white/10 text-xs font-mono flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4 text-red-400 shrink-0" />
              <span>Soporte legal y consultas: </span>
              <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline hover:text-red-300">
                gonzaorellanajob@gmail.com
              </a>
            </div>
          </section>

        </div>

        {/* Footer info */}
        <div className="border-t border-white/15 pt-4 text-center">
          <p className="text-[11px] text-zinc-400">
            Marvel Tracker © 2026 — Proyecto fan-made no comercial. No afiliado a Marvel Studios ni Disney.
          </p>
        </div>

      </div>
    </motion.div>
  );
};

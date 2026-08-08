import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Mail, Lock, Scale, UserCheck } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

export const PrivacyPolicyView: React.FC = () => {
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

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cumplimiento Ley 25.326 (Argentina)</span>
        </div>
      </div>

      {/* Main Glassmorphic Document Card */}
      <div className="bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 text-left">
        
        {/* Header */}
        <div className="border-b border-white/15 pb-4 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Lock className="w-7 h-7 text-[#C81D25] shrink-0" />
            <span>Política de Privacidad</span>
          </h1>
          <p className="text-xs text-zinc-300">
            Protección de Datos Personales y Derechos del Usuario (Ley N° 25.326 de la República Argentina) — Última actualización: Agosto 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">

          {/* Intro Notice */}
          <div className="p-4 rounded-xl bg-[#24273E]/60 border border-white/15 flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-300">
              En <strong className="text-white font-semibold">Marvel Tracker</strong>, respetamos tu privacidad y nos comprometemos a resguardar la seguridad de tu información personal en todo momento. Esta política detalla los datos recolectados, su tratamiento y tus derechos conforme a la legislación argentina vigente.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              1. Responsable del Tratamiento de los Datos
            </h2>
            <p>
              El tratamiento de los datos personales ingresados en esta aplicación es llevado a cabo de manera transparente por el desarrollador responsable de Marvel Tracker, concebida como una plataforma personal y no comercial de seguimiento de producciones del MCU.
            </p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F5C842] shrink-0" />
              <span>Contacto directo sobre privacidad: </span>
              <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline hover:text-red-300">
                gonzaorellanajob@gmail.com
              </a>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              2. Datos Personales Recolectados
            </h2>
            <p>
              Recolectamos exclusivamente los datos necesarios para brindar y sincronizar las funcionalidades interactivas del servicio:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>
                <strong className="text-white">Datos de Cuenta y Registro:</strong> Correo electrónico, nombre de usuario y contraseña (hasheada y gestionada de forma encriptada mediante la infraestructura de Supabase Auth; la app nunca guarda ni lee tu contraseña en texto plano).
              </li>
              <li>
                <strong className="text-white">Progreso y Contenido:</strong> Estado de producciones vistas (películas, series y especiales), lista de producciones marcadas como favoritas e historial de calificaciones asignadas.
              </li>
              <li>
                <strong className="text-white">Datos de Perfil Opcionales:</strong> Fotografía o avatar de perfil cargado voluntariamente por el usuario.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              3. Finalidad del Tratamiento
            </h2>
            <p>
              La recolección de los datos mencionados tiene como únicas finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>Gestionar la creación, autenticación y acceso seguro a tu cuenta personal.</li>
              <li>Almacenar y sincronizar de manera permanente tu avance de visualización de producciones y calificaciones personalizadas.</li>
              <li>Garantizar el correcto funcionamiento de las funciones interactivas del tablero de control (Dashboard).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              4. Almacenamiento e Infraestructura Externa (Supabase)
            </h2>
            <p>
              Tus datos son almacenados en las bases de datos de nuestro proveedor de infraestructura <strong className="text-white">Supabase Inc.</strong>, cuyos servidores se encuentran alojados fuera del territorio de la República Argentina. Supabase cumple con elevados estándares y protocolos internacionales de seguridad informática (incluyendo cifrado en reposo y conexiones TLS/SSL en tránsito). Al registrarte en la plataforma, das tu consentimiento explícito para la transferencia internacional de datos requerida para el funcionamiento en la nube.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              5. Plazo de Conservación y Eliminación Definitiva
            </h2>
            <p>
              Tus datos personales permanecen almacenados mientras tu cuenta se mantenga activa. En cualquier momento podés solicitar o efectuar la eliminación inmediata y definitiva de tu cuenta y de toda tu información registrada a través de la sección <strong className="text-white">"Mi Perfil" &gt; "Zona de Peligro" &gt; "Eliminar Cuenta"</strong>, o enviando una solicitud por correo a <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline">gonzaorellanajob@gmail.com</a>.
            </p>
          </section>

          {/* Section 6 - Ley 25.326 ARCO */}
          <section className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#F5C842]" />
              6. Derechos de los Titulares (Derechos ARCO y Hábeas Data)
            </h2>
            <p className="text-xs leading-relaxed text-zinc-300">
              En estricto cumplimiento del artículo 14 de la Ley N° 25.326 y de la Disposición AAIP N° 10/2008 de la República Argentina, te informamos que:
            </p>
            <blockquote className="p-3 bg-black/30 border-l-2 border-[#C81D25] text-[11px] font-mono text-zinc-300 italic rounded-r-lg my-2">
              "El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326."
            </blockquote>
            <p className="text-xs leading-relaxed text-zinc-300">
              Asimismo, la <strong className="text-white">AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA (AAIP)</strong>, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas sobre protección de datos personales.
            </p>
            <p className="text-xs text-zinc-300">
              Para ejercer tus derechos de acceso, rectificación, actualización o supresión, podés comunicarte enviando un email a: <a href="mailto:gonzaorellanajob@gmail.com" className="text-white underline font-semibold">gonzaorellanajob@gmail.com</a>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C81D25]"></span>
              7. Banner de Consentimiento de Cookies
            </h2>
            <p>
              Utilizamos almacenamiento local en tu navegador (<code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">localStorage</code>) para guardar tu sesión y tus preferencias de consentimiento sobre cookies analíticas. Podés modificar tu elección de consentimiento en cualquier momento ingresando a la configuración de tu perfil.
            </p>
          </section>

        </div>

        {/* Footer info */}
        <div className="border-t border-white/15 pt-4 text-center">
          <p className="text-[11px] text-zinc-400">
            Marvel Tracker © 2026 — Proyecto independiente acorde a la Ley 25.326 de Protección de Datos Personales (Argentina).
          </p>
        </div>

      </div>
    </motion.div>
  );
};

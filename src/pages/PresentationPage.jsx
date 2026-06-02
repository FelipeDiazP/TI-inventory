export default function PresentationPage() {
  const technologies = [
    "React",
    "Flutter",
    "Supabase",
    "PostgreSQL",
  ];

  const features = [
    "Registro y seguimiento de tickets",
    "Asignación de incidencias",
    "Gestión de activos tecnológicos",
    "Control de licencias",
    "Notificaciones en tiempo real",
    "Historial de solicitudes",
  ];

  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            Proyecto Académico ETITC
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-6">
            Sistema de Tickets TI
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-3xl">
            Plataforma web y móvil diseñada para optimizar la gestión
            de incidencias, activos tecnológicos y procesos de soporte
            técnico mediante una solución moderna y escalable.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Ver Proyecto
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
              Más Información
            </button>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white shadow-xl rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p>Disponibilidad</p>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">100%</h3>
            <p>Trazabilidad</p>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">3</h3>
            <p>Roles principales</p>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">∞</h3>
            <p>Escalabilidad</p>
          </div>

        </div>
      </section>

      {/* PROBLEMÁTICA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center">
          Problemática
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Muchas organizaciones gestionan incidentes mediante correos,
          hojas de cálculo y aplicaciones de mensajería, generando
          pérdida de información y retrasos en la atención.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-600">
              Información Dispersa
            </h3>

            <p className="mt-3 text-gray-600">
              Datos distribuidos en múltiples herramientas sin
              centralización.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-600">
              Respuesta Lenta
            </h3>

            <p className="mt-3 text-gray-600">
              Dificultad para atender y dar seguimiento a incidencias.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-600">
              Falta de Control
            </h3>

            <p className="mt-3 text-gray-600">
              Gestión ineficiente de activos y licencias tecnológicas.
            </p>
          </div>

        </div>
      </section>

      {/* OBJETIVO */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Objetivo General
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            Desarrollar una plataforma integral que permita centralizar
            la gestión de tickets, optimizar el control de activos
            tecnológicos y mejorar la comunicación entre usuarios y el
            departamento de TI.
          </p>

        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center">
          Tecnologías Utilizadas
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-white shadow-lg rounded-xl p-8 text-center border"
            >
              <h3 className="text-2xl font-bold text-blue-600">
                {tech}
              </h3>
            </div>
          ))}

        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Funcionalidades
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            {features.map((feature) => (
              <div
                key={feature}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <span className="text-blue-600 font-semibold">
                  ✓
                </span>{" "}
                {feature}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold text-center">
          Beneficios Esperados
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-blue-600">
              Mayor Eficiencia
            </h3>
            <p className="mt-3 text-gray-600">
              Optimización de procesos de soporte.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-blue-600">
              Mejor Seguimiento
            </h3>
            <p className="mt-3 text-gray-600">
              Control completo del ciclo de vida de los tickets.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-blue-600">
              Información Centralizada
            </h3>
            <p className="mt-3 text-gray-600">
              Acceso rápido y seguro a la información.
            </p>
          </div>

        </div>

      </section>

      {/* EQUIPO */}
      <section className="bg-blue-600 text-white py-24">

        <h2 className="text-4xl font-bold text-center">
          Equipo de Desarrollo
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mt-12">

          <div className="bg-white/10 rounded-xl p-8 text-center">
            <h3 className="font-bold text-xl">
              Iván Felipe Prada Díaz
            </h3>
          </div>

          <div className="bg-white/10 rounded-xl p-8 text-center">
            <h3 className="font-bold text-xl">
              Milton Hernán Cuitiva Romero
            </h3>
          </div>

          <div className="bg-white/10 rounded-xl p-8 text-center">
            <h3 className="font-bold text-xl">
              Daniel Esteban Pedraza Dueñas
            </h3>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-8 text-center">
        <p className="text-gray-600">
          Sistema de Tickets TI © 2026 | ETITC
        </p>
      </footer>

    </div>
  );
}
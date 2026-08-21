import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-16 lg:py-24">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary-container rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Sobre <span className="text-gradient-cyan">WTech</span>
          </h1>
          <p className="font-body-md text-on-surface-variant text-lg">
            Pioneros en el futuro de los accesorios moviles.
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass-panel rounded-lg p-8">
            <h2 className="font-headline-lg-mobile text-primary-container mb-4">
              Nuestra Mision
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              WTech Circuitry Systems esta dedicada a disenar la proxima
              generacion de accesorios moviles. Combinamos tecnologia de
              vanguardia con durabilidad militar para crear productos que
              protegen y mejoran tus dispositivos.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "shield",
                title: "Proteccion",
                desc: "Materiales de grado militar probados para resistir condiciones extremas.",
              },
              {
                icon: "bolt",
                title: "Rendimiento",
                desc: "Entrega de energia de alta eficiencia y tecnologia de carga rapida.",
              },
              {
                icon: "eco",
                title: "Sostenibilidad",
                desc: "Manufactura ecologica con materiales reciclados.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel rounded-lg p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary-container mb-4 block">
                  {item.icon}
                </span>
                <h3 className="font-headline-lg-mobile text-on-surface mb-2">
                  {item.title}
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <section className="glass-panel rounded-lg p-8">
            <h2 className="font-headline-lg-mobile text-primary-container mb-4">
              Nuestra Historia
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
              Fundada en 2024, WTech nacio de una creencia simple: los
              accesorios moviles deben ser tan avanzados como los dispositivos
              que protegen. Nuestro equipo de ingenieros y disenadores trabaja
              incansablemente para superar los limites de lo posible.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Cada producto pasa por pruebas rigurosas, desde pruebas de caida
              hasta ciclos de temperatura extrema, asegurando que los accesorios
              WTech ofrezcan un rendimiento inigualable en cualquier situacion.
            </p>
          </section>

          <div className="text-center">
            <Link
              to="/products"
              className="bg-primary-container text-[#050B10] font-label-caps text-label-caps px-8 py-4 rounded uppercase hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
            >
              Explorar Productos
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

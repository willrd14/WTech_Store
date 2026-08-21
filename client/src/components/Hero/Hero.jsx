import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative px-5 md:px-20 py-24 md:py-32 max-w-[1440px] mx-auto overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary-container/30 bg-primary-container/10">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-caps text-label-caps text-primary-container uppercase">
              Sistema En Linea
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
            Accesorios de
            <br />
            <span className="text-gradient-cyan">Proxima Generacion.</span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-md">
            Experimenta lo ultimo en proteccion y potencia para tu movil.
            Accesorios de alta fidelidad disenados para la maxima proteccion y
            rendimiento.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-primary-container text-[#050B10] font-label-caps text-label-caps px-8 py-4 rounded hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 uppercase flex items-center gap-2"
            >
              Iniciar Secuencia
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
            <Link
              to="/products"
              className="bg-transparent border border-primary-container text-primary-container font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-container/10 transition-all duration-300 uppercase"
            >
              Ver Especificaciones
            </Link>
          </div>
        </div>
        <div className="md:col-span-7 relative mt-16 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/10 to-transparent rounded-full filter blur-3xl -z-10" />
          <img
            alt="Futuristic Mobile Accessory"
            className="w-full h-auto max-h-[600px] object-contain drop-shadow-[0_0_40px_rgba(0,242,255,0.15)] relative z-10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfStQMa8ge_rBqqM_J22QNFkgg-w1kfxDYXOqDfiAwQfoQ_Xi5QMkeYyVpz5drbqe0aAxCMmdWh98bgLaYJi5AFLYPAz9xSRHMASt6bi4aUDIio6JIdOuRAlgnLwutMfhMq51TDf2NcjuthXhLHHbM1LSkjeJ8VzQL1-cFmb2SbfuRc8fl6vFrEisFvdU4gjheaCpmKp3-n_KDgpXHqYsusY8o447WhK4XkP21CsbdfIo_bK1gF5Y1fg"
          />
          <div className="absolute top-1/4 -left-12 w-24 circuit-line circuit-line-h" />
          <div className="absolute bottom-1/4 right-0 h-32 circuit-line circuit-line-v" />
        </div>
      </div>
    </section>
  );
}

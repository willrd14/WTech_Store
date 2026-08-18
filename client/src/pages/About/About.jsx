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
            About <span className="text-gradient-cyan">WTech</span>
          </h1>
          <p className="font-body-md text-on-surface-variant text-lg">
            Pioneering the future of mobile accessories.
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass-panel rounded-lg p-8">
            <h2 className="font-headline-lg-mobile text-primary-container mb-4">
              Our Mission
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              WTech Circuitry Systems is dedicated to engineering the next
              generation of mobile accessories. We combine cutting-edge
              technology with military-grade durability to create products
              that protect and enhance your devices.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "shield",
                title: "Protection",
                desc: "Military-grade materials tested to withstand extreme conditions.",
              },
              {
                icon: "bolt",
                title: "Performance",
                desc: "High-efficiency power delivery and rapid charging technology.",
              },
              {
                icon: "eco",
                title: "Sustainability",
                desc: "Eco-conscious manufacturing with recycled materials.",
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
              Our Story
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
              Founded in 2024, WTech emerged from a simple belief: mobile
              accessories should be as advanced as the devices they protect.
              Our team of engineers and designers work tirelessly to push
              the boundaries of what's possible.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Every product undergoes rigorous testing, from drop tests to
              extreme temperature cycling, ensuring that WTech accessories
              deliver uncompromising performance in any scenario.
            </p>
          </section>

          <div className="text-center">
            <Link
              to="/products"
              className="bg-primary-container text-[#050B10] font-label-caps text-label-caps px-8 py-4 rounded uppercase hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
            >
              Explore Products
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

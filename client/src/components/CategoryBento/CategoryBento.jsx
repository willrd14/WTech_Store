import { Link } from "react-router-dom";
import { categories } from "../../data/products";

export default function CategoryBento() {
  return (
    <section className="px-5 md:px-20 py-16 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Categorias
        </h2>
        <div className="flex-grow h-px bg-gradient-to-r from-primary-container/30 to-transparent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {categories.map((cat, index) => {
          const isLarge = index === 0 || index === 3;
          return (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`glass-panel p-6 rounded-lg relative overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary-container/50 flex flex-col justify-between ${
                isLarge ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-primary-container">
                  open_in_new
                </span>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-container/5 rounded-full filter blur-2xl group-hover:bg-primary-container/10 transition-all" />
              <div>
                <h3 className="font-display-lg text-headline-lg-mobile text-on-surface mb-2 relative z-10">
                  {cat.name}
                </h3>
                <p className="font-label-caps text-label-caps text-outline relative z-10">
                  {cat.subtitle}
                </p>
              </div>
              {isLarge && (
                <div className="absolute right-8 bottom-8 w-1/2 h-1/2">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary-container/30 group-hover:text-primary-container/50 transition-colors">
                      {cat.id === "cases"
                        ? "phone_iphone"
                        : "electric_bolt"}
                    </span>
                  </div>
                </div>
              )}
              {!isLarge && (
                <div className="w-full h-20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary-container/30 group-hover:text-primary-container/50 transition-colors">
                    {cat.id === "chargers"
                      ? "electric_bolt"
                      : cat.id === "screen-protectors"
                      ? "screen_lock_portrait"
                      : "explore"}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Warranty", path: "/about" },
  { label: "Privacy Policy", path: "/about" },
  { label: "Technical Specs", path: "/about" },
  { label: "Store Locator", path: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest full-width border-t border-primary/10 mt-auto">
      <div className="flex flex-col items-center gap-6 py-16 px-5 md:px-20 max-w-[1440px] mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-low pointer-events-none" />
        <Link
          to="/"
          className="relative z-10 font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary dark:text-primary-fixed uppercase tracking-tighter"
        >
          WTech
        </Link>
        <nav className="relative z-10 flex flex-wrap justify-center gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="font-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:translate-x-1 uppercase text-xs tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="relative z-10 font-label-caps text-label-caps text-on-surface-variant opacity-50 text-center mt-4">
          &copy; 2024 WTech Circuitry Systems. All rights reserved. Built for
          the high-performance era.
        </div>
      </div>
    </footer>
  );
}

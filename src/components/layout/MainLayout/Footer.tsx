import { FOOTER_LINKS } from "./constants";

export const Footer = ({ currentYear }: { currentYear: number }) => (
  <footer className="bg-white border-t border-gray-200 py-8">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center px-4">
      <p className="text-gray-600 text-sm">
        © {currentYear} HeroPet - Todos os direitos reservados
      </p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

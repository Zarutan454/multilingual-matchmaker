export const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-secondary">Über uns</a></li>
              <li><a href="/services" className="hover:text-secondary">Services</a></li>
              <li><a href="/booking" className="hover:text-secondary">Buchung</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Städte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-secondary">Berlin</a></li>
              <li><a href="#" className="hover:text-secondary">München</a></li>
              <li><a href="#" className="hover:text-secondary">Hamburg</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy" className="hover:text-secondary">Datenschutz</a></li>
              <li><a href="/terms" className="hover:text-secondary">AGB</a></li>
              <li><a href="/imprint" className="hover:text-secondary">Impressum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Kontakt</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@example.com</li>
              <li>Tel: +49 123 456789</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Premium Escort Service. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};
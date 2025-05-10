import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaBars, FaTrophy, FaInstagram } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Inductees", path: "/inductees" },
    { name: "Eligibility Rules", path: "/eligibility-rules" },
  ];

  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center">
              <FaTrophy className="text-primary text-2xl" />
            </div>
            <h1 className="text-white font-heading font-bold text-xl md:text-2xl">
              Hockey Hall of Fame
            </h1>
          </div>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle mobile menu"
        >
          <FaBars />
        </button>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-white hover:text-accent font-heading text-sm uppercase font-medium transition ${
                location === item.path ? "text-accent" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition"
            aria-label="Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700 px-4 py-2">
          <div className="flex flex-col space-y-3 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-white hover:text-accent font-heading text-sm uppercase font-medium transition ${
                  location === item.path ? "text-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent font-heading text-sm uppercase font-medium transition flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

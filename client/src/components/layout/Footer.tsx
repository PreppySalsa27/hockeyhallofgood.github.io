import { Link } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Hockey Hall of Fame</h3>
            <p className="text-gray-300 text-sm mb-4">
              Honoring the greatest to ever play the game. Preserving hockey history for 
              generations to come.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-accent transition" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-accent transition" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-accent transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-accent transition" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/inductees" className="text-gray-300 hover:text-white transition">
                  Inductees
                </Link>
              </li>
              <li>
                <Link href="/eligibility-rules" className="text-gray-300 hover:text-white transition">
                  Eligibility Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Visit Us</h3>
            <address className="text-sm text-gray-300 not-italic">
              <p className="mb-2">123 Hockey Plaza</p>
              <p className="mb-2">Toronto, ON M4B 1B3</p>
              <p className="mb-2">Canada</p>
              <p className="mb-2">(123) 456-7890</p>
              <p>info@hockeyhalloffame.com</p>
            </address>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get updates on new inductees and events.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-sm text-gray-900 rounded"
                />
              </div>
              <Button
                type="submit"
                className="bg-accent hover:bg-opacity-90 text-primary font-medium text-sm px-4 py-2 rounded transition w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hockey Hall of Fame. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

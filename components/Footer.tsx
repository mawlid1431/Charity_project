import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export function Footer({ darkMode }: FooterProps) {
  return (
    <footer className={`${darkMode ? 'bg-[#0a1628] text-white' : 'bg-[#1a2f5f] text-white'} border-t border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-lg flex items-center justify-center">
                <span className="text-white">🖤</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white text-xl">
                  Mubarak
                </span>
                <span className="text-[#ff6f0f] text-xl">
                  Charity
                </span>
              </div>
            </div>
            <p className="mb-4 text-white/70 max-w-md">
              Empowering families. Educating children. Changing lives through compassion and community care.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-[#ff6f0f] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#ff6f0f] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#ff6f0f] transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#ff6f0f] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#ff6f0f] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  info@mubarakcharity.org
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  123 Hope Street, City, Country
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-center md:text-left">
            © 2025 Mubarak Charity. All rights reserved.
          </p>
          <p className="text-white/50 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-[#ff6f0f] fill-[#ff6f0f]" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
}

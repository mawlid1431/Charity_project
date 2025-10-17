import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

export function Footer({ darkMode, onNavigate }: FooterProps) {
  return (
    <footer className={`${darkMode ? 'bg-[#0a1628] text-white' : 'bg-[#1a2f5f] text-white'} border-t border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-lg flex items-center justify-center">
                <span className="text-white">🖤</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white text-lg sm:text-xl">
                  Mubarak
                </span>
                <span className="text-[#ff6f0f] text-lg sm:text-xl">
                  Charity
                </span>
              </div>
            </div>
            <p className="mb-4 text-white/70 max-w-md text-sm sm:text-base">
              Empowering families. Educating children. Changing lives through compassion and community care.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100076237641454"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/mubarak_charity1/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.youtube.com/@mubarakhashi5636"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff6f0f] hover:bg-[#ff8f3f] transition-colors flex items-center justify-center text-white"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('success-stories')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-white/70 hover:text-[#ff6f0f] transition-colors text-left text-sm sm:text-base py-1"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-base sm:text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <a href="mailto:Charitymubarak1@gmail.com" className="text-white/70 hover:text-[#ff6f0f] transition-colors text-sm sm:text-base break-all">
                  Charitymubarak1@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <a href="tel:+17816921308" className="text-white/70 hover:text-[#ff6f0f] transition-colors text-sm sm:text-base">
                  +1 781-692-1308
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6f0f] mt-0.5 flex-shrink-0" />
                <a href="https://maps.google.com/?q=Boston+Road+MA+Massachusetts" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#ff6f0f] transition-colors text-sm sm:text-base">
                  Boston Road, MA, Massachusetts
                </a>
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

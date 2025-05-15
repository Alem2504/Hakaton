import React from 'react';
import { Activity, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">BioTwin</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Personalized health insights powered by AI and your data. Your digital twin for better health decisions.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">HIPAA Compliance</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-400">support@biotwin.health</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
              <li className="text-gray-400">123 Health Avenue<br />San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {currentYear} BioTwin Health Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
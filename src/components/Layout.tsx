import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Search, ShieldCheck, Shield, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import logo from '@/src/assets/logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Android', path: '/android' },
    { name: 'Windows', path: '/windows' },
    { name: 'Cloud Backup', path: '/cloud-backup' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold tracking-tighter text-primary font-headline">
          <img 
            src={logo} 
            alt="CheckBook Logo" 
            className="w-10 h-10 object-contain"
          />
          CheckBook
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path 
                  ? "text-primary font-bold border-b-2 border-primary" 
                  : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/signup" className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <User className="w-5 h-5 text-primary" />
          </Link>
          <button 
            className="md:hidden p-2 hover:bg-surface-container rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-base font-medium transition-colors",
                location.pathname === link.path ? "text-primary font-bold" : "text-on-surface-variant"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/signup" 
            className="mt-2 py-3 bg-primary text-white text-center rounded-lg font-bold"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-surface border-t border-primary-container/50">
      <div className="max-w-screen-2xl mx-auto px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-secondary font-black text-xl font-headline tracking-widest uppercase">
            <img 
              src={logo} 
              alt="CheckBook Logo" 
              className="w-8 h-8 object-contain brightness-0 invert"
            />
            CheckBook
          </div>
          <p className="text-outline-variant/60 text-xs uppercase tracking-widest max-sm">
            © 2026 METO ORGANATION SYSTEM. All rights reserved. Secure Architectural Vaulting.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest font-medium">
          <Link to="/cloud-backup" className="text-outline-variant/60 hover:text-secondary transition-colors">Cloud Backup</Link>
          <Link to="#" className="text-outline-variant/60 hover:text-secondary transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-outline-variant/60 hover:text-secondary transition-colors">Terms of Service</Link>
          <Link to="#" className="text-outline-variant/60 hover:text-secondary transition-colors">Security Audit</Link>
          <Link to="#" className="text-outline-variant/60 hover:text-secondary transition-colors">Status</Link>
          <Link to="#" className="text-outline-variant/60 hover:text-secondary transition-colors">Documentation</Link>
        </div>
      </div>
    </footer>
  );
}

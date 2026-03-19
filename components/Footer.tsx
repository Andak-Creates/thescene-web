import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="download" className="bg-theme-bg border-t border-theme-border py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="max-w-xs">
          <Link href="/" className="text-2xl font-bold font-heading text-theme-purple tracking-tighter mb-4 inline-block">
            TheScene
          </Link>
          <p className="text-theme-muted mb-6">
            The ultimate mobile app for party discovery and seamless ticketing. Experience the best events near you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-theme-muted hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-theme-muted hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-theme-muted hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/support" className="text-theme-muted hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-theme-border mt-20 pt-10 text-center md:text-left">
        <p className="text-theme-muted text-sm">
          © {new Date().getFullYear()} TheScene. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

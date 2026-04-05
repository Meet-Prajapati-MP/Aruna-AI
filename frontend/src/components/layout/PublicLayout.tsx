import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
export function PublicLayout() {
  const location = useLocation();
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Product',
    path: '/product'
  }, {
    name: 'Use Cases',
    path: '/use-cases'
  }, {
    name: 'Pricing',
    path: '/pricing'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  const isHome = location.pathname === '/';
  return <div className="min-h-screen flex flex-col bg-warm-white selection:bg-primary-light selection:text-white" data-id="element-140">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? 'bg-primary/95 backdrop-blur-md border-b border-white/10' : 'bg-warm-white/80 backdrop-blur-md border-b border-border/50'}`} data-id="element-141">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" data-id="element-142">
          <Link to="/" className="flex items-center gap-2 group" data-id="element-143">
            {isHome ? <div className="flex items-center gap-2" data-id="element-144">
                <div className="rounded-xl flex items-center justify-center shadow-sm" style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.2)'
            }} data-id="element-145">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" data-id="element-146">
                    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="white" data-id="element-147" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-2xl text-white" data-id="element-148">
                  Aruna
                </span>
              </div> : <Logo size="md" data-id="element-149" />}
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-id="element-150">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors ${location.pathname === link.path ? isHome ? 'text-white' : 'text-primary' : isHome ? 'text-white/70 hover:text-white' : 'text-text-secondary hover:text-text-primary'}`} data-id="element-151">
                {link.name}
              </Link>)}
          </nav>

          <div className="flex items-center gap-4" data-id="element-152">
            <Link to="/login" className={`hidden sm:block text-sm font-medium transition-colors ${isHome ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-text-primary'}`} data-id="element-153">
              Log in
            </Link>
            <Link to="/signup" data-id="element-154">
              {isHome ? <Button variant="secondary" size="sm" className="rounded-full px-6 !bg-white !text-primary hover:!bg-cream border-0 shadow-sm font-semibold" data-id="element-155">
                  Get Started
                </Button> : <Button size="sm" className="rounded-full px-6" data-id="element-156">
                  Get Started
                </Button>}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow" data-id="element-157">
        <Outlet data-id="element-158" />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-16" data-id="element-159">
        <div className="max-w-7xl mx-auto px-6" data-id="element-160">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12" data-id="element-161">
            <Logo size="md" data-id="element-162" />
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-text-secondary" data-id="element-163">
              <Link to="/about" className="hover:text-primary transition-colors" data-id="element-164">
                About
              </Link>
              <Link to="/product" className="hover:text-primary transition-colors" data-id="element-165">
                Product
              </Link>
              <Link to="/pricing" className="hover:text-primary transition-colors" data-id="element-166">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors" data-id="element-167">
                Contact
              </Link>
              <Link to="#" className="hover:text-primary transition-colors" data-id="element-168">
                Privacy
              </Link>
              <Link to="#" className="hover:text-primary transition-colors" data-id="element-169">
                Terms
              </Link>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" data-id="element-170">
            <p className="text-sm text-text-muted" data-id="element-171">
              © {new Date().getFullYear()} Aruna AI. All rights reserved.
            </p>
            <p className="text-xs text-text-muted" data-id="element-172">
              Powered by industry-leading LLMs
            </p>
          </div>
        </div>
      </footer>
    </div>;
}
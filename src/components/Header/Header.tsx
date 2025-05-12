import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Smartphone, LogOut, User } from 'lucide-react';
import { useBasket } from '../../context/BasketContext';
import { HeaderProps } from './Header.types';
import { supabase } from '../../lib/supabase';

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { itemCount } = useBasket();
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Smartphone className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold">PhoneShop</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Phones
            </Link>
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Accessories
            </Link>
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Offers
            </Link>
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Support
            </Link>
          </nav>
          
          {/* User Profile and Shopping cart */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm">
                  <User size={16} className="mr-2" />
                  <span className="hidden md:inline">{userEmail}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-red-600"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium"
              >
                Sign in
              </Link>
            )}
            
            <Link to="/basket" className="p-2 text-gray-900 hover:text-red-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden ml-2 p-2 text-gray-900 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </Link>
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
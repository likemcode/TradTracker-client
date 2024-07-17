import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboardimage from '../assets/Dashboard.png';
import { SlidersTwoTone } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ChartBarIcon,CpuChipIcon,ChartBarSquareIcon, CurrencyDollarIcon, ShieldCheckIcon, BookOpenIcon, ArrowUpTrayIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      {/* Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 ? 'bg-white bg-opacity-25 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md">
                <SlidersTwoTone twoToneColor="#ffffff" className="text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Trade<span className="text-blue-600">Tracker</span>
              </h3>
            </motion.div>
            <nav className="hidden md:flex space-x-6">
              {['Features', 'Pricing', 'Login'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-800 transition">
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </motion.div>
            </nav>
            <motion.button 
              onClick={toggleMenu} 
              className="md:hidden text-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-white bg-opacity-95 backdrop-blur-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {['Features', 'Pricing', 'Login', 'Sign Up'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/${item.toUpperCase().replace(' ', '')}`} 
                    className={`text-2xl ${item === 'Sign Up' ? 'bg-blue-600 text-white px-6 py-3 rounded-md' : 'text-gray-600 hover:text-gray-800'} transition`}
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock Your <span className="text-blue-600">Trading Potential</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TradeTracker is an all-in-one platform that empowers you to monitor, analyze, and optimize your trading performance with AI-powered insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/signup" className="bg-blue-600 text-white text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Screenshot section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            See TradeTracker in Action
          </motion.h2>
          <motion.div
            className="bg-gray-200 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={ Dashboardimage } alt="TradeTracker Dashboard" className="w-full h-auto" />
          </motion.div>
          <motion.p 
            className="text-center mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            TradeTracker's intuitive dashboard provides a comprehensive overview of your trading performance.
          </motion.p>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BookOpenIcon className="h-12 w-12 text-blue-600" />, title: "Journal Your Trades", description: "Maintain a detailed log of your trades, including entry and exit points, rationale, and market conditions." },
              { icon: <ArrowUpTrayIcon className="h-12 w-12 text-blue-600" />, title: "Import Trades from MT5", description: "Easily import your trades directly from MetaTrader 5 for seamless tracking and analysis." },
              { icon: <UsersIcon className="h-12 w-12 text-blue-600" />, title: "Multiple Account Support", description: "Manage and track trades across multiple accounts, brokers, and asset classes with ease." },
              { icon: <RocketLaunchIcon className="h-12 w-12 text-blue-600" />, title: "Boost Your Performance", description: "Identify patterns, optimize strategies, and improve your trading results with powerful analytics." },
              { icon: <CurrencyDollarIcon className="h-12 w-12 text-blue-600" />, title: "Gain Valuable Insights", description: "Track key metrics, visualize your progress, and make data-driven decisions for better trading outcomes." },
              { icon: <ShieldCheckIcon className="h-12 w-12 text-blue-600" />, title: "Manage Risk Effectively", description: "Monitor risk metrics, set stop-loss limits, and trade with confidence using advanced risk management tools." },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<CpuChipIcon className="h-12 w-12 text-blue-600" />}
              title="AI-Powered Trading Assistant"
              description="Get personalized trading insights, recommendations, and alerts powered by advanced AI algorithms."
            />
            <FeatureCard
              icon={<ChartBarSquareIcon className="h-12 w-12 text-blue-600" />}
              title="Advanced Trade Tracking"
              description="Keep a detailed record of all your trades, monitor their performance, and identify areas for improvement."
            />
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.blockquote 
            className="text-2xl italic mb-8 text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "TradeTracker has been a game-changer for my trading journey. The insights and analytics have helped me improve my strategy and boost my profits."
          </motion.blockquote>
          <motion.p 
            className="text-xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            John Doe, Professional Trader
          </motion.p>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Elevate Your Trading?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/signup" className="bg-blue-600 text-white text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-gray-900">TradeTracker</span>
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '')}`} className="text-gray-600 hover:text-gray-800 transition">
                  {item}
                </Link>
              ))}
            </nav>
            <div>
              <p className="text-gray-600">&copy; 2023 TradeTracker. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div 
    className="bg-white rounded-lg p-6 hover:shadow-lg transition"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)"}}  
  >
    <div className="flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default LandingPage;
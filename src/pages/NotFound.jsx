import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const HomeIcon = getIcon('Home');
const ArrowLeftIcon = getIcon('ArrowLeft');

const NotFound = () => {
  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-[70vh] flex items-center justify-center">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <svg className="w-24 h-24 mx-auto text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </motion.div>
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold mb-4 text-surface-900 dark:text-surface-50"
          >
            404 - Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-surface-600 dark:text-surface-400 mb-8"
          >
            The property you're looking for doesn't exist or has been moved to a new address.
          </motion.p>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/" 
              className="btn-primary px-6 py-3 inline-flex items-center justify-center"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="btn-outline px-6 py-3 inline-flex items-center justify-center"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
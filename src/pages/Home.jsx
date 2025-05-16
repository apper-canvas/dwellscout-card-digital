import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; 
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

// Get the icon components
const HomeIcon = getIcon('Home');
const BuildingIcon = getIcon('Building');
const MapPinIcon = getIcon('MapPin');
const DollarSignIcon = getIcon('DollarSign');
const BedDoubleIcon = getIcon('BedDouble');
const ShowerHeadIcon = getIcon('ShowerHead');
const SquareIcon = getIcon('Square');
const HeartIcon = getIcon('Heart');
const ArrowRightIcon = getIcon('ArrowRight');

// Format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

// Sample property data
const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    type: "apartment",
    price: 450000,
    address: "123 Urban St, Downtown, NYC",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 2,
    title: "Suburban Family Home",
    type: "house",
    price: 750000,
    address: "456 Family Ave, Suburbia, CA",
    bedrooms: 4,
    bathrooms: 3,
    size: 2600,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 3,
    title: "Waterfront Luxury Villa",
    type: "house",
    price: 1250000,
    address: "789 Coastal Rd, Beachtown, FL",
    bedrooms: 5,
    bathrooms: 4.5,
    size: 3800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 4,
    title: "Urban Loft Space",
    type: "apartment",
    price: 525000,
    address: "321 Artist Alley, SoHo, NYC",
    bedrooms: 1,
    bathrooms: 1.5,
    size: 1050,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }
];

function Home() {
  const [savedProperties, setSavedProperties] = useState([]);
  
  useEffect(() => {
    // Load saved properties from localStorage
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setSavedProperties(saved);
  }, []);

  // Memoize the toggleSaveProperty function to prevent recreating it on each render
  const toggleSaveProperty = useCallback((propertyId) => {
    setSavedProperties((prev) => {
      // Create a new array based on previous state
      let newSaved;
      if (prev.includes(propertyId)) {
        newSaved = prev.filter(id => id !== propertyId);
        toast.info("Property removed from saved listings");
      } else {
        newSaved = [...prev, propertyId];
        toast.success("Property saved to your list");
      }
      
      // Save to localStorage
      localStorage.setItem('savedProperties', JSON.stringify(newSaved));
      return newSaved;
    });
  }, []);
  

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white mb-6"
            >
              Find Your Perfect Place to Call Home
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl"
            >
              Discover thousands of properties for sale and rent across the country with our intuitive search tools and expert guidance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#property-search" className="btn-accent px-6 py-3 text-base">
                Start Your Search
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Property Categories */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Explore Property Types</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard 
              title="Apartments" 
              count={534} 
              icon={<BuildingIcon className="w-6 h-6" />}
              imageUrl="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            />
            <CategoryCard 
              title="Houses" 
              count={1245} 
              icon={<HomeIcon className="w-6 h-6" />}
              imageUrl="https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            />
            <CategoryCard 
              title="Commercial" 
              count={328} 
              icon={<BuildingIcon className="w-6 h-6" />}
              imageUrl="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            />
            <CategoryCard 
              title="Land" 
              count={189} 
              icon={<MapPinIcon className="w-6 h-6" />}
              imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            />
          </div>
        </div>
      </section>
      
      {/* Property Search Feature */}
      <section id="property-search" className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">Find Your Dream Property</h2>
          <p className="text-center text-surface-600 dark:text-surface-400 mb-12 max-w-2xl mx-auto">
            Use our advanced search tools to find properties that match your exact criteria
          </p>
          
          <MainFeature />
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2>Featured Properties</h2>
            <a href="#" className="text-primary dark:text-secondary-light inline-flex items-center font-medium hover:underline">
              View all properties <ArrowRightIcon className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard 
                key={property.id}
                property={property}
                isSaved={savedProperties.includes(property.id)}
                onToggleSave={() => toggleSaveProperty(property.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Whether you're looking to buy, sell, or rent, our platform connects you with the best properties and real estate professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent px-6 py-3">
              List Your Property
            </button>
            <button className="btn-outline border-white text-white hover:bg-white/10 px-6 py-3">
              Contact an Agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Category Card Component
function CategoryCard({ title, count, icon, imageUrl }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">{title}</h3>
          <div className="bg-accent/90 text-white text-xs rounded-full px-3 py-1">
            {count} listings
          </div>
        </div>
        <div className="flex items-center mt-3">
          {icon}
          <span className="text-white/90 ml-2 text-sm">View properties</span>
        </div>
      </div>
    </motion.div>
  );
}

// Property Card Component
function PropertyCard({ property, isSaved, onToggleSave }) {
  const { title, type, price, address, bedrooms, bathrooms, size, image } = property;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card group"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleSave();
            }}
            className={`p-2 rounded-full ${isSaved ? 'bg-accent text-white' : 'bg-white/90 text-surface-600'} transition-colors`}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
          >
            <HeartIcon className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-primary-dark/90 text-white text-xs rounded-full px-3 py-1 capitalize">
          {type}
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="text-accent font-bold">{formatPrice(price)}</div>
        </div>
        
        <div className="flex items-center text-surface-500 dark:text-surface-400 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{address}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center">
            <BedDoubleIcon className="w-4 h-4 text-primary dark:text-secondary-light mr-1" />
            <span className="text-sm">{bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <ShowerHeadIcon className="w-4 h-4 text-primary dark:text-secondary-light mr-1" />
            <span className="text-sm">{bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <SquareIcon className="w-4 h-4 text-primary dark:text-secondary-light mr-1" />
            <span className="text-sm">{size} ft²</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Get icon components
const SearchIcon = getIcon('Search');
const HomeIcon = getIcon('Home');
const BuildingIcon = getIcon('Building');
const DollarSignIcon = getIcon('DollarSign');
const BedDoubleIcon = getIcon('BedDouble');
const ShowerHeadIcon = getIcon('ShowerHead');
const SquareIcon = getIcon('Square');
const XIcon = getIcon('X');
const FilterIcon = getIcon('Filter');
const MapPinIcon = getIcon('MapPin');
const CheckIcon = getIcon('Check');
const InfoIcon = getIcon('Info');
const ChevronDownIcon = getIcon('ChevronDown');

// Sample property data
const allProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    type: "apartment",
    status: "for-sale",
    price: 450000,
    address: "123 Urban St, Downtown, NYC",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Balcony", "Gym", "Parking", "Elevator"]
  },
  {
    id: 2,
    title: "Suburban Family Home",
    type: "house",
    status: "for-sale",
    price: 750000,
    address: "456 Family Ave, Suburbia, CA",
    bedrooms: 4,
    bathrooms: 3,
    size: 2600,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Garden", "Garage", "Swimming Pool", "Fireplace"]
  },
  {
    id: 3,
    title: "Waterfront Luxury Villa",
    type: "house",
    status: "for-sale",
    price: 1250000,
    address: "789 Coastal Rd, Beachtown, FL",
    bedrooms: 5,
    bathrooms: 4.5,
    size: 3800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Waterfront", "Private Beach", "Guest House", "Infinity Pool"]
  },
  {
    id: 4,
    title: "Urban Loft Space",
    type: "apartment",
    status: "for-rent",
    price: 3200,
    address: "321 Artist Alley, SoHo, NYC",
    bedrooms: 1,
    bathrooms: 1.5,
    size: 1050,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["High Ceilings", "Exposed Brick", "Roof Access", "Pet Friendly"]
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    type: "house",
    status: "for-sale",
    price: 395000,
    address: "42 Pine Trail, Mountains, CO",
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Fireplace", "Deck", "Mountain View", "Hiking Trails"]
  },
  {
    id: 6,
    title: "Luxury Downtown Condo",
    type: "apartment",
    status: "for-rent",
    price: 4500,
    address: "555 Luxury Lane, Financial District, SF",
    bedrooms: 2,
    bathrooms: 2,
    size: 1350,
    image: "https://images.unsplash.com/photo-1493809842364-78817add643c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Concierge", "Rooftop Terrace", "Fitness Center", "Indoor Parking"]
  }
];

// Sample locations for search
const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Miami, FL",
  "Seattle, WA",
  "Denver, CO",
  "Austin, TX",
  "Boston, MA"
];

const MainFeature = () => {
  // Search form state
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });
  
  // UI state
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [properties, setProperties] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
    
    // Handle location suggestions
    if (name === 'location' && value.length > 1) {
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else if (name === 'location') {
      setShowLocationSuggestions(false);
    }
  };
  
  // Select a location from suggestions
  const selectLocation = (location) => {
    setSearchParams(prev => ({ ...prev, location }));
    setShowLocationSuggestions(false);
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsFiltering(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter properties based on search params
      let filtered = [...allProperties];
      
      if (searchParams.location) {
        filtered = filtered.filter(property => 
          property.address.toLowerCase().includes(searchParams.location.toLowerCase())
        );
      }
      
      if (searchParams.propertyType) {
        filtered = filtered.filter(property => 
          property.type === searchParams.propertyType
        );
      }
      
      if (searchParams.status) {
        filtered = filtered.filter(property => 
          property.status === searchParams.status
        );
      }
      
      if (searchParams.minPrice) {
        filtered = filtered.filter(property => 
          property.price >= Number(searchParams.minPrice)
        );
      }
      
      if (searchParams.maxPrice) {
        filtered = filtered.filter(property => 
          property.price <= Number(searchParams.maxPrice)
        );
      }
      
      if (searchParams.bedrooms) {
        filtered = filtered.filter(property => 
          property.bedrooms >= Number(searchParams.bedrooms)
        );
      }
      
      if (searchParams.bathrooms) {
        filtered = filtered.filter(property => 
          property.bathrooms >= Number(searchParams.bathrooms)
        );
      }
      
      setProperties(filtered);
      setIsFiltering(false);
      
      if (filtered.length === 0) {
        toast.info("No properties match your search criteria. Try adjusting your filters.");
      } else {
        toast.success(`Found ${filtered.length} properties matching your criteria!`);
      }
    }, 800);
  };
  
  // Reset search form
  const resetSearch = () => {
    setSearchParams({
      location: '',
      propertyType: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setProperties([]);
  };
  
  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className="neu-card bg-white dark:bg-surface-800">
      {/* Search Form */}
      <div className="mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Location Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleChange}
                  onFocus={() => searchParams.location && setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  placeholder="City, neighborhood, or address"
                  className="w-full pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-surface-400" />
                </div>
                
                {/* Location Suggestions */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-700 shadow-lg rounded-lg border border-surface-200 dark:border-surface-600">
                    <ul className="py-1 max-h-60 overflow-auto">
                      {locationSuggestions.map((location, index) => (
                        <li 
                          key={index}
                          onClick={() => selectLocation(location)}
                          className="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 cursor-pointer text-sm"
                        >
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Property Type
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  value={searchParams.propertyType}
                  onChange={handleChange}
                  className="w-full pl-10 appearance-none"
                >
                  <option value="">All Property Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HomeIcon className="w-5 h-5 text-surface-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5 text-surface-400" />
                </div>
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={searchParams.status}
                  onChange={handleChange}
                  className="w-full pl-10 appearance-none"
                >
                  <option value="">Buy or Rent</option>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSignIcon className="w-5 h-5 text-surface-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5 text-surface-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced Search Options */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-surface-200 dark:border-surface-700 mt-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      name="minPrice"
                      value={searchParams.minPrice}
                      onChange={handleChange}
                      placeholder="Minimum Price"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      name="maxPrice"
                      value={searchParams.maxPrice}
                      onChange={handleChange}
                      placeholder="Maximum Price"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Bedrooms & Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <select
                        name="bedrooms"
                        value={searchParams.bedrooms}
                        onChange={handleChange}
                        className="w-full pl-10 appearance-none"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BedDoubleIcon className="w-5 h-5 text-surface-400" />
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="w-5 h-5 text-surface-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Bathrooms
                    </label>
                    <div className="relative">
                      <select
                        name="bathrooms"
                        value={searchParams.bathrooms}
                        onChange={handleChange}
                        className="w-full pl-10 appearance-none"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="1.5">1.5+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ShowerHeadIcon className="w-5 h-5 text-surface-400" />
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="w-5 h-5 text-surface-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="btn-outline px-4 py-2.5 text-sm flex items-center justify-center order-2 sm:order-1"
            >
              <FilterIcon className="w-4 h-4 mr-2" />
              {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Filters
            </button>
            
            <div className="flex gap-3 order-1 sm:order-2">
              <button
                type="button"
                onClick={resetSearch}
                className="btn-outline px-4 py-2.5 text-sm"
              >
                <XIcon className="w-4 h-4 mr-2" />
                Reset
              </button>
              
              <button
                type="submit"
                disabled={isFiltering}
                className="btn-accent px-6 py-2.5 text-sm min-w-[120px]"
              >
                {isFiltering ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <SearchIcon className="w-4 h-4 mr-2" />
                    Search
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Search Results */}
      {properties.length > 0 && (
        <div className="mt-10 border-t border-surface-200 dark:border-surface-700 pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
              {properties.length} Properties Found
            </h3>
            <div className="text-sm text-surface-500 dark:text-surface-400">
              Sorted by Relevance
            </div>
          </div>
          
          <div className="space-y-6">
            {properties.map(property => (
              <PropertySearchItem 
                key={property.id} 
                property={property} 
                formatPrice={formatPrice} 
              />
            ))}
          </div>
        </div>
      )}
      
      {/* No Results State */}
      {properties.length === 0 && searchParams.location && !isFiltering && (
        <div className="text-center py-10 border-t border-surface-200 dark:border-surface-700">
          <InfoIcon className="w-12 h-12 mx-auto text-surface-400" />
          <h3 className="mt-4 text-xl font-semibold">No properties found</h3>
          <p className="mt-2 text-surface-600 dark:text-surface-400 max-w-md mx-auto">
            We couldn't find any properties matching your search criteria. Try adjusting your filters or search in a different location.
          </p>
        </div>
      )}
    </div>
  );
};

// Search Result Item Component
const PropertySearchItem = ({ property, formatPrice }) => {
  const { title, type, status, price, address, bedrooms, bathrooms, size, image, amenities } = property;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row bg-surface-50 dark:bg-surface-900 rounded-xl overflow-hidden shadow-sm border border-surface-200 dark:border-surface-700 hover:shadow-md transition-shadow"
    >
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary-dark/90 text-white text-xs rounded-full px-3 py-1 capitalize">
          {status === 'for-sale' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      
      <div className="flex-1 p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="text-accent font-bold text-lg">{formatPrice(price)}</div>
        </div>
        
        <div className="flex items-center text-surface-500 dark:text-surface-400 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <HomeIcon className="w-4 h-4 text-primary dark:text-secondary-light mr-1" />
            <span className="text-sm capitalize">{type}</span>
          </div>
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
        
        <div className="border-t border-surface-200 dark:border-surface-700 pt-3 mt-2">
          <h4 className="text-sm font-medium mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs py-1 px-2 rounded-full flex items-center">
                <CheckIcon className="w-3 h-3 mr-1" />
                {amenity}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button className="btn-primary text-sm px-4 py-2">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MainFeature;
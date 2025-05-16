function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M9 22V12h6v10" />
          </svg>
          <span className="text-xl font-bold text-primary-dark dark:text-secondary-light tracking-tight">
            DwellScout
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-white text-sm font-medium">Properties</a>
          <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-white text-sm font-medium">Sell</a>
          <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-white text-sm font-medium">Agents</a>
          <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-white text-sm font-medium">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button className="hidden md:block px-4 py-2 text-sm bg-accent hover:bg-opacity-90 text-white font-medium rounded-lg shadow-sm transition-all">
            List Property
          </button>
          <button className="md:hidden text-surface-600 dark:text-surface-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
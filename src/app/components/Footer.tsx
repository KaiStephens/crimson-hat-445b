'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
      <div className="container-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Quantum. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
              Instagram
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
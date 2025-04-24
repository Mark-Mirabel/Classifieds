import { BellIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <BellIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/32"
              alt="User avatar"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
} 
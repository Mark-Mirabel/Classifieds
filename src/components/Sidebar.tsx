import { Link } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold text-primary-600">SAAS Dashboard</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useProfile } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaRupeeSign, 
  FaChartLine, 
  FaBell, 
  FaCog, 
  FaSignOutAlt,
  FaPlus,
  FaShoppingBag,
  FaUserPlus,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle
} from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const { data: products = [] } = useProducts();
  const { data: user } = useProfile();
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = 25; // This would come from an API in a real app
  const totalUsers = 120; // This would come from an API in a real app
  const totalRevenue = 12500; // This would come from an API in a real app
  
  // State for interactive elements
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", type: "order", time: "2 min ago" },
    { id: 2, message: "Low stock alert: Organic Tomatoes", type: "stock", time: "1 hour ago" },
    { id: 3, message: "New user registered", type: "user", time: "3 hours ago" }
  ]);
  
  const [recentOrders, setRecentOrders] = useState([
    { id: "#12345", customer: "John Doe", amount: 2450, status: "completed" },
    { id: "#12346", customer: "Jane Smith", amount: 1890, status: "processing" },
    { id: "#12347", customer: "Robert Johnson", amount: 3200, status: "pending" },
    { id: "#12348", customer: "Emily Davis", amount: 1560, status: "shipped" }
  ]);
  
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Stats cards with animation
  const statCards = [
    { 
      title: "Total Products", 
      value: totalProducts, 
      icon: <FaBox />, 
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      change: "+12% from last month"
    },
    { 
      title: "Total Orders", 
      value: totalOrders, 
      icon: <FaShoppingCart />, 
      color: "bg-gradient-to-r from-green-500 to-green-700",
      change: "+8% from last month"
    },
    { 
      title: "Total Users", 
      value: totalUsers, 
      icon: <FaUsers />, 
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      change: "+15% from last month"
    },
    { 
      title: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString()}`, 
      icon: <FaRupeeSign />, 
      color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      change: "+22% from last month"
    }
  ];
  
  // Quick actions with icons
  const quickActions = [
    { title: "Add Product", icon: <FaPlus />, link: "/admin/products", color: "bg-blue-500 hover:bg-blue-600" },
    { title: "View Orders", icon: <FaShoppingBag />, link: "/admin/orders", color: "bg-green-500 hover:bg-green-600" },
    { title: "Manage Users", icon: <FaUserPlus />, link: "/admin/users", color: "bg-purple-500 hover:bg-purple-600" },
    { title: "Settings", icon: <FaCog />, link: "/admin/settings", color: "bg-gray-500 hover:bg-gray-600" }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {time.toLocaleTimeString()}
              </div>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <FaBell className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-700">Welcome, {user?.name || 'Admin'}!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-lg shadow overflow-hidden ${stat.color}`}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-white text-2xl">
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-white truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-white">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-2 text-sm text-white opacity-80">
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                  <span className="font-medium">{totalOrders}</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Notifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 ${
                        notification.type === 'order' ? 'text-green-500' :
                        notification.type === 'stock' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`}>
                        {notification.type === 'order' ? <FaShoppingCart /> :
                         notification.type === 'stock' ? <FaExclamationTriangle /> :
                         <FaUserPlus />}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-4 py-3 text-center">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link 
                    key={index}
                    to={action.link}
                    className={`${action.color} rounded-lg shadow p-6 text-white text-center transition duration-300 transform hover:scale-105`}
                  >
                    <div className="flex justify-center text-2xl mb-2">
                      {action.icon}
                    </div>
                    <div className="font-medium">
                      {action.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
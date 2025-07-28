import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { adminStats } from '../../data/adminData';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${adminStats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: adminStats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
      change: '+8.2%',
    },
    {
      title: 'Total Customers',
      value: adminStats.totalCustomers.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+15.3%',
    },
    {
      title: 'Total Products',
      value: adminStats.totalProducts.toString(),
      icon: Package,
      color: 'bg-orange-500',
      change: '+5.1%',
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: `${adminStats.lowStockProducts} products are running low on stock`,
      action: 'View Products',
    },
    {
      type: 'info',
      message: `${adminStats.pendingOrders} orders are pending processing`,
      action: 'View Orders',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Quick Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-gray-900">{alert.message}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ORD-2024-002</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ORD-2024-001</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>
              </div>
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
              View All Orders
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Products</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimalist Watch</span>
                <span className="text-sm text-red-600">5 left</span>
              </div>
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
              Manage Inventory
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jane Smith</span>
                <span className="text-sm text-gray-500">1 order</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">John Doe</span>
                <span className="text-sm text-gray-500">3 orders</span>
              </div>
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
              View All Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
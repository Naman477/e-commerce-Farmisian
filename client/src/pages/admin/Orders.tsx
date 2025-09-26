import React, { useState } from 'react';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useAdmin';

const AdminOrders: React.FC = () => {
  const { data: orders = [], isLoading } = useOrders();
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  
  const [statusFilter, setStatusFilter] = useState('all');
  
  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus({ id: orderId, status });
  };
  
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter((order: any) => order.status === statusFilter);
  
  if (isLoading) {
    return (
      <div className="admin-orders">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-header">
                <h1>Manage Orders</h1>
              </div>
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="admin-orders">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-header">
              <h1>Manage Orders</h1>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <label className="form-label">Status Filter</label>
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order: any) => (
                        <tr key={order.id}>
                          <td>#{order.id.substring(0, 8)}</td>
                          <td>{order.customerName}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>₹{order.total.toFixed(2)}</td>
                          <td>
                            <span className={`badge bg-${order.status === 'pending' ? 'warning' : order.status === 'processing' ? 'info' : order.status === 'shipped' ? 'primary' : order.status === 'delivered' ? 'success' : 'danger'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
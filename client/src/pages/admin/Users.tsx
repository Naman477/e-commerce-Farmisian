import React, { useState } from 'react';
import { useUsers, useUpdateUserRole } from '../../hooks/useAdmin';

const AdminUsers: React.FC = () => {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: updateUserRole } = useUpdateUserRole();
  
  const [roleFilter, setRoleFilter] = useState('all');
  
  const handleRoleChange = (userId: string, role: string) => {
    updateUserRole({ id: userId, role });
  };
  
  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter((user: any) => user.role === roleFilter);
  
  if (isLoading) {
    return (
      <div className="admin-users">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-header">
                <h1>Manage Users</h1>
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
    <div className="admin-users">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-header">
              <h1>Manage Users</h1>
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
                    <label className="form-label">Role Filter</label>
                    <select
                      className="form-select"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="all">All Users</option>
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: any) => (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <i className="fas fa-user-circle fa-2x"></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{user.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge bg-${user.role === 'admin' ? 'primary' : 'secondary'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                              <option value="customer">Customer</option>
                              <option value="admin">Admin</option>
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

export default AdminUsers;
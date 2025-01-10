import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { UsersTable } from '../components/admin/UsersTable';
import { EditUserModal } from '../components/admin/EditUserModal';
import { DeleteUserModal } from '../components/admin/DeleteUserModal';

export function AdminUsers() {
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <UsersTable 
            onEdit={setEditUser}
            onDelete={setDeleteUser}
          />
          {editUser && (
            <EditUserModal
              user={editUser}
              onClose={() => setEditUser(null)}
            />
          )}
          {deleteUser && (
            <DeleteUserModal
              user={deleteUser}
              onClose={() => setDeleteUser(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
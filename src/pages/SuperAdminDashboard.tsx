import React from 'react';
import { AdminStats } from '../components/admin/AdminStats';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { RevenueChart } from '../components/admin/RevenueChart';
import { LatestUsers } from '../components/admin/LatestUsers';
import { PendingDrivers } from '../components/admin/PendingDrivers';

export function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <AdminStats />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RevenueChart />
            <div className="space-y-6">
              <LatestUsers />
              <PendingDrivers />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
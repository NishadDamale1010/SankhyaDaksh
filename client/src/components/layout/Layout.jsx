import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useApp } from '../../context/AppContext';

export default function Layout() {
  const { currentRole } = useApp();

  // If no role is selected, we might be on a landing page which shouldn't have sidebar/topbar
  if (!currentRole) {
    return <Outlet />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

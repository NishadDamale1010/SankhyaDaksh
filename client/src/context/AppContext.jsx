import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { officerProfile, trainerProfile, adminProfile, competencies as competencyData } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('sankhya_role') || null;
  });
  
  useEffect(() => {
    if (currentRole) {
      localStorage.setItem('sankhya_role', currentRole);
    } else {
      localStorage.removeItem('sankhya_role');
    }
  }, [currentRole]);

  const user = useMemo(() => {
    switch(currentRole) {
      case 'officer': return officerProfile;
      case 'trainer': return trainerProfile;
      case 'admin': return adminProfile;
      default: return null;
    }
  }, [currentRole]);

  return (
    <AppContext.Provider value={{ currentRole, setCurrentRole, user, competencies: competencyData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

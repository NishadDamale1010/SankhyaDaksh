import React from 'react';
import { officerProfile } from '../data/mockData';
import { User, Mail, Building, Briefcase, Award, ShieldCheck, MapPin } from 'lucide-react';

export default function MyProfile() {
  return (
    <div className="page-wrapper">
      <div>
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Government officer credentials and competency record</p>
      </div>

      <div className="grid-3-1 gap-6 mt-6">
        <div className="card">
          <div className="flex-align-gap border-b pb-4">
            <div className="avatar-large">AV</div>
            <div>
              <h2 className="text-xl font-bold">{officerProfile.name}</h2>
              <p className="text-sm text-secondary">{officerProfile.designation}</p>
              <span className="badge badge-demo mt-1">{officerProfile.cadre}</span>
            </div>
          </div>

          <div className="profile-details-grid grid-2 gap-4 mt-4 text-sm">
            <div>
              <span className="text-muted block text-xs">Department</span>
              <strong>{officerProfile.department}</strong>
            </div>
            <div>
              <span className="text-muted block text-xs">Division</span>
              <strong>{officerProfile.division}</strong>
            </div>
            <div>
              <span className="text-muted block text-xs">Employee ID</span>
              <strong>{officerProfile.employeeId}</strong>
            </div>
            <div>
              <span className="text-muted block text-xs">Years of Service</span>
              <strong>{officerProfile.serviceYears} Years</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Verified Badges</h3>
          <div className="flex-col gap-3 mt-4 text-sm">
            <div className="flex-align-gap p-2 rounded bg-light">
              <ShieldCheck size={18} color="#059669" />
              <div>
                <strong>Jan-Parichay SSO Verified</strong>
                <span className="block text-xs text-muted">OAuth2 / OIDC Federated User</span>
              </div>
            </div>
            <div className="flex-align-gap p-2 rounded bg-light">
              <Award size={18} color="#2563eb" />
              <div>
                <strong>CBC FRAC Profile Synced</strong>
                <span className="block text-xs text-muted">Role & Competency Baseline Linked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

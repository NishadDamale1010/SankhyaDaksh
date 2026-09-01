import React from 'react';
import { Download, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import { certificates } from '../data/mockData';

export default function Certificates() {
  return (
    <div className="page-wrapper">
      {/* Title */}
      <div>
        <h1 className="page-title">My Certificates</h1>
        <p className="page-subtitle">View and download your certificates</p>
      </div>

      {/* Grid of Certificate Cards */}
      <div className="grid-3 gap-6 mt-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="card certificate-card">
            {/* Visual Certificate Graphics Box */}
            <div className="certificate-graphic-box">
              <div className="cert-border-inner">
                <div className="cert-header-icon">
                  <ShieldCheck size={28} color="#d97706" />
                </div>
                <span className="cert-sub-heading">Certificate of Completion</span>
                <h4 className="cert-course-name">{cert.title}</h4>
                <span className="cert-issued-date">Issued on {cert.issuedDate}</span>
              </div>
            </div>

            <div className="cert-card-body mt-3 text-center">
              <span className="text-xs text-muted block mb-3">Credential ID: {cert.certificateNo}</span>
              <button className="btn btn-primary btn-sm w-full">
                <Download size={14} className="mr-1" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="btn btn-secondary">View All Certificates</button>
      </div>
    </div>
  );
}

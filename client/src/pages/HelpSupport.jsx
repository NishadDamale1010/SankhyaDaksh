import React from 'react';
import { HelpCircle, Mail, Phone, ExternalLink } from 'lucide-react';

export default function HelpSupport() {
  return (
    <div className="page-wrapper">
      <div>
        <h1 className="page-title">Help & Support</h1>
        <p className="page-subtitle">Get assistance with the Sankhya-Daksh platform</p>
      </div>

      <div className="grid-2 gap-6 mt-6">
        <div className="card">
          <h3 className="section-title">Frequently Asked Questions</h3>
          <div className="flex-col gap-4 mt-4 text-sm">
            <div className="faq-item">
              <strong className="block mb-1">How is my competency score calculated?</strong>
              <p className="text-secondary">Your score is computed using Deep Item Response Theory (Deep-IRT), which considers both your assessment responses and the inherent difficulty of the questions you answered.</p>
            </div>
            <div className="faq-item">
              <strong className="block mb-1">What happens if I miss a target competency?</strong>
              <p className="text-secondary">The system will automatically suggest personalized learning modules (both digital iGOT courses and physical NSSTA training) to bridge the specific gap.</p>
            </div>
            <div className="faq-item">
              <strong className="block mb-1">How do I verify my certificates?</strong>
              <p className="text-secondary">All certificates are cryptographically verifiable through Sunbird RC and linked to your Jan-Parichay digital locker.</p>
            </div>
          </div>
        </div>

        <div className="card flex-col gap-4">
          <h3 className="section-title">Contact Support</h3>
          <p className="text-sm text-secondary">If you are facing technical issues, our dedicated IT support desk is available to assist you.</p>
          
          <div className="contact-box flex-align-gap p-3 rounded border">
            <Mail size={18} color="#4f46e5" />
            <div>
              <strong className="block text-sm">Email Support</strong>
              <span className="text-xs text-muted">support@sankhya-daksh.gov.in</span>
            </div>
          </div>

          <div className="contact-box flex-align-gap p-3 rounded border">
            <Phone size={18} color="#059669" />
            <div>
              <strong className="block text-sm">Helpline (9 AM - 6 PM)</strong>
              <span className="text-xs text-muted">1800-11-2026</span>
            </div>
          </div>

          <button className="btn btn-primary mt-2">
            <ExternalLink size={16} className="mr-2" /> Open Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

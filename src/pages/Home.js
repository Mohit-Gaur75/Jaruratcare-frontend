import React, { useState } from 'react';
import PatientRegistration from '../components/PatientRegistration';
import VolunteerRegistration from '../components/VolunteerRegistration';
import ContactForm from '../components/ContactForm';
import Chatbot from '../components/Chatbot';
import '../styles/home.css';

function Home() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-brand">
          <h1>Jarurat Care</h1>
          <p>Healthcare Support Web Application</p>
        </div>
        <nav className="navbar-nav">
          <button
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => setActiveSection('home')}
          >
            Home
          </button>
          <button
            className={activeSection === 'patient' ? 'active' : ''}
            onClick={() => setActiveSection('patient')}
          >
            Patient Registration
          </button>
          <button
            className={activeSection === 'volunteer' ? 'active' : ''}
            onClick={() => setActiveSection('volunteer')}
          >
            Volunteer Registration
          </button>
          <button
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={() => setActiveSection('contact')}
          >
            Contact Us
          </button>
          <button
            className={activeSection === 'chatbot' ? 'active' : ''}
            onClick={() => setActiveSection('chatbot')}
          >
            FAQ Bot
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeSection === 'home' && (
          <div className="home-section">
            <div className="hero">
              <h2>Welcome to Jarurat Care</h2>
              <p>
                A comprehensive healthcare support platform connecting patients with healthcare
                professionals and volunteers.
              </p>
            </div>

            <div className="features">
              <div className="feature-card">
                <h3>Patient Support</h3>
                <p>Register as a patient and get access to healthcare resources and support.</p>
              </div>
              <div className="feature-card">
                <h3>Volunteer Network</h3>
                <p>Join our volunteer network and make a difference in someone's healthcare journey.</p>
              </div>
              <div className="feature-card">
                <h3> Chatbot</h3>
                <p>Get instant answers to your FAQs through our intelligent chatbot assistant.</p>
              </div>
              <div className="feature-card">
                <h3>24/7 Support</h3>
                <p>Contact our support team anytime for assistance and guidance.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'patient' && <PatientRegistration />}
        {activeSection === 'volunteer' && <VolunteerRegistration />}
        {activeSection === 'contact' && <ContactForm />}
        {activeSection === 'chatbot' && <Chatbot />}
      </main>

      <footer className="footer">
        <p>&copy;   Jarurat Care. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

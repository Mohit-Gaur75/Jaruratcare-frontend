import React, { useState } from 'react';
import { submitContact } from '../services/api';
import '../styles/forms.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(name);
  };

  const validateSubject = (subject) => {
    return subject.trim().length >= 3;
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters and contain only letters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    } else if (!validateSubject(formData.subject)) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setResponseMessage('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    try {
      await submitContact(formData);
      setResponseMessage('Message sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'Error sending message');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      {responseMessage && <div className={`message ${errors.name || errors.email || errors.subject || errors.message ? 'error' : 'success'}`}>{responseMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject * (min 3 characters)</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className={errors.subject ? 'error-input' : ''}
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message * (min 10 characters)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            className={errors.message ? 'error-input' : ''}
          ></textarea>
          {errors.message && <span className="error-text">{errors.message}</span>}
          <small className="help-text">Message length: {formData.message.length} characters</small>
        </div>

        <button type="submit" disabled={loading || Object.keys(errors).length > 0}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

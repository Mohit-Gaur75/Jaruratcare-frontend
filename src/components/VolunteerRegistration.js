import React, { useState } from 'react';
import { registerVolunteer } from '../services/api';
import '../styles/forms.css';

function VolunteerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    availability: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
  };

  const validateName = (name) => {
    return name.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(name);
  };

  const validateSkills = (skills) => {
    if (skills === '') return true; // Optional
    return skills.split(',').every(skill => skill.trim().length >= 2);
  };

  const validateExperience = (exp) => {
    if (exp === '') return true; // Optional
    return exp.trim().length >= 5;
  };

  const validateAddress = (address) => {
    return address.trim().length >= 5;
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

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (formData.skills && !validateSkills(formData.skills)) {
      newErrors.skills = 'Each skill must be at least 2 characters (comma-separated)';
    }

    if (formData.experience && !validateExperience(formData.experience)) {
      newErrors.experience = 'Experience description must be at least 5 characters';
    }

    if (!formData.availability) {
      newErrors.availability = 'Please select your availability';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (!validateAddress(formData.address)) {
      newErrors.address = 'Address must be at least 5 characters';
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
      setMessage('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map((s) => s.trim()) : [],
      };
      await registerVolunteer(dataToSend);
      setMessage('Volunteer registered successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        experience: '',
        availability: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering volunteer');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Volunteer Registration</h2>
      {message && <div className={`message ${errors.name || errors.email || errors.phone ? 'error' : 'success'}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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
          <label htmlFor="phone">Phone Number * (exactly 10 digits)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma-separated, Optional)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., First Aid, Counseling, Medical Support"
            className={errors.skills ? 'error-input' : ''}
          />
          {errors.skills && <span className="error-text">{errors.skills}</span>}
          <small className="help-text">Separate multiple skills with commas</small>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience (Optional, min 5 characters)</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your experience in volunteering"
            rows="3"
            className={errors.experience ? 'error-input' : ''}
          ></textarea>
          {errors.experience && <span className="error-text">{errors.experience}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability *</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className={errors.availability ? 'error-input' : ''}
          >
            <option value="">Select availability</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Weekends">Weekends</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors.availability && <span className="error-text">{errors.availability}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className={errors.address ? 'error-input' : ''}
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>

        <button type="submit" disabled={loading || Object.keys(errors).length > 0}>
          {loading ? 'Registering...' : 'Register as Volunteer'}
        </button>
      </form>
    </div>
  );
}

export default VolunteerRegistration;

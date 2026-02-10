import React, { useState } from 'react';
import { registerPatient } from '../services/api';
import '../styles/forms.css';

function PatientRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    medicalCondition: '',
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

  const validateAge = (age) => {
    const ageNum = parseInt(age);
    return ageNum > 0 && ageNum <= 120;
  };

  const validateAddress = (address) => {
    return address.trim().length >= 5;
  };

  const validateMedicalCondition = (condition) => {
    if (condition === '') return true; // Optional field
    return condition.trim().length >= 3;
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

    if (formData.age) {
      if (!validateAge(formData.age)) {
        newErrors.age = 'Age must be between 1 and 120';
      }
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (!validateAddress(formData.address)) {
      newErrors.address = 'Address must be at least 5 characters';
    }

    if (formData.medicalCondition && !validateMedicalCondition(formData.medicalCondition)) {
      newErrors.medicalCondition = 'Medical condition must be at least 3 characters';
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
      await registerPatient(formData);
      setMessage('Patient registered successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        medicalCondition: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering patient');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Patient Registration</h2>
      {message && <div className={`message ${errors.name || errors.email || errors.phone || errors.age || errors.address ? 'error' : 'success'}`}>{message}</div>}
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
          <label htmlFor="age">Age (1-120)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="1"
            max="120"
            className={errors.age ? 'error-input' : ''}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="medicalCondition">Medical Condition (Optional)</label>
          <textarea
            id="medicalCondition"
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleChange}
            placeholder="Describe your medical condition"
            rows="3"
            className={errors.medicalCondition ? 'error-input' : ''}
          ></textarea>
          {errors.medicalCondition && <span className="error-text">{errors.medicalCondition}</span>}
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
          {loading ? 'Registering...' : 'Register as Patient'}
        </button>
      </form>
    </div>
  );
}

export default PatientRegistration;

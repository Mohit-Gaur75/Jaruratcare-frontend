import axios from 'axios';

const API_URL = `${process.env.URI}/api`;

// Patient APIs
export const registerPatient = (data) => axios.post(`${API_URL}/patients/register`, data);
export const getAllPatients = () => axios.get(`${API_URL}/patients`);
export const getPatientById = (id) => axios.get(`${API_URL}/patients/${id}`);
export const updatePatient = (id, data) => axios.put(`${API_URL}/patients/${id}`, data);
export const deletePatient = (id) => axios.delete(`${API_URL}/patients/${id}`);

// Volunteer APIs
export const registerVolunteer = (data) => axios.post(`${API_URL}/volunteers/register`, data);
export const getAllVolunteers = () => axios.get(`${API_URL}/volunteers`);
export const getVolunteerById = (id) => axios.get(`${API_URL}/volunteers/${id}`);
export const updateVolunteer = (id, data) => axios.put(`${API_URL}/volunteers/${id}`, data);
export const deleteVolunteer = (id) => axios.delete(`${API_URL}/volunteers/${id}`);

// Contact APIs
export const submitContact = (data) => axios.post(`${API_URL}/contact/submit`, data);
export const getAllContacts = () => axios.get(`${API_URL}/contact`);
export const getContactById = (id) => axios.get(`${API_URL}/contact/${id}`);
export const updateContactStatus = (id, data) => axios.put(`${API_URL}/contact/${id}`, data);
export const deleteContact = (id) => axios.delete(`${API_URL}/contact/${id}`);

// Chatbot APIs
export const askChatbot = (message) => axios.post(`${API_URL}/chatbot/ask`, { message });
export const getAllFAQs = () => axios.get(`${API_URL}/chatbot/faqs`);

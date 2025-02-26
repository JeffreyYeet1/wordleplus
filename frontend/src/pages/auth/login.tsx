import React, { useState } from 'react';
import axios from 'axios';
import AxiosAPI from '../../axiosapi';
import './login.css';
import UI from '../components/UI';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

interface ApiError {
  error: string;
}

const LoginPage: React.FC = () => {
  // Create form data and error variables
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dynamically updates the variable values when the user enters information
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Checks if the entered info matches the proper format, adds errors if not proper
  const validateForm = () => {
    const { email, password } = formData;
    const errors: { [key: string]: string } = {};

    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';

    return errors;
  };

  // Handles the submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Populates any validation errors if any and exits the function
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Collects data from the form to put into an encoded format that it compatible with the backend
    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append('email', formData.email);
    formDataEncoded.append('password', formData.password);

    try {
      // Send form data to backend for processing
      const response = await AxiosAPI.post('/api/auth/login', formDataEncoded, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');
      
      // Assuming the token is returned in response.data.token
      const token = response.data.token;
      
      if (token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);
        console.log('Token stored in localStorage');
        // Redirect to profile
        const navigate = useNavigate();
        navigate('/profile');
      } else {
        console.error('Token not found in response');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError;
        console.error('Error:', apiError.error || error.message);
        setErrors({ submit: apiError.error || error.message });
      } else if (error instanceof Error) {
        console.error('Error:', error.message);
        setErrors({ submit: error.message });
      } else {
        console.error('Unknown error:', error);
        setErrors({ submit: 'An unknown error occurred' });
      }
    }
  };

  return (
    <div className="logincontainer">
      <UI />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {errors.submit && <span className="error">{errors.submit}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

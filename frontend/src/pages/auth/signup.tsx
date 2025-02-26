import React, { useState } from 'react';
import axios from 'axios';
import AxiosAPI from '../../axiosapi';
import './signup.css';
import UI from '../components/UI';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface ApiError {
  error: string;
}

const SignUpPage: React.FC = () => {
  // Creates form data and error variables
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dynamically updates the form data as the user enters info
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validates the form arguments, returns any errors if invalid form
  const validateForm = () => {
    const { username, email, password } = formData;
    const errors: { [key: string]: string } = {};

    if (!username) errors.username = 'Username is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // Clear errors if validation passes
    setErrors({});
  
    // Encode the form data as x-www-form-urlencoded
    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append('username', formData.username);
    formDataEncoded.append('email', formData.email);
    formDataEncoded.append('password', formData.password);
  
    try {
      // Send form data to backend for processing
      const response = await AxiosAPI.post('/api/auth/signup', formDataEncoded, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Signup successful:', response.data);
      alert('Signup successful!');

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
    <div className="signupcontainer">
      <UI />
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
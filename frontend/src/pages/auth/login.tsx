import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

interface FormData {
  email: string;
  password: string;
}

interface ApiError {
  error: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    const errors: { [key: string]: string } = {};

    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append('email', formData.email);
    formDataEncoded.append('password', formData.password);

    try {
      const response = await axios.post('/api/auth/login', formDataEncoded, {
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
      } else {
        console.error('Token not found in response');
      }
      // Redirect to profile page after login
      window.location.href = '/profile';
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

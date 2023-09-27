import React, { useState } from 'react';
import './signinform.css'; // Import the CSS file

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can perform your authentication logic here
    // For this example, we'll just log the email and password
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Sign in to your account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <button type="submit" className="form-submit-button">
            Sign In
          </button>
        </div>
      </form>
      <div className="form-links">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
          
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
      {/* Error message can be added here if needed */}
    </div>
  );
}

export default SignInForm;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASED_URL } from '../config/api';

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromSignup = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      setMessage('Please enter OTP');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASED_URL}/auth/verify`, { email: emailFromSignup, verificationCode: otp });
      setMessage('✅ Verified successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage(err.response?.data || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASED_URL}/auth/resend?email=${emailFromSignup}`);
      setMessage('OTP resent successfully!');
    } catch (err) {
      setMessage(err.response?.data || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      <p>Verification code has been sent to your email: <strong>{emailFromSignup}</strong></p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <div>
        <button onClick={handleVerify} disabled={loading} style={{ marginRight: '10px' }}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        <button onClick={handleResend} disabled={loading}>
          {loading ? 'Resending...' : 'Resend OTP'}
        </button>
      </div>
      <p style={{ marginTop: '10px', color: 'blue' }}>{message}</p>
    </div>
  );
};

export default Verify;
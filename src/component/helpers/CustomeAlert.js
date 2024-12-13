import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';

const CustomAlert = ({ message, severity, duration = 5000, onClose = () => {} }) => {

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Trigger the onClose function after the timeout
      }, duration);

      return () => clearTimeout(timer); // Clean up the timer on component unmount or when the alert disappears
    }
  }, [message, duration, onClose]);

  return (
    message && (
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    )
  );
};

export default CustomAlert;

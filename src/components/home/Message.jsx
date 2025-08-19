import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../connect/state/message/actions';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Send
} from '@mui/icons-material';

const Message = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.message);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  // Dark mode styles for TextFields
  const darkModeStyles = `
    .dark .dark\\:text-white .MuiInputLabel-root {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .dark .dark\\:text-white .MuiInputLabel-root.Mui-focused {
      color: #f97316 !important;
    }
    .dark .dark\\:text-white .MuiOutlinedInput-root {
      border-radius: 0.375rem !important;
    }
    .dark .dark\\:text-white .MuiOutlinedInput-root fieldset {
      border-color: #f97316 !important;
    }
    .dark .dark\\:text-white .MuiOutlinedInput-root:hover fieldset {
      border-color: #f97316 !important;
    }
    .dark .dark\\:text-white .MuiOutlinedInput-root.Mui-focused fieldset {
      border-color: #f97316 !important;
    }
    .dark .dark\\:text-white .MuiInputBase-input {
      color: white !important;
    }
    .dark .dark\\:text-white .MuiInputBase-input::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
      opacity: 1 !important;
    }
    .dark .dark\\:text-white .MuiFormHelperText-root {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  `;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await dispatch(sendMessage(formData));
      
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Show success message
      alert('Message sent successfully!');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div  className="px-4 min-h-screen bg-gray-50 dark:bg-black dark:border-[0.5px] dark:border-orange-300 py-24">
      <style>{darkModeStyles}</style>
      <Container data-aos="fade-up" data-aos-duration="3000" data-aos-delay="300" maxWidth="md">
        <Paper elevation={3} sx={{ overflow: 'hidden', bgcolor: 'white' }} className="dark:bg-transparent">
          {/* Header */}
          <div
            className="px-12 py-16 text-center"
            style={{
              background: 'linear-gradient(45deg, #FF9800 30%, #F44336 90%)'
            }}
          >
            <Typography variant="h3" component="h2" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
              Get in Touch
            </Typography>
            <Typography variant="h6" sx={{ color: 'orange.100' }}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </div>

          {/* Form */}
          <div className="px-12 py-16 dark:bg-black dark:text-white dark:border-[0.5px] dark:border-orange-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 dark:text-white">
              <TextField
                fullWidth
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                placeholder="Enter your full name"
                className="dark:text-white"
              />

              <TextField
                fullWidth
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                placeholder="Enter your email address"
                className="dark:text-white"
              />

              <TextField
                fullWidth
                label="Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                error={!!validationErrors.subject}
                helperText={validationErrors.subject}
                placeholder="What is this about?"
                className="dark:text-white"
              />

              <TextField
                fullWidth
                label="Message *"
                name="message"
                multiline
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                error={!!validationErrors.message}
                helperText={validationErrors.message}
                placeholder="Tell us more about your inquiry..."
                className="dark:text-white"
              />

              {/* Error Display */}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  sx={{
                    background: 'linear-gradient(45deg, #FF9800 30%, #F44336 90%)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #F57C00 30%, #D32F2F 90%)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="my-6 bg-gray-100 dark:bg-black dark:border-[0.5px] dark:border-orange-300 px-12 py-16 ">
            <Grid container spacing={3} >
              <Grid item xs={12} md={4} >
                <Card sx={{ textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }} className='dark:text-white'>
                  <CardContent>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 dark:text-black">
                      <LocationOn sx={{  fontSize: 24 }} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Visit Us
                    </Typography>
                    <Typography variant="body2" >
                      Opposite ps<br />
                      Unilorin Campus
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
                  <CardContent>
                    <div className=" w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Phone sx={{ color: 'orange.600', fontSize: 24 }} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }} className='dark:text-white'>
                      Call Us
                    </Typography>
                    <Typography variant="body2" className='dark:text-white'>
                      +1 (555) 123-4567<br />
                      Mon-Sun 8AM-12PM
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
                  <CardContent>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Email sx={{ color: 'orange.600', fontSize: 24 }} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Email Us
                    </Typography>
                    <Typography variant="body2" className='dark:text-white'>
                      info@nutri-c.com<br />
                      support@nutri-c.com
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Message;
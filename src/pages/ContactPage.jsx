import React, { useState } from 'react';
import { Mail, User, Briefcase, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual endpoint when available
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data submitted:', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f3ff] to-[#f9f5ff] text-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-[#8a3aff] hover:text-[#7b2fff] font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Logo size={60} />
            <span className="text-3xl font-bold ml-3 text-[#8a3aff]">OBAM AI</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Contact Sales</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our sales team to learn more about our Enterprise solutions
            and how we can help your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 flex flex-col justify-center items-center">
            <div className="w-20 h-20 bg-[#8a3aff]/10 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-10 w-10 text-[#8a3aff]" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Email Us</h2>
            <p className="text-gray-600 mb-6 text-center">
              Our sales team typically responds within 24 hours during business days.
            </p>
            <a 
              href="mailto:sales@obam.ai" 
              className="text-xl font-semibold text-[#8a3aff] hover:text-[#7b2fff] transition-colors"
            >
              sales@obam.ai
            </a>
            <div className="mt-8 pt-8 border-t border-gray-100 w-full text-center">
              <p className="text-gray-500">
                For technical support, please visit our <Link to="/help" className="text-[#8a3aff] hover:underline">Help Center</Link>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
            
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff] outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff] outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="company">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff] outline-none transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="message">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff] outline-none transition-all resize-none"
                      placeholder="Tell us about your needs and how we can help..."
                    ></textarea>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#8a3aff] hover:bg-[#7b2fff] hover:shadow-lg hover:shadow-[#8a3aff]/20'
                  }`}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 
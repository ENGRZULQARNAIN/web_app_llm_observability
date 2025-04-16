import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img from "./logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        'http://obamai.us-east-1.elasticbeanstalk.com/api/v1/forgot-password/',
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      // setMessage("Reset link has been sent to your email.");
      setEmail("");
      console.log(res.data);
      if(res.status===200)
      {
        // navigate('/login')
      }
      
    } catch (err) {
      setError(
        err.response 
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <img src={img} alt="" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold text-center">Reset Your Password?</h2>
          <p className="text-gray-500 text-center mt-2 text-sm">
            Enter the email that you used when you signed up to recover your password. You will receive a password reset link.
          </p>
        </div>

        {message && <p className="text-green-600 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-gray-500 hover:underline">
            &larr; Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
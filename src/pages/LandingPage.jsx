import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Search, Shield, Zap, Globe, Database, ChartBar } from 'lucide-react';
import Logo from '../assets/Logo';

const LandingPage = () => {
  const networkCanvasRef = useRef(null);

  useEffect(() => {
    if (!networkCanvasRef.current) return;

    const canvas = networkCanvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 100;
    const mouseRadius = 120;
    
    let mouse = {
      x: null,
      y: null,
      radius: mouseRadius
    };

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 1 - 0.5;
        const directionY = Math.random() * 1 - 0.5;
        const color = `rgba(138, 58, 255, ${Math.random() * 0.5 + 0.2})`;
        
        particles.push({
          x, y, size, directionX, directionY, color
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.directionX;
        p.y += p.directionY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * 1;
            const pushY = Math.sin(angle) * 1;
            
            p.x += pushX;
            p.y += pushY;
          }
        }
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 58, 255, ${0.2 * (1 - distance/connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f3ff] to-[#f9f5ff] text-gray-800 overflow-hidden">
      {/* Network Animation Canvas */}
      <canvas 
        ref={networkCanvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Logo size={40} />
            <span className="text-xl font-bold ml-2 text-[#8a3aff]">Obam AI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-[#8a3aff] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#8a3aff] transition">How It Works</a>
            <a href="#pricing" className="hover:text-[#8a3aff] transition">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-[#8a3aff] transition">Login</Link>
            <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-4 py-2 rounded-lg transition text-white">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a3aff] to-[#6023bf]">
                Observability Is All You Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Gain complete visibility into your LLM applications monitoring, 
              tracking, and analytics that help you build more reliable AI systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition text-white transform hover:scale-105">
                Get Started <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/demo" className="bg-transparent border border-[#8a3aff] text-[#8a3aff] hover:bg-[#8a3aff]/10 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
                Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Our Observability Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#8a3aff]/20 transition duration-300 border border-gray-100 transform hover:-translate-y-2 group">
              <div className="bg-[#8a3aff]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#8a3aff]/20 transition-all duration-300">
                <Search className="text-[#8a3aff]" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">Track every LLM request and response with detailed logs and metrics for improved performance analysis.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#8a3aff]/20 transition duration-300 border border-gray-100 transform hover:-translate-y-2 group">
              <div className="bg-[#8a3aff]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#8a3aff]/20 transition-all duration-300">
                <BarChart2 className="text-[#8a3aff]" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Visualize performance metrics, cost, and usage patterns with intuitive customizable dashboards.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#8a3aff]/20 transition duration-300 border border-gray-100 transform hover:-translate-y-2 group">
              <div className="bg-[#8a3aff]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#8a3aff]/20 transition-all duration-300">
                <Zap className="text-[#8a3aff]" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
              <p className="text-gray-600 leading-relaxed">Identify bottlenecks and optimize your LLM applications for better throughput and reduced latency.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#8a3aff]/20 transition duration-300 border border-gray-100 transform hover:-translate-y-2 group">
              <div className="bg-[#8a3aff]/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-[#8a3aff]/20 transition-all duration-300">
                <Shield className="text-[#8a3aff]" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Security & Compliance</h3>
              <p className="text-gray-600 leading-relaxed">Ensure your AI systems meet industry security standards and compliance requirements with detailed auditing.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section - MINIMAL VERSION */}
        <section id="how-it-works" className="container mx-auto px-6 py-20 bg-white rounded-2xl my-10 shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Simple server-based integration with your existing applications in three easy steps.
          </p>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#f6f3ff] p-8 rounded-xl shadow-md transition duration-300 border border-gray-100 hover:shadow-lg hover:shadow-[#8a3aff]/10 flex flex-col items-center text-center">
              <div className="bg-[#8a3aff] p-4 rounded-full mb-6 text-white">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Server URL</h3>
              <p className="text-gray-600">
                Simply provide your server base URL to our platform. No SDK integration required.
              </p>
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-left w-full">
                <code className="text-xs text-gray-700">https://your-app.com/api</code>
              </div>
            </div>
            
            <div className="bg-[#f6f3ff] p-8 rounded-xl shadow-md transition duration-300 border border-gray-100 hover:shadow-lg hover:shadow-[#8a3aff]/10 flex flex-col items-center text-center">
              <div className="bg-[#8a3aff] p-4 rounded-full mb-6 text-white">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Configure Payload</h3>
              <p className="text-gray-600">
                Set up your request payload structure once and our monitoring begins automatically.
              </p>
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-left w-full">
                <code className="text-xs text-gray-700">{"{ \"prompt\": \"...\", \"model\": \"...\" }"}</code>
              </div>
            </div>
            
            <div className="bg-[#f6f3ff] p-8 rounded-xl shadow-md transition duration-300 border border-gray-100 hover:shadow-lg hover:shadow-[#8a3aff]/10 flex flex-col items-center text-center">
              <div className="bg-[#8a3aff] p-4 rounded-full mb-6 text-white">
                <ChartBar size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">View Analytics</h3>
              <p className="text-gray-600">
                Access your dashboard to view comprehensive metrics and optimize your LLM usage.
              </p>
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-left w-full flex items-center justify-center">
                <span className="text-xs text-gray-500">Interactive Dashboard</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center transition text-white transform hover:scale-105">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready to Unlock the Full Potential of Your LLMs?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of developers who have improved their LLM applications with our observability platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition text-white transform hover:scale-105">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/demo" className="bg-transparent border border-[#8a3aff] text-[#8a3aff] hover:bg-[#8a3aff]/10 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
              Demo
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-10 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <Logo size={32} />
                  <span className="text-lg font-bold ml-2 text-[#8a3aff]">Obam AI</span>
                </div>
                <p className="text-gray-500 mt-2">© 2023 Obam AI. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-[#8a3aff] transition">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-[#8a3aff] transition">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-[#8a3aff] transition">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Add a custom CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default LandingPage; 
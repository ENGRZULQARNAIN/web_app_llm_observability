import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Search, Shield, Zap, Globe, Database, ChartBar, Menu, X } from 'lucide-react';
import Logo from '../assets/Logo';

const LandingPage = () => {
  const networkCanvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Network animation effect
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center">
              <Logo size={50} />
              <span className="text-xl font-bold ml-2 text-[#8a3aff]">OBAM AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="hover:text-[#8a3aff] transition font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="hover:text-[#8a3aff] transition font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="hover:text-[#8a3aff] transition font-medium"
              >
                Pricing
              </button>
              <a 
                href="/docs" 
                className="hover:text-[#8a3aff] transition font-medium"
              >
                Documentation
              </a>
              <Link to="/login" className="hover:text-[#8a3aff] transition ml-4">Login</Link>
              <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-4 py-2 rounded-lg transition text-white">
                Sign Up
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg absolute w-full">
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-left py-2 hover:text-[#8a3aff] transition font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="text-left py-2 hover:text-[#8a3aff] transition font-medium"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-left py-2 hover:text-[#8a3aff] transition font-medium"
                >
                  Pricing
                </button>
                <a 
                  href="/docs" 
                  className="text-left py-2 hover:text-[#8a3aff] transition font-medium"
                >
                  Documentation
                </a>
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link to="/login" className="py-2 hover:text-[#8a3aff] transition">Login</Link>
                  <Link to="/register" className="bg-[#8a3aff] hover:bg-[#7b2fff] px-4 py-2 rounded-lg text-center transition text-white">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section - Added margin-top to account for fixed navbar */}
        <section className="container mx-auto px-6 pt-32 pb-20 text-center">
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

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">Pricing Plans</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
              <h3 className="text-xl font-bold mb-2">Free Tier</h3>
              <p className="text-gray-500 mb-6">For individuals and small projects</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 1,000 requests/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>7-day data retention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Community support</span>
                </li>
              </ul>
              <Link to="/register" className="block text-center bg-[#f6f3ff] text-[#8a3aff] hover:bg-[#8a3aff] hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                Get Started
              </Link>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-[#8a3aff] p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-2 border-[#8a3aff] transform scale-105">
              <div className="bg-white text-[#8a3aff] text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <p className="text-white opacity-80 mb-6">For growing teams and businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-white opacity-80">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Up to 50,000 requests/month</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Advanced analytics and reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>30-day data retention</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Performance alerts</span>
                </li>
              </ul>
              <Link to="/register" className="block text-center bg-white text-[#8a3aff] hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition duration-300">
                Get Started
              </Link>
            </div>
            
            {/* Enterprise Tier */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">For large teams and organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom analytics solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited data retention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated support manager</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link to="/contact" className="block text-center bg-[#f6f3ff] text-[#8a3aff] hover:bg-[#8a3aff] hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                Contact Sales
              </Link>
            </div>
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
                  <span className="text-lg font-bold ml-2 text-[#8a3aff]">OBAM AI</span>
                </div>
                <p className="text-gray-500 mt-2">© 2025 OBAM AI. All rights reserved.</p>
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
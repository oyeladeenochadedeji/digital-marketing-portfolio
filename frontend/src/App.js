import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-2xl text-blue-600">
              DigitalMax Pro
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors">Services</button>
              <button onClick={() => scrollToSection('results')} className="text-gray-700 hover:text-blue-600 transition-colors">Results</button>
              <button onClick={() => scrollToSection('process')} className="text-gray-700 hover:text-blue-600 transition-colors">Process</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Home</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">About</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Services</button>
                <button onClick={() => scrollToSection('results')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Results</button>
                <button onClick={() => scrollToSection('process')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Process</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg)',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Scale Your Business with
            <span className="block text-yellow-400">Expert Digital Marketing</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            I help ambitious businesses dominate their markets through data-driven strategies, proven funnels, and explosive growth campaigns.
          </p>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Work With Me - Let's Scale Your Business
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Growth Partner in the Digital Revolution
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 5 years of experience in digital marketing, I've helped 200+ businesses achieve breakthrough results across multiple industries. My data-driven approach combines cutting-edge strategies with proven methodologies to deliver measurable ROI.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Generated over $2.5M in client revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">200+ successful campaigns launched</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Average ROI increase of 300%</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1599090738077-75d2187fd892"
                alt="Digital Marketing Success"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Marketing Services That Drive Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I specialize in high-impact marketing strategies across multiple channels to maximize your business growth and ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Book Marketing */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Marketing</h3>
              <p className="text-gray-600 mb-4">Launch your book to bestseller status with targeted campaigns, author platform building, and strategic PR that gets results.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Amazon optimization</li>
                <li>• Author platform development</li>
                <li>• Launch campaign strategy</li>
              </ul>
            </div>

            {/* Affiliate Marketing */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Marketing</h3>
              <p className="text-gray-600 mb-4">Build profitable affiliate partnerships and scale your revenue streams with high-converting campaigns and strategic partnerships.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Partner recruitment</li>
                <li>• Commission optimization</li>
                <li>• Performance tracking</li>
              </ul>
            </div>

            {/* Social Media Marketing */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V2a1 1 0 011-1h2a1 1 0 011 1v16a1 1 0 01-1 1h-2a1 1 0 01-1-1V4m-6 0V2a1 1 0 00-1-1H8a1 1 0 00-1 1v2m6 0V2a1 1 0 00-1-1H6a1 1 0 00-1 1v16a1 1 0 001 1h2a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">TikTok & Instagram Marketing</h3>
              <p className="text-gray-600 mb-4">Dominate social media with viral content strategies, influencer partnerships, and engagement campaigns that convert.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Viral content creation</li>
                <li>• Influencer partnerships</li>
                <li>• Community management</li>
              </ul>
            </div>

            {/* Paid Ads */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paid Ads (Meta & Google)</h3>
              <p className="text-gray-600 mb-4">Scale your business with high-ROI ad campaigns across Facebook, Instagram, and Google that consistently deliver qualified leads.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Campaign optimization</li>
                <li>• Audience targeting</li>
                <li>• ROI maximization</li>
              </ul>
            </div>

            {/* Email & Funnels */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Funnels & Email Automation</h3>
              <p className="text-gray-600 mb-4">Convert more prospects into customers with strategic sales funnels and automated email sequences that nurture and close.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Sales funnel design</li>
                <li>• Email automation</li>
                <li>• Conversion optimization</li>
              </ul>
            </div>

            {/* SEO & Content */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO & Content Marketing</h3>
              <p className="text-gray-600 mb-4">Dominate search results and build authority with strategic SEO, content marketing, and brand positioning that drives organic growth.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Keyword optimization</li>
                <li>• Content strategy</li>
                <li>• Brand positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results/Case Studies Section */}
      <section id="results" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Proven Results That Speak For Themselves</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real success stories from clients who trusted me to transform their businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">$2.5M+</div>
              <div className="text-gray-300">Client Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">300%</div>
              <div className="text-gray-300">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-gray-300">Successful Campaigns</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 font-semibold mb-2">BOOK MARKETING</div>
              <h3 className="text-xl font-bold mb-4">Fiction Author Hits #1 Bestseller</h3>
              <p className="text-gray-300 mb-4">Launched debut novel to Amazon #1 in 3 categories within 2 weeks through targeted ads and strategic PR.</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Launch Sales:</span>
                <span className="text-green-400 font-semibold">12,000+ copies</span>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 font-semibold mb-2">PAID ADS</div>
              <h3 className="text-xl font-bold mb-4">E-commerce 500% ROAS</h3>
              <p className="text-gray-300 mb-4">Scaled fashion brand from $10K to $150K monthly revenue through optimized Facebook and Google ad campaigns.</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Monthly Revenue:</span>
                <span className="text-green-400 font-semibold">$150K</span>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 font-semibold mb-2">SOCIAL MEDIA</div>
              <h3 className="text-xl font-bold mb-4">TikTok Viral Success</h3>
              <p className="text-gray-300 mb-4">Grew fitness influencer from 5K to 500K followers in 6 months with viral content strategy and brand partnerships.</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Follower Growth:</span>
                <span className="text-green-400 font-semibold">500K+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What My Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by industry leaders and growing businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"The results were beyond my expectations. My book hit #1 bestseller in just 2 weeks, and the marketing strategy was flawless. I couldn't have done this without their expertise."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  SK
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Kennedy</div>
                  <div className="text-gray-500 text-sm">Bestselling Author</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"Our ROI increased by 400% within 3 months. The paid ad campaigns were incredibly targeted and the conversion rates exceeded all our previous efforts. Absolutely phenomenal work!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-gray-500 text-sm">E-commerce CEO</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">"From 5K to 500K followers in 6 months! The social media strategy was genius and the content went viral multiple times. My brand partnerships increased by 1000%."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  JL
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jessica Lin</div>
                  <div className="text-gray-500 text-sm">Fitness Influencer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Highlights</h2>
            <p className="text-xl text-gray-600">A glimpse into some of our most successful campaigns and projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb"
                  alt="Social Media Campaign"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h4 className="text-xl font-bold mb-2">Social Media Campaign</h4>
                    <p className="text-sm">500K+ Reach</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1553639558-fb2e565066f5"
                  alt="Analytics Dashboard"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h4 className="text-xl font-bold mb-2">Performance Analytics</h4>
                    <p className="text-sm">300% ROI Increase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src="https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg"
                  alt="Digital Marketing"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h4 className="text-xl font-bold mb-2">Email Campaign</h4>
                    <p className="text-sm">45% Open Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Proven 3-Step Process</h2>
            <p className="text-xl text-gray-600">How I transform your business from the ground up</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyze & Strategize</h3>
              <p className="text-gray-600">Deep dive into your business, market, and competition. Identify opportunities and create a custom growth strategy tailored to your goals.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Execute & Optimize</h3>
              <p className="text-gray-600">Launch data-driven campaigns across multiple channels. Continuously test, optimize, and scale what works to maximize your ROI.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scale & Dominate</h3>
              <p className="text-gray-600">Systematically scale successful campaigns while building long-term assets that generate consistent growth and market dominance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
            <p className="text-xl text-gray-300">Let's discuss how I can help you achieve breakthrough results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@digitalmaxpro.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="book-marketing">Book Marketing</option>
                    <option value="affiliate-marketing">Affiliate Marketing</option>
                    <option value="social-media">TikTok & Instagram Marketing</option>
                    <option value="paid-ads">Paid Ads (Meta & Google)</option>
                    <option value="email-funnels">Email & Funnel Marketing</option>
                    <option value="seo-content">SEO & Content Marketing</option>
                    <option value="full-service">Full-Service Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Tell me about your business and goals..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send Message & Get Free Consultation'}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center">
                    Message sent successfully! I'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center">
                    Failed to send message. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-bold text-2xl text-yellow-400 mb-4">
            DigitalMax Pro
          </div>
          <p className="text-gray-400 mb-6">
            Transforming businesses through expert digital marketing strategies
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">
              © 2025 DigitalMax Pro. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
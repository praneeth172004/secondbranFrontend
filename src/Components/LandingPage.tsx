// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css'; // Import your custom styles

function LandingPage() {
  return (
    <>
      {/* Header */}
      <header className="py-4 px-6 md:px-12 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Cerebra</h1>
            <a href="signup" className="cta-button bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded-lg text-sm md:text-base">
                Get Started
            </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">

          {/* Hero Section */}
          <section id="hero" className="py-20 md:py-32 text-center">
              <div className="container mx-auto px-6">
                  <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">Your Digital Command Center</span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
                      From Information Chaos to <span className="gradient-text">Organized Clarity</span>.
                  </h2>
                  <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 mb-10">
                      Finally, a home for all your important links, docs, and ideas. Effortlessly save, instantly find, and easily share your knowledge.
                  </p>
                  <a href="#cta" className="cta-button bg-gray-900 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-lg text-lg">
                      Build Your Brain for Free
                  </a>
                  <p className="text-gray-500 mt-4 text-sm">No credit card required. Free forever plan.</p>

                  {/* App Preview Image/GIF */}
                  <div className="mt-16 max-w-5xl mx-auto">
                      <div className="rounded-xl bg-white p-2 shadow-2xl ring-1 ring-gray-900/10">
                          <img src="/Dashboard.png" 
                               alt="App Dashboard Preview" 
                               className="rounded-lg w-full h-auto"
                               onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/1200x600/F3F4F6/111827?text=App+Preview'; }}
                          />
                      </div>
                  </div>
              </div>
          </section>

          {/* Problem/Solution Section */}
          <section id="problem" className="py-20 bg-gray-50">
              <div className="container mx-auto px-6 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tired of digital clutter?</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-12">You find amazing things online, but they end up scattered across bookmarks, notes, and open tabs. We fix that.</p>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      {/* Problem 1 */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">Lost Links</h4>
                          <p className="text-gray-500">That brilliant YouTube video or insightful article you found last week? Gone forever.</p>
                      </div>
                      {/* Problem 2 */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <svg className="w-12 h-12 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">Scattered Notes</h4>
                          <p className="text-gray-500">Bookmarks here, notes there, and files saved somewhere else. Nothing is connected.</p>
                      </div>
                      {/* Problem 3 */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <svg className="w-12 h-12 mx-auto text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">Wasted Time</h4>
                          <p className="text-gray-500">Spending more time searching for information than actually using it to learn and create.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
              <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                      <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">Core Features</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Everything you need to think clearly.</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {/* Feature Cards */}
                      <div className="feature-card p-8 rounded-xl">
                          <div className="bg-indigo-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">Universal Storage</h4>
                          <p className="text-gray-600">Save anything: YouTube videos, Twitter threads, articles, PDFs, and your own notes. If it's important, it has a home here.</p>
                      </div>
                      <div className="feature-card p-8 rounded-xl">
                          <div className="bg-indigo-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10zM15 10a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V10z"></path></svg>
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">Powerful Filtering</h4>
                          <p className="text-gray-600">Stop endlessly scrolling. Use our intuitive filters and tags to instantly locate the exact piece of information you need, right when you need it.</p>
                      </div>
                      <div className="feature-card p-8 rounded-xl">
                          <div className="bg-indigo-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">Share Your Brain</h4>
                          <p className="text-gray-600">Curate collections and share them with a single link. Perfect for collaborating with teams, teaching a class, or sharing your expertise.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-gray-50">
              <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by thinkers and creators.</h3>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      <div className="bg-white p-8 rounded-xl border border-gray-200">
                          <p className="text-gray-600 text-lg mb-6">"Cerebra is the tool I didn't know I needed. All my project resources are finally in one place, and the filtering is a game-changer. I feel so much more organized."</p>
                          <div className="flex items-center">
                              <img className="w-12 h-12 rounded-full mr-4" src="https://placehold.co/100x100/E5E7EB/111827?text=JD" alt="Avatar of Jane Doe" />
                              <div>
                                  <p className="font-bold text-gray-900">Jane Doe</p>
                                  <p className="text-gray-500">UX Designer</p>
                              </div>
                          </div>
                      </div>
                      <div className="bg-white p-8 rounded-xl border border-gray-200">
                          <p className="text-gray-600 text-lg mb-6">"As a content creator, I'm constantly saving inspiration. Cerebra's ability to pull in YouTube videos and Twitter threads is incredible. My 'swipe file' has never been more powerful."</p>
                          <div className="flex items-center">
                              <img className="w-12 h-12 rounded-full mr-4" src="https://placehold.co/100x100/E5E7EB/111827?text=MS" alt="Avatar of Mike Smith" />
                              <div>
                                  <p className="font-bold text-gray-900">Mike Smith</p>
                                  <p className="text-gray-500">YouTuber & Blogger</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Final CTA Section */}
          <section id="cta" className="py-20 md:py-32 bg-gray-900">
              <div className="container mx-auto px-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6">
                      Ready to build your second brain?
                  </h2>
                  <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-10">
                      Stop losing valuable information. Start organizing your digital life today and unlock your full creative potential.
                  </p>
                  <a href="signup" className="cta-button bg-white hover:bg-gray-200 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg">
                      Sign Up for Free
                  </a>
              </div>
          </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
          <div className="container mx-auto px-6 text-center text-gray-500">
              <p>&copy; 2025 Cerebra. All rights reserved.</p>
              
          </div>
      </footer>
    </>
  );
}

export default LandingPage;
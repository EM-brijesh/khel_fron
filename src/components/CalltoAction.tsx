import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Twitter, Github, Linkedin, ExternalLink, Send } from 'lucide-react';

export const CallToAction = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('feature');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the feedback to a server
    window.location.href = `mailto:@example.com?subject=${feedbackType} Request&body=${encodeURIComponent(feedback)}`;
    setShowFeedbackForm(false);
    setFeedback('');
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-b from-indigo-700 to-indigo-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to join the community?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Create your account now and start connecting with sports enthusiasts near you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/auth"
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
            >
              Sign Up Now
            </Link>
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Give Feedback
            </button>
          </div>
        </div>

        {/* Feedback Form Modal */}
        {showFeedbackForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Send Feedback</h3>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Share your thoughts..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="border-t border-indigo-600 pt-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-indigo-100">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Khelo</h3>
              <p className="text-sm">
                Connecting sports enthusiasts and making every game count. Join our community
                and find your next sports adventure.
              </p>
            </div>
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/dashboard" className="hover:text-white transition-colors">
                    Find Events
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-white transition-colors">
                    My Profile
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFeedbackForm(true);
                    }}
                  >
                    Submit Feedback
                  </a>
                </li>
              </ul>
            </div> */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    Help Center <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    Privacy Policy <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    Terms of Service <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div> */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {/* <a
                  href="mailto:@brijeshkori22@gmail.com"
                  className="text-indigo-100 hover:text-white transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-100 hover:text-white transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-100 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-100 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a> */}
              </div>
              <div className="mt-4">
                <p className="text-sm">
                  Questions? Email us at{' '}
                  <a
                    href="mailto:brijeshkori22@gmail.com"
                    className="underline hover:text-white transition-colors"
                  >
                    brijeshkori22@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-indigo-600 text-sm text-indigo-100">
            <p>© {new Date().getFullYear()} Khelo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
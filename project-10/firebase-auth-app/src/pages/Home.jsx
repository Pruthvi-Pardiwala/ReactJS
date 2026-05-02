import { Link } from 'react-router-dom';
import { Shield, Lock, Users, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Shield className="w-20 h-20 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-6">
            Secure Authentication
            <span className="block text-blue-500 mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-dark-muted mb-12 max-w-2xl mx-auto">
            A comprehensive Firebase-powered authentication system with real-time state management,
            social login, and advanced security features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-dark-card hover:bg-gray-700 text-dark-text rounded-lg text-lg font-semibold border border-dark-border transition-all transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          <FeatureCard
            icon={<Lock className="w-10 h-10 text-blue-500" />}
            title="Secure Authentication"
            description="Industry-standard security with Firebase Authentication"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-green-500" />}
            title="Social Login"
            description="Sign in with Google, Facebook, and GitHub"
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-yellow-500" />}
            title="Real-Time Updates"
            description="Instant authentication state synchronization"
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-purple-500" />}
            title="Protected Routes"
            description="Secure access control for authenticated users"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-blue-500 transition-all transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-dark-text mb-2">{title}</h3>
      <p className="text-dark-muted">{description}</p>
    </div>
  );
};

export default Home;

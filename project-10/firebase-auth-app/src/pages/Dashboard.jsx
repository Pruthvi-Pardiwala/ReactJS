import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, CheckCircle, XCircle, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark-text mb-2">Dashboard</h1>
          <p className="text-dark-muted">Welcome back, {currentUser?.displayName || 'User'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<User className="w-8 h-8 text-blue-500" />}
            title="Account Status"
            value="Active"
            color="blue"
          />
          <StatCard
            icon={<Shield className="w-8 h-8 text-green-500" />}
            title="Security Level"
            value="High"
            color="green"
          />
          <StatCard
            icon={<Mail className="w-8 h-8 text-purple-500" />}
            title="Email Status"
            value={currentUser?.emailVerified ? 'Verified' : 'Unverified'}
            color={currentUser?.emailVerified ? 'green' : 'yellow'}
          />
        </div>

        {/* User Information */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-dark-text mb-6">Account Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoRow
              label="Display Name"
              value={currentUser?.displayName || 'Not set'}
              icon={<User className="w-5 h-5 text-dark-muted" />}
            />
            <InfoRow
              label="Email Address"
              value={currentUser?.email || 'N/A'}
              icon={<Mail className="w-5 h-5 text-dark-muted" />}
            />
            <InfoRow
              label="Email Verified"
              value={currentUser?.emailVerified ? 'Yes' : 'No'}
              icon={
                currentUser?.emailVerified ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-yellow-500" />
                )
              }
            />
            <InfoRow
              label="Account Created"
              value={formatDate(currentUser?.metadata?.creationTime)}
              icon={<Calendar className="w-5 h-5 text-dark-muted" />}
            />
            <InfoRow
              label="Last Sign In"
              value={formatDate(currentUser?.metadata?.lastSignInTime)}
              icon={<Calendar className="w-5 h-5 text-dark-muted" />}
            />
            <InfoRow
              label="User ID"
              value={currentUser?.uid?.substring(0, 20) + '...' || 'N/A'}
              icon={<Shield className="w-5 h-5 text-dark-muted" />}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-dark-text mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ActionButton
              title="Update Profile"
              description="Change your display name and photo"
              link="/profile"
            />
            <ActionButton
              title="Security Settings"
              description="Manage your password and security"
              link="/profile"
            />
            <ActionButton
              title="Email Verification"
              description={currentUser?.emailVerified ? 'Email verified ✓' : 'Verify your email'}
              link="/profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'border-blue-500/30 bg-blue-500/10',
    green: 'border-green-500/30 bg-green-500/10',
    yellow: 'border-yellow-500/30 bg-yellow-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10'
  };

  return (
    <div className={`bg-dark-card border ${colorClasses[color]} rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <p className="text-dark-muted text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-dark-text">{value}</p>
    </div>
  );
};

const InfoRow = ({ label, value, icon }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-dark-muted text-sm mb-1">{label}</p>
        <p className="text-dark-text font-medium">{value}</p>
      </div>
    </div>
  );
};

const ActionButton = ({ title, description, link }) => {
  return (
    <a
      href={link}
      className="block bg-dark-bg hover:bg-gray-700 border border-dark-border rounded-lg p-4 transition-all transform hover:scale-105"
    >
      <h3 className="text-dark-text font-semibold mb-1">{title}</h3>
      <p className="text-dark-muted text-sm">{description}</p>
    </a>
  );
};

export default Dashboard;

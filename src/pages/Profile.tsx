
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileEditor } from '@/components/profile/ProfileEditor';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileEditor />
      </div>
    </div>
  );
};

export default Profile;

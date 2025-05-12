import React, { useState, useEffect } from 'react';
import { Phone } from '../types';
import PhonesList from '../components/PhonesList/PhonesList';
import ErrorMessage from '../components/ErrorMessage';
import { getPhones } from '../services/phoneService';
import { isAppError } from '../utils/errorHandler';

const PhonesListPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhones = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPhones();
      setPhones(data);
    } catch (err) {
      const message = isAppError(err) ? err.message : 'Failed to load phones';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={fetchPhones} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <PhonesList phones={phones} />
    </div>
  );
};

export default PhonesListPage;
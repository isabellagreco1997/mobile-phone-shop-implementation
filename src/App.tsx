import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhonesListPage from './pages/PhonesListPage';
import PhoneDetailsPage from './pages/PhoneDetailsPage';
import BasketPage from './pages/BasketPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { BasketProvider } from './context/BasketContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <BasketProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<PhonesListPage />} />
                <Route path="/phones/:id" element={<PhoneDetailsPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
        </BasketProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
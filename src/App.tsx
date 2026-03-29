/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ScanSelection } from './pages/ScanSelection';
import { CameraScan } from './pages/CameraScan';
import { ListingEditor } from './pages/ListingEditor';
import { AnalysisDashboard } from './pages/AnalysisDashboard';
import { DetailedAnalysis } from './pages/DetailedAnalysis';
import { Inventory } from './pages/Inventory';
import { Account } from './pages/Account';
import { Subscription } from './pages/Subscription';
import { Auth } from './pages/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 animate-spin border-t-primary"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="scan" element={<ScanSelection />} />
              <Route path="camera-scan" element={<CameraScan />} />
              <Route path="listing" element={<ListingEditor />} />
              <Route path="analysis" element={<AnalysisDashboard />} />
              <Route path="detailed-analysis" element={<DetailedAnalysis />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="account" element={<Account />} />
              <Route path="subscription" element={<Subscription />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

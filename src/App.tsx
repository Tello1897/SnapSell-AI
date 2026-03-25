/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ScanSelection } from './pages/ScanSelection';
import { CameraScan } from './pages/CameraScan';
import { ListingEditor } from './pages/ListingEditor';
import { AnalysisDashboard } from './pages/AnalysisDashboard';
import { DetailedAnalysis } from './pages/DetailedAnalysis';
import { Inventory } from './pages/Inventory';
import { Account } from './pages/Account';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scan" element={<ScanSelection />} />
          <Route path="camera-scan" element={<CameraScan />} />
          <Route path="listing" element={<ListingEditor />} />
          <Route path="analysis" element={<AnalysisDashboard />} />
          <Route path="detailed-analysis" element={<DetailedAnalysis />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

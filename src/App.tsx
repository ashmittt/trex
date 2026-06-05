import { Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import ExhibitsPage from './pages/ExhibitsPage';
import ExhibitDetailPage from './pages/ExhibitDetailPage';
import TimelinePage from './pages/TimelinePage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import { AnalyticsProvider } from './context/AnalyticsContext';

export default function App() {
  return (
    <AnalyticsProvider>
      <title>Natural History Museum — The Age of Dinosaurs</title>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibits" element={<ExhibitsPage />} />
        <Route path="/exhibits/:slug" element={<ExhibitDetailPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AnalyticsProvider>
  );
}

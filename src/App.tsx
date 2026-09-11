import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inspections" element={<Placeholder />} />
        <Route path="/maintenance" element={<Placeholder />} />
        <Route path="/issues" element={<Placeholder />} />
        <Route path="/equipment" element={<Placeholder />} />
        <Route path="/reports" element={<Placeholder />} />
        <Route path="*" element={<Placeholder />} />
      </Route>
    </Routes>
  );
}

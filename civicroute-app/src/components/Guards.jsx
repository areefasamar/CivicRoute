import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Guards for each step — redirect to earliest missing prerequisite
export function RequireAuth({ children }) {
  const { state } = useApp();
  if (!state.email) return <Navigate to="/login" replace />;
  return children;
}

export function RequireTerms({ children }) {
  const { state } = useApp();
  if (!state.email) return <Navigate to="/login" replace />;
  if (!state.agreedToTerms) return <Navigate to="/terms" replace />;
  return children;
}

export function RequireArea({ children }) {
  const { state } = useApp();
  if (!state.email) return <Navigate to="/login" replace />;
  if (!state.agreedToTerms) return <Navigate to="/terms" replace />;
  if (!state.selectedArea) return <Navigate to="/location" replace />;
  return children;
}

export function RequireIssue({ children }) {
  const { state } = useApp();
  if (!state.email) return <Navigate to="/login" replace />;
  if (!state.agreedToTerms) return <Navigate to="/terms" replace />;
  if (!state.selectedArea) return <Navigate to="/location" replace />;
  if (!state.selectedIssue) return <Navigate to="/report" replace />;
  return children;
}

export function RequireSent({ children }) {
  const { state } = useApp();
  if (!state.email) return <Navigate to="/login" replace />;
  if (!state.sentAt) return <Navigate to="/login" replace />;
  return children;
}

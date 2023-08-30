import { useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function DashboardPage() {
  const { pathname } = useLocation();
  const conversationId = pathname.split('/')?.[1] ? pathname.split('/')[1] : '';

  return <Dashboard conversationId={conversationId} />;
}

export default DashboardPage;

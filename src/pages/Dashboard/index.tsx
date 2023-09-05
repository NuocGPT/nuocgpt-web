import { useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function DashboardPage() {
  const { pathname } = useLocation();
  const conversationId = pathname.split('/')?.[2] ? pathname.split('/')[2] : '';

  return <Dashboard conversationId={conversationId} />;
}

export default DashboardPage;

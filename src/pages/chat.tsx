import { useLocation } from 'react-router-dom';
import Chat from '#/shared/components/Chat';

function ChatPage() {
  const { pathname } = useLocation();
  const conversationId = pathname.split('/')?.[2] ? pathname.split('/')[2] : '';

  return <Chat conversationId={conversationId} />;
}

export default ChatPage;

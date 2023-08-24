import { useEffect, useState } from 'react';
import { Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import { conversations } from '#/mocks/conversations';
import NotFoundPage from '../404Page';
import MessageItem from './MessageItem';

function Dashboard() {
  const [_, id] = useLocation().pathname.split('/');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const conversation = conversations?.find(
    conversation => conversation.id === id,
  );

  useEffect(() => {
    let id: number;
    if (isGenerating) {
      id = setInterval(() => {
        conversation?.messages?.push({
          createdAt: new Date().toISOString(),
          id: String(Math.random() * 1000),
          isGPTResponse: true,
          text: 'Hello pà dà',
        });
        setIsGenerating(false);
      }, 2000);
    }
    return () => clearInterval(id);
  }, [isGenerating]);

  return conversation ? (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28">
        {conversation?.messages?.map(message => (
          <div className="flex" key={message.id}>
            <MessageItem message={message} />
          </div>
        ))}
        {isGenerating && (
          <div className="flex">
            <MessageItem
              message={{
                createdAt: new Date().toISOString(),
                id: String(Math.random() * 1000),
                isGPTResponse: true,
                text: '...',
              }}
            />
          </div>
        )}
      </div>
      <Footer className="fixed bottom-0 h-40 w-[88vw] bg-[#fff]">
        <div className="mx-auto max-w-[960px]">
          <Input
            className="shadow-lg rounded-lg p-4"
            onChange={e => {
              setMessage(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                conversation?.messages?.push({
                  createdAt: new Date().toISOString(),
                  id: String(Math.random() * 1000),
                  isGPTResponse: false,
                  text: message,
                });
                setIsGenerating(true);
                setMessage('');
                e.preventDefault();
              }
            }}
            placeholder={'Gửi tin nhắn'}
            size="large"
            suffix={<SendIcon />}
            value={message}
          />
          <Typography.Paragraph className="mt-2 text-center text-xs text-color-neutral-3">
            Xem trước nghiên cứu miễn phí. Mục tiêu của chúng tôi là làm cho các
            hệ thống AI trở nên tự nhiên và an toàn hơn khi tương tác. Phản hồi
            của bạn giúp chúng tôi hoàn thiện hơn.
          </Typography.Paragraph>
        </div>
      </Footer>
    </>
  ) : (
    <NotFoundPage />
  );
}

export default Dashboard;

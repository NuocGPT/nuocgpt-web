import { useEffect, useRef, useState } from 'react';
import { Avatar, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import LogoGrey from '#/assets/images/logo-grey.png';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import { conversations } from '#/mocks/conversations';
import { getSampleAnswers } from '#/mocks/sampleAnswers';
import NotFoundPage from '../404Page';
import MessageItem from './MessageItem';

const scrollToConversationBottom = () => {
  const conversation = document.getElementById('messages');
  if (conversation) {
    conversation.scrollTo({
      behavior: 'smooth',
      top: conversation.scrollHeight,
    });
  }
};

function Dashboard() {
  const { pathname } = useLocation();
  const id = pathname.split('/')?.length > 1 ? pathname.split('/')[1] : 0;
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedTyping, setCompletedTyping] = useState(false);
  const [displayResponse, setDisplayResponse] = useState('');
  const newMessagesCountRef = useRef(0);

  const conversation = conversations?.find(
    conversation => conversation.id === id,
  );

  useEffect(() => {
    setIsGenerating(true);
    scrollToConversationBottom();
    const id = setTimeout(() => {
      if (newMessagesCountRef.current > 0) {
        setIsGenerating(false);

        const newItem = {
          createdAt: new Date().toISOString(),
          id: String(Math.random() * 1000),
          isGPTResponse: true,
          text: getSampleAnswers(),
        };

        setCompletedTyping(false);

        let i = 0;
        const stringResponse = newItem.text;

        const intervalId = setInterval(() => {
          setDisplayResponse(stringResponse?.slice(0, i));

          i++;

          if (i > stringResponse?.length) {
            clearInterval(intervalId);
            setCompletedTyping(true);
            setDisplayResponse('');

            conversation?.messages?.push(newItem);

            scrollToConversationBottom();
          }
        }, 10);
        return () => clearInterval(intervalId);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [newMessagesCountRef.current]);

  return conversation ? (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28" id="messages">
        {conversation?.messages?.length > 0 ? (
          conversation?.messages?.map(message => (
            <div className="flex" key={message.id}>
              <MessageItem message={message} />
            </div>
          ))
        ) : (
          <div className="flex h-[75vh] flex-col items-center justify-center">
            <Image height={114} preview={false} src={LogoGrey} />
          </div>
        )}

        {newMessagesCountRef.current > 0 && displayResponse && (
          <div className={`w-full bg-color-neutral-5`}>
            <div className="mx-auto flex max-w-[960px] justify-between gap-4 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
                <Typography.Paragraph className="text-color-neutral-1">
                  {displayResponse}
                  {!completedTyping && <CursorIcon />}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        )}

        {isGenerating && newMessagesCountRef.current > 0 && (
          <div className="flex">
            <MessageItem />
          </div>
        )}
      </div>
      <Footer className="fixed bottom-0 h-40 w-[88vw] bg-[#fff]">
        <div className="mx-auto max-w-[960px]">
          <Input
            className="shadow-lg rounded-lg p-4"
            disabled={
              (!completedTyping && !isGenerating) ||
              (completedTyping && isGenerating)
            }
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
                newMessagesCountRef.current++;
                setMessage('');
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

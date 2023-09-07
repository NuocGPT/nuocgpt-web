import { useState } from 'react';
import EllipsisOutlined from '@ant-design/icons/lib/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Divider,
  Image,
  Layout,
  Tooltip,
  Typography,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as AboutUsIcon } from '#/assets/svg/about-us.svg';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import { ReactComponent as VietnamFlagIcon } from '#/assets/svg/vietnam-flag.svg';
import { QUERY } from '#/services/constants';
import { fetchConversations } from '#/services/conversations';
import type { Conversations } from '#/services/conversations/interfaces';
import type { MeResponse } from '#/services/me/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { DEFAULT_AVATAR } from '#/shared/utils/constant';
import { clearToken } from '#/shared/utils/token';
import { AboutUsModal } from '../AboutUs';

interface Props {
  logout: () => void;
  user?: MeResponse;
}

function PrivateLayout({
  children,
  logout,
  user,
}: React.PropsWithChildren<Props>) {
  const { t } = useTypeSafeTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);
  const id = pathname.split('/')?.[2];
  const isInNewConversation = pathname.includes('new-conversation');

  const { data: fetchConversationsResponse } = useQuery<Conversations>(
    QUERY.getConversations,
    fetchConversations,
    {
      onSuccess(data) {
        if (!id && !isInNewConversation) {
          data?.items?.length > 0
            ? navigate(
                `/c/${
                  data?.items?.sort(
                    (prev, next) =>
                      Number(new Date(next.created_at)) -
                      Number(new Date(prev.created_at)),
                  )?.[0]?._id
                }`,
              )
            : navigate('/new-conversation');
        }
      },
    },
  );

  const conversations =
    fetchConversationsResponse?.items.sort(
      (prev, next) =>
        Number(new Date(next.created_at)) - Number(new Date(prev.created_at)),
    ) ?? [];

  const handleCreateNewConversation = () => {
    navigate('/new-conversation');
  };

  return (
    <Layout className="h-screen">
      <Layout.Sider
        className="flex flex-col justify-between bg-primary-color"
        width={240}
      >
        <div className="flex h-full flex-col justify-between px-3 py-4">
          <div className="flex flex-col gap-4">
            <Image preview={false} src={Logo} />
            <Button
              className="mt-4 w-full rounded-lg border-[2px] bg-primary-color text-secondary-color"
              icon={<PlusOutlined />}
              onClick={handleCreateNewConversation}
            >
              Tạo trò chuyện mới
            </Button>
            <div className="flex max-h-[50vh] flex-col gap-2 overflow-auto">
              {conversations.map(conversation => (
                <Typography.Text
                  className={`flex cursor-pointer items-center gap-2 rounded-lg ${
                    id === conversation._id ? 'bg-primary-color-light-10' : ''
                  } p-2 text-secondary-color`}
                  key={conversation._id}
                  onClick={() =>
                    id !== conversation._id &&
                    navigate(`/c/${conversation._id}`)
                  }
                >
                  <ChatIcon />
                  {conversation.title}
                </Typography.Text>
              ))}
            </div>
          </div>
          <div>
            <Divider className="bg-secondary-color" />
            <div className="flex flex-col gap-4 px-3 py-2">
              <Button
                className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                icon={<AboutUsIcon />}
                onClick={() => setAboutUsModalVisible(true)}
                size="small"
                type="text"
              >
                <span className="ml-1">{t('aboutUs.title')}</span>
              </Button>
              <div className="flex gap-2 text-secondary-color">
                <VietnamFlagIcon /> Tiếng Việt
              </div>
              <div className="flex justify-between gap-2 text-secondary-color">
                <div className="flex gap-2">
                  <Avatar size={24} src={DEFAULT_AVATAR} />{' '}
                  <Tooltip title={user?.email}>
                    <Typography.Text className="max-w-36 w-36 flex-1 truncate text-secondary-color">
                      {user?.email}
                    </Typography.Text>
                  </Tooltip>
                </div>
                <EllipsisOutlined className="text-lg" />
              </div>
              <Button
                className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                onClick={() => {
                  clearToken();
                  logout();
                }}
                size="small"
                type="text"
              >
                <span className="ml-1">Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </Layout.Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <AboutUsModal
        onClose={() => setAboutUsModalVisible(false)}
        visible={aboutUsModalVisible}
      />
    </Layout>
  );
}

export default PrivateLayout;

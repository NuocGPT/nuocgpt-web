import { useState } from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Divider,
  Grid,
  Image,
  Layout,
  Tooltip,
  Typography,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Avocado from '#/assets/images/avocado.png';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as AboutUsIcon } from '#/assets/svg/about-us.svg';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import { ReactComponent as CloseIcon } from '#/assets/svg/close.svg';
import { ReactComponent as FeedbackIcon } from '#/assets/svg/like-tag.svg';
import { ReactComponent as MenuIcon } from '#/assets/svg/menu.svg';
import { ReactComponent as SidebarIcon } from '#/assets/svg/side-bar.svg';
import { QUERY } from '#/services/constants';
import { fetchConversations } from '#/services/conversations';
import type { Conversations } from '#/services/conversations/interfaces';
import type { MeResponse } from '#/services/me/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { getAvatar } from '#/shared/utils/token';
import { truncateText } from '#/shared/utils/tools';
import { AboutUsModal } from '../AboutUs';
import ChangeLanguage from './ChangeLanguage';
import { DrawerStyled } from './styles';
import UserActions from './UserActions';

interface Props {
  logout: () => void;
  user?: MeResponse;
}

function PrivateLayout({
  children,
  logout,
  user,
}: React.PropsWithChildren<Props>) {
  const { xs } = Grid.useBreakpoint();
  const { t } = useTypeSafeTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);
  const id = pathname.split('/')?.[2];
  const isInNewConversation = pathname.includes('new-conversation');
  const isUserFeedback = pathname.includes('admin');
  const [isDrawer, setIsDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const conversationId = window.location.pathname
    .split('/c')?.[1]
    ?.split('/')?.[1];
  const avatar = getAvatar();
  const defaultAvatar = avatar ?? Avocado;
  const isAdmin = user?.roles.includes('admin');

  const { data: fetchConversationsResponse } = useQuery<Conversations>(
    QUERY.getConversations,
    fetchConversations,
    {
      onSuccess(data) {
        if (!id && !isInNewConversation && !isUserFeedback) {
          data?.items?.length > 0 &&
            navigate(
              `/c/${
                data?.items?.sort(
                  (prev, next) =>
                    Number(new Date(next.created_at)) -
                    Number(new Date(prev.created_at)),
                )?.[0]?._id
              }`,
            );
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
    navigate('/new-conversation', {
      state: conversationId,
    });
    setIsDrawer(false);
  };

  const onOpen = () => {
    setIsDrawer(true);
  };

  const onClose = () => {
    setIsDrawer(false);
  };

  return (
    <>
      {xs ? (
        <>
          <div className="flex items-center justify-between border-b border-b-[#EDEDED] p-4">
            <div className="w-fit">
              <Button
                className="w-fit border-none shadow-none"
                icon={<MenuIcon />}
                onClick={onOpen}
              />
            </div>
            <div className="w-fit">{t('conversation.newTitle')}</div>
            <div className="w-fit">
              <Button
                className="w-fit border-none shadow-none"
                icon={<PlusOutlined className="text-2xl" />}
                onClick={handleCreateNewConversation}
              />
            </div>
          </div>
          <DrawerStyled
            closable={false}
            onClose={onClose}
            open={isDrawer}
            placement="left"
            title={
              <div className="flex items-center">
                <Button
                  className="w-full rounded-lg border-[2px] bg-primary-color text-secondary-color"
                  icon={<PlusOutlined />}
                  onClick={handleCreateNewConversation}
                >
                  {t('button.createNewConversation')}
                </Button>
                <Button
                  className="absolute -right-14 w-fit border-[2px] border-secondary-color bg-secondary-color-opacity p-2"
                  icon={<CloseIcon />}
                  onClick={onClose}
                />
              </div>
            }
            width={240}
          >
            <div className="flex max-h-[50vh] flex-col gap-2 overflow-auto">
              {conversations.map(conversation => (
                <Typography.Text
                  className={`flex cursor-pointer items-center gap-2 rounded-lg ${
                    id === conversation._id ||
                    conversationId === conversation._id
                      ? 'bg-primary-color-light-10'
                      : 'first:bg-primary-color-light-10'
                  } p-2 text-secondary-color`}
                  key={conversation._id}
                  onClick={() => {
                    if (id !== conversation._id) {
                      navigate(`/c/${conversation._id}`);
                      onClose();
                    }
                  }}
                >
                  <div className="w-fit">
                    <ChatIcon />
                  </div>
                  {conversation.title
                    ? truncateText(String(conversation.title), 20)
                    : t('conversation.newTitle')}
                </Typography.Text>
              ))}
            </div>
            <div className="fixed bottom-0 w-fit">
              <Divider className="bg-secondary-color" />
              <div className="flex flex-col gap-4 py-2">
                {isAdmin && (
                  <Button
                    className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                    icon={<FeedbackIcon />}
                    onClick={() => navigate('/admin')}
                    size="small"
                    type="text"
                  >
                    <span>{t('feedback.title')}</span>
                  </Button>
                )}
                <div className="block w-full px-2 text-secondary-color">
                  <Button
                    className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                    icon={<AboutUsIcon />}
                    onClick={() => setAboutUsModalVisible(true)}
                    size="small"
                    type="text"
                  >
                    <span className="ml-1">{t('aboutUs.title')}</span>
                  </Button>
                </div>
                <div className="block w-full text-secondary-color">
                  <ChangeLanguage />
                </div>
                <div className="block w-full text-secondary-color">
                  <UserActions
                    defaultAvatar={defaultAvatar}
                    email={user?.email}
                    logout={logout}
                  />
                </div>
              </div>
            </div>
          </DrawerStyled>
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </>
      ) : (
        <Layout className="min-h-screen">
          {collapsed ? (
            <Layout.Sider
              className="mx-2 flex flex-col justify-between bg-transparent"
              width={40}
            >
              <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    className="trigger rounded-lg border-[2px] bg-secondary-color p-2"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <SidebarIcon className="text-xl" />
                  </Button>
                </div>
              </div>
            </Layout.Sider>
          ) : (
            <Layout.Sider
              className="flex flex-col justify-between bg-primary-color"
              width={240}
            >
              <div className="flex h-full flex-col justify-between px-3 py-4">
                <div className="flex flex-col gap-4">
                  <Image preview={false} src={Logo} />
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      className="w-full rounded-lg border-[2px] bg-primary-color text-secondary-color"
                      icon={<PlusOutlined />}
                      onClick={handleCreateNewConversation}
                    >
                      {t('button.createNewConversation')}
                    </Button>
                    <Button
                      className="trigger rounded-lg border-[2px] bg-transparent p-2"
                      onClick={() => setCollapsed(!collapsed)}
                    >
                      <SidebarIcon className="text-xl text-secondary-color" />
                    </Button>
                  </div>
                  <div className="flex max-h-[50vh] flex-col gap-2 overflow-auto">
                    {conversations.map(conversation => (
                      <Typography.Text
                        className={`flex cursor-pointer items-center gap-2 rounded-lg ${
                          id === conversation._id ||
                          conversationId === conversation._id
                            ? 'bg-primary-color-light-10'
                            : ''
                        } p-2 text-secondary-color`}
                        key={conversation._id}
                        onClick={() =>
                          id !== conversation._id &&
                          navigate(`/c/${conversation._id}`)
                        }
                      >
                        <div className="w-fit">
                          <ChatIcon />
                        </div>
                        {conversation.title ? (
                          <Tooltip placement="left" title={conversation.title}>
                            {truncateText(String(conversation.title), 20)}
                          </Tooltip>
                        ) : (
                          t('conversation.newTitle')
                        )}
                      </Typography.Text>
                    ))}
                  </div>
                </div>
                <div>
                  <Divider className="bg-secondary-color" />
                  <div className="flex flex-col gap-4 px-3 py-2">
                    {isAdmin && (
                      <Button
                        className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                        icon={<FeedbackIcon />}
                        onClick={() => navigate('/admin')}
                        size="small"
                        type="text"
                      >
                        <span>{t('feedback.title')}</span>
                      </Button>
                    )}
                    <div className="block w-full px-2 text-secondary-color">
                      <Button
                        className="m-0 flex gap-2 p-0 text-left text-secondary-color"
                        icon={<AboutUsIcon />}
                        onClick={() => setAboutUsModalVisible(true)}
                        size="small"
                        type="text"
                      >
                        <span className="ml-1">{t('aboutUs.title')}</span>
                      </Button>
                    </div>
                    <div className="block w-full text-secondary-color">
                      <ChangeLanguage />
                    </div>
                    <div className="block w-full text-secondary-color">
                      <UserActions
                        defaultAvatar={defaultAvatar}
                        email={user?.email}
                        logout={logout}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Layout.Sider>
          )}
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      )}
      <AboutUsModal
        onClose={() => setAboutUsModalVisible(false)}
        visible={aboutUsModalVisible}
      />
    </>
  );
}

export default PrivateLayout;

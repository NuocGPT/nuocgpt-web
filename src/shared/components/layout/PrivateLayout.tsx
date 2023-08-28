import { useState } from 'react';
import EllipsisOutlined from '@ant-design/icons/lib/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import type { DeepPartial } from '@enouvo/react-uikit';
import { Avatar, Button, Divider, Image, Layout, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as AboutUsIcon } from '#/assets/svg/about-us.svg';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import { ReactComponent as VietnamFlagIcon } from '#/assets/svg/vietnam-flag.svg';
import { conversations } from '#/mocks/conversations';
// import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { currentUser } from '#/mocks/users';
import type { User } from '#/src/interfaces/users';
import { AboutUsModal } from '../AboutUs';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
}

function PrivateLayout({
  children,
  logout,
  user,
}: React.PropsWithChildren<Props>) {
  // const { t } = useTypeSafeTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);
  const id = pathname.split('/')?.[1] ? pathname.split('/')[1] : '0';

  console.log(user);

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
              onClick={() => null}
            >
              Tạo trò chuyện mới
            </Button>
            <div className="flex flex-col gap-2">
              {conversations.map(conversation => (
                <Typography.Text
                  className={`flex cursor-pointer items-center gap-2 rounded-lg ${
                    id === conversation.id ? 'bg-primary-color-light-10' : ''
                  } p-2 text-secondary-color`}
                  key={conversation.id}
                  onClick={() =>
                    id === conversation.id
                      ? logout()
                      : navigate(`/${conversation.id}`)
                  }
                >
                  <ChatIcon />
                  {conversation.name}
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
                <span className="ml-1">Về chúng tôi</span>
              </Button>
              <div className="flex gap-2 text-secondary-color">
                <VietnamFlagIcon /> Tiếng Việt
              </div>
              <div className="flex justify-between gap-2 text-secondary-color">
                <div className="flex gap-2">
                  <Avatar size={24} src={currentUser.avatar} />{' '}
                  {currentUser.fullName}
                </div>
                <EllipsisOutlined className="text-lg" />
              </div>
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

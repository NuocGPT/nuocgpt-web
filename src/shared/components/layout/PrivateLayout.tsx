import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import type { DeepPartial } from '@enouvo/react-uikit';
import { Button, Image, Layout, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import { conversations } from '#/mocks/conversations';
// import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import type { User } from '#/src/interfaces/users';

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
  const [_, id] = pathname.split('/');

  console.log(user);

  return (
    <Layout className="h-screen">
      <Layout.Sider
        className="flex flex-col justify-between bg-primary-color"
        width={240}
      >
        <div>
          <div className="p-5">
            <Image preview={false} src={Logo} />
          </div>
          <div className="p-4">
            <Button
              className="bg-transparent border-1 w-full rounded-lg text-secondary-color"
              icon={<PlusOutlined />}
              onClick={() => null}
            >
              New conversation
            </Button>
          </div>
          <div className="flex flex-col gap-2 p-4">
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
      </Layout.Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default PrivateLayout;

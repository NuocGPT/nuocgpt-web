import Icon from '@ant-design/icons';
import type { DeepPartial } from '@enouvo/react-uikit';
import { Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeftSVG } from '#/assets/svg/menu-arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '#/assets/svg/menu-arrow-right.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import type { User } from '#/src/interfaces/users';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
}

function RightContentHeader({ logout, user, setCollapse, isCollapsed }: Props) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const redirectToInfoPage = () => {
    navigate('/profile');
  };

  const menu = (
    <Menu>
      <Menu.Item key="userInfo" onClick={redirectToInfoPage}>
        {t('header.profile')}
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        {t('header.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex w-full justify-between">
      <div className="relative items-center">
        <Icon
          className="absolute -left-6 top-8 z-20 scale-[3]"
          component={isCollapsed ? ArrowRightSVG : ArrowLeftSVG}
          onClick={() => setCollapse(!isCollapsed)}
        />
      </div>
      <div className="flex">
        <Dropdown overlay={menu}>
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end leading-tight">
              {user.fullName ?? ''}
            </div>
            <Avatar size="large" src={user.avatar} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default RightContentHeader;

import { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styled from '@emotion/styled';
import type { DeepPartial } from '@enouvo/react-uikit';
import { MenuHeader } from '@enouvo/react-uikit';
import { Alert, Col, Row, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import logo from '#/assets/images/logo.png';
import { ReactComponent as DashboardSVG } from '#/assets/svg/dashboard.svg';
import { ReactComponent as LogoutSVG } from '#/assets/svg/logout.svg';
import { appConfig } from '#/configs/config';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import type { User } from '#/src/interfaces/users';
import RightContentHeader from './RightContentHeader';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
}

const { Text } = Typography;

const StyledDiv = styled.div`
  .ant-menu-item-selected {
    .ant-menu-title-content {
      background-color: var(--primary-color);
      display: block;
      border-radius: 0.5rem;
    }
    .anticon {
      color: var(--color-gray-10) !important;
    }
    .ant-pro-menu-item-title {
      background-color: var(--primary-color);
      color: var(--color-gray-10) !important;
      font-weight: 700;
    }
  }
  .ant-menu-item {
    .ant-pro-menu-item {
      padding-left: 0.625rem !important;
    }
  }

  .ant-menu-vertical {
    .ant-menu-item-selected {
      .ant-menu-title-content {
        position: relative;
      }
      .ant-menu-title-content::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0.1875rem;
        left: -0.5rem;
        width: 2rem;
        background-color: var(--primary-color);
        border-radius: 0.5rem;
      }
    }

    .ant-menu-item {
      .ant-pro-menu-item {
        padding-left: 0 !important;
      }
    }
  }
`;

function PrivateLayout({
  children,
  logout,
  user,
}: React.PropsWithChildren<Props>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useLocation();

  const settings = {
    colorWeak: false,
    fixSiderbar: true,
    fixedHeader: true,
    headerHeight: 60,
    title: appConfig.title,
  };

  const { t } = useTypeSafeTranslation();

  const ROUTES: Route = {
    routes: [
      {
        icon: <Icon className="scale-[1.18]" component={DashboardSVG} />,
        name: t('sideBar.dashboard'),
        path: '/',
      },
    ],
  };

  useEffect(() => {
    if (!isCollapsed) setIsOpenMenu(false);
  }, [isCollapsed]);

  const toggleMenu = () => {
    if (isCollapsed) {
      setIsOpenMenu(!isOpenMenu);
    } else {
      setIsOpenMenu(false);
    }
  };

  return (
    <StyledDiv className="h-screen">
      <ProLayout
        className={`${!isCollapsed ? 'submenu' : 'icon-submenu'}`}
        collapsed={isCollapsed}
        collapsedButtonRender={false}
        location={{
          pathname,
        }}
        logo={isCollapsed ? logo : appConfig.logo}
        menuFooterRender={() => (
          <p className="cursor-pointer" onClick={logout}>
            <Icon className="ml-4 scale-[1.3]" component={LogoutSVG} />
            {!isCollapsed && (
              <Text className="ml-2 text-sm font-semibold text-color-gray-50">
                {t('sideBar.logout')}
              </Text>
            )}
          </p>
        )}
        menuHeaderRender={MenuHeader}
        menuItemRender={({ path }, dom) => (
          <Link onClick={toggleMenu} to={path ?? '/'}>
            {dom}
          </Link>
        )}
        onCollapse={setIsCollapsed}
        rightContentRender={() => (
          <RightContentHeader
            isCollapsed={isCollapsed}
            logout={logout}
            setCollapse={setIsCollapsed}
            user={user}
          />
        )}
        route={ROUTES}
        siderWidth={240}
        {...settings}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Alert.ErrorBoundary>{children}</Alert.ErrorBoundary>
          </Col>
        </Row>
      </ProLayout>
    </StyledDiv>
  );
}

export default PrivateLayout;

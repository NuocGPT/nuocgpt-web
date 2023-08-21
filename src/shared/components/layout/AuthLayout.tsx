import type { ReactNode } from 'react';
import { Col, Grid, Image, Row } from 'antd';
import login from '#/assets/images/login.png';
import logo from '#/assets/images/logo.png';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  const { md } = Grid.useBreakpoint();
  return (
    <Row className="h-screen">
      {md && (
        <Col
          className="flex h-screen justify-center bg-color-gray-10"
          lg={12}
          md={0}
          xs={0}
        >
          <Row align="middle">
            <Col>
              <Image className="w-auto" preview={false} src={login} />
            </Col>
          </Row>
        </Col>
      )}
      <Col
        className="flex h-screen flex-col px-10 py-8 leading-normal"
        lg={12}
        md={24}
        xs={24}
      >
        <Image className="h-14 w-auto" preview={false} src={logo} />
        {children}
      </Col>
    </Row>
  );
}

export default AuthLayout;

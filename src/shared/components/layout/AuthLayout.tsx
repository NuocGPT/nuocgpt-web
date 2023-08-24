import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Col, Grid, Image, Row } from 'antd';
import Logo from '#/assets/images/logo-white.png';

interface Props {
  children: ReactNode;
}

const StyledAuthLayout = styled(Col)`
  opacity: 0.5;
  background: url('./src/assets/images/authBackground.png'),
    lightgray 50% / cover no-repeat;
  mix-blend-mode: color-dodge;
`;

function AuthLayout({ children }: Props) {
  const { md } = Grid.useBreakpoint();
  return (
    <Row className="m-6 max-h-screen rounded-2xl bg-primary-color shadow-shadow-2xl">
      {md && (
        <StyledAuthLayout
          className="flex h-screen items-center justify-center"
          lg={12}
          md={0}
          xs={0}
        >
          <Image className="opacity-100" preview={false} src={Logo} />
        </StyledAuthLayout>
      )}
      <Col className="h-screen bg-[#fff] px-12 py-8" lg={12} md={24} xs={24}>
        {children}
      </Col>
    </Row>
  );
}

export default AuthLayout;

import type { ReactNode } from 'react';
import { useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Col, Grid, Image, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '#/assets/images/logo-white.png';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { AboutUsModal } from '../AboutUs';

interface Props {
  children: ReactNode;
}

const StyledAuthLayout = styled(Col)`
  // opacity: 0.5;
  // background: url('./authBackground.png'),
  //   lightgray 50% / cover no-repeat;
  // mix-blend-mode: color-dodge;

  opacity: 0.85;
  background: url('./authBackground.png');
  background-size: cover;
  mix-blend-mode: color-dodge;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
`;

function AuthLayout({ children }: Props) {
  const { t } = useTypeSafeTranslation();
  const { md } = Grid.useBreakpoint();
  const navigate = useNavigate();
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex h-screen max-h-screen justify-center p-6">
      <Row className=" w-full max-w-[1560px] rounded-2xl bg-primary-color shadow-2xl">
        {md && (
          <StyledAuthLayout
            className="flex items-center justify-center"
            lg={12}
            md={0}
            xs={0}
          >
            <Image
              className="opacity-100"
              height={114}
              preview={false}
              src={Logo}
            />
          </StyledAuthLayout>
        )}
        <Col
          className="flex h-full flex-col gap-4 rounded-r-xl bg-secondary-color px-12 py-8"
          lg={12}
          md={24}
          xs={24}
        >
          <div className="flex w-full items-center justify-between gap-4">
            {window.history.state && window.history.state.idx > 0 && (
              <div className="flex items-center gap-2" onClick={handleGoBack}>
                <Button
                  className="bg-white shadow-none w-fit border-none"
                  shape="circle"
                  type="ghost"
                >
                  <LeftOutlined />
                </Button>
                {t('button.back')}
              </div>
            )}
            <Button
              className="w-fit p-0"
              onClick={() => setAboutUsModalVisible(true)}
              size="small"
              type="text"
            >
              {t('aboutUs.title')}
            </Button>
          </div>

          <div className="flex h-full w-full items-center justify-start">
            <div className="w-full">{children}</div>
          </div>
          <div className="flex justify-center gap-4">
            <Typography.Link>Điều khoản sử dụng</Typography.Link> |
            <Typography.Link>Chính sách bảo mật</Typography.Link>
          </div>
        </Col>
        <AboutUsModal
          onClose={() => setAboutUsModalVisible(false)}
          visible={aboutUsModalVisible}
        />
      </Row>
    </div>
  );
}

export default AuthLayout;

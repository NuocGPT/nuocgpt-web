import type { ReactNode } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Col, Grid, Image, Row, Typography } from 'antd';
import Logo from '#/assets/images/logo-white.png';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { AboutUsModal } from '../AboutUs';
import ChangeLanguage from '../common/ChangeLanguage';

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
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);

  /*
   * const handleGoBack = () => {
   *   if (window.history.state && window.history.state.idx > 0) {
   *     navigate(-1);
   *   } else {
   *     navigate('/', { replace: true });
   *   }
   * };
   */

  return (
    <div className="flex h-screen max-h-screen justify-center p-0 sm:p-6">
      <Row className="w-full max-w-[1560px] rounded-2xl border-none bg-primary-color">
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
          className="flex h-full flex-col gap-4 rounded-r-xl bg-secondary-color px-4 py-8 sm:px-12"
          lg={12}
          md={24}
          xs={24}
        >
          <div className="flex w-full items-center justify-between gap-4">
            {/* {window.history.state && window.history.state.idx > 0 && (
              <div className="flex items-center gap-2" onClick={handleGoBack}>
                <Button
                  className="bg-white w-fit border-none shadow-none"
                  shape="circle"
                  type="ghost"
                >
                  <LeftOutlined />
                  {t('button.back')}
                </Button>
              </div>
            )} */}
            <Button
              className="w-fit bg-transparent bg-none p-0 font-medium shadow-none"
              onClick={() => setAboutUsModalVisible(true)}
              type="text"
            >
              {t('aboutUs.title')}
            </Button>
            <ChangeLanguage
              authLayout
              className="rounded-full border border-color-neutral-3 bg-transparent font-semibold"
              extraClass="none"
            />
          </div>

          <div className="flex h-full w-full items-center justify-start">
            <div className="w-full">{children}</div>
          </div>
          <div className="flex justify-center gap-4">
            <Typography.Link className="font-medium">
              {t('termOfUse.title')}
            </Typography.Link>{' '}
            |
            <Typography.Link className="font-medium">
              {t('privacyPolicy.title')}
            </Typography.Link>
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

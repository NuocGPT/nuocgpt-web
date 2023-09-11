import { Col, Grid, Image, Row, Typography } from 'antd';
import Link from 'antd/lib/typography/Link';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as FulbrightLogo } from '#/assets/svg/fulbright-logo.svg';
import { ReactComponent as NuocSolutionsLogo } from '#/assets/svg/nuoc-solutions-logo.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { LINKS } from '#/shared/utils/constant';
import { StyledCol, StyledModal } from './styles';

interface AboutUsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AboutUsModal({ visible, onClose }: AboutUsModalProps) {
  const { t } = useTypeSafeTranslation();
  const { xs } = Grid.useBreakpoint();

  return (
    <StyledModal
      centered
      footer={null}
      onCancel={onClose}
      open={visible}
      title={null}
      width={1280}
    >
      {xs ? (
        <div className="h-full rounded-2xl bg-primary-color shadow-2xl">
          <StyledCol className="flex h-[340px]  items-center justify-center">
            <Image height={110} preview={false} src={Logo} />
          </StyledCol>
          <div className="bg-secondary-color p-4">
            <Typography.Title className="text-primary-color" level={4}>
              {t('aboutUs.title')}
            </Typography.Title>
            <Typography.Paragraph className="text-primary-color">
              {t('aboutUs.meaningOfOurBrand')}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {t('aboutUs.ourMission')}
            </Typography.Paragraph>
            <div className="flex w-full justify-between gap-4">
              <Link
                className="flex w-[47%] items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.nuoc}
                rel="noreferrer"
                target={'_blank'}
              >
                <NuocSolutionsLogo />
              </Link>
              <Link
                className="flex w-[47%] items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.fulbright}
                rel="noreferrer"
                target={'_blank'}
              >
                <FulbrightLogo />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Row className="h-[640px] rounded-2xl bg-primary-color shadow-2xl">
          <StyledCol
            className="flex h-full items-center justify-center"
            span={13}
          >
            <Image height={110} preview={false} src={Logo} />
          </StyledCol>
          <Col
            className="flex h-full flex-col items-start justify-center rounded-r-2xl bg-secondary-color px-12 py-8"
            span={11}
          >
            <Typography.Title className="text-primary-color" level={4}>
              {t('aboutUs.title')}
            </Typography.Title>
            <Typography.Paragraph className="text-primary-color">
              {t('aboutUs.meaningOfOurBrand')}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {t('aboutUs.ourMission')}
            </Typography.Paragraph>
            <div className="flex w-full justify-between gap-4">
              <Link
                className="flex w-1/2 items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.nuoc}
                rel="noreferrer"
                target={'_blank'}
              >
                <NuocSolutionsLogo />
              </Link>
              <Link
                className="flex w-1/2 items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.fulbright}
                rel="noreferrer"
                target={'_blank'}
              >
                <FulbrightLogo />
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </StyledModal>
  );
}

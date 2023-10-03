import { Col, Image, Row, Typography } from 'antd';
import Link from 'antd/lib/typography/Link';
import GatesLogo from '#/assets/images/gates-logo.png';
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

  return (
    <StyledModal
      centered
      footer={null}
      onCancel={onClose}
      open={visible}
      title={null}
      width={1280}
    >
      <Row className="h-[640px] rounded-2xl bg-primary-color shadow-2xl">
        <StyledCol
          className="flex h-[340px] items-center justify-center md:h-full"
          md={13}
          xs={24}
        >
          <Image height={110} preview={false} src={Logo} />
        </StyledCol>
        <Col
          className="flex h-full flex-col items-start justify-center rounded-r-none bg-secondary-color px-4 py-8 md:rounded-r-2xl md:px-12"
          md={11}
          xs={24}
        >
          <Typography.Title className="text-primary-color" level={4}>
            {t('aboutUs.title')}
          </Typography.Title>
          <Typography.Paragraph className="text-primary-color">
            {t('aboutUs.meaningOfOurBrand')}
          </Typography.Paragraph>
          <Typography.Paragraph>{t('aboutUs.ourMission')}</Typography.Paragraph>
          <Row gutter={[16, 16]}>
            <Col lg={8} xs={12}>
              <Link
                className="flex h-[95px] items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.nuoc}
                rel="noreferrer"
                target={'_blank'}
              >
                <NuocSolutionsLogo />
              </Link>
            </Col>
            <Col lg={8} xs={12}>
              <Link
                className="flex h-[95px] items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.fulbright}
                rel="noreferrer"
                target={'_blank'}
              >
                <FulbrightLogo />
              </Link>
            </Col>
            <Col lg={8} xs={12}>
              <Link
                className="flex h-[95px] items-center justify-center rounded-lg bg-[#F1F6FF] p-4"
                href={LINKS.gates}
                rel="noreferrer"
                target={'_blank'}
              >
                <Image preview={false} src={GatesLogo} />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledModal>
  );
}

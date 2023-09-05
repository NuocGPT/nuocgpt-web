import { Col, Image, Row, Typography } from 'antd';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as FulbrightLogo } from '#/assets/svg/fulbright-logo.svg';
import { ReactComponent as NuocSolutionsLogo } from '#/assets/svg/nuoc-solutions-logo.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
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
          <Typography.Paragraph>{t('aboutUs.ourMission')}</Typography.Paragraph>
          <div className="flex w-full justify-between gap-4">
            <div className="flex w-1/2 items-center justify-center rounded-lg bg-[#F1F6FF] p-4">
              <NuocSolutionsLogo />
            </div>
            <div className="flex w-1/2 items-center justify-center rounded-lg bg-[#F1F6FF] p-4">
              <FulbrightLogo />
            </div>
          </div>
        </Col>
      </Row>
    </StyledModal>
  );
}

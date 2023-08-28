import styled from '@emotion/styled';
import { Col, Image, Modal, Row, Typography } from 'antd';
import Logo from '#/assets/images/logo-white.png';
import { ReactComponent as FulbrightLogo } from '#/assets/svg/fulbright-logo.svg';
import { ReactComponent as NuocSolutionsLogo } from '#/assets/svg/nuoc-solutions-logo.svg';

interface AboutUsModalProps {
  visible: boolean;
  onClose: () => void;
}

const StyledCol = styled(Col)`
  opacity: 0.85;
  background: url('./src/assets/images/authBackground.png');
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

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

export function AboutUsModal({ visible, onClose }: AboutUsModalProps) {
  return (
    <StyledModal
      centered
      footer={null}
      onCancel={onClose}
      open={visible}
      title={null}
      width={1280}
    >
      <Row className="shadow-shadow-2xl h-[860px] rounded-2xl bg-primary-color">
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
            Về chúng tôi
          </Typography.Title>
          <Typography.Paragraph className="text-primary-color">
            “Nước” có nghĩa là nước trong tiếng Việt. Một cái tên phù hợp để mô
            tả tình yêu của chúng tôi đối với đất nước trong khi gói gọn nhiều
            thách thức về khí hậu mà Việt Nam đang phải đối mặt.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Được thành lập vào năm 2023, chúng tôi là một nhóm liên ngành đam mê
            nghiên cứu các giải pháp khí hậu cho Việt Nam. Cùng với nhau, chúng
            tôi có chuyên môn về AI, công nghệ vũ trụ, chăm sóc sức khỏe, tinh
            thần kinh doanh và các giải pháp khí hậu.
          </Typography.Paragraph>
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

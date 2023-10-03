import styled from '@emotion/styled';
import { Col, Modal } from 'antd';

export const StyledCol = styled(Col)`
  opacity: 0.85;
  background: url('/authBackground.png');
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

export const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-close-x {
    color: var(--secondary-color);
  }
  @media only screen and (min-width: 640px) {
    .ant-modal-close-x {
      color: initial;
    }
  }
`;

import styled from '@emotion/styled';
import { Modal } from 'antd';

export const TableWrapper = styled.div`
  .ant-table-thead > tr > th {
    background: var(--color-neutral-5);
    color: var(--color-neutral-1);
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
  table {
    border: 1px solid #edf2f7;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 24px 28px;
  }
`;

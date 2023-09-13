import styled from '@emotion/styled';
import { Card, Select } from 'antd';

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 12px 20px;
  }
`;

export const StyledSelect = styled(Select)`
  &.ant-select:not(.ant-select-customize-input) {
    .ant-select-selector {
      border-radius: 8px;
    }
  }
`;

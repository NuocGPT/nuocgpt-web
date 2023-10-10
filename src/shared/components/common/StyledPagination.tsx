import styled from '@emotion/styled';
import { Pagination } from 'antd';

const StyledPagination = styled(Pagination)`
  .ant-pagination-total-text {
    font-weight: 600;
  }
  .ant-pagination-item,
  .ant-pagination-item-link,
  .ant-pagination-item a {
    border: none;
    color: @secondary-color;
    border-radius: 0.375rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: #4a4453;
    font-weight: 500;
    &:hover {
      color: var(--secondary-color) !important;
      background-color: var(--primary-color) !important;
    }
  }
  .ant-pagination-item a {
    padding: 0.5rem;
  }
  .ant-pagination-item-link {
    line-height: 0;
  }
  .ant-pagination-options {
    color: @secondary-color;
    .ant-select-selector {
      border-radius: 0.5rem;
    }
    margin-left: 0;
  }
  .ant-pagination-item-active a {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    font-weight: 600;
    font-size: 1rem;
  }
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    height: 0;
  }
  .ant-pagination-item-link-icon {
    position: relative;
    top: -0.438rem;
  }
  .ant-pagination-options-quick-jumper {
    input {
      border-radius: 0.5rem;
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 0.063rem solid @color-dark-white;
      border-radius: 0.5rem;
    }
  }
`;

export default StyledPagination;

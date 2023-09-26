import styled from '@emotion/styled';
import { Drawer, Spin } from 'antd';

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-body,
  .ant-drawer-header {
    background: var(--primary-color);
  }
  .ant-drawer-body,
  .ant-drawer-header {
    padding: 16px;
  }
`;

export const ConversationWrapper = styled.div`
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-track {
      background: var(--secondary-color);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color-neutral-3);
    }
  }
`;

export const SpinStyled = styled(Spin)`
  .ant-spin-dot-item {
    background-color: var(--secondary-color);
  }
`;

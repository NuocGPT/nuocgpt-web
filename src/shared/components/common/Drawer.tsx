import type { ReactNode } from 'react';
import { Drawer as DrawerAndt } from 'antd';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
function Drawer({ visible, onClose, title, children }: Props) {
  return (
    <DrawerAndt
      destroyOnClose
      onClose={onClose}
      title={title}
      visible={visible}
      width="560"
    >
      {children}
    </DrawerAndt>
  );
}
export default Drawer;

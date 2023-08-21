import type { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  count?: number;
}
function CountWithIcon({ icon, count }: Props) {
  return (
    <>
      {icon}
      &nbsp;
      {count ?? 0}
    </>
  );
}

export default CountWithIcon;

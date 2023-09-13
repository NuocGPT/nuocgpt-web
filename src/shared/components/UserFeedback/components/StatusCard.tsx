import type { ReactNode } from 'react';
import { Typography } from 'antd';
import { StyledCard } from './styles';

interface Props {
  total?: number | string;
  label?: string;
  icon?: ReactNode;
}

function StatusCard({ total, label, icon }: Props) {
  return (
    <StyledCard className="w-1/2 rounded-xl" hoverable>
      <div className="flex justify-between">
        <div>
          <Typography.Text className="block text-xl font-semibold">
            {total}
          </Typography.Text>
          <Typography.Text>{label}</Typography.Text>
        </div>
        <div>{icon}</div>
      </div>
    </StyledCard>
  );
}

export default StatusCard;

import type { DeepPartial } from '@enouvo/react-uikit';
import type { AvatarProps } from 'antd';
import { Tooltip, Typography } from 'antd';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import type { User } from '#/src/interfaces/users';
import Avatar from './Avatar';

interface Props {
  user: DeepPartial<User>;
  isPersonAvatar?: boolean;
}

const { Paragraph } = Typography;

function UserInfo({
  user,
  isPersonAvatar,
  size = 45,
  ...rest
}: Props & AvatarProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <Typography className="flex gap-3">
      <Avatar
        isPersonAvatar={isPersonAvatar}
        size={size}
        src={user.avatar}
        {...rest}
      />
      <Typography>
        <Paragraph
          className="m-0 font-medium tracking-[0.00625rem] text-color-gray-10"
          ellipsis={{
            expandable: false,
            rows: 1,
            symbol: t('label.etc'),
          }}
        >
          <Tooltip className="font-medium" title={user.fullName ?? ''}>
            {user.fullName ?? ''}
          </Tooltip>
        </Paragraph>
        <Typography className="m-0 text-xs">
          <Paragraph
            className="m-0 max-w-[15rem] tracking-[0.025rem] text-color-gray-30"
            ellipsis={{
              expandable: false,
              rows: 1,
              symbol: t('label.etc'),
            }}
          >
            <Tooltip title={user.email ?? ''}>{user.email ?? ''}</Tooltip>
          </Paragraph>
        </Typography>
      </Typography>
    </Typography>
  );
}

export default UserInfo;

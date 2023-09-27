import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Tooltip, Typography } from 'antd';
import 'dayjs/locale/vi';
import { ReactComponent as MoreIcon } from '#/assets/svg/horizontal-more.svg';
import { ReactComponent as LogoutIcon } from '#/assets/svg/log-out.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { truncateText } from '#/shared/utils/tools';

interface Props {
  logout: () => void;
  defaultAvatar?: string;
  email?: string;
}

function UserActions({ logout, defaultAvatar, email }: Props) {
  const { t } = useTypeSafeTranslation();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          className="m-0 flex items-center gap-2 p-0 text-left text-secondary-color"
          onClick={logout}
          size="small"
          type="text"
        >
          <LogoutIcon />
          <span className="ml-1">{t('button.logout')}</span>
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      className="rounded-lg bg-primary-color-light-10 p-2 hover:cursor-pointer"
      menu={{ items }}
      overlayClassName="custom-background"
      placement="top"
      trigger={['click']}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Avatar size={24} src={defaultAvatar} />
          <Tooltip placement="left" title={email}>
            <Typography.Text className="flex-1 text-secondary-color">
              {email && truncateText(email, 18)}
            </Typography.Text>
          </Tooltip>
        </div>
        <MoreIcon />
      </div>
    </Dropdown>
  );
}

export default UserActions;

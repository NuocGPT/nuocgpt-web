import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Typography } from 'antd';
import 'dayjs/locale/vi';
import { ReactComponent as DownIcon } from '#/assets/svg/arrow-down.svg';
import { ReactComponent as UpIcon } from '#/assets/svg/arrow-up.svg';
import { ReactComponent as EnglishFlagIcon } from '#/assets/svg/english-flag.svg';
import { ReactComponent as VietnamFlagIcon } from '#/assets/svg/vietnam-flag.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import i18n from '#/shared/i18n';
import { setLanguage } from '#/shared/utils/token';

interface Props {
  className?: string;
  authLayout?: boolean;
  extraClass?: string;
}

function ChangeLanguage({
  className,
  authLayout = false,
  extraClass = 'custom-background',
}: Props) {
  const { t } = useTypeSafeTranslation();
  const [isClicked, setIsClicked] = useState(false);
  const locale = localStorage.getItem('locale');

  const handleChangeLanguageEnglish = () => {
    i18n.changeLanguage('en');
    setLanguage('en');
    setIsClicked(false);
  };

  const handleChangeLanguageVietNamese = () => {
    i18n.changeLanguage('vi');
    setLanguage('vi');
    setIsClicked(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Text
          className="ml-1 flex items-center gap-2"
          onClick={handleChangeLanguageEnglish}
        >
          <EnglishFlagIcon />
          <span className={locale === 'en' ? 'font-bold' : ''}>
            {t('navigation.english')}
          </span>
        </Typography.Text>
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Text
          className="ml-1 flex items-center gap-2"
          onClick={handleChangeLanguageVietNamese}
        >
          <VietnamFlagIcon />
          <span className={locale === 'vi' ? 'font-bold' : ''}>
            {t('navigation.vietnamese')}
          </span>
        </Typography.Text>
      ),
    },
  ];

  return (
    <Dropdown
      className={`${className} p-2 hover:cursor-pointer`}
      destroyPopupOnHide
      menu={{ items }}
      overlayClassName={`${extraClass}`}
      placement="top"
      trigger={['click']}
    >
      <div
        className="flex items-center justify-between gap-2"
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="flex items-center gap-2">
          {locale === 'en' ? (
            <>
              <EnglishFlagIcon /> {t('navigation.english')}
            </>
          ) : (
            <>
              <VietnamFlagIcon />
              {t('navigation.vietnamese')}
            </>
          )}
        </div>
        {isClicked && !authLayout ? <UpIcon /> : <DownIcon />}
      </div>
    </Dropdown>
  );
}

export default ChangeLanguage;

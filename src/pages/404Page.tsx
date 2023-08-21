import { Button, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function NotFoundPage() {
  const { t } = useTypeSafeTranslation();

  return (
    <Result
      extra={
        <Link to="/">
          <Button type="primary">{t('button.backHome')}</Button>
        </Link>
      }
      status="404"
      subTitle={t('empty.page')}
      title={<Typography.Title level={1}>404</Typography.Title>}
    />
  );
}

export default NotFoundPage;

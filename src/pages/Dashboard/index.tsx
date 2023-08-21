import { PageContainer } from '@ant-design/pro-layout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import Statistic from './Statistic';

function Dashboard() {
  const { t } = useTypeSafeTranslation();
  return (
    <PageContainer
      header={{
        title: t('dashboards.overview'),
      }}
    >
      <Statistic />
    </PageContainer>
  );
}

export default Dashboard;

import { Card, Col, Row, Typography } from 'antd';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

const { Title, Text } = Typography;

function Statistic() {
  const { t } = useTypeSafeTranslation();

  return (
    <Row gutter={[24, 0]}>
      <Col className="mb-3" lg={6} sm={12} xs={24}>
        <Card>
          <Title level={4}>{t('dashboards.clients')}</Title>
          <Text className="text-2xl font-bold">{t('businesses.n/a')}</Text>
        </Card>
      </Col>
      <Col className="mb-3" lg={6} sm={12} xs={24}>
        <Card>
          <Title level={4}>{t('dashboards.company')}</Title>
          <Text className="text-2xl font-bold">{t('businesses.n/a')}</Text>
        </Card>
      </Col>
      <Col className="mb-3" lg={6} sm={12} xs={24}>
        <Card>
          <Title level={4}>{t('dashboards.leads')}</Title>
          <Text className="text-2xl font-bold">{t('businesses.n/a')}</Text>
        </Card>
      </Col>
      <Col className="mb-3" lg={6} sm={12} xs={24}>
        <Card>
          <Title level={4}>{t('dashboards.campaigns')}</Title>
          <Text className="text-2xl font-bold">{t('businesses.n/a')}</Text>
        </Card>
      </Col>
    </Row>
  );
}

export default Statistic;

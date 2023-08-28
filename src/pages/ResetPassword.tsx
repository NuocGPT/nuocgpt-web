import { Card, Row } from 'antd';
import AuthLayout from '#/shared/components/layout/AuthLayout';
// import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function ResetPassword() {
  // const { t } = useTypeSafeTranslation();

  return (
    <AuthLayout>
      <Row align="middle" className="h-full" justify="start">
        <Card className="w-full border-0 p-0">Reset password page</Card>
      </Row>
    </AuthLayout>
  );
}

export default ResetPassword;

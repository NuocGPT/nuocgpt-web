import { showError } from '@enouvo/react-uikit';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { DEFAULT_PASSWORD } from '#/shared/utils/constant';
import { setPassword } from '#/shared/utils/token';

interface SystemCode {
  code: string;
}

function SetPassword() {
  const { t } = useTypeSafeTranslation();

  const onFinish = (values: SystemCode) => {
    if (values.code === DEFAULT_PASSWORD) {
      setPassword('password');
      window.location.href = '/login';
    } else {
      showError(t('validateMessage.incorrectSystemCode'));
    }
  };

  return (
    <div className="m-auto my-8 max-w-screen-lg text-center">
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        {t('authentication.setSystemCode')}
      </Typography.Title>
      <div className="m-auto w-full max-w-screen-sm">
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Form.Item
                label={t('authentication.systemCode')}
                name="code"
                rules={[
                  {
                    message: t('validateMessage.validateSystemCode'),
                    required: true,
                    whitespace: true,
                  },
                ]}
              >
                <Input.Password
                  className="rounded-lg border-color-neutral-3"
                  placeholder={t('placeholder.systemCode')}
                  prefix={<LockSVG />}
                />
              </Form.Item>
            </Col>
            <Col className="mt-8" span={24}>
              <Form.Item>
                <Button
                  block
                  className="rounded-lg p-2 font-semibold text-secondary-color"
                  htmlType="submit"
                  type="primary"
                >
                  {t('button.ok')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default SetPassword;

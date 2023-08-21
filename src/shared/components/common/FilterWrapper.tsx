import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Row, Space } from 'antd';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props<Type> {
  onFilter: (values: Partial<Type>) => void;
  extraButton?: JSX.Element;
  setFilterBusinessTypes?: Dispatch<SetStateAction<string>>;
}

function FilterWrapper<Type>({
  onFilter,
  children,
  extraButton,
  setFilterBusinessTypes,
  ...props
}: PropsWithChildren<Props<Type>> & FormProps) {
  const { t } = useTypeSafeTranslation();
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    onFilter({});
    setFilterBusinessTypes?.('');
  };

  return (
    <Form
      className="flex items-center justify-between"
      form={form}
      onFinish={onFilter}
      {...props}
    >
      <Row className="w-full pr-6">
        <Col md={24} xl={19} xs={24} xxl={20}>
          <Row align="middle" gutter={10}>
            {children}
          </Row>
        </Col>
        <Col md={24} xl={5} xs={24} xxl={4}>
          <Space className="flex justify-end" size={4}>
            <Form.Item>
              <Button
                className="rounded-lg bg-color-gray-10 font-semibold text-cancel-color"
                htmlType="submit"
              >
                {t('button.filter')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="rounded-lg border-2 border-color-gray-10 font-semibold"
                onClick={onReset}
              >
                {t('button.clearFilter')}
              </Button>
            </Form.Item>
            {extraButton && <Form.Item>{extraButton}</Form.Item>}
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterWrapper;

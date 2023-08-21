import type { Ref } from 'react';
import React, { cloneElement, forwardRef, useEffect } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Modal, Typography } from 'antd';
import type { Store } from 'rc-field-form/es/interface';
import { useTranslation } from 'react-i18next';

export interface FormModalProps<UpsertDto, Values = Record<string, unknown>> {
  onSubmit: (values: UpsertDto) => void;
  onClose: () => void;
  children: React.ReactElement;
  selectedItem?: Values;
  initialValues?: Values;
  name: string;
  loading: boolean;
  width?: string | number;
  disabled?: boolean;
}

export type FormModalRef = FormInstance<Store>;

export const FormModal = forwardRef(
  <UpsertDto,>(
    {
      onSubmit,
      onClose,
      loading,
      children,
      selectedItem,
      name,
      initialValues,
      width = '670',
      disabled = false,
    }: FormModalProps<UpsertDto>,
    ref: Ref<FormModalRef>,
  ) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const handleOk = () => {
      form.validateFields().then(values => {
        onSubmit({ id: initialValues?.id, ...values });
      });
    };

    const handleAfterClose = () => {
      form.resetFields();
    };

    useEffect(() => {
      setTimeout(() => {
        form.resetFields();
      });
    }, [selectedItem, form]);

    return (
      <Modal
        afterClose={handleAfterClose}
        destroyOnClose
        footer={[
          <>
            <Typography className="flex justify-end">
              <Button
                block
                className="w-20 rounded-lg bg-color-neutral-20 text-sm font-bold"
                key="back"
                onClick={onClose}
                type="ghost"
              >
                {t('button.cancel')}
              </Button>
              <Button
                block
                className="w-20 rounded-lg text-sm font-bold text-secondary-color"
                disabled={disabled}
                htmlType="submit"
                key="submit"
                loading={loading}
                onClick={handleOk}
                type="primary"
              >
                {initialValues?.id ? t('button.save') : t('button.create')}
              </Button>
            </Typography>
          </>,
        ]}
        onCancel={onClose}
        onOk={handleOk}
        title={selectedItem?.id ? t(`${name}.update`) : t(`${name}.create`)}
        visible={!!selectedItem}
        width={width}
      >
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          ref={ref}
        >
          {cloneElement(children, {
            initialValues,
          })}
        </Form>
      </Modal>
    );
  },
) as <UpsertDto extends Record<string, unknown>>(
  props: FormModalProps<UpsertDto> & { ref?: Ref<FormModalRef> },
) => JSX.Element;

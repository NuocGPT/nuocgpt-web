import type { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import type { FormItemProps } from 'antd';
import { Form, Input, Select, Space } from 'antd';
import type { FlagIconCode } from 'react-flag-kit';
import { FlagIcon } from 'react-flag-kit';
import nationalities from '#/shared/constants/nationalities';

const { Option } = Select;

const DEFAULT_PHONE_CODE = '+84';

const PhoneNumberInputWrapper = styled.div`
  .ant-select-selector {
    height: 40px !important;
    padding-top: 4px !important;
    padding-bottom: 8px !important;
    border-color: var(--color-neutral-3) !important;
    border-top-left-radius: 0.75rem !important;
    border-bottom-left-radius: 0.75rem !important;
  }
`;

interface Props extends FormItemProps {
  size?: 'large' | 'middle' | 'small';
  placeholder?: string;
  defaultPhoneCode?: string;
  setPhoneNumber?: Dispatch<SetStateAction<string>>;
}

export function PhoneNumberInput({
  size = 'middle',
  placeholder,
  defaultPhoneCode,
  setPhoneNumber,
  ...props
}: Props) {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      <PhoneNumberInputWrapper>
        <Space.Compact className="flex">
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldsValue }) => {
              const prefixPhoneNumber =
                getFieldValue('prefixPhoneNumber') ||
                defaultPhoneCode ||
                DEFAULT_PHONE_CODE;

              return (
                <Select
                  className="pointer-events-none w-[7.125rem] border-color-neutral-3"
                  defaultValue={prefixPhoneNumber}
                  onChange={e => {
                    setFieldsValue({
                      prefixPhoneNumber: e,
                    });
                  }}
                  size={size}
                >
                  {nationalities.map(item => (
                    <Option
                      key={item.alpha3code}
                      size={size}
                      value={item.phoneCode}
                    >
                      <div className="flex w-5 items-center">
                        <FlagIcon
                          className="mr-2 h-4 w-6"
                          code={item.alpha2code.toUpperCase() as FlagIconCode}
                        />
                        {item.alpha2code}
                      </div>
                    </Option>
                  ))}
                </Select>
              );
            }}
          </Form.Item>
          <Form.Item initialValue={props.initialValue} noStyle shouldUpdate>
            {({ getFieldValue, setFieldsValue, validateFields }) => {
              const prefixPhoneNumber =
                getFieldValue('prefixPhoneNumber') || DEFAULT_PHONE_CODE;

              return (
                <Input
                  className="rounded-r-xl border-color-neutral-3 py-2"
                  onChange={e => {
                    const inputValue = e.target.value;
                    setPhoneNumber?.(inputValue);

                    setFieldsValue({
                      [props.name as string]: `${prefixPhoneNumber}${inputValue}`,
                    });
                    validateFields([props.name as string]);
                  }}
                  onKeyDown={e =>
                    ['e', 'E'].includes(e.key) && e.preventDefault()
                  }
                  placeholder={placeholder}
                  prefix={
                    <span className="text-gray-400">{prefixPhoneNumber}</span>
                  }
                  size={size}
                  value={getFieldValue(props.name as string)}
                />
              );
            }}
          </Form.Item>
        </Space.Compact>
      </PhoneNumberInputWrapper>
    </Form.Item>
  );
}

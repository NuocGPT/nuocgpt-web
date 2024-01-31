import type { Rule } from 'antd/lib/form';
import i18n from '../i18n';

export const validateRegex = {
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%()*#?&^<>])[A-Za-z\d@$!%()*#?&^<> ]{8,}$/,
  phoneNumber:
    /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
  username: /^[\w.%+_//:a-zA-Z0-9-]{0,}$/,
};

export const getPasswordRules = () => [
  {
    message: i18n?.t('authentication.passwordValidator'),
    pattern: validateRegex.password,
  },
];

export const getConfirmPasswordRules = (name = 'password'): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue(name) === value) {
        return Promise.resolve();
      }
      return Promise.reject(i18n?.t('authentication.confirmPasswordNotMatch'));
    },
  }),
];

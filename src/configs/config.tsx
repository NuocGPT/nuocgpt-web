import Logo from '#/assets/images/logo-new.png';

export const formConfig = {
  requiredMark: true,
  validateMessages: {
    pattern: {
      mismatch: '${label} is not valid!',
    },
    required: 'Please enter ${label}!',
    string: {
      max: '${label} must be maximum ${max} characters.',
      min: '${label} must be miximun ${min} characters.',
    },
    types: {
      number: '${label} must be number.',
    },
    whitespace: ' ${label} cannot be empty!',
  },
};

export const appConfig = {
  logo: Logo,
  title: '',
};

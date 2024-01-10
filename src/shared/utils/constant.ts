export const LOCAL_STORAGE_TOKEN_KEY = 'nuoc_gpt_access_token';
export const LOCAL_STORAGE_REFRESH_TOKEN_KEY = '';
export const LOCAL_STORAGE_IS_PASSWORD = 'password';
export const LOCAL_STORAGE_AVATAR = 'avatar';
export const LOCAL_STORAGE_LANGUAGE = 'locale';

export const DEFAULT_COLOR_VALUE = '#ffffff';

export const DEFAULT_PASSWORD = 'Nuocgpt@123';

export const IMAGE_TYPES = 'image/jpeg,image/png,image/jpg';
export const DOCUMENT_TYPES = 'application/json,text/plain';

export const DEFAULT_AVATAR =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

export const LINKS = {
  fulbright: 'https://fulbright.edu.vn/vi',
  gates: 'https://www.gatesfoundation.org/',
  nuoc: 'https://www.nuoc.solutions',
};

export const LIMIT_TRUNCATE_TEXT = 100;

export const TAG_MESSAGES = [
  {
    text: 'feedback.false',
    value: 'false',
  },
  {
    text: 'feedback.harmful',
    value: 'harmful',
  },
  {
    text: 'feedback.notHelpful',
    value: 'not-helpful',
  },
];

export const STREAM_MESSAGES_API = `${import.meta.env.VITE_BASE_URL}/messages`;

// Get the month name for the message's date
export const MONTH_NAMES = [
  'months.january',
  'months.february',
  'months.march',
  'months.april',
  'months.may',
  'months.june',
  'months.july',
  'months.august',
  'months.september',
  'months.october',
  'months.november',
  'months.december',
];

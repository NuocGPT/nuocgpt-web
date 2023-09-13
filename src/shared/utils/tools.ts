import { notification } from 'antd';
import deburr from 'lodash-es/deburr';
import { LIMIT_TRUNCATE_TEXT } from './constant';

export const formatFileName = (name: string | undefined) =>
  name?.replace(/_| /g, '').trim().toLowerCase();

export const convertFirstLetterToUpperCase = (text: string) =>
  text
    .replace(/_+|[ ]+/gi, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();

export const convertLetterToUnderscoreUpperCase = (text: string) =>
  text
    .replace(/' '+|[ ]+/gi, '_')
    .toUpperCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();

export const convertToSlug = (text: string) => {
  let slug = text.toLowerCase().trim();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(
    /`|~|!|@|#|\||\$|%|\^|&|\*|\(|\)|\+|=|,|\.|\/|\?|>|<|'|"|:|;|_|-/gi,
    '',
  );
  slug = slug.replace(/ +/gi, ' ');
  slug = slug.replace(/ /gi, '-');
  slug = `@${slug}@`;
  slug = slug.replace(/@-|-@|@/gi, '');
  return slug;
};

export const searchString = (dataString: string, keySearch: string) =>
  deburr(dataString)
    .toLocaleLowerCase()
    .includes(deburr(keySearch).toLocaleLowerCase());

export const convertValueStringToBoolean = (value: string): boolean =>
  value === 'true';

export const getFileName = (url: string) =>
  url.split('/').pop()?.split(/-(.*)/)[1];

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const sortNumberData = (a: number, b: number) => a - b;

export const capitalizeFirstLetter = (string: string) =>
  string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase();

export const showSuccess = (message: string, description?: string) =>
  notification.success({
    description,
    message,
  });

export const showNotifyError = (message: string, description?: string) => {
  notification.error({
    description,
    message,
  });
};

export const isLengthEqual = (array1: unknown[], array2: unknown[]) =>
  array1.length === array2.length;

export const addSpaceBetween = (text: string) =>
  text.replace(/([?<!^a-z])([A-Z])/g, '$1 $2');

export const getQueryParamsFromUrl = (searchStr: string) =>
  JSON.parse(
    `{"${decodeURI(searchStr)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );

export const truncateText = (text: string, limit = LIMIT_TRUNCATE_TEXT) => {
  if (text?.length < limit) return text;
  return `${text?.substring(0, limit)}...`;
};

import type { UploadFile } from 'antd/lib/upload/interface';

export type ProgressFn = (percent: number) => void;

export interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

export interface Images {
  key?: string;
  url?: string;
}
export type TUploadFile = UploadFile & {
  response?: string;
};

export interface ICustomDate {
  day: number;
  month: number;
  year: number;
}

export interface ImageSize {
  width?: number | string;
  height?: number | string;
}

export interface MyWindow extends Window {
  pushLogin: () => void;
}

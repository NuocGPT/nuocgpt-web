import axios from 'axios';

export const getFileNameFromUrl = (url?: string | null) =>
  url?.split('/')?.pop();

export const getFileNameHeader = (disposition: string) => {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

  const matches = filenameRegex.exec(disposition);

  return matches?.[1]?.replace(/['"]/g, '');
};

export const downloadFileByURL = async (file?: {
  url?: string;
  fileName?: string;
}) =>
  new Promise(resolve => {
    if (file?.url) {
      try {
        axios
          .get(file.url, {
            responseType: 'blob',
          })
          .then(response => {
            const blob = response.data;
            if (!blob) resolve({ loading: false });
            const disposition = response.headers['content-disposition'];
            const restFileName =
              file.fileName ||
              getFileNameHeader(disposition) ||
              getFileNameFromUrl(file.url) ||
              'example';

            const a = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = restFileName;
            a.click();
            window.URL.revokeObjectURL(url);
            resolve({ loading: false });
          })
          .finally(() => {
            resolve({ loading: false });
          });
      } catch {
        resolve({ loading: false });
      }
    } else {
      resolve({ loading: false });
    }
  });

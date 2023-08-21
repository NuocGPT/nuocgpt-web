import { Loading } from '@enouvo/react-uikit';
import type { ImageProps } from 'antd';
import { Image as AntdImage } from 'antd';

interface Props {
  url: string | undefined;
}

function Image({ url, ...rest }: Props & ImageProps) {
  return (
    <AntdImage
      placeholder={<Loading />}
      preview={{
        src: url,
      }}
      src={url}
      {...rest}
    />
  );
}

export default Image;

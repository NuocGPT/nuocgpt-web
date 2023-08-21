import type { AvatarProps } from 'antd';
import { Avatar as AntdAvatar } from 'antd';
import DefaultPersonAvatar from '#/assets/images/avatar.png';
import DefaultImage from '#/assets/images/imageDefault.png';

interface Props {
  name?: string | null | undefined;
  isPersonAvatar?: boolean;
}

function Avatar({
  src,
  name,
  isPersonAvatar = true,
  ...rest
}: AvatarProps & Props) {
  const defaultAvatar = isPersonAvatar ? DefaultPersonAvatar : DefaultImage;

  return (
    <AntdAvatar src={src ?? defaultAvatar} {...rest}>
      {name?.slice(0, 1)}
    </AntdAvatar>
  );
}

export default Avatar;

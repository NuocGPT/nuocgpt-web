import type { CSSProperties } from 'react';
import { Image } from 'antd';
import { PhotoItemWrapper } from './styles';

interface Props {
  onPreview: () => void;
  image?: string;
  subCount?: number;
  className?: string;
  style?: CSSProperties;
}

function PhotoItem({ onPreview, image, subCount, className, style }: Props) {
  return (
    <PhotoItemWrapper className={className || ''} style={style}>
      <div className="photo-item">
        <div className="photo-item-main">
          <Image
            alt="photo-item"
            className="image-photo-item"
            role="presentation"
            src={image}
          />
          {subCount && (
            <div
              className="photo-overlay"
              onClick={onPreview}
              role="presentation"
            >
              <span className="pics-number">{`+ ${subCount}`}</span>
            </div>
          )}
        </div>
      </div>
    </PhotoItemWrapper>
  );
}

export default PhotoItem;

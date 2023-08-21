import { useMemo, useRef } from 'react';
import Empty from 'antd/es/empty';
import take from 'lodash-es/take';
import type { ModalReviewForwardHandle } from './interface';
import ModalPreview from './ModalPreview';
import PhotoItem from './PhotoItem';
import { GridPhotosWrapper } from './styles';

interface Props {
  images?: (string | undefined)[] | null;
  picsShowing?: number;
  isShowAll?: boolean;
  isShowEmpty?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
}

function GridPhotos({
  images = [],
  picsShowing,
  isShowAll = true,
  isShowEmpty = true,
  maxWidth,
  minWidth,
}: Props) {
  const modalPreviewRef = useRef<ModalReviewForwardHandle>(null);

  const onToggle = (index: number) => {
    modalPreviewRef.current?.open(images as string[]);
    setTimeout(() => {
      modalPreviewRef.current?.goToImage(index);
    }, 100);
  };

  const restImageObj = useMemo(() => {
    if (!isShowAll)
      return {
        remainImages: take(images),
        subCount: 0,
      };
    if (picsShowing) {
      const cloneImage = [...(images || [])];
      const restSubImage = cloneImage.splice(picsShowing);
      return {
        remainImages: cloneImage,
        subCount: restSubImage.length,
      };
    }
    return {
      remainImages: images,
      subCount: 0,
    };
  }, [images, picsShowing]); // eslint-disable-line

  const { subCount, remainImages } = restImageObj;
  const lastIndexRemain = (remainImages?.length || 0) - 1;

  return (
    <>
      <GridPhotosWrapper>
        {isShowEmpty && lastIndexRemain < 0 ? (
          <Empty />
        ) : (
          remainImages?.map((image, index) => {
            if (subCount && index === lastIndexRemain)
              return (
                <PhotoItem
                  image={image}
                  key={String(index)}
                  onPreview={() => onToggle(index)}
                  style={{ maxWidth, minWidth }}
                  subCount={subCount}
                />
              );
            return (
              <PhotoItem
                image={image}
                key={String(index)}
                onPreview={() => onToggle(index)}
                style={{ maxWidth, minWidth }}
              />
            );
          })
        )}
      </GridPhotosWrapper>
      <ModalPreview ref={modalPreviewRef} />
    </>
  );
}

export default GridPhotos;

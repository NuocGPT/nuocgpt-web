import type { ForwardedRef } from 'react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import LeftCircleFilled from '@ant-design/icons/lib/icons/LeftCircleFilled';
import RightCircleOutlined from '@ant-design/icons/lib/icons/RightCircleFilled';
import { Carousel, Image, Modal } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
import type { ModalReviewForwardHandle } from './interface';
import { ModalContentStyles } from './styles';

function ModalPreview(
  _props: unknown,
  ref: ForwardedRef<ModalReviewForwardHandle>,
) {
  const [visible, setVisible] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const carouselRef = useRef() as React.MutableRefObject<CarouselRef>;

  useImperativeHandle(ref, () => ({
    goToImage: index => {
      carouselRef.current.goTo(index);
    },
    open: images => {
      setVisible(true);
      setImages(images);
    },
  }));

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Modal
      className="top-20"
      footer={null}
      onCancel={handleCancel}
      visible={visible}
      width={800}
    >
      <ModalContentStyles className="ml-[-1.5rem] mr-[-1.5rem] pt-[1.563rem]">
        {images.length > 1 && (
          <LeftCircleFilled
            className="left-arrow"
            onClick={() => carouselRef.current.prev()}
          />
        )}
        {images.length > 1 && (
          <RightCircleOutlined
            className="right-arrow"
            onClick={() => carouselRef.current.next()}
          />
        )}
        <Carousel draggable ref={carouselRef}>
          {images.length &&
            images.map((data, index) => (
              <div key={String(index)}>
                <Image
                  alt=""
                  className="w-full object-contain"
                  height={600}
                  src={data}
                  width={800}
                />
              </div>
            ))}
        </Carousel>
      </ModalContentStyles>
    </Modal>
  );
}

export default forwardRef(ModalPreview);

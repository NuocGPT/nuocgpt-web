import styled from '@emotion/styled';

export const PhotoItemWrapper = styled.div`
  min-width: 6.25rem;
  padding: 0 0.25rem 0;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  display: block;

  .photo-item {
    padding-top: 100%;
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
    .photo-item-main {
      .ant-image-img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        object-fit: cover;
        border-radius: 0.5rem;
      }
      position: absolute;
      inset: 0;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      z-index: 0;

      .photo-overlay {
        border-radius: 0.5rem;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: rgba(69, 158, 255, 0.6);
        cursor: pointer;
      }

      .pics-number {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
      }
    }
  }
`;

export const GridPhotosWrapper = styled.div`
  margin: -0.25rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .ant-image,
  .ant-image-mask {
    height: 100%;
    width: 100%;
  }
  .booking-antd-empty {
    width: 100%;
  }
`;

export const ModalContentStyles = styled.div`
  .booking-antd-carousel {
    height: 100%;

    .slick-slide {
      & > div {
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            object-fit: contain;
          }
        }
      }
    }
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    top: 50%;
    font-size: 1.75rem;
    z-index: 9;
    color: #ccc;
    opacity: 0.75;
  }

  .left-arrow {
    left: 0.625rem;
  }

  .right-arrow {
    right: 0.625rem;
  }
`;

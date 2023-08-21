export interface ModalReviewForwardHandle {
  open: (images: string[]) => void;
  goToImage: (index: number) => void;
}

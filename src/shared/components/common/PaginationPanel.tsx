import type { Dispatch, SetStateAction } from 'react';
import { Col, Row } from 'antd';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { scrollToTop } from '#/shared/utils/tools';
import StyledPagination from './StyledPagination';

interface Props {
  current: number;
  pageSize: number;
  total: number;
  showQuickJumper?: boolean;
  className?: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isScrollable?: boolean;
  showSizeChanger?: boolean;
  onShowSizeChange?: ((current: number, size: number) => void) | undefined;
}

function PaginationPanel({
  current,
  pageSize,
  total,
  showQuickJumper,
  setCurrentPage,
  className,
  isScrollable = true,
  showSizeChanger,
  onShowSizeChange,
}: Props) {
  const { t } = useTypeSafeTranslation();
  const handlePageChanging = (page: number, isScrollable: boolean) => {
    setCurrentPage(page);
    if (isScrollable) {
      scrollToTop();
    }
  };

  return (
    <Row className="w-full">
      <Col className={className} xs={24}>
        <StyledPagination
          current={current}
          locale={{
            items_per_page: t('common.page'),
            ['jump_to']: t('button.goTo'),
            page: '',
          }}
          onChange={page => handlePageChanging(page, isScrollable)}
          onShowSizeChange={onShowSizeChange}
          pageSize={pageSize}
          showQuickJumper={showQuickJumper}
          showSizeChanger={!!showSizeChanger}
          showTotal={(total, pageSize) =>
            `${pageSize[0]}-${pageSize[1]}/${total} ${t('common.results')}`
          }
          total={total}
        />
      </Col>
    </Row>
  );
}

export default PaginationPanel;

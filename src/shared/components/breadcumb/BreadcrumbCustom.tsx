import { Breadcrumb, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  data: {
    path?: string;
    title: string;
  }[];
  loading?: boolean;
}

function BreadcrumbCustom({ data, loading }: Props) {
  const { t } = useTypeSafeTranslation();

  return (
    <Skeleton loading={loading}>
      <Breadcrumb separator=">">
        {data.map((data, index) => (
          <Breadcrumb.Item key={String(index)}>
            {data.path ? (
              <Link to={data.path}>
                <span>{data.title}</span>
              </Link>
            ) : (
              <span>{data.title ? data.title : t('label.n/a')}</span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Skeleton>
  );
}

export default BreadcrumbCustom;

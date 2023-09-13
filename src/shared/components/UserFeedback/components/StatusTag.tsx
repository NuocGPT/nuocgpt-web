import { Tag, Typography } from 'antd';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-colour-sm.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-colour-sm.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  status?: string;
}

function StatusTag({ status }: Props) {
  const { t } = useTypeSafeTranslation();
  return (
    <Tag
      className="rounded-lg border-none px-2 py-1 font-bold"
      style={{
        background: status === 'thumbsUp' ? '#D5F2EA' : '#FFE1E1',
        color: status === 'thumbsUp' ? '#049E66' : '#D53A3A',
      }}
    >
      {status === 'thumbsUp' ? (
        <Typography.Text className="flex items-center gap-1 text-success-color">
          <LikeIcon />
          {t('feedback.like')}
        </Typography.Text>
      ) : (
        <Typography.Text className="flex items-center gap-1 text-error-color">
          <DislikeIcon />
          {t('feedback.dislike')}
        </Typography.Text>
      )}
    </Tag>
  );
}

export default StatusTag;

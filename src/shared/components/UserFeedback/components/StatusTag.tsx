import { Tag, Typography } from 'antd';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-colour-sm.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-colour-sm.svg';
import { Rating } from '#/services/feedbacks/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  status?: string;
}

function StatusTag({ status }: Props) {
  const { t } = useTypeSafeTranslation();
  return (
    <Tag
      className={`rounded-lg border-none px-2 py-1 font-bold ${
        status === Rating.thumbsUp
          ? 'bg-success-color-soft'
          : 'bg-error-color-soft'
      }`}
    >
      {status === Rating.thumbsUp ? (
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

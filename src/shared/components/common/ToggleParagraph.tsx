import { useState } from 'react';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  description?: string | null;
  row: number;
  rowSize?: number;
  className?: string;
}

export default function ToggleParagraph({
  description,
  row,
  rowSize = 60,
  className,
}: Props) {
  const { t } = useTypeSafeTranslation();
  const [ellipsis, setEllipsis] = useState(true);
  const totalCharacters = row * rowSize;

  return (
    <div className={className}>
      {description && description.length > totalCharacters ? (
        <p>
          {ellipsis ? description.substring(0, totalCharacters) : description}
          <a className="primary" onClick={() => setEllipsis(!ellipsis)}>
            {ellipsis ? t('button.readMore') : t('button.readLess')}
          </a>
        </p>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}

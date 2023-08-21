import type { ReactNode } from 'react';
import type { TranslationKeys } from '#/generated/translationKeys';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  title: TranslationKeys;
  description?: TranslationKeys;
  className?: string;
  extraAction?: ReactNode;
}

function PageTitle({ title, description, extraAction, className }: Props) {
  const { t } = useTypeSafeTranslation();
  return (
    <div className={`m-8 flex h-fit w-full items-center ${className}`}>
      <div className="flex flex-1 flex-col text-color-gray-10">
        <div className="text-3xl font-bold">{t(title)}</div>
        {description && (
          <div className="whitespace-pre-line text-sm font-bold">
            {t(description)}
          </div>
        )}
      </div>

      <div className="mb-2 ml-4">{extraAction}</div>
    </div>
  );
}

export default PageTitle;

import { useEffect, useState } from 'react';
import { Popover, Typography } from 'antd';
import { SketchPicker } from 'react-color';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { DEFAULT_COLOR_VALUE } from '#/shared/utils/constant';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  const { t } = useTypeSafeTranslation();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(value);

  useEffect(() => {
    setSelectedColor(value);
  }, [value]);

  return (
    <Typography
      className={`flex items-center justify-between rounded-lg ${
        !!selectedColor && `h-10 border-[0.0625rem] border-color-dark-white`
      }`}
    >
      <Typography className="flex flex-1 flex-col">
        <Popover
          content={
            <SketchPicker
              color={selectedColor ?? 'var(--surface-primary)'}
              onChangeComplete={color => {
                onChange?.(color.hex);
                setSelectedColor(color.hex);
              }}
            />
          }
          trigger="click"
        >
          <Typography
            className={`flex ${
              selectedColor ? 'ml-1 h-7' : 'h-10'
            } w-full items-center justify-center rounded-lg border-[0.0625rem] border-color-dark-white hover:border-primary-color`}
            style={{ backgroundColor: selectedColor ?? DEFAULT_COLOR_VALUE }}
          />
          {!selectedColor?.toUpperCase() && (
            <p className="absolute left-3 top-[0.575rem] m-0 text-color-gray-40">
              {t('placeholder.selectTheColor')}
            </p>
          )}
        </Popover>
      </Typography>
      {!!selectedColor && (
        <p className="mx-2 mt-3 text-sm text-color-gray-10">
          {selectedColor.toUpperCase()}
        </p>
      )}
    </Typography>
  );
}

export default ColorPicker;

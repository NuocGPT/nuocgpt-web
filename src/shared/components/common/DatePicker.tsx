import generatePicker from 'antd/es/date-picker/generatePicker';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import 'antd/es/date-picker/style/index';

dayjs.extend(weekday);
dayjs.extend(localeData);
export type Picker = 'date' | 'week' | 'month' | 'year' | 'time' | 'quarter';
export const DatePicker = generatePicker(dayjsGenerateConfig);

import dayjs from 'dayjs';
import type { Conversation } from '#/services/conversations/interfaces';
import i18n from '../i18n';
import { MONTH_NAMES } from './constant';

export const categorizedConversations = (
  conversations: Conversation[],
): { [date: string]: Conversation[] } => {
  const categorizedConversations: {
    [date: string]: Conversation[];
  } = {};

  const today = dayjs();

  conversations?.forEach(conversation => {
    const date = dayjs(conversation?.updated_at);
    const daysDifference = today.diff(date, 'day');

    let category = '';

    if (daysDifference === 0) {
      category = i18n.t('date.today');
    } else if (daysDifference === 1) {
      category = i18n.t('date.yesterday');
    } else if (daysDifference > 1 && daysDifference < 7) {
      category = i18n.t('date.previousTwoDays');
    } else if (
      daysDifference <= 7 ||
      (daysDifference > 7 && daysDifference <= 30)
    ) {
      category = i18n.t('date.previousSevenDays');
    } else if (daysDifference === 30) {
      category = i18n.t('date.previousThirtyDays');
    } else {
      const monthName = i18n.t(MONTH_NAMES[date.month()]);
      category = monthName;
    }

    if (!categorizedConversations[category]) {
      categorizedConversations[category] = [];
    }

    if (categorizedConversations) {
      categorizedConversations[category]?.push(conversation);
    }
  });

  return categorizedConversations;
};

export const sortByDate = (data?: Conversation[]) =>
  data?.sort(
    (prev, next) =>
      Number(new Date(next.updated_at)) - Number(new Date(prev.updated_at)),
  ) ?? [];

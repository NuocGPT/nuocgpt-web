import type { Conversation } from '#/services/conversations/interfaces';
import i18n from '../i18n';
import { MONTH_NAMES } from './constant';

export const categorizedConversations = (
  conversations: Conversation[],
): { [date: string]: Conversation[] } => {
  const categorizedConversations: {
    [date: string]: Conversation[];
  } = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isWithinDays = (date: Date, days: number): boolean => {
    const diffInMilliseconds = today.getTime() - date.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return diffInDays <= days;
  };

  conversations?.forEach(conversation => {
    const date = new Date(conversation?.created_at);

    let category = '';

    if (isWithinDays(date, 0)) {
      category = i18n.t('date.today');
    } else if (isWithinDays(date, 1)) {
      category = i18n.t('date.yesterday');
    } else if (isWithinDays(date, 7)) {
      category = i18n.t('date.previousSevenDays');
    } else if (isWithinDays(date, 30)) {
      category = i18n.t('date.previousThirtyDays');
    } else {
      const monthName = MONTH_NAMES[date.getMonth()];

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
      Number(new Date(next.created_at)) - Number(new Date(prev.created_at)),
  ) ?? [];

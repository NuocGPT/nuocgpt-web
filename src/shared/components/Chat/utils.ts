export const formatResponse = (data: string) => {
  const hasNumberItem = data?.includes('1. **') || data?.includes(': 1.');

  const paragraphs = hasNumberItem ? data?.split(/\d+\.\s/) : data?.split('\n');

  return { hasNumberItem, paragraphs };
};

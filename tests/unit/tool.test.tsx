import dayjs from 'dayjs';
import {
  addSpaceBetween,
  capitalizeFirstLetter,
  convertFirstLetterToUpperCase,
  convertLetterToUnderscoreUpperCase,
  convertToSlug,
  convertValueStringToBoolean,
  formatFileName,
  isLengthEqual,
} from '#/src/shared/utils/tools';

describe('convertFirstLetterToUpperCase unit test', () => {
  test('should convert to a sentence case', () => {
    const text = ' _ to__day   i    am   very   happy_';
    const expectedResult = 'To Day I Am Very Happy';
    expect(convertFirstLetterToUpperCase(text)).toBe(expectedResult);
  });
});

describe('convertLetterToUnderscoreUpperCase unit test', () => {
  test('should return uppercase', () => {
    const initialValue = 'hard_work';
    const expectedResult = 'HARD_WORK';

    expect(convertLetterToUnderscoreUpperCase(initialValue)).toBe(
      expectedResult,
    );
  });
});

describe('formatFileName unit test', () => {
  test('should return a lower case name', () => {
    const text = '  _node___  javascript_   ';
    const expectedResult = 'nodejavascript';
    expect(formatFileName(text)).toBe(expectedResult);
  });
});

describe('convertToSlug unit test', () => {
  test('should return a slug', () => {
    const text = '  _Node___  javasCript_  123 ';
    const expectedResult = 'node-javascript-123';
    expect(convertToSlug(text)).toBe(expectedResult);
  });

  test('should return a slug', () => {
    const text = '  ### _Node___ ---+ $$$ javasCript_  123 ';
    const expectedResult = 'node-javascript-123';
    expect(convertToSlug(text)).toBe(expectedResult);
  });
});

describe('convertValueStringToBoolean unit test', () => {
  test('should return true', () => {
    const text = 'true';
    const expectedResult = true;
    expect(convertValueStringToBoolean(text)).toBe(expectedResult);
  });

  test('should return false', () => {
    const text = 'false';
    const expectedResult = false;
    expect(convertValueStringToBoolean(text)).toBe(expectedResult);
  });
});

describe('capitalizeFirstLetter unit test', () => {
  test('should return a capitalize first letter sentence', () => {
    const text = '    you could look at the output of';
    const expectedResult = 'You could look at the output of';
    expect(capitalizeFirstLetter(text)).toBe(expectedResult);
  });
});

dayjs().hour = jest.fn();
dayjs().minute = jest.fn();

describe('isLengthEqual function', () => {
  it('should return true if two arrays have the same length', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];
    expect(isLengthEqual(arr1, arr2)).toBe(true);
  });

  it('should return true if both arrays are empty', () => {
    const arr1 = [] as unknown[];
    const arr2 = [] as unknown[];
    expect(isLengthEqual(arr1, arr2)).toBe(true);
  });

  it('should return false if two arrays have different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b'];
    expect(isLengthEqual(arr1, arr2)).toBe(false);
  });
});

describe('addSpaceBetween', () => {
  it('adds space between words correctly', () => {
    expect(addSpaceBetween('helloWorld')).toBe('hello World');
    expect(addSpaceBetween('oneTwoThree')).toBe('one Two Three');
  });

  it('does not add space before the first word', () => {
    expect(addSpaceBetween('HelloWorld')).toBe('Hello World');
  });

  it('returns original string if it does not match the pattern', () => {
    expect(addSpaceBetween('Hello World')).toBe('Hello World');
    expect(addSpaceBetween('helloWorld123')).toBe('hello World123');
  });

  it('handles an empty string', () => {
    expect(addSpaceBetween('')).toBe('');
  });

  it('handles a string with a single word', () => {
    expect(addSpaceBetween('Hello')).toBe('Hello');
  });

  it('handles a string with multiple spaces between words', () => {
    expect(addSpaceBetween('Hello    World')).toBe('Hello    World');
  });

  it('handles a string with special characters', () => {
    expect(addSpaceBetween('Hello!World')).toBe('Hello! World');
    expect(addSpaceBetween('Hello-World')).toBe('Hello-World');
  });
});

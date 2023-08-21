import '@testing-library/jest-dom/extend-expect';

jest.mock('#/shared/utils/constant', () => ({
  ['FILTER_FIELDS']: {
    business: 'Business',
    businessPlan: 'BusinessPlan',
    businessUser: 'BusinessUser',
    event: 'Event',
    packageType: 'PackageType',
    permission: 'Permission',
    referenceData: 'ReferenceData',
    serviceGroup: 'ServiceGroup',
    subscription: 'Subscription',
  },
  ['FILTER_OPTION']: {
    businessTypeIds: 'businessTypeIds',
    eventTime: 'eventTime',
  },
  ['TIME_ZONE']: 7,
  env: {
    ['VITE_APP_BUSINESS_CONFIG_URL']: 'staging.smartos.space',
    ['VITE_APP_RESIZE_IMAGE_URL']: 'key',
  },
}));

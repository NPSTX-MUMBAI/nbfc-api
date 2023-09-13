import { STATUS_CODES } from 'http';

export const response = {
  Success: 'success' + '-' + `${STATUS_CODES[201]}`,
  Failed: 'failed' + '-' + `${STATUS_CODES[404]}`,
  Error: 'something went wrong' + '-' + `${STATUS_CODES[500]}`,
  NotFound: 'Id not found' + '-' + `${STATUS_CODES[403]}`,
  RemovedSuccessFully: 'removed successfully' + '-' + `${STATUS_CODES[200]}`,
};

export const serviceConstants = {
  common: {
    service: 'commonService',
  },
};

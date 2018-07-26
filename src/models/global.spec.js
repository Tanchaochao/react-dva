/* eslint-disable no-undef, no-underscore-dangle, no-unused-expressions */
import dva from 'dva';
import createLoading from 'dva-loading';
import * as homeService from '../services/service';
import globalModel from './global';

describe('globalModel', () => {
  let app;
  beforeAll(() => {
    app = dva();
    app.use(createLoading());
    app.model(globalModel);
    app.router(() => 1);
    app.start();
  });

  describe('effects', () => {
    test('should put the empty chain info into state when api call failed', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          code: -1,
        });
      });
      homeService.fetchChainInfo = mockFn;
      const dispatcher = app._store.dispatch({ type: 'global/fetch' });

      return dispatcher.then(() => {
        expect(app._store.getState().global.chainInfo).toEqual({});
      });
    });
    test('should put the correct chain info into state when api call success', () => {
      const mockFn = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          code: 0,
          msg: 'Success',
          data: {
            server_version: '5875549c',
            chain_id: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
            head_block_num: 42,
            last_irreversible_block_num: 41,
            last_irreversible_block_id: '00000029c144554c8eabf96d18f4123033ff38db15750ded8059502c1e9e196f',
            head_block_id: '0000002aa14816a123530fe14ea41559e003ff97b5f8089610f73adc3b104dc0',
            head_block_time: '2018-07-24T02:55:10.500',
            head_block_producer: 'eosio',
            virtual_block_cpu_limit: 208356,
            virtual_block_net_limit: 1092462,
            block_cpu_limit: 199900,
            block_net_limit: 1048576,
          },
        });
      });

      homeService.fetchChainInfo = mockFn;
      const dispatcher = app._store.dispatch({ type: 'global/fetch' });

      return dispatcher.then(() => {
        expect(app._store.getState().global.chainInfo).toEqual({
          blockProducer: 'eosio',
          headBlockNum: 42,
          headBlockTime: '2018-07-24T02:55:10.500',
        });
      });
    });
  });
});

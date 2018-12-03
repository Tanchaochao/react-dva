const Mock = require('mockjs');
const pdfCoordinate = require('./data/pdfCoordinate');
const extractionResults = require('./data/extractionResults');
const imgs = require('./data/imgs');
const sopRules = require('./data/sopRules');

const { Random } = Mock;
module.exports = () => {
  const data = {
    'sops|2-60': [
      {
        'id|+1': 1,
        name: () => Random.title(),
        detail: '',
        result: '',
        'status|+1': 0,
        generatePdfParsedResult: {
          imgs,
          coordinate: pdfCoordinate,
        },
        extractionResponse: {
          extractionResults,
          imgs,
        },
        sopRules,
      },
    ],
    datasheets: [],
    tasks: require('./data/tasks'),
  };

  return Mock.mock(data);
};

const assert = require('assert');

var goRankTypes = { 'k': 0, 'd': 1, 'p': 2 };
function goRankSort(a, b) {
  var aRankType = goRankTypes[a.substr(a.length -1)];
  var bRankType = goRankTypes[b.substr(b.length -1)];
  var aRank = parseInt(a.substr(0, a.length - 1));
  var bRank = parseInt(b.substr(0, b.length - 1));
  return ((aRankType < bRankType)
    ? 1
    : (
      (aRankType > bRankType)
      ? -1
      // dan/pro ranks go upwards, kyu ranks go downwards :)
      : ((aRankType === 0) ? aRank - bRank : bRank - aRank)
    )
  );
};

const unsortedRanks = [
  '12k',
  '2p',
  '3d',
  '4p',
  '3k',
  '23k',
  '4p',
  '1k',
  '14k',
  '5p',
];

const sortedRanks = [
  '5p',
  '4p',
  '4p',
  '2p',
  '3d',
  '1k',
  '3k',
  '12k',
  '14k',
  '23k',
];

assert.deepEqual(unsortedRanks.sort(goRankSort), sortedRanks);

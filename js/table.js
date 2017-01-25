jQuery(document).ready(function($) {
  var pMap = { 'First week': 1, 'Weekend tournament': 2, 'Second week': 3 };
  var goRankTypes = { 'k': 0, 'd': 1, 'p': 2 };
  var goRankSort = function(a, b) {
    var aRankType = goRankTypes[a.substr(a.length -1)];
    var bRankType = goRankTypes[b.substr(b.length -1)];
    var aRank = parseInt(a.substr(0, a.length - 1));
    var bRank = parseInt(b.substr(0, b.length - 1));
    return ((aRankType < bRankType)
      ? 1
      : ((aRankType > bRankType) ? -1 : aRank - bRank)
    );
  };

  var table = $('.pdb-list table')[0];
  if (table) {
    var tbody = $(table).find('tbody')[0];
    var thead = $(table).find('thead')[0];
    $(thead).find('th.grade').click(function () {
      $(table).find('td.grade-field')
        .sort(function(a, b) {
          return goRankSort(a.textContent, b.textContent);
        })
        .each(
          function(i, e) { $(tbody).append($(e).parent()); }
        );
    });
    $(table).find('td.participation-field').each(function(i, e) {
      $(e).text(
        $(e).text().trim().split(', ').map(p => pMap[p]).join()
      )
    });
  }
});

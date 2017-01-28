jQuery(document).ready(function($) {
  var pMap = { 'First week': 1, 'Weekend tournament': 2, 'Second week': 3 };
  var goRankTypes = { 'k': 1, 'd': 2, 'p': 3 };
  var goRankSort = function(a, b) {
    var aRankType = goRankTypes[a.substr(a.length -1)];
    var bRankType = goRankTypes[b.substr(b.length -1)];
    if (!aRankType) return 1;
    if (!bRankType) return -1;
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
  var flagDir = '/wp-content/plugins/wp-egdform/img/flags/';

  var table = $('.pdb-list table')[0];
  if (table) {
    var tbody = $(table).find('tbody')[0];
    var thead = $(table).find('thead')[0];
    $(thead).find('th.grade').click(function () {
      $(table).find('td.grade-field')
        .sort(function(a, b) {
          return goRankSort(a.textContent.trim(), b.textContent.trim());
        })
        .each(
          function(i, e) { $(tbody).append($(e).parent()); }
        );
    });
    $(table).find('td.participation-field').each(function(i, e) {
      $(e).text(
        $(e).text().trim().split(', ').map(p => pMap[p]).join()
      );
    });
    $(table).find('td.country-field').each(function(i, e) {
      var src = flagDir + $(e).text().trim().toLowerCase() + '.png';
      $(e).html($('<img src="' + src + '" />'));
    });
  }
});

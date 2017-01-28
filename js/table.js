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
    var box = '<div class="box" />';
    var activebox = '<div class="box active" />';
    $(table).find('td.participation-field').each(function(i, e) {
      var participation = $.map($(e).text().trim().split(', '), function(e) {
        return pMap[e];
      });
      console.log('p', participation);
      $(e).empty();
      $.each([1, 2, 3], function(i, p) {
        $(e).append($(participation.indexOf(p) >= 0 ? activebox : box));
      });
    });
    $(table).find('td.country-field').each(function(i, e) {
      var country = $(e).text().trim();
      var src = flagDir + country.toLowerCase() + '.png';
      $(e).html($('<img src="' + src + '" alt="' + country + '" />'));
    });
  }
});

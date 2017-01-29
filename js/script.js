jQuery(document).ready( function($) {
  var w = $('.pdb-signup');
  var y = $('.egd-search');
  if (w) {
    var registerForm = $(w.find('form')[0]);
    function autoFill(player) {
      registerForm.find('#pdb-egd_id')[0].value = player.Pin_Player;
      registerForm.find('#pdb-first_name')[0].value = player.Name;
      registerForm.find('#pdb-last_name')[0].value = player.Last_Name;
      registerForm.find('#pdb-country')[0].value = player.Country_Code;
      registerForm.find('#pdb-club')[0].value = player.Club;
      registerForm.find('#pdb-grade')[0].value = player.Grade;
    }
  }
  if (y) {
    var egdSearchBtn = $(y.find('#egd-find-id')[0]);
    var url = 'http://www.europeangodatabase.eu/EGD/GetPlayerDataByData.php';
    var list = $('#egd-search-results');
    var egdFName = y.find('#egd-first-name')[0];
    var egdLName = y.find('#egd-last-name')[0];
    var spinner = $(y.find('#edg-spinner')[0]);
    function search() {
      spinner.show();
      $.getJSON(
        url,
        { name: egdFName.value, lastname: egdLName.value },
        function(result) {
          list.empty().show();
          spinner.hide();
          $.each(result.players, function(i, player) {
            var text = player.Pin_Player + ', ';
            text += player.Real_Name + ' ' + player.Real_Last_Name + ', ';
            text += player.Grade + ', ';
            text += player.Club + ' ' + player.Country_Code;
            var li = $('<button class="egd-search-results__player">').text(text);
            li.appendTo(list);
            li.click(function() { autoFill(player); list.hide(); });
          });
        }
      );
    };
    egdSearchBtn.click(search);
  }
});

jQuery(document).ready(function($) {
    $('#participants-list-1 > table').DataTable( {
      "autoWidth": false,
      "columnDefs": [ {
        "targets": [2, 3, 5, 6],
        "orderable": false
      } ],
      "info": false,
      "paging": false,
      "searching": false
    });
});

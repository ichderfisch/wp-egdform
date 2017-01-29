jQuery(document).ready( function($) {
  var w = $('.pdb-signup');
  var y = $('.egd-search');
  if (w) {
    var registerForm = $(w.find('form')[0]);
    function setField(selector, value, readonly) {
      var els = registerForm.find(selector);
      if (els.length) {
        var el = els[0];
        el.value = value;
        if (readonly) $(el).attr('readonly', true);
      }
    }
    function autoFill(player) {
      setField('#pdb-egd_id', player.Pin_Player);
      setField('#pdb-first_name', player.Name, true);
      setField('#pdb-last_name', player.Last_Name, true);
      setField('#pdb-country', player.Country_Code);
      setField('#pdb-club', player.Club);
      setField('#pdb-grade', player.Grade);
      setField('#pdb-email', '');
      setField('#pdb-age_group', '');
    }
  }
  if (y) {
    var egdSearchBtn = $(y.find('#egd-find-id')[0]);
    var egdSearchByIdBtn = $(y.find('#egd-find-player')[0]);
    var url = 'http://www.europeangodatabase.eu/EGD/GetPlayerDataByData.php';
    var idUrl = 'http://www.europeangodatabase.eu/EGD/GetPlayerDataByPIN.php';
    var list = $('#egd-search-results');
    var egdFName = y.find('#egd-first-name')[0];
    var egdLName = y.find('#egd-last-name')[0];
    var egdID = y.find('#egd-id')[0];
    var spinner = $(y.find('#edg-spinner')[0]);
    function showList(result) {
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
    function search() {
      spinner.show();
      $.getJSON(
        url,
        { name: egdFName.value, lastname: egdLName.value },
        showList
      );
    };
    function searchById() {
      spinner.show();
      $.getJSON(
        idUrl,
        { pin: egdID.value },
        function(result) { showList({ players: [result] }); }
      );
    };
    egdSearchBtn.click(search);
    egdSearchByIdBtn.click(searchById);
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

// Wunderlist 2 Print Bookmarklet v0.1 by Fabian Beiner
(function() {
  var _wlUrl = location.href,
      _wlPrint = [],
      _wlTitle,
      _wlDate = new Date(),
      _wlMonth = _wlDate.getMonth() + 1,
      _wlDay = _wlDate.getDate();

  // Are there items to print?
  if ($(".tasks .task-item").length === 0) {
    alert("This to-do list contains no entries.");
    return false;
  }

  // Collect the required data.
  _wlTitle = $.trim($(".lists-scroll .active .title").text());
  $(".tasks .task-item").each(function(i, el) {
    _wlPrint[i] = new Object();
    _wlPrint[i].task = $.trim($(el).find(".title-wrapper .title").text());
    _wlPrint[i].important = ($(el).find(".task-starred").length) ? true : false;
    _wlPrint[i].due = $.trim($(el).find(".duedate").text()) || null;
  });

  // Create a blank page by removing everything and inserting my own styles.
  $("head link, head style, head script, body *").remove();
  $("<link rel='stylesheet' href='//fonts.googleapis.com/css?family=Open+Sans:400,700'>").appendTo("head");
  $("<style type='text/css'>*{margin:0;padding:0;border:0}body{line-height:1.5;font-family:'Open Sans',sans-serif;font-size:22px;}a{color:#2b96f1;text-decoration:none}a:hover,a:focus,a:active{text-decoration:underline}p{font-size:15px;text-align:center}h1{font-size:50px;text-align:center;font-weight:700;line-height:1.1;margin-bottom:8px}h2{font-size:20px;text-align:center;font-weight:400}ul{border:1px #ccc solid;padding:16px 30px 9px 24px;border-radius:10px;margin:43px 0 44px}li{list-style:none;margin-bottom:8px}li:before{content:'☐';margin-right:12px}#wlPrintBackLink{background:#f00;text-align:center;text-transform:uppercase;color:#000;padding:6px 0 7px;display:block;margin-bottom:39px}#wlPrintBackLink:hover,#wlPrintBackLink:focus,#wlPrintBackLink:active{text-decoration:none;color:#fff}</style>").appendTo("head");
  $("<style type='text/css' media='print'>#wlPrintBackLink{display:none}</style>").appendTo("head");

  // Now we rebuild the page for print.
  $('<a href="#" id="wlPrintBackLink" onclick="window.location.reload(); return false;">« Printed? Back to Wunderlist.</a>').appendTo("body");
  $("<h1>" + _wlTitle + "</h1>").appendTo("body");
  $("<h2>" + (_wlDay < 10 ? '0' : '') + _wlDay + "." + (_wlMonth < 10 ? '0' : '') + _wlMonth + "." + _wlDate.getFullYear() + "</h2>").appendTo("body");
  var _wlUl = $("<ul></ul>");
  $(_wlPrint).each(function(i, el) {
    var _wlLi = "";
    if (el.important) {
      _wlLi = _wlLi + "<b>";
    }
    _wlLi = _wlLi + el.task;
    if (el.important) {
      _wlLi = _wlLi + "</b>";
    }
    if (el.due) {
      _wlLi = _wlLi + " (<b>" + el.due + "</b>)";
    }
    $("<li>" + _wlLi + "</li>").appendTo(_wlUl);
  });
  _wlUl.appendTo("body");

  // Advertising. :D
  $('<p>These tasks were generated with <a href="https://www.wunderlist.com/">Wunderlist</a>.<br>Print bookmarklet by <a href="http://fabian-beiner.de/">Fabian Beiner</a>, see <a href="https://github.com/FabianBeiner/Wunderlist-2-Print-Bookmarklet">GitHub</a>.</p>').appendTo("body");

  // Print the page!
  window.print();
}());

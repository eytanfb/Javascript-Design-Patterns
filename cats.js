$(function() {
  var nextId = 1;
  var cats = [];

  var Cat = {
    timesClicked: 0,
    addClicked: function() {
      this.timesClicked++;
    }
  };

  var cat1 = Object.create(Cat);
  var cat2 = Object.create(Cat);
  var cat3 = Object.create(Cat);

  cats = [cat1, cat2, cat3];

  cats.forEach(function(cat) {
    $("#choices").append("<button class='catBtn' data-id='" + nextId + "'>Cat " + nextId + "</button>");
    nextId += 1;
  });

  $("#choices").on("click", '.catBtn', function() {
    var index = $(this).attr("data-id")-1;
    var cat = cats[index];
    cat.addClicked();
  });
});

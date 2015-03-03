var nextId = 1;
var cats = [];

var Cat = {
  timesClicked: 0,
  addClicked: function() {
    this.timesClicked++;
  },
  imageSrc: "",
  name: ""
};

var cat1 = Object.create(Cat);
cat1.imageSrc = "http://i.dailymail.co.uk/i/pix/2014/10/06/1412613364603_wps_17_SANTA_MONICA_CA_AUGUST_04.jpg";
cat1.name = "Cat 1";
var cat2 = Object.create(Cat);
cat2.imageSrc = "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg";
cat2.name = "Cat 2";
var cat3 = Object.create(Cat);
cat3.imageSrc = "http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg";
cat3.name = "Cat 3";

cats = [cat1, cat2, cat3];

var model = {
  currentCat: null,
  allCats: cats
}

var Octopus = {
  init: function() {
    model.currentCat = model.allCats[0];
    catListView.init();
    catView.init();
    adminView.init();
  },
  selectCat: function(cat) {
    console.log("select", cat);
    model.currentCat = cat;
  },
  getCats: function() {
    return model.allCats;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  incrementCounter: function() {
    model.currentCat.timesClicked++;
    catView.render();
  },
  updateCat: function(name, image, timesClicked) {
    model.currentCat.name = name;
    if (image !== "") {
      model.currentCat.imageSrc = image;
    }
    if (timesClicked !== "") {
      model.currentCat.timesClicked = timesClicked;
    }
    catView.render();
    catListView.render();
  }
};

var catView = {
  init: function() {
    this.timesClicked = document.querySelector("#timesClicked");
    this.catImage = document.querySelector("#choice");
    this.catImage.addEventListener("click", function() {
      Octopus.incrementCounter();
    });
    this.render();
  },
  render: function() {
    var cat = Octopus.getCurrentCat();
    this.timesClicked.textContent = cat.timesClicked;
    this.catImage.setAttribute("src", cat.imageSrc);
  }
};

var catListView = {
  init: function() {
    this.choices = document.querySelector("#choices");
    this.render();
  },
  render: function() {
    while(this.choices.firstChild){
      this.choices.removeChild(this.choices.firstChild);
    }
    var cats = model.allCats;
    var that = this;

    cats.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.textContent = cat.name;
      btn.addEventListener("click", (function(cat) {
        return function() {
          Octopus.selectCat(cat);
          catView.render();
        }
      })(cat));
      that.choices.appendChild(btn);
    });
  }
};

var adminView = {
  init: function() {
    this.button = document.querySelector("#toggleAdmin");
    this.form = document.querySelector("#admin").querySelector("form");
    var that = this;

    this.button.addEventListener("click", function() {
      that.form.style.display = "block"; // toggle();
    });

    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      var name = that.form.querySelector("#catName").value;
      var image = that.form.querySelector("#catImage").value;
      var timesClicked = that.form.querySelector("#catClicked").value;
      console.log(name, image, timesClicked);
      Octopus.updateCat(name, image, timesClicked);
    });
  },
};


//$("body").ready(Octopus.init);
Octopus.init();

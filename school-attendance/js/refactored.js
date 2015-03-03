var attendanceCreator = function(numOfDays) {
  var attendance = [];
  for (var i = 0; i < numOfDays; i++) {
    var rand = Math.ceil(Math.random() * 10) % 2;
    rand === 0 ? attendance.push(true) : attendance.push(false);
  }
  return attendance;
};

var Student = {
  init: function(name, numOfDays) {
    this.name = name;
    this.attendance = attendanceCreator(numOfDays);
    return this;
  },
  name: "",
  attendance: [],
  daysMissed: function() {
    return this.attendance.filter(function(val) {
      return val === true;
    }).length;
  }
}

var numOfDays = 12;
var student1 = Object.create(Student).init("Slappy the Frog", numOfDays);
var student2 = Object.create(Student).init("Lilly the Lizard", numOfDays);

var model = {
  students: [student1, student2]
};

var Octopus = {
  init: function() {
    tableView.init();
    studentsView.init();
  },
  getStudents: function() {
    return model.students;
  },
  updateStudent: function(student, index, value) {
    student.attendance[index] = value;
    studentsView.render();
  }
};

var tableView = {
  init: function() {
    this.headTr = document.createElement("tr");
    var nameTd = document.createElement("th");
    nameTd.textContent = "Student Name";
    nameTd.setAttribute("class", "name-col");
    this.headTr.appendChild(nameTd);
    for (var i = 0; i < numOfDays; i++) {
      var td = document.createElement("th");
      td.textContent = (i + 1);
      this.headTr.appendChild(td);
    }
    var missedTd = document.createElement("th");
    missedTd.textContent = "Days Missed-col";
    missedTd.setAttribute("class", "missed-col");
    this.headTr.appendChild(missedTd);
    var thead = document.querySelector("thead");
    thead.appendChild(this.headTr);
    this.render();
  },
  render: function() {

  }
};

var studentsView = {
  init: function() {
    this.students = Octopus.getStudents();
    this.render();
  },
  render: function() {
    var body = document.querySelector("tbody");
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    this.students.forEach(function(student) {
      var tr = document.createElement("tr");
      tr.setAttribute("class", "student");
      var td = document.createElement("td");
      td.setAttribute("class", "name-col");
      td.textContent = student.name;
      tr.appendChild(td);
      student.attendance.forEach(function(attend, index) {
        var attTd = document.createElement("td");
        attTd.setAttribute("class", "attend-col");
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        if (attend) {
          input.setAttribute("checked", true);
        }
        input.addEventListener("click", function() {
          Octopus.updateStudent(student, index, input.checked);
        });
        attTd.appendChild(input);
        tr.appendChild(attTd);
        body.appendChild(tr);
      });
      var missedTd = document.createElement("td");
      var daysMissed = student.daysMissed();
      missedTd.textContent = daysMissed;
      tr.appendChild(missedTd);
    });
  },
};

Octopus.init();

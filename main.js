var preview_pane = $('#preview-pane');
var blueprint = $('#blueprint');
function update_preview_pane() {preview_pane.src = doc.output('datauristring')}
function download_output() {doc.save('file.pdf')}
function bottomLeft_btn() {
  cell_array = [];
  blueprint_to_cell_array();
  draw_pdf_from_cell_array();
}

var doc = new jsPDF() // default a4 paper
doc.setFont('courier');
doc.setFontType('normal');
var paper_dimension = {x: 210, y: 297}; // a4 paper dimension
var margin = {left: 20, right: 20, top: 20, bottom: 20};
var shift = {x: 0, y: 0};
var cell_margin = {bottom: 10};
var rightAlign = true;

var cell_array = [];
var caretX = margin.left;
var caretY = margin.top;
var active_dimension = {x: paper_dimension.x - margin.left - margin.right, y: paper_dimension.y - margin.top - margin.bottom};
var page_count = 1;
var columns_count; var columns_now = 0;
var row_height = 0;
bottomLeft_btn();

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 9: // TAB key
      event.preventDefault();
      bottomLeft_btn();
      break;
    default:
  }
})

function draw_pdf_from_cell_array() {
  clear_pdf();
  for (var i=0; i<cell_array.length; i++) {
    cell_array[i].draw();
  }
  update_preview_pane();
}

function blueprint_to_cell_array() {
  var instructions_arr = blueprint.value.split('\n');
  for (var i=0; i<instructions_arr.length; i++) {
    var split_instruction = instructions_arr[i].split('.');
    var main_content = "new " + split_instruction[0];
    try {
      if (split_instruction.length === 1) {
        cell_array.push(eval(main_content));
      } else {
        var modifier_arr = split_instruction[1].split('(');
        var modifier_command = modifier_arr[0];
        var modifier_value = parseInt(modifier_arr[1].split(')')[0]);
        if (modifier_command === "repeat" && !isNaN(modifier_value)) {
          for (var j=0; j<modifier_value; j++) {
            cell_array.push(eval(main_content));
          }
        }
      }
    } catch (e) {}
  }
}

/////////////////////////////  cell_array elements  /////////////////////////////
function Columns(n) {
  this.n = n;
  this.draw = function() {
    to_next_row(row_height);
    columns_count = this.n;
  }
}

function Hline() {
  this.height = 3;
  this.draw = function() {
    doc.setDrawColor(150, 150, 150);
    doc.line(0, caretY+row_height, margin.left+paper_dimension.x, caretY+row_height);
    doc.setDrawColor(0, 0, 0);
    to_next_row(this.height);
    caretY += this.height;
  }
}

function Gap(n) {
  this.height = n;
  this.draw = function() {
    to_next_row(this.height);
    caretY += this.height;
  }
}

function Shift(x,y) {
  this.x = x;
  this.y = y;
  this.draw = function() {
    shift.x = this.x;
    shift.y = this.y;
  }
}

function Answers() {
  this.draw = function() {
    var question_number = 0;
    var question_number_max_digits = count_digits(cell_array.length);
    var max_string_width = 0;
    var yPos = 0;
    var xPos = 0;
    doc.addPage();
    page_count++;
    for (var i=0; i<cell_array.length; i++) {
      if (cell_array[i].hasOwnProperty('answer')) {
        question_number++;
        var pre_question_space = space(question_number_max_digits - count_digits(question_number));
        var str = pre_question_space + "(" + question_number + ") " + cell_array[i].answer;
        doc.text(margin.left + xPos, margin.top + yPos,  str);
        var str_width = doc.getTextWidth(str);
        if (str_width > max_string_width) {max_string_width = str_width;}
        yPos += 5;
        if (question_number % 50 == 0) {
          xPos += max_string_width + 20;
          yPos = 0;
          max_string_width = 0;
        }
      }
    }
  }
}

function Addition(d1, d2) {
  this.d1 = d1; // digits (eg: 1000 has 4 digits)
  this.d2 = d2;
  this.height = 5 * 3 + cell_margin.bottom;

  this.n1 = random_integer_by_digit(this.d1);
  this.n2 = random_integer_by_digit(this.d2);
  this.answer = this.n1 + this.n2;

  this.draw = function() {
    move_caret(this.height);
    var dy = 5;
    var max_digits = Math.max(this.d1, this.d2);
    var s1 = " " + space(max_digits-this.d1+1) + String(this.n1);
    var s2 = "+" + space(max_digits-this.d2+1) + String(this.n2);
    draw_string_string_line(s1, s2);
  }
}

function Subtraction(d1, d2) {
  this.d1 = d1; // digits (eg: 1000 has 4 digits)
  this.d2 = d2;
  this.height = 5 * 3 + cell_margin.bottom;

  var n1 = random_integer_by_digit(this.d1);
  var n2 = random_integer_by_digit(this.d2);
  this.n1 = n1 > n2 ? n1 : n2;
  this.n2 = n1 < n2 ? n1 : n2;

  this.answer = this.n1 - this.n2;

  this.draw = function() {
    move_caret(this.height);
    var dy = 5;
    var max_digits = Math.max(this.d1, this.d2);
    var s1 = " " + space(max_digits-this.d1+1) + String(this.n1);
    var s2 = "-" + space(max_digits-this.d2+1) + String(this.n2);
    draw_string_string_line(s1, s2);
  }
}

function Multiplication(d1, d2) {
  this.d1 = d1; // digits (eg: 1000 has 4 digits)
  this.d2 = d2;
  this.height = 5 * (3 + d2) + cell_margin.bottom;

  this.n1 = random_integer_by_digit(this.d1);
  this.n2 = random_integer_by_digit(this.d2);
  this.answer = this.n1 * this.n2;

  this.draw = function() {
    move_caret(this.height);
    var s1 = " " + space(this.d2) + String(this.n1);
    var s2 = "×" + space(this.d1) + String(this.n2);
    draw_string_string_line(s1, s2);
  }
}
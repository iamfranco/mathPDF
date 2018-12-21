function $(x) {return document.querySelector(x);}
function random_integer(min, max) {return Math.floor(Math.random()*(max-min+1)+min)}
function random_integer_by_digit(d) {return random_integer(Math.max(10**(d-1),2), 10**d-1)}
function count_digits(n) {return String(n).length}

function space(d) {
  var r = "";
  for (var i=0; i<d; i++) {
    r += " ";
  }
  return r;
}

function clear_pdf() {
  for (var i=page_count; i>0; i--) {
    doc.deletePage(i);
  }
  doc.addPage();
  caretX = margin.left; caretY = margin.top;
  page_count = 1;
  columns_now = 0;
  row_height = 0;
}

function move_caret(rh) {
  if (columns_now >= columns_count) {
    to_next_row(rh);
  } else {
    row_height = Math.max(row_height, rh);
  }
  caretX = active_dimension.x / columns_count * columns_now + margin.left;
  columns_now++;
}

function to_next_row(rh) {
  columns_now = 0;
  caretY += row_height;
  if (caretY + rh > active_dimension.y + margin.top) {
    caretY = margin.top;
    doc.addPage();
    page_count++;
  }
  row_height = rh;
}
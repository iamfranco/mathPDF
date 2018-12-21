function draw_string_string_line(s1, s2) {
  var dy = 5;
  var width = doc.getTextWidth(s2);
  var xPos = caretX + shift.x;
  var yPos = caretY + shift.y;
  if (rightAlign) {
    xPos += active_dimension.x / columns_count - width;
  }
  doc.text(s1, xPos, yPos + dy);
  doc.text(s2, xPos, yPos + dy*2);
  doc.line(xPos, yPos + dy*2 + 1, xPos + width, yPos + dy*2 + 1);
}
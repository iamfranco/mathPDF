# Math PDF

This is a PDF generation tool that writes specific maths questions to the PDF, based on the user's commands.

---
## Commands

### `Columns(n)`
Rearrange the succeeding contents into `n` columns.
<br>Example: `Columns(4)`.

### `Hline()`
Draw a horizontal line.

### `Gap(n)`
Insert vertical gap of `n` millimetres.
<br>Example: `Gap(10)`.

### `Shift(x,y)`
Shift the succeeding contents by `x` millimetres horizontally, and by `y` millimetres vertically.
<br>Example: `Shift(-15,0)`.

### `Answers()`
Insert the answers page.

### `Addition(d1, d2)`
Randomly generates two numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then draw the maths question onto the PDF asking for the **sum** of the two numbers.
<br>Example: `Addition(3,2)`.

### `Subtraction(d1, d2)`
Randomly generates two numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then draw the maths question onto the PDF asking for the **difference** of the two numbers.
<br>Example: `Subtraction(3,2)`.

### `Multiplication(d1, d2)`
Randomly generates two numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then draw the maths question onto the PDF asking for the **product** of the two numbers.
<br>Example: `Multiplication(3,2)`.

---
## Modifiers

### `.repeat(n)`
Apply the `.repeat(n)` modifier to a command will repeat the command `n` times.
<br>Example: `Multiplication(2,2).repeat(8)` is the same as
```
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
Multiplication(2,2)
```
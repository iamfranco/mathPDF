# Math PDF

This is a PDF generation tool that writes specific maths questions to the PDF, based on the user's commands.

## Commands

#### `Columns(n)`
Rearrange succeeding contents into `n` columns.
<br>Example: `Columns(4)`.
<br><br>

#### `Hline()`
Draw a horizontal line.
<br><br>

#### `Gap(n)`
Insert vertical gap of `n` millimetres.
<br>Example: `Gap(10)`.
<br><br>

#### `Shift(x,y)`
Shift succeeding contents by `x` millimetres horizontally, and by `y` millimetres vertically.
<br>Example: `Shift(-15,0)`.
<br><br>

#### `Answers()`
Insert the answers page.
<br><br>

#### `Addition(d1, d2)`
Generates two random numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then writes a question onto the PDF asking for the **sum** of the two numbers.
<br>Example: `Addition(3,2)`.
<br><br>

#### `Subtraction(d1, d2)`
Generates two random numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then writes a question onto the PDF asking for the **difference** of the two numbers.
<br>Example: `Subtraction(3,2)`.
<br><br>

#### `Multiplication(d1, d2)`
Generates two random numbers, where the first number has `d1` digits, the second number has `d2` digits.
<br>Then writes a question onto the PDF asking for the **product** of the two numbers.
<br>Example: `Multiplication(3,2)`.
<br><br>

## Modifiers

#### `.repeat(n)`
When the `.repeat(n)` modifier is applied to a command, the interpreter will repeat the command `n` times.
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
<br><br>
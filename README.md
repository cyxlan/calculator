# Calculator
Calculator app that performs basic mathematical operations created with JavaScript, HTML, and CSS.

[Live preview](https://cyxlan.github.io/calculator/)

## Features
- Adds, subtracts, multiplies, and divides numbers
	- Calculates a single pair of numbers at a time, then uses the result for the next operation
	- Repeats last operation when equals button is clicked again
- Logs current equation history in display
- DEL button: deletes last character
- AC button: clears display and history
- Decimal button
- Keyboard shortcuts
- Rounds result to 3 decimal places
- Prevents dividing by 0 and displays error message
- Prevents using and visually disables currently unavailable buttons

## Applied skills
- Created and used JS objects and methods
	- Used a constructor function to efficiently create objects of the same type
	- Used `this` keyword to set object properties and use within methods
	- Set and accessed object property values
- Used JS event listeners to implement button functionality and keyboard shortcuts
- Dynamically updated HTML content and disabled/enabled buttons
- Used CSS grid to lay out calculator buttons
- Used flexbox to align and position page content

### Learnings
- Used unary `+`  with `toFixed()` to return rounded numbers with only the needed amount of decimal places
- Improved performance when animating CSS box shadows by animating a pseudo-element with a shadow instead of directly animating the shadow
- Added layered CSS box shadows to create more realism and depth
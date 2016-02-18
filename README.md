# Battleship
This is a game of Battleship written in JavaScript (lab3 of the course DD2390).

# Questions

## What is the differences between == and ===? What is the best practice for using which?
The difference is that === strictly compares two variables and returns true if the two are of the same type and value. The == also compares for equality after type conversion. For example, 0 == '' but 0 !== ''. The best practice is to use === as much as possible, to avoid confusing cases returning true when they should not be equal.


# Simple Node Project

## Create a QR code

This is a simple Node project that creates a QR code for a given website.

- creates a QR code for a given URL, via the command line.
- originally used the older inquirer package, but after investigation incorporated the slimmer @inquirer/prompts instead.
- uses the ESM version instead of the older CJS.

### To run:

Requires Nodejs >= v18

In a terminal of choice:

1. via the root folder
2. 'npm install'
3. simply run via 'Node index.js'

### Output:

1. creates the QR png file with the prompted url (this can be changed to other formats - svg, eps, and pdf)
2. creates a file to show the url used

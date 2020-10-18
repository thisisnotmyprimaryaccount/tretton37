# tretton37

Code is available at https://github.com/thisisnotmyprimaryaccount/tretton37, and it's deployed to https://thisisnotmyprimaryaccount.github.io/tretton37/.

Build: `npm run build` (production) or `npm run dev` (development, will watch for changes)  
Run: Open `app/index.html` in a browser  
Test: `npm run test`  

## Tasks completed (10 pt)

In the design/accessibility and functionality columns I mostly picked what seemed fun to do. CI/CD is perhaps not fun to configure but it's convenient for testing on a physical mobile and doesn't take much effort, so I did those two tasks as well.

E2E testing feels (in my experience) awful to write so naturally I avoided it, and as I developed this on Ubuntu it would be inconvenient to test with IE11 which left me with the two remaining tasks for that column.

### design/accessibility
- No UI framework used (1 pt)
- Responsive design (2 pt)

### functionality
- Sort by name and office (1 pt)
- Filter by name and office (1 pt)
- Deployed to free public url (1 pt)
- CI/CD pipeline (1 pt)

### testing/QA
- Works in Chrome/Firefox/Edge (1 pt)
- Unit testing (2 pt)

## Notes

- Code is written in a somewhat functional style with no objects mutations and most of the code existing in pure functions.

- For simplicity I didn't use a HTML templating library (or a UI framework like Angular/Vue/React). Instead the code builds the HTML directly using JavaScript's template literals. Since the interpolation doesn't use any sanitization this is unsafe and the API could exploit it by returning HTML. I think this is acceptable in the context of this task, but I wanted to point out that I'm aware of the issue. In a real project I would at least use a proper templating library like Mustasch or Handlebars.

- I used GitHub actions for CI/CD and GitHub pages for deployment, as that's what I'm familiar with.

- Badge icons are taken from https://fontawesome.com

- I did not add a badge for linkedin because I don't have a linkedin account which makes it hard to verify that the links are correct.

- The tests are executed with Node instead of with a browser which is not ideal, but a proper test setup seemed out of scope.

Mike Mitchell - Lawnstarter coding excersize

## Instructions

run npm i once the repo is cloned

### Notes

I submitted two branches, 'master' and 'add-redux'.  In the master branch, I used local state to manage the data, but ran into a console error (it did not affect the functionality) due to unresolved promises and setting state after the Detail component unmounted.  

This occured when you clicked either the "Back to search" button or the browser's back button if there was an unresolved fetch promise.  The promise would return after the component unmounted, and it attempted to then set state.  I remedied the issue with the "add-redux" branch so that the fetch actions and state were all in redux, thus avoiding the error.
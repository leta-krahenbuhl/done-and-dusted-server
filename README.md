# dOverview: Done-and-dusted-server

- This is the back-end part of the Done&Dusted project.

### Tech Stack

<!-- - HTML, CSS, SASS/BEM, JavaScript, React JS, Node/Express server
- Use of MySQL database with knex.js -->

### Features

<!-- - edit/add/delete notebooks, edit/add/delete lists, tick off list items
- front and back-end form validation
- any changes are immediately updated in the database
- breadcrumb navigation  -->

### APIs

<!-- Three API endpoints:

- api/notebooks
- api/list-titles
- api/list-items -->

### Sitemap

#### /

<!-- - Landing page with list of all notebooks as links
- Displays a list of all notebooks
- Click on a notebook to see its lists
- Bottom nav bar:
  - Plus icon: Add a new notebook (links to "/create/notebook")
  - Pen icon: Edit the name of an existing notebook
  - Bin icon: Delete an existing notebook and all it's content -->

#### /create/notebook

<!-- - Add a new notebook -->

#### /edit

<!-- - Edit a notebook title -->

#### /delete

<!-- - delete a notebook and all of its containing lists -->

#### /notebooks/:notebook-id

<!-- - All lists of one specific notebook
- Under each list title are its corresponding list items, lists separated by dotted line
- All lists displayed as endless scroll, newest on top
- Every list item has an empty square next to it, marking it as not done
- Clicking on empty square fills out the square and marks the list item as done
- Clicking on list title shows individual list page (place to edit list)
- Top navigation shows title of the notebook
- Bottom navigation
  - Plus icon: Add a new list -->

### Screenshots

<!-- <img src="./src/assets/mock-ups/home.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/add-notebook.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/notebook.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/edit-list.png" alt="Alt Text" width="210" > -->

### Data

<!-- - One database called 'notebooks'
- Three tables:
  - notebooks
  - list_titles
  - list_items -->

<!-- <img src="./src/assets/mock-ups/data.png" alt="Alt Text" width="610" > -->

### Endpoints

#### http://localhost:8080/api/notebooks

<!-- - to get a list of all notebook titles, add a new notebook title, edit a notebook title or delete a notebook title
- GET / POST / PUT / DELETE

```
[
  {
    "id": 1,
    "date": "11/13/2023, 3:30:00 PM",
    "title": "Gift Ideas",
  }
]
``` -->

#### http://localhost:8080/api/list-titles

<!-- - to get a list of all list titles, add a new list title, edit a list title or delete a list title
- GET / POST / PUT / DELETE

```
      {
        "id": 1,
        "date": "11/13/2023, 3:30:00 PM",
        "title": "Dad",
        "notebook_id": 1
      };
``` -->

## Developer installation guide

<!-- - Download both client and server side of the notebooks code from GitHub:
  - Front-end: https://github.com/leta-krahenbuhl/notebooks
  - Back-end: https://github.com/leta-krahenbuhl/notebooks-server
- Log in to MySQL (mysql -u root -p, then type in your password and hit enter)
- Set up a local MySQL database called 'notebooks'
- Server side:
  - npm install (to install any dependencies including knex and mysql2)
  - set up a local .env file with your environment variables (see env.sample file for reference)
  - npx knex migrate:latest (create the three database tables)
  - npx knex seed:run (to populate the database tables)
  - npm start (to start server, should be as a custom script in package.json)
- Client side:
  - npm install (to install any dependencies)
  - set up a local .env file with your environment variables (see env.sample file for reference)
  - npm start (to view react app in browser) -->

## Key take-aways

<!-- - Coding takes time
- Error messages are my friends
- The same problem looks very different at 11:30pm and 11:30am
- If anything seems to complicated, break it down into several smaller problems -->

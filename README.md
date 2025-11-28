# DevTinder

- Create a Vite + React application
- Remove unnecessary code and create a Hello World app
- Install Tailwind css
- Add NavBar component to App.js
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
- Wheneve you're making API call so pass axios => {withCredentials: true}
- install react-redux + @reduxjs/toolkit - 
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- build the user card on the feed in the store
- Edit profile feature
- Show toast Message on save of profile
- New Page - See all my connections
- New Page - See ally my Connection requests
- Feature - Accept/Reject Connection Request
- Send/Ignore the user card from the feed
- Signup New User
- E2E Testing


Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile
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

 # Deployment
- Signup on AWS
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-179-83.eu-north-1.compute.amazonaws.com
- Install node version accordingly
- Git clone
- Frontend
    - npm install -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
     Enable port :80 of your instance


# Adding a custom Domain name
    - purchased domain name from godaddy
    - signup on cloudflare & add a new domain name
    - change the nameservers on godaddy and point it to cloudflare
    - wait for sometime till your nameservers are updated ~15 minutes
    - DNS record: A devtinderonline.info
    - Enable SSL for website
# Sending Emails via SES
    - create a IAM user
    - Give Access to AmazonSESFullAccess
    - Amazon SES: Create an Identity
    - Verify your domain name
    - Verify an email address
    - Install AWS SDK - v3
    - Setup SesClient
    - Access Credentials should be created in IAM under SecurityCredentials Tab
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS
    - Installing node-cron
    - Learning about cron expressions syntax - crontab.guru
    - Schedule a job
    - date-fns
    - Find all the unique email Id who have got connection Request in previous days
    - Send Email
    - Explore queue mechanism to send bulk emails
    - Amazon SES Bulk Emails
    - Make sendEmail function dynamic
    - bee-queue & bull npm packages 

# Razorpay Payment Gateway Integration
    - Sign up on Razorpay & complete KYC
    - Created a UI for premium page
    - Creating an API for create order in backend
    - added my key and secret in env file
    - Intialized Razorpay in utils
    - creating Schema and model
    - saved the order in payments collection
    - make the API dynamic
    - setup razorpay webhook on your live api

Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile
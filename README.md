# Taskplanner
A highly interactive web app that lets users manage and organize their everyday tasks. This repository contains the front-end portion of the project, created with React and Redux.

## Requirements
You must have npm installed for this app to work properly. This also requires [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server) to be deployed to a cloud platform like [Heroku](https://www.heroku.com/). Deployment instructions for Heroku can be found [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

## Usage
1. Create a `.env` file at the root directory and add the following environment variable:

       process.env.REACT_APP_BACKEND_URL=YOUR_SERVER
       
   Make sure to replace YOUR_SERVER with the deployment URL for your [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server).
   
   Alternatively, if you are deploying this to a cloud platform, you can store this directly to your deployment settings.

2. Install all necessary dependencies with:
    
       npm install
       
3. Start your app with:
           
       npm start

OPTIONAL: You can enable Google OAuth2 with the following:
1. Navigate to https://console.developers.google.com.

2. Click "Create a new project" and title it.

3. Go to the Credentials tab on the right (upper-right on mobile) and configure your consent screen.

4. Go back to Credentials and click "Create Credentials" => "OAuth Client ID"

5. Set it to web application, add your project's URL to "Authorized Javascript Origins", and click "Submit".

6. You should see your client id. If you do, add the following to your project's environment variables and replace YOUR_CLIENT_ID with your client id:

       process.env.REACT_APP_GOOGLE_CLIENTID=YOUR_CLIENT_ID
      
   Note: You should also enable Google OAuth2 in your [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server).

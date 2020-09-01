# Taskplanner
A highly interactive web app that lets users manage and organize their everyday tasks. This repository contains the front-end portion of the project, created with React and Redux.

## Requirements
You must have npm installed for this app to work properly. This also requires [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server) to be deployed to a cloud platform like [Heroku](https://www.heroku.com/). Deployment instructions for Heroku can be found [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

## Usage
1. Create a `.env` file at the root directory and add an environment variable with the following line:

       process.env.REACT_APP_BACKEND_URL="YOUR_SERVER"
       
   Make sure to replace "YOUR_SERVER" with the deployment URL for your [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server).
   
   Alternatively, if you are deploying this to a cloud platform, you can store the aforementioned environment variable directly to your deployment settings.

2. Install all necessary dependencies with:
    
       npm install
       
3. Start your app with:
           
       npm start

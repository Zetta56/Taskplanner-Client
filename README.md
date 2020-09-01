# Taskplanner
A highly interactive web app that lets users manage and organize their everyday tasks. This repository contains the front-end portion of the project, created with React and Redux.

## Requirements
You must have npm installed for this app to work properly.

## Usage
1. Create an environment variable with the key set to `REACT_APP_BACKEND_URL` and the value set to your [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server)'s deployment URL. This can be done with the following methods:

    a. Make a new file called `.env ` at your project's root and add the following line (replace "YOUR_SERVER" with your Taskplanner-server's URL):
    
       process.env.REACT_APP_BACKEND_URL="YOUR_SERVER"
  
    b. Alternatively, ff you are deploying to a cloud platform, locate the environment variables and set one to the key-value pair mentioned above.
    
    Note: This assumes you have already deployed [Taskplanner-server](https://github.com/Zetta56/Taskplanner-server) to a cloud platform like [Heroku](https://www.heroku.com/). If not, you can follow the instructions [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

2. Install all necessary dependencies with:
    
       npm install
       
3. Start your app with:
           
       npm start

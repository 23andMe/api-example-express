api-example-express
===================

A Node.js/Express app built on 23andMe's API. Checks the ACVR1B gene for high muscle strength. 
Try it at http://knees.herokuapp.com/.

Local
===
Fork and clone the repository:
```
git clone git@github.com:yourname/api-example-express.git
```

Use ```npm``` to install the latest dependencies:
```
cd api-example-express && npm install
```

Get your dev credentials at https://api.23andme.com, and modify your .env file so foreman reads them into environment variables:
```
CLIENT_ID=xxxx
CLIENT_SECRET=xxxx
REDIRECT_URI=http://localhost:5000/receive_code/
COOKIE_SECRET=xxxx
```

Start foreman locally and go to http://localhost:5000/ to see it in action.

```
foreman start
```

Heroku
===
I host the app on Heroku. You can, too. Just setup your [Heroku credentials for Node.js](https://devcenter.heroku.com/articles/nodejs) and make sure you update your ```REDIRECT_URI``` on https://api.23andme.com and as a Heroku ```config``` variable to match:

```
heroku config:set REDIRECT_URI=http://herokuurl.com/receive_code/
```
Make sure the ```CLIENT_ID```, ```CLIENT_SECRET```, and ```COOKIE_SECRET``` environment variables are set too.
```
heroku config:set CLIENT_ID=xxxx
heroku config:set CLIENT_SECRET=xxxx
heroku config:set COOKIE_SECRET=xxxx
```

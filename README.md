# CREATING A JOB APPLICATION CALLED JOBMAN

## App.js

- import file like express dotenv cookieparser cors file and set up all of them

## Server.js

- setting up cloudinary and app listen

## dbConnection

- stablished database connecction with cloud, or local

## Config.env

- config all .env paths

## Middlewares

- created all the required middleware to handle error

## Model

- From models for required field

## Controller

- Set up controller for every field

> # Routes 

### 1) User Routes

***Job Seeker or Employee Register***

- http://localhost:4000/api/v1/user/register

    *Employee Register :*
    
        {
        "name" : "xyz zyx",
        "email" : "employee@gmail.com",
        "phone" : 11223344,
        "role" : "Employee",
        "password" : "Xyz@1234"
        }

    *Job Seeker Register :*

        {
        "name" : "xyz zyx",
        "email" : "jobseeker@gmail.com",
        "phone" : 11223344,
        "role" : "Job Seeker",
        "password" : "Xyz@1234"
        }

***Job Seeker or  Employee Login***

- http://localhost:4000/api/v1/user/login

    *Employee Login :* 

        {
        "email" : "employee@gmail.com",
        "password" : "Xyz@1234",
        "role" : "Employee"
        }

    *Job Seeker Login :*

        {
        "email" : "jobseeker@gmail.com",
        "password" : "Xyz@1234",
        "role" : "Job Seeker"
        }



***Job Seeker Or Employee Log Out***

-   http://localhost:4000/api/v1/user/logout

    *It will logout According to your login profile as **Employee** or  as **Job Seeker**.*

***Job Seeker or Employee Get their Profile Details***

-   http://localhost:4000/api/v1/user/profile
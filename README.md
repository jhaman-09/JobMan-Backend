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

# Routes 

## 1) User Routes

> ***Register***

-   http://localhost:4000/api/v1/user/register

    - Both Job Seeker and Emplyee can register by thier details

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

> ***Login***

-   http://localhost:4000/api/v1/user/login

    - Employee and Job Seeker can login to put their login deatils in the body request.

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



> ***Log Out***

-   http://localhost:4000/api/v1/user/logout

    - *It will logout According to your login profile as **Employee** or  as **Job Seeker**.*
    - Both Job Seeker and Employee can logout with this route.

> ***Profile***

-   http://localhost:4000/api/v1/user/profile

    - Both Employee and Job Seeker can get Their Profile


## 2) Job Routes

***Get All Jobs***

-   http://localhost:4000/api/v1/job/getall

    - Both Employee and Job Seeker can get all posted Jobs and its Details

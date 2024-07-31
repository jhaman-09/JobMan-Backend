# CREATING A JOB APPLICATION CALLED JOBMAN

## App.js

- import file like express dotenv cookieparser cors file and set up all of them..

## Server.js

- setting up cloudinary and app listen

## dbConnection

- stablished database connecction with cloud, or local..

## Config.env

- config all .env paths

## Middlewares

- created all the required middleware to handle error..

## Model

- Creating Models for Every Work..

## Controller

- Set up controller for every Routes..

# Routes 

## 1) User Routes

***Register***

-   http://localhost:4000/api/v1/user/register

    - Both Job Seeker and Emplyee can register by thier details

        > *Employee Register :*
        
            {
            "name" : "xyz zyx",
            "email" : "employee@gmail.com",
            "phone" : 11223344,
            "role" : "Employee",
            "password" : "Xyz@1234"
            }

        > *Job Seeker Register :*

            {
            "name" : "xyz zyx",
            "email" : "jobseeker@gmail.com",
            "phone" : 11223344,
            "role" : "Job Seeker",
            "password" : "Xyz@1234"
            }

***Login***

-   http://localhost:4000/api/v1/user/login

    - Employee and Job Seeker can login to put their login deatils in the body request.

        > *Employee Login :* 

            {
            "email" : "employee@gmail.com",
            "password" : "Xyz@1234",
            "role" : "Employee"
            }

        > *Job Seeker Login :*

            {
            "email" : "jobseeker@gmail.com",
            "password" : "Xyz@1234",
            "role" : "Job Seeker"
            }



***Log Out***

-   http://localhost:4000/api/v1/user/logout

    - *It will logout According to your login profile as **Employee** or  as **Job Seeker**.*
    - Both Job Seeker and Employee can logout with this route.

***Profile***

-   http://localhost:4000/api/v1/user/profile

    - Both Employee and Job Seeker can get Their Profile


## 2) Job Routes

***Get All Jobs***

-   http://localhost:4000/api/v1/job/getall

    - Both Employee and Job Seeker can get all posted Jobs and its Details

***Post Job***

- http://localhost:4000/api/v1/job/postjob

    - Only Employee Can Able to Post the Job
    - In this, the job poster can able to give **Range Salary** or **Fixed Salary**
    - And the minimun salary can have at least **4 digit figure**.
    - And Maximum Salary cannot have more than **9 digits figure**.


        > *Request Body for Fixed Salary*

            {
            "title": "Software Developer",
            "description": "Develop and maintain software",
            "category": "IT",
            "country": "USA",
            "city": "New York",
            "location": "123, 44-D washington near macD",
            "fixedSalary": 80000
            }

        > *Request body for Range Salary*

            {
            "title": "Software Developer",
            "description": "Develop and maintain software",
            "category": "IT",
            "country": "USA",
            "city": "New York",
            "location": "123, 44-D washington near macD",
            "salaryFrom": 1000,
            "salaryTo" : 10000
            }

***My Posted Jobs***

-   http://localhost:4000/api/v1/job/myjobs

    - Get All Posted Job Details By that Employee.
    - It is only accessable by Employee.

***Update Posted Job***

-   http://localhost:4000/api/v1/job/update/_id
    > Example : http://localhost:4000/api/v1/job/update/66a8b8ec41c2f9630f05399a

    - The employee who was posted this job only able to perform updatation.
    - Job Seeker are not able to access this resource.
    - At place of _id, you need to put **your job _id**
    - for **_id**, request http://localhost:4000/api/v1/job/myjobs

        > *Request body for updation*

            {
                "title" : "Desiginer"
            }

***Delete Posted Job***

-   http://localhost:4000/api/v1/job/delete/_id
    > Example : http://localhost:4000/api/v1/job/delete/66a8b8ec41c2f9630f05399a

    - Again thin Route is only accessable by the Employee who was posted any job.
    - He can delete his posted job, by providing his job **_id**
    - for **_id**, request http://localhost:4000/api/v1/job/myjobs


## 3) Application Routes

***Employee Get All Job Applications Request***

-   http://localhost:4000/api/v1/application/employee/getall

    - Again, this field is only accessable by the employee.
    - here, Employee can watch all the job request application on his posted job
    - To accessing this route, Employee must need to login first😎.

***Job Seeker Get All his Applied Job details***

-   http://localhost:4000/api/v1/application/jobseeker/getall
    
    - This routes is only accessable by the Job Seeker.
    - Here, Job Seeker can take a look to all his applied job requests
    - To access this route, Job Seeker must need to login first👍. 

***Job Seeker Apply for a Job***

-   http://localhost:4000/api/v1/application/jobseeker/post

    - This route is only accessable by the Job Seeker.
    - Here, Job Seeker able to applied this the job which he want to apply.
    - To applied for a job Job Seeker need : **name, email, coverLetter, phone, address, resume, jobId**.
    - Here, **jobId** is that for which job, The Job Seeker is applying.
    - For **jobId**, Request to this route http://localhost:4000/api/v1/job/getall.
    - Address must have at least 10 charactors.
    - Porvide a valid Email

    ![](/assets/Screenshot%202024-07-31%20110228.png)


***Job Seeker Delete His Applied Job***

-   http://localhost:4000/api/v1/application/jobseeker/delete/_id

    - Again, This route is only accessable by the job seeker.
    - Here, The Job seeker can able to delete his applied job application.
    - for ***_id*** : request to this route, http://localhost:4000/api/v1/application/jobseeker/getall
    - Put the value of ***_id*** of that job, You want delete application.
    - To perform this route, You Need first to login as ***Job Seeker***
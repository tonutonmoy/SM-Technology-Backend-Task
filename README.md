
## notice:  Of course you have to select Bearer Token inside authorisation from postman to send token. if you don't understand see my video.


# Gym Class Scheduling and Membership Management System

This system efficiently manages gym operations with three roles: **Admin**, **Trainer**, and **Trainee**.

## Roles:
- **Admin**: Manages trainers, schedules up to 5 classes per day (2-hour sessions), and assigns trainers.
- **Trainer**: Conducts assigned classes and views schedules.
- **Trainee**: Manages profiles and books available classes (max 10 trainees per class).

## Key Features:
- **Class Limits**: 5 classes/day, 10 trainees/class.
- **Booking Restrictions**: Classes close when full.
- **JWT Authentication**: Ensures role-based access control.
- **Error Handling**: Handles access, validation, and booking errors.

A streamlined solution for organizing gym schedules, roles, and memberships.


##  link:
 * live link: https://sm-technology-backend-task.vercel.app/
 * Video link: https://drive.google.com/file/d/1G_ziMJKWkkKslrgXmxS9YQX5o3g39et8/view?usp=sharing
 * Diagram link: https://drive.google.com/file/d/1365Ku3Q4xDPFmWWdyl0FZmu_e8Ha4eRH/view?usp=sharing

 * Admin email: www.tonutonmoy12@gmail.com
 * Admin password: 123


## API Endpoints

# Registration :
   
   * POST: https://sm-technology-backend-task.vercel.app/api/auth/registration

   * Description: First you need to register.like:

     {
         "name": "Tonu",
          "email": "www.tonutonmoy17@gmail.com",
           "password": "123"

      }

# Login :
   
   * POST: https://sm-technology-backend-task.vercel.app/api/auth/login

   * Description: 

       {

          "email": "www.tonutonmoy17@gmail.com",
           "password": "123"

       }


# Create Trainer :
   
   * POST: https://sm-technology-backend-task.vercel.app/api/auth/createTrainer

   * Description: you need to Admin access token.

         {
             " name": "Tonu2",
               "email": "www.tonutonmoy18@gmail.com",
               "password": "123",
               "role": "Trainer"
        }


# Update Trainee profile :
   
   * PUT: https://sm-technology-backend-task.vercel.app/api/auth/UpdateProfile

   * Description: you need to Trainee access token.

         
             {
                "bio": "Hi i am Tonu",
                "name": "Tonu"


                }


# Update Trainer profile :
   
   * PUT: https://sm-technology-backend-task.vercel.app/api/auth/UpdateTrainerProfile/66ed2c39e6ba3254e927db74

   * Description: you need to Admin access token.only Admin can do this. pass the id by URL.

             {
                "bio": "Hi i am Tonu",
                "name": "Tonu"


                }



# Delete Trainer profile :
   
   * DELETE: https://sm-technology-backend-task.vercel.app/api/auth/DeleteTrainerProfile

   * Description: you need to Admin access token.only Admin can do this.

            {
              "_id": "66ed2b15e6ba3254e927db5e"


            }



# All Users :
   
   * GET: https://sm-technology-backend-task.vercel.app/api/auth

   * Description: you need to Admin access token.only Admin can do this.



# Create Class Schedule  :
   
   * POST: https://sm-technology-backend-task.vercel.app/api/classSchedule/create

   * Description: you need to Admin access token.only Admin can do this.

            {
             "trainerId": "66ed2c39e6ba3254e927db74", // Replace with an actual Trainer ID
             "date": "2024-09-25T00:00:00.000Z", // Replace with an actual date in ISO 8601 format
             "startTime": "09:00 AM",
             "endTime": "11:00 AM"
 
             }



# DELETE Class Schedule  :
   
   * DELETE: https://sm-technology-backend-task.vercel.app/api/classSchedule/delete

   * Description: you need to Admin access token.only Admin can do this.

           {
             "_id": "66ed1c246cb9ab3668924c4b"
  
 
             }


# All Class Schedule  :
   
   * GET: https://sm-technology-backend-task.vercel.app/api/classSchedule

   * Description: Everyone will View this.



# Get Single class by Trainer  :
   
   * GET: https://sm-technology-backend-task.vercel.app/api/classSchedule/getTranierClassSchedule/66ed2c39e6ba3254e927db74

   * Description: you need to Admin or Trainer access token. Pass the Trainer id by URL



# Add Booking class  :
   
   * PUT: https://sm-technology-backend-task.vercel.app/api/classSchedule/bookingClass/66ed2c44e6ba3254e927db78

   * Description: you need to  Trainee access token. Pass the Class Shedule id by URL. and Trainee id by body.

               {
 
               "trainees": "66ed33f577770f0156fa3c4d"
                } 




#  Cancel Booking class  :
   
   * PUT: https://sm-technology-backend-task.vercel.app/api/classSchedule/bookingClassCancel/66ed2c44e6ba3254e927db78

   * Description: you need to  Trainee access token. Pass the Class Shedule id by URL. and Trainee id by body.

               {
 
               "trainees": "66ed33f577770f0156fa3c4d"
                } 

          


## Instructions to Run Locally:

  * clone the project from gitHub
  * create .env file.
  * paste  it in .env file:
 
    NODE_ENV=development


    PORT=5000


    BCRYPT=12

    JWT_SECRET=8ef0bdc0751d20168ab6eb8a9eaf5db09ba5095feccac899b0e201f5914b80f5




    DATABASE_URL='mongodb+srv://wwwtonutonmoy12:SMTechnology@cluster0.7fal4.mongodb.net/SM-Technology-Task?retryWrites=true&w=majority&appName=Cluster0'


* write this command: npm i

* npm run dev



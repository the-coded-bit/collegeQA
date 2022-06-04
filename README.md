
# College-QA

College QA is Question and Answer platform.   
It's a platform where Students, Professors, other staff come together,  
discuss the related topics, address the issues face by the students.  


**The thought might be aroused, why not `Quora`?**  
- `Quora` is public forum, where discussing the issues regarding the one community `beats the purpose of public QA forum`


- coming up with separate plafrom ensures the `Integrity` of institute..

- another use case is: students, Professors having the institute generated email and password, can only login, in the platform, which ensures the information leaks must be less.  
    `though institute issued email and password authentication will be added soon...😀`  


## Features

- Only Institute registered Login/Signup emails.
- Question Section, to ask various questions
- Answers Section, where one can share/read the Answers
- Anonymous feedback section, where one can put his/her reviews about something without revealing their identity..
- Profile section to view one's own Profile, how many questions asked, how many were answered etc..

## Screenshots
#### Login Page
![Login Page](/Screenshots/Screenshot%20(58).png)

#### SignUp Page
![Signup Page](/Screenshots//Screenshot%20(60).png)


#### Home Page
![Home Page](/Screenshots/Screenshot%20(67).png)

#### Profile Page
![Profile Page](/Screenshots/Screenshot%20(63).png)

#### Ask Question Modal
![question Modal](/Screenshots/Screenshot%20(59).png)
> answer modal is similar to question modal

#### View More Page
it displays all answers related to the question.
![View More](/Screenshots/Screenshot%20(61).png)
![View More](/Screenshots/Screenshot%20(69).png)



## Tech Stack

-  NextJS
-  Tailwind CSS
-  Firebase
    - Firebase Authentication
    - cloud firestore
    - cloud storage
-  Docker


## Learning Outcomes
- routing with NextJS
- Tailwind CSS classes
- protected routes(where user cannot access home, profile without login/signup).

- using Firebase Authentication API.
- Firebase Firestore API.
- Firebase Cloud Storage API.
- learnt to build the Database Schema for Real-world project.
- building docker image out of NextJS application
- hosting with vercel

## Installation

### 1. Using NPM
> ***Note***: preffered to use Node version 18.2.0
`Asumming everyone knows how to setup firebase😅😄..`

- clone the repository to your host machine
- In cloned directory open terminal use command **`npm i`**
- Install tailwind if not installed (optional) **`npm install -D tailwindcss postcss autoprefixer`**
- create ***`.env.local`*** file
- setup firebase
- add firebase config to `.env.local` file. ex
    - NEXT_PUBLIC_FIREBASE_API_KEY="your api key"
    - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your auth domain key" likewise add all fields..
- enable **`firebase Authentication, cloud storage, firebase store`**  at **`console.firebase.com`**  
- finally, use **`npm run dev`**


### 2. Using Docker

- clone the repository to host machine.
- setup 
- create file named *`environment`* in cloned director.
- add firebase configuration as
    - API_KEY="your api key"
    - AUTH_DOMAIN="your auth domain key"
    - PROJECT_ID="your project id"
    - similarly add other configurations.

-   **`docker build -t <image name you want>:tag .`** this will create docker image.
- finally **`docker run -p 3000:3000 <image you named before>:tag`**



### Contributions will be appreciated😋😋





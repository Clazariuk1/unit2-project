Unit 2 Project API design concepts / instructions for cloning, running and testing.

Readme instructions:
A Readme that fully explains to a user how to do the following:<br>
How to install this app on their local machine<br>
What global installations they need and what files do they need to create that didn't come in the github repo<br>
How to start the app in dev mode<br>
How to run tests<br>
How to start the app without dev mode.<br>

<h1>Patient Paws Training Academy</h1>
<h2>a Many-to-Many API</h2>
<h4>a Tale of Stacks on Stacks on Stacks</h4>
<h3>Christopher Lazariuk, General Assembly Unit 2</h3>
<h4>Customer User Story: As a user, I want to enroll my pet(s) in a multiplicity of courses at the canine training academy 'Patient Paws'. I want to be able to view information about the other pets in the course, as well as view information about the various instructors assigned to the courses. If I loved my instructors, I want to submit a testimonial review of them.</h4>
<h4>Admin User Story: as a user, I want to manage my clients' enrolled pets and who will be covering what courses. I don't want to overbook my courses or instructors and we need to exclusively reserve the right to remove any pet from courses for bad behavior.</h4>
<h5>Link to Trello Board: https://trello.com/b/1r0vkXFZ/patient-paws-training-academy</h5>
<br>
<h3>Unit Testing instructions</h3>
<p>After successfully cloning into your desired local folder location from github, navigate to project folder via terminal command line.
<br>
type 'touch .env' to create a new env file. The three sets of data you must then enter are below, along with directions on what to insert within brackets: <br>

```
MONGO_URI=<enterLinkInformationToYourMongDBdatabase>
SECRET=<enterSHA-256-SECRET-encryptionToPreferredSecretPassword>
SEED_PASSWORD=<enterYourDesiredMockPasswordForSeedFiles>
```

SECRET <strong>must</strong> be a sha256 hash. Link to hashing site: https://emn178.github.io/online-tools/sha256.html
<br>Once your .env is correctly created, SAVE FILE<br>
SAVE FILE.
<h4>NODE VERSION REQUIREMENTS:</h4>
In order to run this program you must have Node version 20 installed and running on your device.
<br>
<h5>Necessary packages to install<h5>
<br> Type the following verbatim into terminal's command line while in working project folder to install relevant packages:<br>

```
npm i
```
<br>
Super particular about what you want to download? No problem. See breakdown below of the bare minimum packages and dev packages:

```
npm i express mongoose morgan bcrypt jsonwebtoken
npm i -D nodemon jest supertest artillery mongo-db-memory-server
```

<br>
Ensure that you have nodemon installed globally.
<br>
<h6>Time to rock 'n roll!</h6>
<br>
Open up the project by typing 'code .' in the terminal while in the project folder if you haven't done so already. Then open terminal on project folder location within VS code.
<br><br>
Before initial rounds of testing, or to reset database per needs, type 'npm run seed' in command line while in project folder. This will plant pre-set instructors, users, courses, and pets into your database for easier testing and demo purposes. <br><strong>note: </strong>user 'Kevin Bacon' is our seed file admin user. This is the user who must be logged in to perform admin only routes manual testing through Postman.
<br>
Once you've grown tired of exploring the code, type 'npm run test' in terminal after verifying you're in the project's folder. The test files in the tests folder will execute and return the corresponding results.
</p>
<br>
<h3>The Routes and Instructions for manual testing with Postman.</h3>
<h4>Follow pet/user/course/instructor models in the codebase when crafting request bodies through Postman. Don't have Postman? Download/Install onto VS Code and get crackin'.</h4>
<br>Here, Have some templates to add during manual testing if you're pressed for time or creativity!<br>
User:

```
{
    "name": "Jared Leto",
    "email": "OscarHungry@yahoo.com",
    "password": "make your own, please",
    "isAdmin": "true"
}
```

<br>
Pet:

```
{
    "name": "Demo Doggo",
    "breed": "data-dog",
    "gender": "male",
    "weight": 45
}
```

<br>
Course:

```
{
    "name": "Demo Course",
    "description": "Train your dog to create APIs through this exciting demo!"
}
```

<br>
Instructors:

```
{
    "name": "Demolition Man",
    "bio": "Frozen in time for thirty years, only to be reawakened for this API demo..."
}
```

<br>
<h6>-list of all routes for Postman testing below. Always login with admin user and set authorization token in authorization column of new HTTP request in Postman before sending requests-</h6>
To begin, in project folder terminal window, type:

```
npm run dev
```

This will begin connectivity to the database and allow you to run postman tests.

```
    <ul>
    <li><strong>Create User:</strong>Post request to localhost:3000/user/</li>
    <li><strong>Login User:</strong>Post request to localhost:3000/user/login</li>
    <li><strong>Update User:</strong>Put request to localhost:3000/user/userId</li>
    <li><strong>Delete User:</strong>Delete request to localhost:3000/user/userId</li>
    <br>
    <li><strong>Create Pet:</strong>Post request to localhost:3000/pets/</li>
    <li><strong>Index of Pets:</strong>Get request to localhost:3000/pets/newPet</li>
    <li><strong>Show One Pet:</strong>Get request to localhost:3000/pets/petId</li>
    <li><strong>Update Pet:</strong>Put request to localhost:3000/pets/petId</li>
    <li><strong>Delete Pet:</strong>Delete request to localhost:3000/pets/pedId</li>
    <br>
    <li><strong>Index of Instructors:</strong>Get request to localhost:3000/instructors/</li>
    <li><strong>Create Instructor:</strong>Post request to localhost:3000/instructors/</li>
    <li><strong>Update Instructor:</strong>Put request to localhost:3000/instructors/instructorId</li>
    <li><strong>Show Instructor:</strong>Show request to localhost:3000/instructors/instructorId</li>
    <li><strong>Delete Instructor:</strong>Delete request to localhost:3000/instructors/instructorId</li>
    <li><strong>Submit testimony to instructor:</strong>Put request to localhost:3000/instructors/testify/instructorId</li>
    <br>
    <li><strong>Index of Courses:</strong>Get request to localhost:3000/courses/</li>
    <li><strong>Show Course:</strong>Get request to localhost:3000/courses/courseId</li>
    <li><strong>Enroll a pet in this course:</strong>Put request to localhost:3000/courses/courseId/pets/perId</li>
    <li><strong>ADMIN- Create Course:</strong>Post request to localhost:3000/courses/</li>
    <li><strong>ADMIN- Update Course:</strong>Put request to localhost:3000/courses/courseId</li>
    <li><strong>ADMIN- Delete Course:</strong>Delete request to localhost:3000/courses/courseId</li>
    <li><strong>ADMIN- Remove a pet from this course:</strong>Delete request to localhost:3000/courses/courseId/pets/petId</li>
    <li><strong>ADMIN- Add an instructor to this course:</strong>Put request to localhost:3000/courses/courseId/instructors/instructorId</li>
    <li><strong>ADMIN- Remove an instructor from this course:</strong>Delete request to localhost:3000/courses/courseId/instructors/instructorId</li>
    </ul>
<br>
</ul>
```

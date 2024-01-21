Unit 2 Project API design concepts, instructions for cloning, running and testing.

Readme instructions in-progress:
A Readme that fully explains to a user how to do the following:
How to install this app on their local machine
What global installations they need and what files do they need to create that didn't come in the github repo
How to start the app in dev mode
How to make an api request in Postman (i.e what port, what url etc)
How to run tests
How to start the app without dev mode.

<h1>Patient Paws Training Academy</h1>
<h2>a Many-to-Many API</h2>
<h3>Christopher Lazariuk, General Assembly Unit 2</h3>
<h4>User Story: As a user, I want to enroll my pet(s) in a multiplicity off courses at the canine training academy 'Patient Paws'. I want to be able to view information about the other pets in the course, as well as view information about the various instructors assigned to the courses.</h4>
<h5>Link to Trello Board: https://trello.com/b/1r0vkXFZ/patient-paws-training-academy</h5>
<br>
<h3>Unit Testing instructions</h3>
<p>After successfully cloning and opening the repository into your desired folder location, open the project within VS Code by typing 'code .'
<br>
Necessary packages to install: npm i express mongoose morgan bcrypt jsonwebtoken
<br>
Necessary dev packages to install: npm i -D nodemon jest supertest artillery mongo-db-memory-server (npm i quick shortcut))
<br>
open up the terminal in the open project and type 'npm run test' after verifying you're in the project folder.
The tests created in ./tests/within user.test.js will execute and return the corresponding results.
<br>
To perform load testing, type 'clear' in terminal to freshen your page and then type 'npm run load' to initiate artillery load testing.
</p>

<br>
<h3>Load Testing Instructions</h3>
<p>After successfully cloning and opening the respository, open up the terminal in the project folder and type 'npm run load'. The load tests created in ./artillery.yml will execute and return the corresponding results.</p>

<br>
<h3>Thoughts and concepts on plausible API improvements after load testing...</h3>
<ol>
    <li>
    Text for potential load improvement.
    </li>
    <li>
    Text for potential load improvement.
    </li>
    <li>
    Text for potential load improvement.
    </li>

</ol>

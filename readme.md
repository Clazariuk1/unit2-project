Unit 2 Project API design concepts / instructions for cloning, running and testing.

Readme instructions:
A Readme that fully explains to a user how to do the following:<br>
How to install this app on their local machine<br>
What global installations they need and what files do they need to create that didn't come in the github repo<br>
How to start the app in dev mode<br>
How to run tests<br>
How to start the app without dev mode.<br>

<h1>Patient Paws Training Academy</h1>
<h2>a Many-to-Many-to-Many API</h2>
<h4>a Tale of Stacks on Stacks on Stacks</h4>
<h3>Christopher Lazariuk, General Assembly Unit 2</h3>
<h4>Customer User Story: As a user, I want to enroll my pet(s) in a multiplicity off courses at the canine training academy 'Patient Paws'. I want to be able to view information about the other pets in the course, as well as view information about the various instructors assigned to the courses. If I loved my instructors, I want to submit a testimonial review of them.</h4>
<h4>Admin User Story: as a user, I want to manage my clients' enrolled pets and who will be covering what courses. I don't want to overbook my courses or instructors and we need to exclusively reserve the right to remove any pet from courses for bad behavior.</h4>
<h5>Link to Trello Board: https://trello.com/b/1r0vkXFZ/patient-paws-training-academy</h5>
<br>
<h3>Unit Testing instructions</h3>
<p>After successfully cloning into your desired local folder location from github, navigate to project folder via terminal command line.
<br>
type 'touch .env' to create a new env file. The three sets of data you must then enter are below, along with directions on what to insert within brackets: <br>'MONGO_URI=<enterLinkInformationToYourMongDBdatabase>'<br>'SECRET=<enterSHA-256-SECRET-encryptionToPreferredSecretPassword>'<br>SECRET <strong>must</strong> be a sha256 hash. Link to hashing site: https://emn178.github.io/online-tools/sha256.html

<br>'SEED_PASSWORD=<enterYourDesiredMockPasswordForSeedFiles>'
<br>
SAVE FILE.
<br>
In order to run this program you must have Node version 20 installed and running on your device.
<br>
<h5>Necessary packages to install<h5>
<br> Type the following verbatim into terminal's command line while in working project folder:<br> npm i express mongoose morgan bcrypt jsonwebtoken
<br>
<h5>Necessary dev packages to install</h5> Type the following verbatim into terminal's command line while in working project folder: <br> npm i -D nodemon jest supertest artillery mongo-db-memory-server
<br>
Ensure that you have nodemon installed globally.
<br>
<h6>Now fetch!</h6>
<br>
Open up the project with 'code .' if you haven't done so already. Open terminal on project folder location within VS code and type 'npm run test' after verifying you're in the project folder.
The test files in the tests folder will execute and return the corresponding results.
<br>
Before initial rounds of testing, or to reset database per needs, type 'npm run seed' in command line while in project folder.
</p>

<br>

<br>
</ol>

# 🛠 Workshop: REST API Testing
## Workshop Overview
This is a summary of a two-week school workshop focusing on testing a REST API for the "Mataffären" application. During this workshop, we used Postman and Newman for API testing, automating checks for various functionalities within the application’s REST API. The first week focused on creating and executing Postman test collections, while the second week expanded to using Cucumber and JavaScript’s built-in fetch command to test the same API endpoints.

### Workshop Objectives:
The primary objectives of this workshop were to:

1. **Analyze the Mataffären REST API** by examining endpoints and their expected responses to understand the application's data flow and structure.
2. **Conduct manual API testing in Postman** to recreate and verify API behavior as seen in the Mataffären frontend.
3. **Develop automated Postman tests** to validate API endpoints for retrieving categories, products, and implementing sorting features.
4. **Integrate Postman tests with Newman** to enable CLI-based testing and automate these checks through GitHub Actions.
5. **Replicate API tests with Cucumber and fetch in JavaScript**, creating BDD-based test scenarios for the same API functions and integrating these tests into a CI/CD pipeline with GitHub Actions.
### How to Install and Run the Project
**1. Clone the Repository**
```bash

git clone <your-repository-url>
cd <your-repository-name>
```
**2. Install Dependencies**
Make sure Node.js is installed, then install all required packages.

```bash

npm 
```
**3. Start the Application**
To start the Mataffären application locally:

```bash

npm start
```
**4. Run Postman Tests with Newman**
To execute all Postman tests with Newman:

```bash
npm test
```

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


### Workshop Achievements
#### Testing Coverage
- **Postman/Newman:** Comprehensive test coverage was achieved for critical API functions:

- Fetching product lists for all main categories, subcategories, and sub-subcategories.
- Validating pagination logic, including page size and current page in responses.
- Ensuring response structure integrity, such as the presence and data types of required fields (e.g., name, price, comparePrice, and image).
- Verifying sorting functionality for all seven sorting options in every main category.
- Despite covering main categories extensively, subcategories and sub-subcategories testing was limited due to resource constraints. These tests, however, are extendable for full coverage.

- **Cucumber and fetch:** Tested the same critical API functions as in Postman/Newman, but with the following limitations:

- Fetching product lists was limited to main and all categories; subcategories and sub-subcategories were not tested.
- Pagination was not fully dynamic: this tests do not dynamically iterate through all pages or cover every category in the API. 
- Validated response structure for required fields (e.g., name, price, comparePrice, and image) but not across all products or pages in each category.
- Verified sorting functionality for all seven sorting options in main categories but only the first 100 products per category (API limit) 
- These tests maintained coverage of key functionalities but were less exhaustive due to dynamic limitations.

 **Cucumber and fetch part** are located in the branch **[endpoint-testning-cucumber-chai]**(https://github.com/YevShch/Workshop-REST-API-testing/tree/endpoint-testning-cucumber-chai-fetch)


  #### Challenges and Solutions
1. **Handling missing or incomplete data**

- Products without a comparePrice field were skipped in comparison tests to prevent errors.
- Products missing image fields failed validation but were excluded from critical workflows to proceed with testing.

2. **Integration with GitHub Actions**

Newman tests faced connection issues with third-level categories in CI workflows. Splitting the tests into smaller collections and parallel jobs improved stability but did not fully resolve the problem. Tests ran successfully locally, indicating CI-specific resource constraints.

3. **Sorting by price and comparePrice**

Addressed challenges in sorting logic by dynamically selecting *price* or *comparePrice* from either *potentialPromotions* or default fields.



### How to Install and Run the Project
**1. Clone the Repository**
```bash

git clone <your-repository-url>
cd <your-repository-name>
```
**2. Install Dependencies**
Make sure Node.js is installed, then install all required packages.

```bash

npm install
```
**3. Start the Application**
To start the Mataffären application locally:

```bash

npm start
```
**4. Run All Postman Tests with Newman**
To execute all Postman tests with Newman:

```bash
npm test
```
**5. Run a one Postman collection with Newman**
To execute a one Postman collection  with Newman:

```bash
npx newman run postman-collections/NAME_of_COLLECTION.postman_collection.json
```

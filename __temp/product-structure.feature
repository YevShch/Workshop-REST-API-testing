Feature: Product Structure Validation
As a REST-API endpoint consumer, I want to ensure that the products returned by the API have the correct structure
and contain all mandatory fields with the correct data types.

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 15 main categories
    And there should be at least 500 subcategories


  Scenario: Validate product structure in the response
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?size=30&page=0&sort=topRated"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 1 product in the response
    Then each product should contain mandatory fields:
      | name       | type   |
      | name       | string |
      | price      | string |
      | priceValue | number |
      | code       | string |
      | image      | object |
      | thumbnail  | object |
      | labels     | array  |

    And each product image and thumbnail should contain:
      | fieldName | type   |
      | url       | string |
      | imageType | string |
    And product labels, if present, should be arrays of strings


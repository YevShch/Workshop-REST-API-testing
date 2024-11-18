Feature: Feature: Product Sorting by Name descending
  As a REST-API endpoint consumer, I want to test sorting of products by "name-desc"
  to ensure the API provides accurate sorting functionality.

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 500 categories

  Scenario: Check that the sort parameter is set to "name-desc"
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?size=30&page=0&sort=name-desc"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And the sort parameter in the response should be "name-desc"

  Scenario: Check that products are sorted by "name-desc" (Z-A)
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?size=30&page=0&sort=name-desc"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And the products in the response should be sorted by name in descending order

  Scenario Outline: Verify sorting by name descending in multiple categories
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?size=30&page=0&sort=name-desc"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And the sort parameter in the response should be "name-desc"
    And the products in the response should be sorted by name in descending order

    Examples:
      | {dynamic: 'categoryUrlParts'} |

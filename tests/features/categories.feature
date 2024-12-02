Feature: Categories
  As a REST-api endpoint consumer I want to be able to get a list of all categories in the shop
  and check that all main categories contain at least one product.

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 15 main categories
    And there should be at least 500 subcategories

  Scenario Outline: Visiting a main category
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?size=30&page=0&sort=topRated"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 1 product in the main category
    Examples:
      | {dynamic: 'categoryUrlParts'} |


  Scenario Outline: Visiting a category
    When I visit the endpoint "GET" "/api/c/{subcategoryUrlPart}?size=30&page=0&sort=topRated"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 1 product in the category
    Examples:
      | {dynamic: 'subcategoryUrlParts'} |

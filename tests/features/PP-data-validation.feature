Feature: Product Page Data Validation
As an API consumer,
I want to validate the product data for a specific product
So that I can ensure the API returns the correct product details.

  Background:
    Given that I am on the domain "http://localhost:4000"

   Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 15 main categories
    And there should be at least 500 subcategories

   Scenario: Visiting the category
    When I visit the endpoint "GET" "/api/c/kott-chark-och-fagel/fagel?size=30&page=0&sort=topRated"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 1 product in the category
    And each product should have a field "code" in the response

  Scenario Outline: Validate product page data for the specific products in the category
    Given I visit the endpoint "GET" "/api/axfood/rest/p/{productCode}"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And the response should contain an "image" with a "url"
    And the response should contain a "name" as a "string"

    Examples:
      | {dynamic: 'productCodes'} |

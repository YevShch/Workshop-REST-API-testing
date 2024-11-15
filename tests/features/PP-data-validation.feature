Feature: Product Page Data Validation
As an API consumer,
I want to validate the product data for a specific product
So that I can ensure the API returns the correct product details.

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Validate product page data for a specific product
    Given I visit the endpoint "GET" "/api/axfood/rest/p/101273778_ST"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And the response should contain an "image" with a "url"
    And the response should contain a "name" as a "string"

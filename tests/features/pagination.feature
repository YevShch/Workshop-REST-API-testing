Feature: Validate pagination and product data

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 500 categories

  Scenario: Validate the pagination of products in the response
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?page=0&size=30"
    Then the response should contain exactly 30 products on the page
    And the pagination data should be valid


  # Scenario Outline: Validate pagination and the number of products per page
  #   When I visit the endpoint "GET" "/api/c/{categoryUrlPart}>?page=0&size=<pageSize>"
  #   Then the response should contain the correct number of products "<expectedNumberOfProducts>"

  #     | pageSizes | expectedNumberOfProducts |
  #     | 30        | 30                       |
  #     | 50        | 50                       |
  #     | 100       | 100                      |
  
  #   Examples:
  #     | {dynamic: 'categoryUrlParts'} |
   
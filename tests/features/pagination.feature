Feature: Validate pagination and product data

  Background:
    Given that I am on the domain "http://localhost:4000"

  Scenario: Get a list of all categories
    When I visit the endpoint "GET" "/api/leftMenu/categorytree"
    Then the status code of the response should be 200
    And the response time should be below 1000 milliseconds
    And there should be at least 15 main categories
    And there should be at least 500 subcategories

  Scenario: Validate the pagination of products in the response
    When I visit the endpoint "GET" "/api/c/{categoryUrlPart}?page=0&size=30"
    Then the response should contain exactly 30 products on the page
    And the pagination data should be valid


  Scenario Outline: Validate pagination and the number of products per page
    When I visit an endpoint "GET" "/api/c/<categoryUrlPart>?page=<currentPage>&size=<pageSize>"
    Then the response should contain the correct number of products "<expectedNumberOfProducts>"
    And the "currentPage" value in the response should equal "<currentPage>"

    Examples:
      | categoryUrlPart            | pageSize | currentPage | expectedNumberOfProducts |
      | frukt-och-gront            | 30       | 0           | 30                       |
      | kott-chark-och-fagel       | 100      | 1           | 100                      |
      | kott-chark-och-fagel/fagel | 30       | 2           | 30                       |
      | mejeri-ost-och-agg         | 10       | 3           | 10                       |
      | skafferi                   | 20       | 0           | 20                       |
      | mejeri-ost-och-agg/mjolk   | 30       | 0           | 30                       |
      | brod-och-kakor             | 100      | 1           | 100                      |
      | fryst                      | 20       | 4           | 20                       |
      | fisk-och-skaldjur          | 30       | 0           | 30                       |
      | vegetariskt                | 30       | 2           | 30                       |


  
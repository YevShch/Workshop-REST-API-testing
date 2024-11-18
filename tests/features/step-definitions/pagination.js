import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';



Then( 'the response should contain exactly {float} products on the page', async function ( expectedPageSize ){
  const responseData = this.json; 
  expect( responseData.results.length ).to.eql( expectedPageSize );
  // expect( responseData.pagination.pageSize, 'Page size is incorrect' ).to.eql( expectedPageSize );
});

Then('the pagination data should be valid', async function(){
  const responseData = this.json; // Assuming this.json holds the parsed JSON response

  // Validate that pagination data exists and is an object
  expect( responseData.pagination, 'Pagination data is missing or not an object' ).to.be.an( 'object' );

  // Validate pagination fields
  expect( responseData.pagination.currentPage, 'Current page is not a valid number' ).to.be.a( 'number' );
  expect( responseData.pagination.numberOfPages, 'Number of pages should be greater than 0' ).to.be.above( 0 );
  expect( responseData.pagination.totalNumberOfResults, 'Total number of results is not a valid number' ).to.be.a( 'number' );
  expect( responseData.pagination.totalNumberOfResults, 'Total number of results should be greater than 0' ).to.be.above( 0 );
});


// Then( 'the response should contain the correct number of products {string}', async function ( expectedNumberOfProducts ) {
//   const responseData = this.json; 

//   const expectedCount = parseInt( expectedNumberOfProducts, 10 );

//   expect( responseData.results.length,
//     `Expected ${ expectedCount } products, but got ${ responseData.results.length }`
//   ).to.eql( expectedCount );
// } );


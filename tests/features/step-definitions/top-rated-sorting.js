import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then( 'the sort parameter in the response should be {string}', async function ( expectedSort ) {
  const responseData = this.json;
  const actualSort = responseData.pagination.sort;
  expect( actualSort ).to.eql( expectedSort, `Expected sort parameter to be '${ expectedSort }', but got '${ actualSort }'` );

  // const responseData = this.json; 
  // const sorts = responseData.sorts; // Extract the 'sorts' array from the response data

  // const sort = sorts.find(s => s.code === expectedSort); // Find an object with the `code` equal to `expectedSort`

  // // Check that such an object exists and `selected` is true
  // expect(sort, `Sort with code '${expectedSort}' not found`).to.exist;
  // expect(sort.selected, `Sort with code '${expectedSort}' is not selected`).to.be.true;
} );

Then('the products in the response should be sorted by {string} in descending order', async function(a){
  const products = this.json;

  for ( let i = 0; i < products.length - 1; i++ ) {
    const currentValue = products[ i ][ field ];
    const nextValue = products[ i + 1 ][ field ];
    expect( currentValue ).to.be.at.least(
      nextValue,
      `Product at index ${ i } has a lower ${ field } value than product at index ${ i + 1 }`
    );
  }
});

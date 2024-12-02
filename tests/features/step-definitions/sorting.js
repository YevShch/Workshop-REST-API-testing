import { Then } from '@cucumber/cucumber';
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

Then('the products in the response should be sorted by {string} in descending order', async function(field){
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    const currentValue = products[ i ][ field ];
    const nextValue = products[ i + 1 ][ field ];
    expect( currentValue ).to.be.at.least(
      nextValue,
      `Product at index ${ i } has a lower ${ field } value than product at index ${ i + 1 }`
    );
  }
});

Then( 'the products in the response should be sorted by name in descending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    let currentName = products[ i ].name.toLowerCase();
    let nextName = products[ i + 1 ].name.toLowerCase();
    expect( currentName >= nextName, `Product at index ${ i } with name "${ currentName }" should be before product at index ${ i + 1 } with name "${ nextName }"` );
  }
} );

Then( 'the products in the response should be sorted by name in ascending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    let currentName = products[ i ].name.toLowerCase();
    let nextName = products[ i + 1 ].name.toLowerCase();
    expect( currentName <= nextName, `Product at index ${ i } with name "${ currentName }" should be before product at index ${ i + 1 } with name "${ nextName }"` );
  }
} );

Then( 'the products in the response should be sorted by price in ascending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    let currentPrice = products[ i ].priceValue;
    let nextPrice = products[ i + 1 ].priceValue;
    expect( currentPrice ).to.be.at.most( nextPrice, `Product at index ${ i } with price ${ currentPrice } should be before product at index ${ i + 1 } with price ${ nextPrice }` );
  }
} );


Then( 'the products in the response should be sorted by price in descending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    let currentPrice = products[ i ].priceValue;
    let nextPrice = products[ i + 1 ].priceValue;
    expect( currentPrice ).to.be.at.least( nextPrice, `Product at index ${ i } with price ${ currentPrice } should be before product at index ${ i + 1 } with price ${ nextPrice }` );
  }
} );


Then( 'the products in the response should be sorted by compare price in ascending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    // Extract compare prices for the current and next product, converting from string to number
    let currentComparePrice = parseFloat( products[ i ].comparePrice.replace( ',', '.' ) );
    let nextComparePrice = parseFloat( products[ i + 1 ].comparePrice.replace( ',', '.' ) );

    expect( currentComparePrice ).to.be.at.most( nextComparePrice,
      `Product at index ${ i } with compare price ${ currentComparePrice } should be before product at index ${ i + 1 } with compare price ${ nextComparePrice }` );
  }
} );


Then( 'the products in the response should be sorted by compare price in descending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    // Extract compare prices for the current and next product, converting from string to number
    let currentComparePrice = parseFloat( products[ i ].comparePrice.replace( ',', '.' ) );
    let nextComparePrice = parseFloat( products[ i + 1 ].comparePrice.replace( ',', '.' ) );

    expect( currentComparePrice ).to.be.at.least( nextComparePrice,
      `Product at index ${ i } with compare price ${ currentComparePrice } should be before product at index ${ i + 1 } with compare price ${ nextComparePrice }` );
  }
} );


import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then( 'the sort parameter in the response should be {string}', async function ( expectedSort ) {
  const responseData = this.json;
  const actualSort = responseData.pagination.sort;
  expect( actualSort ).to.eql( expectedSort, `Expected sort parameter to be '${ expectedSort }', but got '${ actualSort }'` );

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
    // Determine the current product's price
    let currentPrice;
    if ( products[ i ].potentialPromotions && products[ i ].potentialPromotions.length > 0 ) {
      const promotionPrice = products[ i ].potentialPromotions[ 0 ].price;
      currentPrice = promotionPrice && promotionPrice.value ? promotionPrice.value : products[ i ].priceValue;
    } else {
      currentPrice = products[ i ].priceValue;
    }

    // Determine the next product's price
    let nextPrice;
    if ( products[ i + 1 ].potentialPromotions && products[ i + 1 ].potentialPromotions.length > 0 ) {
      const promotionPrice = products[ i + 1 ].potentialPromotions[ 0 ].price;
      nextPrice = promotionPrice && promotionPrice.value ? promotionPrice.value : products[ i + 1 ].priceValue;
    } else {
      nextPrice = products[ i + 1 ].priceValue;
    }

    expect( currentPrice ).to.be.at.most( nextPrice, `Product at index ${ i } with price ${ currentPrice } should be before product at index ${ i + 1 } with price ${ nextPrice }` );
  }
} );

Then( 'the products in the response should be sorted by price in descending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    // Determine the current product's price
    let currentPrice;
    if ( products[ i ].potentialPromotions && products[ i ].potentialPromotions.length > 0 ) {
      const promotionPrice = products[ i ].potentialPromotions[ 0 ].price;
      currentPrice = promotionPrice && promotionPrice.value ? promotionPrice.value : products[ i ].priceValue;
    } else {
      currentPrice = products[ i ].priceValue;
    }

    // Determine the next product's price
    let nextPrice;
    if ( products[ i + 1 ].potentialPromotions && products[ i + 1 ].potentialPromotions.length > 0 ) {
      const promotionPrice = products[ i + 1 ].potentialPromotions[ 0 ].price;
      nextPrice = promotionPrice && promotionPrice.value ? promotionPrice.value : products[ i + 1 ].priceValue;
    } else {
      nextPrice = products[ i + 1 ].priceValue;
    }

    // Ensure the products are sorted in descending order by price
    expect( currentPrice ).to.be.at.least(
      nextPrice,
      `Product at index ${ i } with price ${ currentPrice } should be before product at index ${ i + 1 } with price ${ nextPrice }`
    );
  }
} );



Then( 'the products in the response should be sorted by compare price in ascending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    // Helper function to parse compare price
    const parseComparePrice = ( priceString ) => {
      return parseFloat(
        priceString
          .replace( 'kr', '' ) 
          .replace( /\s/g, '' ) 
          .replace( ',', '.' ) 
          .trim()
      );
    };

    // Extract compare price for the current product
    let currentComparePrice;
    if ( products[ i ].potentialPromotions && products[ i ].potentialPromotions.length > 0 ) {
      // If there's a promotion, use comparePrice from the promotion
      currentComparePrice = parseComparePrice( products[ i ].potentialPromotions[ 0 ].comparePrice );
    } else {
      currentComparePrice = parseComparePrice( products[ i ].comparePrice );
    }

    // Extract compare price for the next product
    let nextComparePrice;
    if ( products[ i + 1 ].potentialPromotions && products[ i + 1 ].potentialPromotions.length > 0 ) {
      nextComparePrice = parseComparePrice( products[ i + 1 ].potentialPromotions[ 0 ].comparePrice );
    } else {
      nextComparePrice = parseComparePrice( products[ i + 1 ].comparePrice );
    }
    // Skip if any of the compare prices is invalid (NaN)
    if ( isNaN( currentComparePrice ) || isNaN( nextComparePrice ) ) {
      continue; 
    }

    expect( currentComparePrice ).to.be.at.most( nextComparePrice,
      `Product at index ${ i } with compare price ${ currentComparePrice } should be before product at index ${ i + 1 } with compare price ${ nextComparePrice }` );
  }
} );


Then( 'the products in the response should be sorted by compare price in descending order', async function () {
  const responseData = this.json;
  const products = responseData.results;

  for ( let i = 0; i < products.length - 1; i++ ) {
    const parseComparePrice = ( priceString ) => {
      return parseFloat(
        priceString
          .replace( 'kr', '' ) 
          .replace( /\s/g, '' ) 
          .replace( ',', '.' ) 
          .trim()
      );
    };
    let currentComparePrice;
    if ( products[ i ].potentialPromotions && products[ i ].potentialPromotions.length > 0 ) {
      currentComparePrice = parseComparePrice( products[ i ].potentialPromotions[ 0 ].comparePrice );
    } else {
      currentComparePrice = parseComparePrice( products[ i ].comparePrice );
    }
    let nextComparePrice;
    if ( products[ i + 1 ].potentialPromotions && products[ i + 1 ].potentialPromotions.length > 0 ) {
      nextComparePrice = parseComparePrice( products[ i + 1 ].potentialPromotions[ 0 ].comparePrice );
    } else {
      nextComparePrice = parseComparePrice( products[ i + 1 ].comparePrice );
    }
   
    if ( isNaN( currentComparePrice ) || isNaN( nextComparePrice ) ) {
      continue; 
    }

    expect(
      currentComparePrice,
      `Product at index ${ i } with compare price ${ currentComparePrice } should be before product at index ${ i + 1 } with compare price ${ nextComparePrice }`
    ).to.be.at.least( nextComparePrice );
  }
} );


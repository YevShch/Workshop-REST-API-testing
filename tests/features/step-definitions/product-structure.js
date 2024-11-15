import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';


Then( 'there should be at least {float} product in the response', async function ( minimumNumberOfProducts ){
  expect( this.json.results.length ).to.be.at.least( minimumNumberOfProducts );
});


Then( 'each product should contain mandatory fields:', function ( table ) {
  const responseData = this.json;
  const products = responseData.results;

  // Iterate over all products
  products.forEach( ( product, index ) => {
    // Iterate over all mandatory fields from the table
    table.hashes().forEach( ( { name, type } ) => {
      // Check that the field exists in the product
      expect( product, `Product at index ${ index } is missing the field '${ name }'` ).to.have.property( name );

      // Get the field value for type checking
      const field = product[ name ];

      // Special check for nested objects or arrays
      if ( field !== undefined && field !== null ) {
        if ( name === 'image' || name === 'thumbnail' ) {
          // Check the structure of 'image' and 'thumbnail' objects
          expect( field ).to.have.property( 'url' ).that.is.a( 'string' );
          expect( field ).to.have.property( 'imageType' ).that.is.a( 'string' );
        } else if ( Array.isArray( field ) ) {
          // Check that if it's an array, all items are strings
          field.forEach( label => {
            expect( label ).to.be.a( 'string' );
          } );
        } else {
          // Check that the field type matches the expected type
          expect( field, `Field '${ name }' in product at index ${ index } is not of type '${ type }'` ).to.be.a( type );
        }
      } else {
        throw new Error( `Field '${ name }' in product at index ${ index } is undefined or null` );
      }
    } );

    // console.log( `Product ${ index + 1 } has passed all mandatory field checks.` );
  } );
} );


Then( 'each product image and thumbnail should contain:', function ( table ) {
  const responseData = this.json; 
  const products = responseData.results;

  table.hashes().forEach( ( { fieldName, type } ) => {
    products.forEach( ( product, index ) => {
      [ 'image', 'thumbnail' ].forEach( ( prop ) => {
        expect( product[ prop ], `Product at index ${ index } is missing '${ prop }' object` ).to.be.an( 'object' );
        expect(
          product[ prop ][ fieldName ],
          `Field '${ fieldName }' in '${ prop }' of product at index ${ index } is not of type '${ type }'`
        ).to.be.a( type );
      } );
    } );
  } );
} );

Then( 'product labels, if present, should be arrays of strings', function () {
  const responseData = this.json; 
  const products = responseData.results;

  products.forEach( ( product, index ) => {
    if ( product.labels ) {
      expect( product.labels, `Labels in product at index ${ index } should be an array` ).to.be.an( 'array' );
      product.labels.forEach( ( label, labelIndex ) => {
        expect( label, `Label at index ${ labelIndex } in product at index ${ index } should be a string` ).to.be.a( 'string' );
      } );
    }
  } );
} );

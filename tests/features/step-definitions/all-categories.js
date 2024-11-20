import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

// Then( 'there should be at least {float} categories', async function ( numberOfCategories ) {

//   // recurse through category children to find all sub-categories
//   let categoryUrls = [];
//   function getAll ( children ) {
//     for ( let child of children ) {
//       categoryUrls.push( child.url );
//       if ( child.children ) { getAll( child.children ); }
//     }
//   }
//   getAll( this.json.children );

//   expect( categoryUrls.length ).to.be.at.least( numberOfCategories );

//   // store the category url parts for the next scenario (see usage in feature file)!
//   this.categoryUrlParts = categoryUrls;
// } );

Then( 'there should be at least {float} categories', async function ( numberOfCategories ) {

  let categoryUrls = [];
  function getFirstLevel ( children ) {
    for ( let child of children ) {
      categoryUrls.push( child.url );
    }
  }
  getFirstLevel( this.json.children );

  expect( categoryUrls.length ).to.be.at.least( numberOfCategories );

  // store the category url parts for the next scenario (see usage in feature file)!
  this.categoryUrlsParts = categoryUrls;

  console.log( "All urls ", categoryUrls );
} );

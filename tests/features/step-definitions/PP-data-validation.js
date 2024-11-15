import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';


Then( 'the response should contain an {string} with a {string}', async function ( a, b ) {
  const responseData = this.json; // Assuming 'this.json' is the parsed JSON response

  if ( a === 'image' && b === 'url' ) {
    // Check if "image" exists and has a valid "url"
    expect( responseData.thumbnail, "Thumbnail field is missing" ).to.be.an( 'object' );
    expect( responseData.thumbnail.url, "Thumbnail URL is missing" ).to.be.a( 'string' );
    expect( responseData.thumbnail.url ).to.match( /^https?:\/\/.+$/, "Thumbnail URL is not valid" );
  }
} );


Then( 'the response should contain a {string} as a {string}', async function ( a, b ) {
  const responseData = this.json; // Assuming 'this.json' is the parsed JSON response

  if ( a === 'name' && b === 'string' ) {
    // Check if "name" exists and is a string
    expect( responseData.name, "Name field is missing or not a string" ).to.be.a( 'string' );
  }
} );

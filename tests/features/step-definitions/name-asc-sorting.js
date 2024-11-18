import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';


Then('the products in the response should be sorted by name in ascending order', async function(){
  const products = this.json;

  for ( let i = 0; i < products.length - 1; i++ ) {
    let currentName = products[ i ].name.toLowerCase();
    let nextName = products[ i + 1 ].name.toLowerCase();
    expect( currentName <= nextName, `Product at index ${ i } with name "${ currentName }" should be before product at index ${ i + 1 } with name "${ nextName }"` );
  }
});


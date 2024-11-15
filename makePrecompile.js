import fs from 'fs';
import path from 'path';

// Convert Scenario Outlines with  | {dynamic: true, max: X} |
// or just | {dynamic: true} |
// into scenario outlines Cucumber understands
fs.rmSync( path.join( import.meta.dirname, '__temp' ), { recursive: true, force: true } );
fs.mkdirSync( path.join( import.meta.dirname, '__temp' ) );
fs
  .readdirSync( path.join( import.meta.dirname, 'tests', 'features' ), { recursive: true } )
  .filter( x => x.endsWith( '.feature' ) )
  .forEach( fileName => {
    let content = fs.readFileSync( path.join( import.meta.dirname, 'tests', 'features', fileName ), 'utf-8' );
    content = content.replace( /\n\s*\|\s*\{dynamic[^\|]*\|/g, toReplace => {
      let details;
      try {
        let func = new Function( `return ${ toReplace.split( '|' )[ 1 ] }` );
        details = func();
      }
      catch ( e ) { console.log( e ); return ''; }
      if ( details.dynamic ) {
        details.max = isNaN( details.max ) ? 1000 : details.max;
        let indent = ''.padEnd( toReplace.split( '|' )[ 0 ].length, ' ' );
        let examples = [ ...new Array( details.max + 1 ) ].map( ( x, i ) =>
          indent + `| ${ i === 0 ? details.dynamic : '' } |` ).join( '\n' );
        return '\n' + examples;
      }
      return '';
    } );
    fs.writeFileSync( path.join( import.meta.dirname, '__temp', fileName ), content, 'utf-8' );
  } );

var request	= require( 'request' );
var async	= require( 'async' );

async.waterfall( [ function( cb ){
	request.get( "http://prdp2.ctt.gov.mb.ca/MBIS/MCD.NSF/CLPrimarySector-A?OpenView&Start=1&Count=30&Expand=22#22", function( err, response, body ){
		if( err ){ return cb( err ); }
		console.log( body );
		return cb( null );
	} );
}], function(err) {
	if( err ){ console.error( err ); process.exit(1); }
	console.log('done');
	process.exit(0);
});

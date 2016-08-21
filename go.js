var request	= require( 'request' );
var async	= require( 'async' );
var cheerio	= require( 'cheerio' );
var url		= require( 'url' );

var saveData = function( details, cb ){
	console.log( "This is saveData; I have details of ");
	console.log( details );
	return cb( "asck ');
};

var getSinglePage = function( _link, cb ){

	async.waterfall( [ function( cb ){
		request.get( _link, function( err, response, body ){
			if( err ){ return cb( err ); }

			return cb( null, cheerio.load( body ) );
		} );
	}, function( $, cb ){
		var _details = { };
		var _dataTable = $(".btnTable").next();
		var _trs = _dataTable.children("tr");
		_trs.each(function(i,v){
			if( i === 0 ){
				_details["name"] = $(v).text();
			}else if( i > 1 ){
				var _tds = $(v).children("td");
				var _key = $(_tds[0]).text().replace( /:$/, "" );
				var _val = $(_tds[1]).text();
				_details[_key] = _val;
			}
			
		});
		saveData( _details, cb );
	} ], cb );
};

async.waterfall( [ function( cb ){
	request.get( "http://prdp2.ctt.gov.mb.ca/MBIS/MCD.NSF/CLCompany-A?openview", function( err, response, body ){
		if( err ){ return cb( err ); }
		return cb( null, cheerio.load( body ) );
	} );
}, function( $, cb ){
	var _links = $("body").find("a").filter( function( i, v ){
		var _link = $(v);
		if( _link.attr("href") && _link.attr("href").match( "^\/MBIS\/MCD\.NSF\/.*OpenDocument$" ) ){
			return true;
		}
		return false;
	} );
	return cb( null, _links.map( function( i, link ){
		return url.resolve( "http://prdp2.ctt.gov.mb.ca/", $(link).attr("href")  );
	} ) );
}, function( _links, cb ){
	
	async.eachLimit( _links, 1, function( _link, cb ){

		getSinglePage( _link, cb );

	}, cb );

}], function(err) {
	if( err ){ console.error( err ); process.exit(1); }
	console.log('done');
	process.exit(0);
});

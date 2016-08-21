# manitoba-business-information-service-scrape

This is a simple script that I hacked together in about an hour to scrape data from [http://prdp2.ctt.gov.mb.ca/MBIS/MCD.NSF/CLCompany-A?OpenView&Start=1](http://prdp2.ctt.gov.mb.ca/MBIS/MCD.NSF/CLCompany-A?OpenView&Start=1).

Feel free to use for whatever purpose; Couldn't find TOS on the site either.

Note that if this breaks you get to keep all the pieces.

Running `go.js` will create `output.json` assuming everything goes well; That file is a JSON serialized array of objects containing the following fields:
 * name
 * address
 * city
 * province/state
 * postal code
 * country
 * telephone
 * fax
 * toll-free
 * email address
 * website url
 * capabilities
 * company type
 * primary contact

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/";
//    const filename = "./json/pei_listings.json";
//    const filename = "./json/ns_listing.json";
    const filename = "./json/mixed_listings.json";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await listDatabases(client);
        //await createListing(client, filename);
        await createListings(client, filename);
        //await findListingByName(client, "Seaweed Monitoring Program");
        //await findListingByListingId(client, "OD007");
        //await updateListingByListingId(client,"OD0026",{ name: "Popeye the sailor" });
        //await findListingByListingId(client, "OD0026");
        //await findListingsByCreatedDate(client,"2019-01-01");
        //await deleteListingByListingId(client, "OD007");

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Delete an Ocean Set listing with the given name.
 * Note: If more than one listing has the same name, only the first listing the database finds will be deleted.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {string} nameOfListing The name of the listing you want to delete
 */
 async function deleteListingByListingId(client, IdOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne for the deleteOne() docs
    const result = await client.db("OceanSet").collection("listings").deleteOne({ listing_id: IdOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

/**
 * Update an Ocean Set data listing with the given listing_id
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the OceanSet database
 * @param {string} listing_id of the listing you want to update
 * @param {object} updatedListing An object containing all of the properties to be updated for the given listing
 */
 async function updateListingByListingId(client, IdOfListing, updatedListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne for the updateOne() docs
    const result = await client.db("OceanSet").collection("listings").updateOne({ listing_id: IdOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

/**
 * Print all the ocean set data listings greater than a given date
 * Note: If more than one listing is found, display all the listings
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} theDate The name of the listing you want to find
 */
 async function findListingsByCreatedDate(client, theDate) {
    const cursor = client.db("OceanSet").collection("listings").find({ last_updated: {$gte: theDate} });
    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found the listings in the collection updated since ${theDate}`);
        results.forEach((results, i) => {
            console.log();
            console.log(`Dataset Name: ${results.name}`);
            console.log(results.description);
            console.log(`     last updated date: ${results.last_updated}`);
            console.log(`     location: ${results.geographic_region.country}, ${results.geographic_region.jurisdiction}`);
            console.log(`     contact: ${results.contact.information}, email: ${results.contact.email}`);
        });
    } else {
        console.log(`No listings found older than '${theDate}'`);
    }
}

/**
 * Print an ocean set data listing for the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */
 async function findListingByName(client, nameOfListing) {
    const result = await client.db("OceanSet").collection("listings").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

/**
 * Print an ocean set data listing for the given listing id
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */
 async function findListingByListingId(client, ListingId) {
    const result = await client.db("OceanSet").collection("listings").findOne({ listing_id: ListingId });

    if (result) {
        console.log(`Found a listing in the collection with the listing id of '${ListingId}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the listing id '${ListingId}'`);
    }
}

/**
 * Create a new Ocean Set Listing from a JSON file
 * @param {MongoClient} client - A MongoClient that is connected to a cluster
 * @param {Object} newListing - file name for JSON file (should include directory from application root)
 */
async function createListing(client, newListing) {
    const fs = require("fs");
    let listings = await fs.promises.readFile(newListing);  
    let theListing = await JSON.parse(listings); 
    const result = await client.db("OceanSet").collection("listings").insertOne(theListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

/**
 * Create a new Ocean Set Listing from a JSON file
 * @param {MongoClient} client - A MongoClient that is connected to a cluster
 * @param {Object} newListing - file name for JSON file (should include directory from application root)
 */
 async function createListings(client, newListing) {
    const fs = require("fs");
    let listings = await fs.promises.readFile(newListing);  
    let theListings = await JSON.parse(listings); 
    const result = await client.db("OceanSet").collection("listings").insertMany(theListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
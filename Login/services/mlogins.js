const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getLogins() {
  try {
    await dal.connect();
    const cursor = dal.db("OceanSet").collection("logins").find();
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  }
};
async function getLoginByEmail(email) {
  try {
    await dal.connect();
    const result = dal.db("OceanSet").collection("logins").findOne({ "email": email });
    return result;
  } catch(error) {
    console.log(error);
  }
};
async function getLoginById(id) {
  try {
    await dal.connect();
    const result = dal.db("OceanSet").collection("logins").findOne({ _id: ObjectId(id) });
    return result;
  } catch(error) {
    console.log(error);
  }
};

async function addLogin(name, email, password, uuidv4) {
  let newLogin = JSON.parse(`{ "username": "` + name + `", "email": "` + email + `", "password": "` + password + `", "uuid": "` + uuidv4 + `" }`);
  try {
    await dal.connect();
    const result = await dal.db("OceanSet").collection("logins").insertOne(newLogin);
    return result.insertedId;
  } catch(error) {
    console.log(error);
  }
};

module.exports = {
    getLogins,
    addLogin,
    getLoginByEmail, 
    getLoginById,
  }
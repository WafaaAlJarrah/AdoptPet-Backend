import { MongoClient } from "mongodb";

export const dbConnection = async () => {
  async function ConnectToDB() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri =
      "mongodb+srv://Wafaa:uEiUncwSsmkrfzmE@cluster0.5i3vvrn.mongodb.net/test";

    const client = new MongoClient(uri);
    //console.log("client here : ", client);
    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await listDatabases(client);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  ConnectToDB().then(console.log("connected")).catch(console.error);

  //Display my list existed on DB
  async function listDatabases(client) {
    let databasesList = null;
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  }
};

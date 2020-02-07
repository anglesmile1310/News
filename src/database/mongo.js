const MongoClient = require("mongodb");
const getMongoURL = (options) => {
  let url
  if (options.user && options.pass) {
  url = options.servers
  .reduce((prev, cur) => prev + cur + ',', `mongodb://${options.user}:${options.pass}@`)
  } else {
  url = options.servers
  .reduce((prev, cur) => prev + cur + ',', 'mongodb://')
  }
  return `${url.substr(0, url.length - 1)}/${options.db}${options.repl ? `?replicaSet=${options.repl}` : ''}`
  }

const connect = (options, mediator) => {
  const { dbSettings } = options;
  if (!dbSettings) throw new Error("missing dbSettings");
  const cn = getMongoURL(dbSettings);
  console.log(cn);
  MongoClient.connect(cn, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return mediator.emit("db.error", err);
    }
    console.log(dbSettings.db);
    const db = client.db(dbSettings.db);
    mediator.emit("db.ready", db);
  });
};

module.exports = { connect };

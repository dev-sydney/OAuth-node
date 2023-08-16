const sequelize = require('./DBInstance');
const app = require('./app');
const port = process.env.PORT || 3000;
console.log('PORT: ', port);
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful.✅✅✅');
  })
  .catch(err => {
    console.log('Failed to connect to database❌❌❌', err);
  });

const server = app.listen(port, function () {
  console.log(`Listening to requests on ${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!❌ Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});

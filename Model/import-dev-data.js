const User = require('./../Model/UserModel');

const createDemoInstance = async () => {
  const syd = await User.create({
    user_name: 'Agbenu Otutey',
    email_address: 'Agbenu@example.com',
    user_password: 'test1234',
  });
  console.log(syd.toJSON());
};
createDemoInstance();

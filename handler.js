'use strict';
const db = require('./db-connect');

module.exports.myTestFunction = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const equipmentInfoTable = await db.query('SELECT * FROM Equipment_Info');
  await db.end();
  if (equipmentInfoTable) {
      callback(null, {
          statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(equipmentInfoTable),
      })
  } else {
      callback('error', {
          statusCode: 400,
           headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
          },
          body: {
              message: 'No equipment info table found.'
          },
      })
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.myTestFunction2 = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

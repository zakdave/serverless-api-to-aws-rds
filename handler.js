'use strict';

module.exports.myTestFunction = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const functions = await db.query('SELECT * FROM Equipment_Info');
  await db.end();
  if (functions) {
      callback(null, {
          statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(functions),
      })
  } else {
      callback('error', {
          statusCode: 400,
           headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
          },
          body: {
              message: 'No functions found.'
          },
      })
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

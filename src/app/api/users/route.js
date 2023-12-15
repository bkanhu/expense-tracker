// posts.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// export async function GET(request) {
//   const client = await clientPromise;
//   console.log('hello');
//   console.log('client', client.db);
//   const db = client.db('nextjs-mongodb-demo');
//   try {
//     return NextResponse.json({ status: 200, message: 'Hello world!' });
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.error({ status: 500, body: 'Internal Server Error' });
//   }
// }

// A API Rooute to add a New User Info to Mongodb Collections
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
//
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('users');
  // console.log('request', request);
  const { displayName, email, uid } = await request.json();
  console.log('displayName', displayName);
  console.log('email', email);
  console.log('uid', uid);
  try {
    // await collection.insertOne({ displayName, email, uid });
    const res = await collection.insertOne({ displayName, email, uid });
    return Response.json({ res, status: 200, message: 'successfully posted' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}
// A API Route to get all the users from Mongodb Collections
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  console.log('db', db);
  const collection = db.collection('users');

  try {
    const users = await collection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}
// A API Route to get a single user from Mongodb Collections
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(request) {
//   const client = await clientPromise;

//   const db = client.db('nextjs-mongodb-demo');
//   const collection = db.collection('users');

//   try {
//     const user = await collection.findOne({ _id: request.query.id });
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.error({ status: 500, body: 'Internal Server Error' });
//   }
// }
// A API Route to update a single user from Mongodb Collections
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function PUT(request) {
//   const client = await clientPromise;

//   const db = client.db('nextjs-mongodb-demo');
//   const collection = db.collection('users');
//   const { name, email } = await request.body.json();

//   try {
//     await collection.updateOne(
//       { _id: request.query.id },
//       { $set: { name, email } }
//     );
//     return NextResponse.next();
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.error({ status: 500, body: 'Internal Server Error' });
//   }
// }
// A API Route to delete a single user from Mongodb Collections

// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function DELETE(request) {

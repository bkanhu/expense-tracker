import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A API Route to get all the expenses by the auth user from Mongodb Collections

// A API Route to post the new expense to Mongodb Collections
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('expenses');

  // console.log('request', request);
  const { uid } = await request.json();
  console.log('uid', uid);
  try {
    // await collection.insertOne({ displayName, email, uid });
    // const res = await collection.insertOne({ uid });
    // sample object with all the fields like =
    const res = {
      amount: 100.5,
      description: 'Grocery shopping',
      date: '2023-10-15',
      category_id: 'grocery',
      uid: uid,
    };
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

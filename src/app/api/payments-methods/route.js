import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A API Route to post the payments methods to Mongodb Collections
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('paymentMethods');

  const { paymentMethodType, paymentMethodIndicator, uid } =
    await request.json();
  console.log('uid', uid);
  console.log('paymentMethodIndicator', paymentMethodIndicator);
  try {
    const res = await collection.insertOne({
      paymentMethodType,
      paymentMethodIndicator,
      uid,
    });
    return Response.json({ res, status: 200, message: 'successfully posted' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

// // API Route to get all the cateogries by a user from Mongodb Collections
// export async function GET(request) {
//   const client = await clientPromise;

//   const db = client.db('expenseTracker');
//   const collection = db.collection('categories');
//   // const { uid } = await request.query;

//   // const url = new URL(request.url);
//   // console.log('request', request.nextUrl);
//   const searchParams = request.nextUrl.searchParams;
//   const uid = searchParams.get('uid');

//   console.log('uid', uid);

//   try {
//     // const categories = await collection.find({}).toArray();
//     // const categories = await collection.find({ uid }).toArray();
//     const categories = await collection.find({ uid: uid }).toArray();
//     // const categories = { hello: 'world' };
//     return NextResponse.json(categories);
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.error({ status: 500, body: 'Internal Server Error' });
//   }
// }

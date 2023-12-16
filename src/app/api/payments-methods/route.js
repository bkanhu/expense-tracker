import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A API Route to post the payments methods to Mongodb Collections
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('paymentMethods');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  const { paymentMethodType, paymentMethodIndicator, uid } =
    await request.json();

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

// API Route to get all the payment Methods added by a user from Mongodb Collections
export async function GET(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('paymentMethods');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get('uid');

  // console.log('uid', uid);

  try {
    const paymentMethods = await collection.find({ uid: uid }).toArray();
    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

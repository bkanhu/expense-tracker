import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A API Route to post the new expense to Mongodb Collections
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('categories');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  const { categoryName, uid } = await request.json();

  try {
    const res = await collection.insertOne({ categoryName, uid });
    return Response.json({ res, status: 200, message: 'successfully posted' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

// API Route to get all the cateogries by the authUser from Mongodb Collections
export async function GET(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('categories');

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
    const categories = await collection.find({ uid: uid }).toArray();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

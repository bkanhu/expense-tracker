// A API Route to get a single user from Mongodb Collections
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  const uid = params.uid;
  console.log('request', uid);

  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('users');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  try {
    const user = await collection.findOne({ uid: uid });
    // const user = { urse: 'test' };
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

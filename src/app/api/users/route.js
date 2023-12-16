// posts.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('users');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  const { displayName, email, uid } = await request.json();

  try {
    const res = await collection.insertOne({ displayName, email, uid });
    return Response.json({ res, status: 200, message: 'successfully posted' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

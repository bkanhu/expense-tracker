import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A API Route to post the new expense to Mongodb Collections
export async function POST(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('expenses');

  const token = request.headers.get('authorization');
  // Extract the token from the header (assuming a "Bearer" token)
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  const {
    amount,
    title,
    description,
    date,
    time,
    category,
    paymentMethodType,
    paymentMethodIndicator,
    uid,
  } = await request.json();

  try {
    const res = await collection.insertOne({
      uid,
      amount,
      title,
      description,
      date,
      time,
      category,
      paymentMethodType,
      paymentMethodIndicator,
    });

    return Response.json({
      res,
      status: 200,
      message: 'successfully posted',
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

// An API Route to get all the expenses by authUser from Mongodb Collections

export async function GET(request) {
  const client = await clientPromise;

  const db = client.db('expenseTracker');
  const collection = db.collection('expenses');

  // const token = request.headers.get('authorization');
  // // Extract the token from the header (assuming a "Bearer" token)
  // const bearerToken = token.split(' ')[1];

  // if (!bearerToken) {
  //   return NextResponse.json({ error: 'Unauthorized' });
  // }
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get('uid');
  const monthFromParams = searchParams.get('month'); // Get the month parameter from the frontend
  const yearFromParams = searchParams.get('year'); // Get the year parameter from the frontend
  try {
    // Now get month and year and convert them to integers
    const month = parseInt(monthFromParams, 10);
    const year = parseInt(yearFromParams, 10);

    // Now get the first and last date of the month
    const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endOfMonth = `${year}-${month.toString().padStart(2, '0')}-${new Date(
      year,
      month,
      0
    )
      .getDate()
      .toString()
      .padStart(2, '0')}`;

    const res = await collection
      .find({
        uid,
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      })
      .toArray();
    console.log('res', res);

    // const expensesByDate = res;
    // Restructure expenses into expensesByDate format
    const expensesByDate = {};
    res.forEach((expense) => {
      const { date } = expense;
      if (!expensesByDate[date]) {
        expensesByDate[date] = [];
      }
      expensesByDate[date].push(expense);
    });

    //   const { date } = expense;
    //   if (!expensesByDate[date]) {
    //     expensesByDate[date] = [];
    //   }
    //   expensesByDate[date].push(expense);
    // });
    return Response.json({
      expensesByDate,
      // status: 200,
      // message: 'successfully fetched',
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

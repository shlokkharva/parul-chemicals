import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REVIEWS_FILE = path.join(process.cwd(), 'lib', 'reviews.json');

export async function GET() {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newReview = await request.json();
    
    // Read existing reviews
    let reviews = [];
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      reviews = JSON.parse(data);
    }
    
    // Add new review to the beginning
    reviews.unshift({
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ success: true, review: reviews[0] });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

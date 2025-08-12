import { NextResponse } from 'next/server';
import { addDonation } from '@/lib/donation';
export async function POST(){ addDonation(10); return NextResponse.json({ ok:true }); }

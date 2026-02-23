/**
 * Blog Comments API
 * Copyright (c) 2026 Sixsmith Games. All rights reserved.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

interface Comment {
  id: string;
  postSlug: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

async function readComments(): Promise<Comment[]> {
  const gistId = process.env.BLOG_GIST_ID;
  const token = process.env.BLOG_GITHUB_TOKEN;
  if (!gistId || !token) return [];
  
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    const raw = data.files?.['comments.json']?.content ?? '[]';
    return JSON.parse(raw) as Comment[];
  } catch {
    return [];
  }
}

async function writeComments(comments: Comment[]): Promise<void> {
  const gistId = process.env.BLOG_GIST_ID;
  const token = process.env.BLOG_GITHUB_TOKEN;
  if (!gistId || !token) throw new Error('Missing Gist config');

  await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: {
        'comments.json': { content: JSON.stringify(comments, null, 2) },
      },
    }),
  });
}

async function sendEmailNotification(comment: Comment) {
  // Send email to sixsmithgames@gmail.com
  const emailBody = `
New comment on blog post: ${comment.postSlug}

From: ${comment.userName} (${comment.userEmail})
User ID: ${comment.userId}

Comment:
${comment.content}

---
Approve or moderate at: https://www.sixsmithgames.com/blog/${comment.postSlug}
  `.trim();

  // Using a simple fetch to a notification service or email API
  // For now, we'll log it (you can integrate Resend, SendGrid, etc.)
  console.log('Email notification:', emailBody);
  
  // TODO: Integrate with email service
  // Example with Resend:
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'noreply@sixsmithgames.com',
  //     to: 'sixsmithgames@gmail.com',
  //     subject: `New blog comment on ${comment.postSlug}`,
  //     text: emailBody,
  //   }),
  // });
}

// GET /api/comments?postSlug=slug - Get comments for a post
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get('postSlug');
  
  if (!postSlug) {
    return NextResponse.json({ error: 'postSlug required' }, { status: 400 });
  }

  const allComments = await readComments();
  const postComments = allComments
    .filter(c => c.postSlug === postSlug && c.approved)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(postComments);
}

// POST /api/comments - Add a new comment
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Must be signed in to comment' }, { status: 401 });
  }

  const body = await req.json();
  const { postSlug, content, userName, userEmail } = body;

  if (!postSlug || !content || !userName || !userEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Basic profanity filter (expand as needed)
  const profanityList = ['fuck', 'shit', 'damn', 'ass', 'bitch', 'bastard', 'crap'];
  const lowerContent = content.toLowerCase();
  const hasProfanity = profanityList.some(word => lowerContent.includes(word));

  if (hasProfanity) {
    return NextResponse.json({ error: 'Comment contains inappropriate language' }, { status: 400 });
  }

  // Check for spam patterns
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) {
    return NextResponse.json({ error: 'Too many links detected' }, { status: 400 });
  }

  const newComment: Comment = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    postSlug,
    userId,
    userName,
    userEmail,
    content: content.trim(),
    createdAt: new Date().toISOString(),
    approved: true, // Auto-approve for now; can add manual approval later
  };

  const allComments = await readComments();
  allComments.unshift(newComment);
  await writeComments(allComments);

  // Send email notification
  await sendEmailNotification(newComment);

  return NextResponse.json({ success: true, comment: newComment });
}

'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function BlogComments({ postSlug }: { postSlug: string }) {
  const { user, isSignedIn } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  async function loadComments() {
    try {
      const res = await fetch(`/api/comments?postSlug=${postSlug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          content: newComment,
          userName: user?.fullName || user?.firstName || 'Anonymous',
          userEmail: user?.primaryEmailAddress?.emailAddress || '',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setNewComment('');
        setSuccess(true);
        await loadComments();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to post comment');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '4rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ color: '#059669', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Comment posted successfully!
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            style={{
              marginTop: '0.75rem',
              background: loading || !newComment.trim() ? '#9ca3af' : '#6366f1',
              color: 'white',
              padding: '0.625rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              border: 'none',
              cursor: loading || !newComment.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Sign in to join the conversation
          </p>
          <Link href="/sign-in" style={{
            background: '#6366f1',
            color: 'white',
            padding: '0.625rem 1.5rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Sign In
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '600', color: '#111827' }}>
                  {comment.userName}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p style={{ color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { FiUser, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import { getPost, getUser, getPostComments } from '@/lib/api';
import type { Comment } from '@/lib/api';

export default async function PostPage({ params }: { params: { id: string } }) {
  const [post, author, comments] = await Promise.all([
    getPost(params.id),
    getPost(params.id).then(post => getUser(post.userId)),
    getPostComments(params.id)
  ]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <a
          href="/posts"
          className="inline-flex items-center text-primary hover:underline mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Posts
        </a>

        {/* Post Content */}
        <article className="max-w-3xl mx-auto">
          <div className="p-8 rounded-xl bg-card border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  <a href={`/developers/${author.id}`} className="hover:text-primary">
                    {author.name}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">@{author.username}</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>
            <p className="text-muted-foreground whitespace-pre-line">{post.body}</p>
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FiMessageSquare className="text-primary" />
              <h2 className="text-xl font-semibold">
                Comments ({comments.length})
              </h2>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="p-6 rounded-xl bg-card border">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">
            {comment.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">{comment.name}</p>
          <a
            href={`mailto:${comment.email}`}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            {comment.email}
          </a>
        </div>
      </div>
      <p className="text-muted-foreground pl-10">{comment.body}</p>
    </div>
  );
}

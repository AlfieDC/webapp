'use client';

import { FiAlertCircle } from 'react-icons/fi';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-6 text-red-500">
            <FiAlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-muted-foreground mb-8">
            {error.message || 'An error occurred while loading the dashboard.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-4 py-2 border border-input rounded-lg hover:bg-card transition-colors"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
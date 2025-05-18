export default function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background py-12 animate-pulse">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        </div>

        <div className="mt-8">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

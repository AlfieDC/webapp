export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-64 bg-card animate-pulse rounded-lg"></div>
          <div className="h-10 w-32 bg-card animate-pulse rounded-lg"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-card border">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 animate-pulse"></div>
                <div className="h-6 w-16 bg-card animate-pulse rounded-md"></div>
              </div>
              <div className="h-4 w-24 bg-card animate-pulse rounded mb-2"></div>
              <div className="h-8 w-20 bg-card animate-pulse rounded"></div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-card border">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-48 bg-card animate-pulse rounded"></div>
                <div className="h-6 w-24 bg-card animate-pulse rounded"></div>
              </div>
              <div className="h-[350px] bg-card/50 animate-pulse rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
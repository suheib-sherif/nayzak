import { Header, Footer } from "@/components/layout";

function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-gray-200"></div>
      <div className="p-4">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default function CarsLoading() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-9 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-2 h-5 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="mb-1.5 h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-11 animate-pulse rounded-lg bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

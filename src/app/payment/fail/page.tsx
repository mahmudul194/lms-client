import Link from 'next/link';

export default function PaymentFailPage({
  searchParams,
}: {
  searchParams: { tran_id?: string };
}) {
  const transactionId = searchParams?.tran_id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Unfortunately, we could not process your payment at this time. Please try again.
          </p>
        </div>

        {transactionId && (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Transaction ID:</p>
            <p className="font-mono text-gray-900 font-medium">{transactionId}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col space-y-3">
          <Link
            href="/dashboard"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

import { WellnessDashboard } from "@/components/app/wellness-dashboard";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-4xl">📊</span>
              Wellness History
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your wellness journey over time
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Back to Check-in
          </Link>
        </div>

        <WellnessDashboard />
      </div>
    </div>
  );
}

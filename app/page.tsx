import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="mb-3">Financial Calculation Tools</h1>
          <p className="text-lg text-slate-600">
            Professional financial calculators for informed investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link
            href="/rule-of-72"
            className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-8 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="mb-2 group-hover:text-blue-600 transition-colors">
                  Rule of 72
                </h2>
                <p className="text-sm">
                  Estimate how long your investment will take to double based on
                  annual return rate.
                </p>
              </div>
              <span className="text-3xl">📈</span>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
              <span>Open Calculator</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-8 opacity-50 cursor-not-allowed">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="mb-2 text-slate-500">Compound Interest</h2>
                <p className="text-sm text-slate-400">
                  Calculate compound interest on your investments over time.
                </p>
              </div>
              <span className="text-3xl">💰</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="mb-3 text-blue-900">About FSuits</h3>
          <p className="text-blue-800 leading-relaxed">
            FSuits is a collection of professional financial calculators designed to help
            you understand investment growth and make data-driven decisions. All calculators
            use standard financial formulas and provide instant, accurate results.
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome to FSuits</h1>
          <p className="text-lg text-slate-600">Your personal financial tools suite</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/rule-of-72"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Rule of 72</h2>
            <p className="text-slate-600 mb-4">
              Calculate how long it takes for your investment to double based on annual
              return rate.
            </p>
            <span className="text-blue-600 font-semibold">Get Started →</span>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">💰</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Compound Interest</h2>
            <p className="text-slate-600 mb-4">
              Calculate compound interest on your investments over time.
            </p>
            <span className="text-slate-400 font-semibold">Coming Soon</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 opacity-50 cursor-not-allowed">
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Investment Return</h2>
            <p className="text-slate-600 mb-4">
              Track and analyze your investment returns and performance.
            </p>
            <span className="text-slate-400 font-semibold">Coming Soon</span>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="text-lg font-bold text-blue-900 mb-2">About FSuits</h3>
          <p className="text-blue-800">
            FSuits is a collection of financial calculators and tools to help you make
            informed investment decisions. Start with the Rule of 72 to understand how
            your investments can grow over time.
          </p>
        </div>
      </div>
    </div>
  );
}

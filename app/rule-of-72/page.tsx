"use client";

import { useState, useEffect } from "react";

export default function RuleOf72() {
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  useEffect(() => {
    if (rate > 0) {
      const calculatedYears = 72 / rate;
      setYears(Math.round(calculatedYears * 10) / 10);
      setFinalAmount(investmentAmount * 2);
    }
  }, [rate, investmentAmount]);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setRate(Math.max(0.1, Math.min(100, value)));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInvestmentAmount(Math.max(0, value));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="mb-3">Rule of 72 Calculator</h1>
          <p className="text-lg text-slate-600">
            Quickly estimate how long it takes for your investment to double
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-8">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Annual Return Rate ({rate.toFixed(1)}%)
                  </label>
                  <input
                    type="range"
                    value={rate}
                    onChange={handleRateChange}
                    min="0.1"
                    max="50"
                    step="0.1"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex gap-2 mt-3">
                    <input
                      type="number"
                      value={rate}
                      onChange={handleRateChange}
                      min="0.1"
                      step="0.1"
                      className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                    <span className="text-slate-500 py-2">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Initial Investment
                  </label>
                  <div className="flex gap-2">
                    <span className="text-slate-500 py-2">$</span>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={handleAmountChange}
                      min="1"
                      step="1000"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <p className="text-sm text-blue-100 mb-1">Time to Double</p>
              <p className="text-4xl font-bold">{years.toFixed(1)}</p>
              <p className="text-sm text-blue-100 mt-2">years</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
              <p className="text-sm text-green-100 mb-1">Final Amount</p>
              <p className="text-3xl font-bold">
                ${finalAmount.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-sm text-green-100 mt-2">after {years.toFixed(1)} years</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-8">
          <h3 className="text-slate-900 mb-4 font-semibold">How It Works</h3>
          <p className="text-slate-700 mb-4">
            The Rule of 72 is a simple formula to estimate how many years it will take for
            an investment to double:
          </p>
          <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm text-slate-900">
            Years to Double = 72 ÷ Annual Return Rate (%)
          </div>
          <p className="text-slate-700 text-sm">
            For example, at a {rate.toFixed(1)}% annual return, an investment of $
            {investmentAmount.toLocaleString()} would double to $
            {finalAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })} in
            approximately <strong>{years.toFixed(1)} years</strong>.
          </p>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-8">
          <p className="text-sm text-amber-900">
            <strong>Disclaimer:</strong> This calculator is for educational purposes only.
            Actual returns may vary based on market conditions, fees, and other factors.
            Always consult with a qualified financial advisor before making investment
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

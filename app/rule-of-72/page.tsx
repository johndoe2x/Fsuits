"use client";

import { useState, useEffect } from "react";

export default function RuleOf72() {
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  useEffect(() => {
    if (rate > 0) {
      const calculatedYears = 72 / rate;
      setYears(Math.round(calculatedYears * 10) / 10);
      const result = investmentAmount * Math.pow(2, calculatedYears / calculatedYears);
      setFinalAmount(investmentAmount * Math.pow(2, calculatedYears / calculatedYears));
    }
  }, [rate, investmentAmount]);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setRate(Math.max(0.1, value));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Rule of 72 Calculator</h1>
          <p className="text-slate-600">
            A simple way to estimate how long it will take for your investment to double.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Annual Return Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              min="0.1"
              step="0.1"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            />
            <input
              type="range"
              value={rate}
              onChange={handleRateChange}
              min="0.1"
              max="50"
              step="0.1"
              className="w-full mt-3"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={handleAmountChange}
              min="1"
              step="100"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Time to Double</p>
                <p className="text-3xl font-bold text-blue-600">{years.toFixed(1)} years</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Final Amount (After {years.toFixed(1)} years)</p>
                <p className="text-3xl font-bold text-green-600">
                  ${(investmentAmount * 2).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-slate-900 mb-3">How It Works</h3>
            <p className="text-slate-700 text-sm mb-3">
              The Rule of 72 is a simple formula to estimate the number of years required to
              double your investment:
            </p>
            <div className="bg-white p-3 rounded border-l-4 border-blue-600 mb-3">
              <p className="font-mono text-sm text-slate-800">Years to Double = 72 ÷ Annual Return Rate</p>
            </div>
            <p className="text-slate-700 text-sm">
              For example, with a 7% annual return, it would take approximately{" "}
              <strong>10.3 years</strong> for your initial investment to double.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This calculator is for educational purposes only. Actual
              investment returns may vary. Consult with a financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

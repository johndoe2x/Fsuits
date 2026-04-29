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
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <h1>Rule of 72 Calculator</h1>
          <p style={{ fontSize: "1.125rem" }}>
            Quickly estimate how long it takes for your investment to double
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          <div className="card">
            <div className="space-y-8">
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Annual Return Rate ({rate.toFixed(1)}%)
                </label>
                <input
                  type="range"
                  value={rate}
                  onChange={handleRateChange}
                  min="0.1"
                  max="50"
                  step="0.1"
                  style={{ accentColor: "#2563eb" }}
                />
                <div className="flex items-center gap-3" style={{ marginTop: "0.75rem" }}>
                  <input
                    type="number"
                    value={rate}
                    onChange={handleRateChange}
                    min="0.1"
                    step="0.1"
                    style={{ width: "6rem" }}
                  />
                  <span style={{ color: "#94a3b8" }}>%</span>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Initial Investment
                </label>
                <div className="flex items-center gap-3">
                  <span style={{ color: "#94a3b8" }}>₹</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={handleAmountChange}
                    min="1"
                    step="1000"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="gap-6" style={{ display: "flex", flexDirection: "column" }}>
            <div className="result-card">
              <p>Time to Double</p>
              <div className="value">{years.toFixed(1)}</div>
              <p>years</p>
            </div>

            <div className="result-card green">
              <p>Final Amount</p>
              <div className="value">
                ₹{finalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p>after {years.toFixed(1)} years</p>
            </div>
          </div>
        </div>

        <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "2rem", marginTop: "2rem" }}>
          <h3>How It Works</h3>
          <p style={{ marginBottom: "1rem" }}>
            The Rule of 72 is a simple formula to estimate how many years it will take for an
            investment to double:
          </p>
          <div style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1rem",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: "#0f172a"
          }}>
            Years to Double = 72 ÷ Annual Return Rate (%)
          </div>
          <p style={{ fontSize: "0.875rem" }}>
            For example, at a {rate.toFixed(1)}% annual return, an investment of ₹
            {investmentAmount.toLocaleString("en-IN")} would double to ₹
            {finalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })} in
            approximately <strong>{years.toFixed(1)} years</strong>.
          </p>
        </div>

        <div className="warning">
          <p>
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

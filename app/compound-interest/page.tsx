"use client";

import { useState, useEffect } from "react";

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState<number>(10000000);
  const [rate, setRate] = useState<number>(8);
  const [time, setTime] = useState<number>(5);
  const [frequency, setFrequency] = useState<string>("annually");
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);

  const frequencyMap: { [key: string]: number } = {
    annually: 1,
    semi: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) {
      const n = frequencyMap[frequency];
      const rateDecimal = rate / 100;

      const amount = principal * Math.pow(1 + rateDecimal / n, n * time);
      const interest = amount - principal;

      setFinalAmount(Math.round(amount));
      setInterestEarned(Math.round(interest));
    }
  }, [principal, rate, time, frequency]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <h1>Compound Interest Calculator</h1>
          <p style={{ fontSize: "1.125rem" }}>
            Calculate how your investment grows with compound interest over time
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          <div className="card">
            <div className="space-y-8">
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Principal Amount (₹)
                </label>
                <div className="flex items-center gap-3">
                  <span style={{ color: "#94a3b8" }}>₹</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    min="1"
                    step="100000"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Annual Interest Rate ({rate.toFixed(2)}%)
                </label>
                <input
                  type="range"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  min="0.1"
                  max="50"
                  step="0.1"
                  style={{ accentColor: "#2563eb" }}
                />
                <div className="flex items-center gap-3" style={{ marginTop: "0.75rem" }}>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    step="0.1"
                    style={{ width: "6rem" }}
                  />
                  <span style={{ color: "#94a3b8" }}>%</span>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Time Period ({time} years)
                </label>
                <input
                  type="range"
                  value={time}
                  onChange={(e) => setTime(parseFloat(e.target.value) || 1)}
                  min="1"
                  max="50"
                  step="0.5"
                  style={{ accentColor: "#2563eb" }}
                />
                <div className="flex items-center gap-3" style={{ marginTop: "0.75rem" }}>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(parseFloat(e.target.value) || 1)}
                    min="1"
                    max="50"
                    step="0.5"
                    style={{ width: "6rem" }}
                  />
                  <span style={{ color: "#94a3b8" }}>years</span>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Compounding Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    fontSize: "0.95rem",
                    background: "#f8fafc",
                    color: "#0f172a",
                    cursor: "pointer",
                  }}
                >
                  <option value="annually">Annually</option>
                  <option value="semi">Semi-Annually (2x/year)</option>
                  <option value="quarterly">Quarterly (4x/year)</option>
                  <option value="monthly">Monthly (12x/year)</option>
                  <option value="daily">Daily (365x/year)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="gap-6" style={{ display: "flex", flexDirection: "column" }}>
            <div className="result-card">
              <p>Final Amount</p>
              <div className="value">
                ₹{finalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p>after {time} years</p>
            </div>

            <div className="result-card green">
              <p>Interest Earned</p>
              <div className="value">
                ₹{interestEarned.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p>{((interestEarned / principal) * 100).toFixed(1)}% gain</p>
            </div>

            <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "1rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>Principal</p>
              <p style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>
                ₹{principal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "2rem", marginTop: "2rem" }}>
          <h3>How It Works</h3>
          <p style={{ marginBottom: "1rem" }}>
            Compound interest is interest calculated on the initial principal and all accumulated interest from previous periods. The more frequently interest is compounded, the faster your money grows.
          </p>
          <div style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1rem",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: "#0f172a",
            overflowX: "auto",
          }}>
            A = P(1 + r/n)<sup>nt</sup>
          </div>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
            <strong>Where:</strong>
          </p>
          <ul style={{ fontSize: "0.875rem", color: "#64748b", marginLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>A = Final amount</li>
            <li>P = Principal (initial investment)</li>
            <li>r = Annual interest rate (as decimal)</li>
            <li>n = Compounding frequency per year</li>
            <li>t = Time in years</li>
          </ul>
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

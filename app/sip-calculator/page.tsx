"use client";

import { useState, useEffect } from "react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(50000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [duration, setDuration] = useState<number>(10);
  const [frequency, setFrequency] = useState<string>("monthly");
  const [stepUpPercentage, setStepUpPercentage] = useState<number>(0);
  const [includeStepUp, setIncludeStepUp] = useState<boolean>(false);

  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [finalAmountWithoutStepUp, setFinalAmountWithoutStepUp] = useState<number>(0);

  const frequencyMap: { [key: string]: number } = {
    monthly: 12,
    quarterly: 4,
    annual: 1,
  };

  useEffect(() => {
    if (monthlyInvestment > 0 && annualRate > 0 && duration > 0) {
      const periodPerYear = frequencyMap[frequency];
      const periodsTotal = periodPerYear * duration;
      const monthlyRate = annualRate / 100 / 12;
      const periodRate = monthlyRate * (12 / periodPerYear);

      // Calculate without step-up
      const fvWithoutStepUp =
        monthlyInvestment *
        (Math.pow(1 + periodRate, periodsTotal) - 1) /
        periodRate *
        (1 + periodRate);

      setFinalAmountWithoutStepUp(Math.round(fvWithoutStepUp));

      // Calculate with step-up
      let fvWithStepUp = 0;
      if (includeStepUp && stepUpPercentage > 0) {
        const stepUpRate = stepUpPercentage / 100;
        for (let i = 0; i < periodsTotal; i++) {
          const currentInvestment = monthlyInvestment * Math.pow(1 + stepUpRate, Math.floor(i / periodPerYear));
          fvWithStepUp += currentInvestment * Math.pow(1 + periodRate, periodsTotal - i - 1);
        }
        fvWithStepUp = Math.round(fvWithStepUp);
      } else {
        fvWithStepUp = Math.round(fvWithoutStepUp);
      }

      // Calculate total investment
      let totalInv = 0;
      if (includeStepUp && stepUpPercentage > 0) {
        const stepUpRate = stepUpPercentage / 100;
        for (let i = 0; i < periodsTotal; i++) {
          const currentInvestment = monthlyInvestment * Math.pow(1 + stepUpRate, Math.floor(i / periodPerYear));
          totalInv += currentInvestment;
        }
      } else {
        totalInv = monthlyInvestment * periodsTotal;
      }
      totalInv = Math.round(totalInv);

      setTotalInvestment(totalInv);
      setFinalAmount(fvWithStepUp);
      setTotalReturns(fvWithStepUp - totalInv);
    }
  }, [monthlyInvestment, annualRate, duration, frequency, stepUpPercentage, includeStepUp]);

  const frequencyLabel = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annually",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <h1>SIP Calculator</h1>
          <p style={{ fontSize: "1.125rem" }}>
            Calculate your Systematic Investment Plan returns with optional step-up feature
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          <div className="card">
            <div className="space-y-8">
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  {frequencyLabel[frequency as keyof typeof frequencyLabel]} Investment (₹)
                </label>
                <div className="flex items-center gap-3">
                  <span style={{ color: "#94a3b8" }}>₹</span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value) || 0)}
                    min="1"
                    step="5000"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Annual Interest Rate ({annualRate.toFixed(2)}%)
                </label>
                <input
                  type="range"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                  min="1"
                  max="30"
                  step="0.1"
                  style={{ accentColor: "#2563eb" }}
                />
                <div className="flex items-center gap-3" style={{ marginTop: "0.75rem" }}>
                  <input
                    type="number"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                    min="1"
                    max="30"
                    step="0.1"
                    style={{ width: "6rem" }}
                  />
                  <span style={{ color: "#94a3b8" }}>%</span>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Duration ({duration} years)
                </label>
                <input
                  type="range"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                  min="1"
                  max="40"
                  step="1"
                  style={{ accentColor: "#2563eb" }}
                />
                <div className="flex items-center gap-3" style={{ marginTop: "0.75rem" }}>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                    min="1"
                    max="40"
                    step="1"
                    style={{ width: "6rem" }}
                  />
                  <span style={{ color: "#94a3b8" }}>years</span>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.75rem" }}>
                  Investment Frequency
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
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annually</option>
                </select>
              </div>

              <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <input
                    type="checkbox"
                    id="stepUpToggle"
                    checked={includeStepUp}
                    onChange={(e) => setIncludeStepUp(e.target.checked)}
                    style={{ cursor: "pointer", width: "1rem", height: "1rem" }}
                  />
                  <label htmlFor="stepUpToggle" style={{ cursor: "pointer", fontWeight: "600", color: "#166534" }}>
                    Enable Step-up SIP
                  </label>
                </div>
                {includeStepUp && (
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.5rem" }}>
                      Annual Step-up Rate ({stepUpPercentage.toFixed(1)}%)
                    </label>
                    <input
                      type="range"
                      value={stepUpPercentage}
                      onChange={(e) => setStepUpPercentage(parseFloat(e.target.value) || 0)}
                      min="0"
                      max="20"
                      step="0.5"
                      style={{ accentColor: "#16a34a" }}
                    />
                    <div className="flex items-center gap-3" style={{ marginTop: "0.5rem" }}>
                      <input
                        type="number"
                        value={stepUpPercentage}
                        onChange={(e) => setStepUpPercentage(parseFloat(e.target.value) || 0)}
                        min="0"
                        max="20"
                        step="0.5"
                        style={{ width: "5rem" }}
                      />
                      <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>% per year</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="gap-6" style={{ display: "flex", flexDirection: "column" }}>
            <div className="result-card">
              <p>Final Amount</p>
              <div className="value">
                ₹{finalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p>after {duration} years</p>
            </div>

            <div className="result-card green">
              <p>Total Returns</p>
              <div className="value">
                ₹{totalReturns.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p>{((totalReturns / totalInvestment) * 100).toFixed(1)}% gains</p>
            </div>

            <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "1rem" }}>
              <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>Total Investment</p>
              <p style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>
                ₹{totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>

            {includeStepUp && stepUpPercentage > 0 && (
              <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "0.75rem", padding: "1rem" }}>
                <p style={{ fontSize: "0.75rem", color: "#92400e", marginBottom: "0.5rem" }}>Without Step-up</p>
                <p style={{ fontSize: "1.125rem", fontWeight: "700", color: "#78350f" }}>
                  ₹{finalAmountWithoutStepUp.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "2rem", marginTop: "2rem" }}>
          <h3>How SIP Works</h3>
          <p style={{ marginBottom: "1rem" }}>
            A Systematic Investment Plan (SIP) is an investment method where you invest a fixed amount regularly (monthly, quarterly, or annually) into a mutual fund or investment. This helps with rupee-cost averaging and discipline.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Step-up SIP:</strong> Increase your regular investment by a fixed percentage every year to keep pace with inflation and maximize returns over time.
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
            FV = P × [((1+r)^n - 1) / r] × (1 + r)
          </div>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
            Where FV = Future Value, P = Regular Investment, r = Periodic Return Rate, n = Number of Periods
          </p>
        </div>

        <div className="warning">
          <p>
            <strong>Disclaimer:</strong> This calculator is for educational purposes only.
            Actual returns vary based on market conditions. Past performance doesn't guarantee
            future results. Consult a financial advisor before investing.
          </p>
        </div>
      </div>
    </div>
  );
}

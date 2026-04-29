"use client";

import { useState, useEffect } from "react";

interface MonthData {
  month: number;
  year: number;
  monthLabel: string;
  investment: number;
  totalInvested: number;
  value: number;
  gains: number;
}

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(50000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [duration, setDuration] = useState<number>(10);
  const [frequency, setFrequency] = useState<string>("monthly");
  const [stepUpPercentage, setStepUpPercentage] = useState<number>(0);
  const [includeStepUp, setIncludeStepUp] = useState<boolean>(false);
  const [expandedYear, setExpandedYear] = useState<number | null>(1);

  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [finalAmountWithoutStepUp, setFinalAmountWithoutStepUp] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

      // Build detailed breakdown
      const data: MonthData[] = [];
      let totalInv = 0;
      let totalVal = 0;
      const stepUpRate = includeStepUp && stepUpPercentage > 0 ? stepUpPercentage / 100 : 0;

      for (let i = 0; i < periodsTotal; i++) {
        const year = Math.floor(i / periodPerYear) + 1;
        const monthInYear = (i % periodPerYear) + 1;
        const currentInvestment = monthlyInvestment * Math.pow(1 + stepUpRate, year - 1);

        totalInv += currentInvestment;
        totalVal += currentInvestment * Math.pow(1 + periodRate, periodsTotal - i - 1);

        const monthLabels = frequency === "monthly"
          ? [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`]
          : frequency === "quarterly"
          ? [`Q1`, `Q2`, `Q3`, `Q4`]
          : [`Annual`];

        data.push({
          month: monthInYear,
          year: year,
          monthLabel: monthLabels[monthInYear - 1],
          investment: Math.round(currentInvestment),
          totalInvested: Math.round(totalInv),
          value: Math.round(totalVal),
          gains: Math.round(totalVal - totalInv),
        });
      }

      setMonthlyData(data);

      // Calculate with step-up
      let fvWithStepUp = 0;
      if (includeStepUp && stepUpPercentage > 0) {
        fvWithStepUp = Math.round(totalVal);
      } else {
        fvWithStepUp = Math.round(fvWithoutStepUp);
      }

      setTotalInvestment(Math.round(totalInv));
      setFinalAmount(fvWithStepUp);
      setTotalReturns(fvWithStepUp - Math.round(totalInv));
    }
  }, [monthlyInvestment, annualRate, duration, frequency, stepUpPercentage, includeStepUp]);

  const frequencyLabel = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annually",
  };

  // Group data by year
  const yearlyData = monthlyData.reduce((acc: { [key: number]: MonthData[] }, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  const totalPages = Object.keys(yearlyData).length;
  const yearKeys = Object.keys(yearlyData).map(Number).sort((a, b) => a - b);
  const currentYearKey = yearKeys[currentPage - 1] || yearKeys[0];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Detailed Breakdown ({frequency === "monthly" ? "Monthly" : frequency === "quarterly" ? "Quarterly" : "Annual"} Progression)</h2>

          {/* Pagination Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                background: currentPage === 1 ? "#e2e8f0" : "#2563eb",
                color: currentPage === 1 ? "#94a3b8" : "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              ← Previous
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>Page {currentPage} of {totalPages}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {yearKeys.map((year, idx) => (
                  <button
                    key={year}
                    onClick={() => setCurrentPage(idx + 1)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: currentPage === idx + 1 ? "#2563eb" : "#ffffff",
                      color: currentPage === idx + 1 ? "white" : "#0f172a",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: currentPage === idx + 1 ? "600" : "500",
                      fontSize: "0.875rem",
                    }}
                  >
                    Y{year}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 1rem",
                background: currentPage === totalPages ? "#e2e8f0" : "#2563eb",
                color: currentPage === totalPages ? "#94a3b8" : "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              Next →
            </button>
          </div>

          {/* Current Year Table */}
          <div style={{ overflowX: "auto" }}>
            {currentYearKey !== undefined && yearlyData[currentYearKey] && (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.75rem", overflow: "hidden" }}>
                <div style={{
                  padding: "1rem",
                  background: "#eff6ff",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "600",
                  color: "#0f172a",
                }}>
                  Year {currentYearKey} - Value: ₹{yearlyData[currentYearKey][yearlyData[currentYearKey].length - 1].value.toLocaleString("en-IN")} | Invested: ₹{yearlyData[currentYearKey][yearlyData[currentYearKey].length - 1].totalInvested.toLocaleString("en-IN")}
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#0f172a" }}>Period</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>Investment</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>Total Invested</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>Total Value</th>
                      <th style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#16a34a" }}>Gains</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyData[currentYearKey].map((item, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          background: idx % 2 === 0 ? "#ffffff" : "#f9fafb",
                        }}
                      >
                        <td style={{ padding: "0.75rem", color: "#0f172a", fontWeight: "500" }}>
                          Y{currentYearKey}M{item.month} ({item.monthLabel})
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right", color: "#64748b" }}>
                          ₹{item.investment.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right", color: "#64748b" }}>
                          ₹{item.totalInvested.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#2563eb" }}>
                          ₹{item.value.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: "600", color: "#16a34a" }}>
                          ₹{item.gains.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

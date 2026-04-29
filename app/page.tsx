import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <h1>Financial Calculation Tools</h1>
          <p style={{ fontSize: "1.125rem" }}>
            Professional financial calculators for informed investment decisions
          </p>
        </div>

        <div className="grid grid-cols-2">
          <Link href="/rule-of-72" className="card" style={{ display: "block", position: "relative" }}>
            <div className="flex items-start justify-between" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ marginBottom: "0.5rem" }}>Rule of 72</h2>
                <p style={{ fontSize: "0.875rem" }}>
                  Estimate how long your investment will take to double based on annual return rate.
                </p>
              </div>
              <span style={{ fontSize: "1.875rem" }}>📈</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "#2563eb", fontWeight: "500", fontSize: "0.875rem" }}>
              <span>Open Calculator</span>
              <span>→</span>
            </div>
          </Link>

          <Link href="/compound-interest" className="card" style={{ display: "block", position: "relative" }}>
            <div className="flex items-start justify-between" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ marginBottom: "0.5rem" }}>Compound Interest</h2>
                <p style={{ fontSize: "0.875rem" }}>
                  Calculate how your investment grows with compound interest.
                </p>
              </div>
              <span style={{ fontSize: "1.875rem" }}>💰</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "#2563eb", fontWeight: "500", fontSize: "0.875rem" }}>
              <span>Open Calculator</span>
              <span>→</span>
            </div>
          </Link>
        </div>

        <Link href="/sip-calculator" className="card" style={{ display: "block", position: "relative" }}>
            <div className="flex items-start justify-between" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ marginBottom: "0.5rem" }}>SIP Calculator</h2>
                <p style={{ fontSize: "0.875rem" }}>
                  Calculate Systematic Investment Plan returns with step-up feature.
                </p>
              </div>
              <span style={{ fontSize: "1.875rem" }}>📲</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "#2563eb", fontWeight: "500", fontSize: "0.875rem" }}>
              <span>Open Calculator</span>
              <span>→</span>
            </div>
          </Link>

        <div className="highlight">
          <h3>About FSuits</h3>
          <p>
            FSuits is a collection of professional financial calculators designed to help you
            understand investment growth and make data-driven decisions. All calculators use
            standard financial formulas and provide instant, accurate results.
          </p>
        </div>
      </div>
    </div>
  );
}

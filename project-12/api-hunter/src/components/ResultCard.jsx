export default function ResultCard({ title, result, lastRequest }) {
  const { loading, data, error, status, duration } = result;

  let statusEl = <span className="status">—</span>;
  if (loading) statusEl = <span className="status loading">Loading...</span>;
  else if (error) statusEl = <span className="status err">❌ Error{status ? ` (${status})` : ""}</span>;
  else if (status) statusEl = <span className="status ok">✅ {status} OK {duration != null ? `· ${duration}ms` : ""}</span>;

  return (
    <div className="result-box">
      <h3>{title} {statusEl}</h3>

      {lastRequest && (
        <div className="info-row">
          {lastRequest.method} &nbsp;|&nbsp; {lastRequest.url}
        </div>
      )}

      <div className="body-area">
        {loading && <div className="spinner" />}
        {error && !loading && <p className="err-text">{error}</p>}
        {data && !loading && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
        {!loading && !error && !data && (
          <p className="placeholder">No response yet.</p>
        )}
      </div>
    </div>
  );
}

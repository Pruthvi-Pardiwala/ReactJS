import { useState } from "react";
import { useDispatch } from "react-redux";
import { callWithFetch, callWithAxios, setLastRequest, clearResults } from "../store/apiSlice";

export default function ApiForm() {
  const dispatch = useDispatch();
  const [url, setUrl]       = useState("https://jsonplaceholder.typicode.com/users");
  const [method, setMethod] = useState("GET");
  const [body, setBody]     = useState('{\n  "title": "Test",\n  "body": "Hello",\n  "userId": 1\n}');
  const [lib, setLib]       = useState("both");
  const [err, setErr]       = useState("");

  const handleSubmit = () => {
    setErr("");
    let parsed = null;
    if (method === "POST") {
      try { parsed = JSON.parse(body); }
      catch { setErr("Invalid JSON"); return; }
    }
    dispatch(clearResults());
    dispatch(setLastRequest({ url, method }));
    const payload = { url, method, body: parsed };
    if (lib !== "axios") dispatch(callWithFetch(payload));
    if (lib !== "fetch")  dispatch(callWithAxios(payload));
  };

  return (
    <div className="panel">
      <h2>API Request</h2>

      <label>Method & URL</label>
      <div className="row">
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      {method === "POST" && (
        <>
          <label>Body (JSON)</label>
          <textarea rows={5} value={body}
            onChange={e => { setBody(e.target.value); setErr(""); }} />
          {err && <p style={{ color: "#c55", fontSize: "0.75rem", marginTop: 4 }}>{err}</p>}
        </>
      )}

      <label>Library</label>
      <div className="radio-group">
        {["fetch", "axios", "both"].map(l => (
          <label key={l}>
            <input type="radio" name="lib" value={l}
              checked={lib === l} onChange={() => setLib(l)} />
            {l === "fetch" ? "fetch()" : l === "axios" ? "axios" : "Both"}
          </label>
        ))}
      </div>

      <button className="submit" onClick={handleSubmit}>Send Request</button>
    </div>
  );
}

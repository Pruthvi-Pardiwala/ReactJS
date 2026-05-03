import { useSelector } from "react-redux";
import ApiForm from "./components/ApiForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

export default function App() {
  const { fetchResult, axiosResult, lastRequest } = useSelector(s => s.api);

  return (
    <>
      <h1>API Hunter</h1>
      <p className="subtitle">Test APIs using fetch() and axios with Redux state management</p>

      <div className="layout">
        <div>
          <ApiForm />
          <div className="note">
            <strong>JSON Server (Mock Backend)</strong><br />
            <code>npx json-server --watch db.json --port 3001</code>
            Endpoints: /users &nbsp; /posts
          </div>
        </div>

        <div className="results">
          <ResultCard title="fetch()" result={fetchResult} lastRequest={lastRequest} />
          <ResultCard title="axios"   result={axiosResult}  lastRequest={lastRequest} />
        </div>
      </div>
    </>
  );
}

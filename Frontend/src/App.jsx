import { useBusiness } from "./context/BusinessContext";
import axios from "axios";
import { useState } from "react";

function App() {
  const { name, setName, location, setLocation, data, setData, loading, setLoading } = useBusiness();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      setError("Both fields are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/business-data", { name, location });
      setData(res.data);
    } catch {
      alert("Error fetching data");
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/regenerate-headline", {
        params: { name, location }
      });
      setData((prev) => ({ ...prev, headline: res.data.headline }));
    } catch {
      alert("Failed to regenerate headline");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h1 className="text-xl font-bold text-center">Business Dashboard</h1>
          <input
            type="text"
            placeholder="Business Name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
            <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Loading...
            </div>
            ) : "Submit"}

          </button>
        </form>

        {data && (
          <div className="bg-white p-6 rounded-xl shadow space-y-2">
            <p><strong>Rating:</strong> {data.rating}</p>
            <p><strong>Reviews:</strong> {data.reviews}</p>
            <p><strong>Headline:</strong> {data.headline}</p>
            <button
              onClick={regenerateHeadline}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
              <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Regenerating...
              </div>
              ) : "Regenerate SEO Headline"}

            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

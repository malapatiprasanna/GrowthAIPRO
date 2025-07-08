import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendURL = "https://growthaipro.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert("Please fill both fields");

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/business-data`, { name, location });
      setData(res.data);
    } catch (err) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/regenerate-headline`, { params: { name, location } });
      setData({ ...data, headline: res.data.headline });
    } catch (err) {
      alert("Failed to regenerate headline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold text-center">Business Dashboard</h1>
          <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Business Name" />
          <input className="w-full p-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {data && (
          <div className="mt-6 space-y-2">
            <p><strong>Rating:</strong> {data.rating} ⭐</p>
            <p><strong>Reviews:</strong> {data.reviews}</p>
            <p><strong>SEO Headline:</strong> {data.headline}</p>
            <button onClick={regenerateHeadline} className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              {loading ? "Loading..." : "Regenerate SEO Headline"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

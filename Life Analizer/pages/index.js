// Demo: Life Analyzer → AI-Generated Story

// Tech: Next.js (React), OpenAI API (GPT-4), basic form + result

import { useState } from 'react';

export default function LifeAnalyzer() {
  const [inputs, setInputs] = useState({
    childhood: "",
    beliefs: "",
    turningPoints: "",
    challenges: "",
  });
  const [generatedStory, setGeneratedStory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const generateStory = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    setGeneratedStory(data.story);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Life Analyzer</h1>

      <textarea
        name="childhood"
        placeholder="Describe your childhood..."
        value={inputs.childhood}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        rows={3}
      />

      <textarea
        name="beliefs"
        placeholder="What beliefs were you raised with?"
        value={inputs.beliefs}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        rows={3}
      />

      <textarea
        name="turningPoints"
        placeholder="What were the biggest turning points in your life?"
        value={inputs.turningPoints}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        rows={3}
      />

      <textarea
        name="challenges"
        placeholder="What challenges have shaped you the most?"
        value={inputs.challenges}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        rows={3}
      />

      <button
        onClick={generateStory}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Generate Story"}
      </button>

      {generatedStory && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Your Life Story</h2>
          <p className="whitespace-pre-wrap text-gray-800">{generatedStory}</p>
        </div>
      )}
    </div>
  );
}

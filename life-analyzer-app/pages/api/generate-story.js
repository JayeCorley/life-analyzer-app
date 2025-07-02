export default async function handler(req, res) {
  const { childhood, beliefs, turningPoints, challenges } = req.body;

  const prompt = `
You are a wise and empathetic narrator. Based on the following reflections:

- Childhood: ${childhood}
- Beliefs: ${beliefs}
- Turning Points: ${turningPoints}
- Challenges: ${challenges}

Write a short, reflective life story in the third person. Include themes, patterns, and emotional insight. Make it personal and empowering.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a life story narrator and reflection guide." },
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();
  const story = data.choices?.[0]?.message?.content;
  res.status(200).json({ story });
}

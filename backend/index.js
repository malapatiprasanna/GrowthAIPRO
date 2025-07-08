const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Discover the Magic Behind {name} in {location}!",
  "Why Everyone is Talking About {name} in {location} This Year",
  "{name}: {location}'s Best Kept Secret for 2025",
  "How {name} is Redefining Local Business in {location}",
  "Top 5 Reasons {name} is Dominating {location}'s Market",
  "{name} Sets the Bar High in {location}'s Local Scene",
  "The Ultimate Guide to {name} in {location}",
  "What Makes {name} a Local Favorite in {location}?",
  "Exploring {location}'s Finest: Inside {name}'s Success",
  "Why Locals Trust {name} Over the Competition",
  "{name}: The Hometown Hero of {location}",
  "How {name} is Shaping the Future of {location}",
  "Experience the Excellence of {name} in {location}",
  "Unmatched Quality & Service: {name} in {location}",
  "What {name} Customers Are Raving About in {location}",
  "The Story Behind {name}'s Rise in {location}",
  "Can’t-Miss Spotlight: {name} in {location}",
  "Your Go-To Guide for {name} in {location}",
  "What Makes {name} a Must-Visit in {location}?",
  "2025's Trending Business in {location}: {name}"
];


function getRandomHeadline(name, location) {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace("{name}", name).replace("{location}", location);
}

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const reviews = Math.floor(Math.random() * 300) + 50;
  const headline = getRandomHeadline(name, location);
  res.json({ rating: parseFloat(rating), reviews, headline });
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  const headline = getRandomHeadline(name, location);
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

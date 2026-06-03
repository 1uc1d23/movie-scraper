export default async function handler(req, res) {
  const { id, s, e } = req.query;

  if (!id) return res.status(400).json({ error: 'missing id' });

  const url = s && e
    ? `https://movish.net/moviebox-embed/tv/${id}/${s}/${e}`
    : `https://movish.net/moviebox-embed/movie/${id}`;

  const html = await fetch(url).then(r => r.text());

  const match = html.match(/<video[^>]+src="([^"]+)"/i);

  if (!match) return res.status(404).json({ error: 'not found' });

  res.json({ videoUrl: match[1] });
}

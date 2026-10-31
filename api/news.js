export default async function handler(req, res) {
  const { path, ...params } = req.query
  if (path !== 'top-headlines' && path !== 'everything') {
    return res.status(400).json({ status: 'error', message: 'Invalid path' })
  }
  const query = new URLSearchParams({ ...params, apiKey: process.env.NEWS_API_KEY })
  const response = await fetch(`https://newsapi.org/v2/${path}?${query}`)
  const data = await response.json()
  res.status(response.status).json(data)
}

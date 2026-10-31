import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import NewsList from './components/NewsList.jsx'
import Footer from './components/Footer.jsx'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const CATEGORIES = [
  { id: 'general', label: 'Latest News' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food', query: 'food' },
]

function getUrl(category) {
  const base = 'https://newsapi.org/v2'
  if (category.query) {
    return `${base}/everything?q=${category.query}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`
  }
  return `${base}/top-headlines?category=${category.id}&pageSize=20&apiKey=${API_KEY}`
}

function App() {
  const [selected, setSelected] = useState(null) 
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!selected) return 

    const category = CATEGORIES.find((cat) => cat.id === selected)
    let ignore = false 

    async function getNews() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(getUrl(category))
        const data = await response.json()

        if (data.status !== 'ok') {
          throw new Error(data.message || 'Something went wrong')
        }
        if (ignore) return

        setNews(data.articles.filter((a) => a.title && a.title !== '[Removed]'))
      } catch (err) {
        if (ignore) return
        setNews([])
        setError(err.message)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    getNews()

    return () => {
      ignore = true
    }
  }, [selected])

  return (
    <>
      <Header
        categories={CATEGORIES}
        selected={selected}
        onSelect={setSelected}
      />
      <NewsList
        news={news}
        selected={selected}
        isLoading={isLoading}
        error={error}
        hasKey={Boolean(API_KEY)}
      />
      <Footer />
    </>
  )
}

export default App

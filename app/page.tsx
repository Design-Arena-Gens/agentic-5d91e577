'use client'

import { useState } from 'react'

type Tab = 'caption' | 'schedule' | 'analyze' | 'respond'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('caption')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const [captionInput, setCaptionInput] = useState('')
  const [imageDescription, setImageDescription] = useState('')
  const [postTopic, setPostTopic] = useState('')
  const [postTime, setPostTime] = useState('')
  const [accountStats, setAccountStats] = useState('')
  const [commentText, setCommentText] = useState('')

  const handleSubmit = async (action: string) => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/instagram-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data: {
            captionInput,
            imageDescription,
            postTopic,
            postTime,
            accountStats,
            commentText,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setResult(data.result)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🤖 Instagram AI Manager</h1>
        <p>Your intelligent assistant for Instagram account management</p>
      </div>

      <div className="main-content">
        <div className="dashboard">
          <div className="card">
            <h3>✍️ Content Creation</h3>
            <p>Generate engaging captions, hashtags, and content ideas powered by AI</p>
          </div>
          <div className="card">
            <h3>📅 Smart Scheduling</h3>
            <p>Get optimal posting times and schedule recommendations for maximum engagement</p>
          </div>
          <div className="card">
            <h3>📊 Analytics</h3>
            <p>Analyze your account performance and get actionable insights</p>
          </div>
          <div className="card">
            <h3>💬 Engagement</h3>
            <p>Generate smart responses to comments and messages</p>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'caption' ? 'active' : ''}`}
            onClick={() => setActiveTab('caption')}
          >
            Caption Generator
          </button>
          <button
            className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Post Scheduler
          </button>
          <button
            className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyze')}
          >
            Analytics
          </button>
          <button
            className={`tab ${activeTab === 'respond' ? 'active' : ''}`}
            onClick={() => setActiveTab('respond')}
          >
            Comment Responder
          </button>
        </div>

        {activeTab === 'caption' && (
          <div className="input-section">
            <h2>Generate Caption & Hashtags</h2>
            <div className="form-group">
              <label>Image/Post Description</label>
              <textarea
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                placeholder="Describe what your post is about (e.g., sunset at the beach, new product launch, workout session)"
              />
            </div>
            <div className="form-group">
              <label>Tone/Style (optional)</label>
              <select value={captionInput} onChange={(e) => setCaptionInput(e.target.value)}>
                <option value="">Select tone...</option>
                <option value="casual">Casual & Friendly</option>
                <option value="professional">Professional</option>
                <option value="inspirational">Inspirational</option>
                <option value="funny">Funny & Playful</option>
                <option value="educational">Educational</option>
              </select>
            </div>
            <button
              className="btn"
              onClick={() => handleSubmit('generate_caption')}
              disabled={loading || !imageDescription}
            >
              {loading ? 'Generating...' : 'Generate Caption'}
            </button>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="input-section">
            <h2>Optimize Posting Schedule</h2>
            <div className="form-group">
              <label>Post Topic/Content Type</label>
              <input
                type="text"
                value={postTopic}
                onChange={(e) => setPostTopic(e.target.value)}
                placeholder="e.g., fitness tips, travel photos, product showcase"
              />
            </div>
            <div className="form-group">
              <label>Target Audience Location/Timezone</label>
              <input
                type="text"
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
                placeholder="e.g., US East Coast, Europe, Global"
              />
            </div>
            <button
              className="btn"
              onClick={() => handleSubmit('schedule_post')}
              disabled={loading || !postTopic}
            >
              {loading ? 'Analyzing...' : 'Get Scheduling Recommendation'}
            </button>
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="input-section">
            <h2>Analyze Account Performance</h2>
            <div className="form-group">
              <label>Recent Account Stats</label>
              <textarea
                value={accountStats}
                onChange={(e) => setAccountStats(e.target.value)}
                placeholder="Paste your recent stats: followers, engagement rate, top posts, etc. Or describe your goals and let AI provide general growth strategies."
              />
            </div>
            <button
              className="btn"
              onClick={() => handleSubmit('analyze_account')}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Get Insights & Recommendations'}
            </button>
          </div>
        )}

        {activeTab === 'respond' && (
          <div className="input-section">
            <h2>Generate Comment Response</h2>
            <div className="form-group">
              <label>Comment/Message Text</label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Paste the comment or message you want to respond to"
              />
            </div>
            <button
              className="btn"
              onClick={() => handleSubmit('respond_comment')}
              disabled={loading || !commentText}
            >
              {loading ? 'Generating...' : 'Generate Response'}
            </button>
          </div>
        )}

        {loading && <div className="loading">🤖 AI is thinking...</div>}

        {result && (
          <div className="result-section">
            <h3>✨ AI Generated Result</h3>
            <div className="result-content">{result}</div>
          </div>
        )}

        {error && (
          <div className="result-section error">
            <h3>⚠️ Error</h3>
            <div className="result-content">{error}</div>
          </div>
        )}

        <div className="features-grid">
          <div className="feature-card">
            <h4>🎯 Smart Hashtags</h4>
            <p>AI-powered hashtag suggestions to increase your reach and discoverability</p>
          </div>
          <div className="feature-card">
            <h4>⏰ Optimal Timing</h4>
            <p>Post when your audience is most active for maximum engagement</p>
          </div>
          <div className="feature-card">
            <h4>📈 Growth Strategies</h4>
            <p>Data-driven recommendations to grow your followers and engagement</p>
          </div>
          <div className="feature-card">
            <h4>🎨 Content Ideas</h4>
            <p>Never run out of ideas with AI-generated content suggestions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

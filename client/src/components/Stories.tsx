import './Stories.css';

export const Stories = () => {
  // TODO: Fetch stories from backend
  const stories = [
    {
      id: '1',
      title: 'The Rookie Card Find',
      collectionName: 'Baseball Cards',
      date: new Date('2026-01-10'),
      content: `I was at a small estate sale in rural Iowa when I stumbled upon a dusty box in the corner of the garage. 
      The owner mentioned it was his grandfather's collection from the 1950s. As I carefully went through the cards, 
      I couldn't believe my eyes - there it was, a pristine 1952 Mickey Mantle rookie card! The card was in incredible 
      condition, protected by an old tobacco tin. I negotiated a fair price with the family, and now it's the crown 
      jewel of my collection.`,
      imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop',
    },
    {
      id: '2',
      title: 'Meeting My Childhood Hero',
      collectionName: 'Baseball Auto',
      date: new Date('2025-12-15'),
      content: `Growing up, I idolized Ken Griffey Jr. His swing was poetry in motion. Fast forward 30 years, 
      I'm at a charity event in Seattle, and there he is. I brought my worn baseball that I've had since I was 10. 
      When I told him the story of how I practiced my swing in the backyard pretending to be him, he smiled and 
      signed it with a personal message: "Keep swinging for the fences - Ken Griffey Jr." That moment made that 
      little kid inside me incredibly happy.`,
      imageUrl: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800&h=600&fit=crop',
    },
    {
      id: '3',
      title: 'Grandpa\'s Farm',
      collectionName: 'Farm Country',
      date: new Date('2025-11-20'),
      content: `These photos are from my grandfather's farm in Nebraska. He worked that land for 60 years. 
      The old red barn in the sunset photo was built by his father in 1923. Every summer as a kid, I'd spend 
      weeks there learning to drive the tractor, feed the chickens, and watch the wheat fields sway in the wind. 
      Grandpa passed last year, but these photos keep his memory and the farm's legacy alive. The land has been 
      in our family for four generations.`,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="stories-container">
      <div className="stories-header">
        <h1 className="stories-title">Collection Stories</h1>
        <p className="stories-subtitle">Tales and memories behind the treasures</p>
      </div>

      <div className="stories-grid">
        {stories.map((story) => (
          <article key={story.id} className="story-card">
            <div className="story-image-container">
              <img 
                src={story.imageUrl} 
                alt={story.title}
                className="story-image"
              />
              <div className="story-collection-badge">
                {story.collectionName}
              </div>
            </div>
            <div className="story-content">
              <div className="story-meta">
                <span className="story-date">
                  {story.date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <h2 className="story-title">{story.title}</h2>
              <p className="story-text">{story.content}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="stories-empty-state">
        <p className="empty-icon">📖</p>
        <p className="empty-text">More stories coming soon...</p>
      </div>
    </div>
  );
};

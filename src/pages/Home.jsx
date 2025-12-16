import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home()
{
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://public-api.wordpress.com/wp/v2/sites/koracasopis.wordpress.com/posts";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const getImageUrl = (post) => {

    if (post.jetpack_featured_media_url) {
      return post.jetpack_featured_media_url;
    }

    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content.rendered;
    const firstImg = tempDiv.querySelector('img');
    if (firstImg) {
      return firstImg.src;
    }

    return null; 
  };

  if (loading) return
    <div className="loader-container">
      <div className="loader"></div>
    </div>;

  return (
    <>
    <Helmet>
      <title>Kora Časopis - Početna</title>
      <meta name="description" content="" />
      <link rel="canonical" href="https://koracasopis.com/" />
    </Helmet>
    <div className="feed">
      {posts.map(post => {
        const imageUrl = getImageUrl(post);

        return (
          <div key={post.id} className="card">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={post.title.rendered} 
                className="card-image"
              />
            )}
            <div className="card-content">
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </div>
            <Link to={`/article/${post.id}`} className="read-btn">
                Pročitaj
            </Link>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Home;
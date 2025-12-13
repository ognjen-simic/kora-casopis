import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '/src/Article.css';
import LikeButton from '../LikeButton';
import { FaShareNodes } from 'react-icons/fa6';

function Article(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = `https://public-api.wordpress.com/wp/v2/sites/koracasopis.wordpress.com/posts/${id}`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok){
          throw new Error("Not found");
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.title.rendered;
        const newTitle = tempDiv.innerText;

        document.title = `${newTitle} | Kora Časopis`;
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
        document.title = "Error | Kora Časopis";
      });

      return () => {
      document.title = "Kora Časopis";
    };
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: post.title.rendered,
      text: "Pročitaj ovaj članak na Kora Časopisu!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } 
      catch (err) {
        console.log("Error sharing:", err);
      }
    } 
    else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link kopiran u privremenu memoriju!");
      } 
        catch (err) {
        alert("Nije moguće kopirati link.");
      }
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
        <div className="article-container" style={{ color: 'white', marginTop: '100px', textAlign: 'center' }}>
          <h1 style={{color: 'black', textDecoration: 'underline'}}>Članak nije pronađen.</h1>
          <Link to="/" className="back-btn" style={{display: 'inline-block', marginTop: '20px'}}>Nazad na početnu</Link>
        </div>
  );

  return (
    <div className="article-container">
      <div className="articles">
        <Link to="/" className="back-btn">← Nazad na početnu</Link>

        <h1 className="title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      
        <p className="date">{new Date(post.date).toLocaleDateString()}</p>

        <div className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

        <div className="stats-bar">

          <LikeButton postId={post.id} />

          <button onClick={handleShare} className="share-btn">
          <FaShareNodes className="share-icon"/> 
          <span>Podeli</span>

        </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { FaHeart } from 'react-icons/fa';

function LikeButton({postId}){
    if (!postId) return null;
    
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    const docRef = doc(db, "likes", `post_${postId}`);

    useEffect(() => {
        const likedLocally = localStorage.getItem(`liked_${postId}`);
        if (likedLocally) setHasLiked(true);

        const fetchLikes = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists){
                setLikes(docSnap.data().count);
            }
            else{
                setLikes(0);
            }
        }
        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
    if (hasLiked) return; 

    setLikes(prev => prev + 1);
    setHasLiked(true);
    localStorage.setItem(`liked_${postId}`, "true");

    try {    
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { count: 1 });
      } else {
        await updateDoc(docRef, {
          count: increment(1)
        });
      }
    } catch (error) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(`liked_${postId}`);
    }
  };

    return(
        <button
            className="like-btn"
            onClick={handleLike}
            disabled={hasLiked}
        >
            <span className="heart-icon"><FaHeart/></span>
            <span className="like-count">{likes}</span>
        </button>
    )
};

export default LikeButton
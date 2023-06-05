import { addDoc, collection, getDocs, query, where, doc, deleteDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { Posts as iProps } from "./main";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
   post: iProps;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props : Props) => {
    const [user] = useAuthState(auth);
    const {post} = props
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const [likes, setLikes] = useState<Like[] | null>(null);

    const getLikes = async () => {
      const data = await getDocs(likesDoc);
      setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    }
    useEffect(() => {
      getLikes();
    }, [])

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    const onLikesPost = async () => {
      try {
        const newDoc = await addDoc(likesRef, {
          userId: user?.uid,
          postId: post.id,
        });

        if (user) {
          setLikes((prev) =>
            prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]
          );
        }
      } catch (error) {
        console.log(error);
        <h1>Try later :(</h1>
      }
    };

    const onDeletePost = async () => {
      try {
        const likeToDeleteQuery = query(likesRef, where("postId", "==", post?.id), where("userId", "==", user?.uid));
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);

        if (user) {
          setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
        }
      } catch (error) {
        console.log(error);
        <h1>Try later :(</h1>;
      }
    };

   return (
     <div className="mainContents">
       <div className="content-main">
         <div className="postTitle">
           <h2>{post.title}</h2>
         </div>
         <div className="postDesc">
           <h4>{post.description}</h4>
         </div>
         <div className="uname">
           <p>@{post.username}</p>
           <button onClick={hasUserLiked ? onDeletePost : onLikesPost}>
             {!hasUserLiked ? "👍" : "👎"}
           </button>
           {likes && <p>Likes: {likes?.length}</p>}
         </div>
       </div>
     </div>
   );
}
import {getDocs, collection} from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "../../config/firebase";
import {Post} from "../main/post";

export interface Posts {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const postRef = collection(db, "posts");
  const [postsList, setPostsList] = useState<Posts[] | null>(null);
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Posts[]);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};

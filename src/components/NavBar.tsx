import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from '@firebase/auth';

export const NavBar = () => {
   const navigate = useNavigate();
   const [user] = useAuthState(auth);
   const signUserOut = async () => {
      await signOut(auth);
      navigate("/login");
   }
   return (
      <div className="container">
         <div className="links">
            <Link className="home" to="/">Home</Link>
            {!user ? (
               <Link className="login" to="/login">Login</Link>
            ) : <Link className="posts" to="/posts">Create Post</Link>}
         </div>

         <div className="userDetails">
            {user && (
               <>
                  <p>{user?.displayName}</p>
                  <img src={user?.photoURL || ""} height="30" width="30"/>
                  <button onClick={signUserOut}>Log Out</button>
               </>
            )}
         </div>
      </div>
   )
}
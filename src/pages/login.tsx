import {auth, provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
   const navigate = useNavigate();
   const [user] = useAuthState(auth);
   const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/");
   }
   return (
      <div>
         {!user ? (
            <>
               <p>Sign in with google to continue</p>
               <button onClick={signInWithGoogle}>Sign in with Google</button>
            </>
         ): <h1>Welcome {user?.displayName}</h1>}
      </div>
   )
}
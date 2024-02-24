import { craeteUserDocFromAuth, signInWithGooglePopup } from '../../../utils/firebase.util'
import './sign-in.styles.scss'

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =await  craeteUserDocFromAuth(user)
        
    }

    return (
        <div>
            <h1>Sign In Component</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>
        
    )
}

export default SignIn
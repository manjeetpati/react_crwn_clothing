import { createUserDocFromAuth, signInWithGooglePopup } from '../../../utils/firebase.util'
import Button from '../../button/button.component';
import SignUpForm from '../../sign-up-form/sign-up-form.component';
import './sign-in.styles.scss'

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =await  createUserDocFromAuth(user)
        
    }

    return (
        <div>
            <h1>Sign In Component</h1>
            
            <Button buttonType='google' onClick={logGoogleUser}>Sign In with Google</Button>
            <SignUpForm />
        </div>
        
    )
}

export default SignIn
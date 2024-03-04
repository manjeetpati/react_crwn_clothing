import { useContext, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component"
import { createUserDocFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase.util";
import './sign-in-form.styles.scss'
import { UserContext } from "../context/user.context";
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =await  createUserDocFromAuth(user)
        
    }

    const {setCurrentUser} = useContext(UserContext)

    const [formFields, setFormFields] = useState(defaultFormFields);

    const onChangeHandle = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }
    const { email, password } = formFields

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password)
            const userDoc = await createUserDocFromAuth(user)
            console.log(userDoc)
            setCurrentUser(user);
            resetForm()
        }
        catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert("Invalid Email or Password");
            }
            console.log(error);
        }

    }


    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={onSubmitHandle}>
                <FormInput label='Email' type="email" onChange={onChangeHandle} name='email' value={email} />
                <FormInput label='Password' type="password" onChange={onChangeHandle} name='password' value={password} />
                <div className="buttons-container">
                    <Button type='submit'>Login</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm;
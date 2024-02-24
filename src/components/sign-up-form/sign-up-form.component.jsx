import { useState } from "react";
import "./sign-up-form.styles.scss";

import {
  craeteUserDocFromAuth,
  createAuthUSerWithUsernameAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, displayName, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUSerWithUsernameAndPassword(
        email,
        password
      );
      const userAuth = { ...user, displayName: displayName };
      const userDoc = await createUserDocFromAuth(userAuth);
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use");
      }
      if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
      <span>Sign up with you email and password</span>
      <form onSubmit={handleSubmit}>
        {/* <label className="form-input-label">Display Name</label> */}
        <FormInput
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label={"Display Name"}
        />
        {/* <label className="form-input-label">Email</label> */}
        <FormInput
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          label={"Email"}
        />
        {/* <label className="form-input-label">Password</label> */}
        <FormInput
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          label={"Password"}
        />
        {/* <label className="form-input-label">Confirm Password</label> */}
        <FormInput
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label={"Confirm Password"}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

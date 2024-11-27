"use client";

import { signIn } from "next-auth/react";
import Button from "./custom-button";

function SignInButton() {

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/dashboard' })
	  }
	
	return ( 
		<Button 
			text="get started with google"
			className="border px-8 font-semibold hover:bg-gray-100"
			onClick={() => handleGoogleSignIn()} />
	 );
}

export default SignInButton;
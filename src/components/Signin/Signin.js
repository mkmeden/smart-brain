import React from 'react';
// import Tilt from 'react-tilted'
import './Signin.css'

export default function Signin({ Router, loadUser }) {
    // console.log(`boom: ${imgURL}`)
    const [signInEmail, setSignInEmail] = React.useState('')
    const [signInPassword, setSignInPassword] = React.useState('')

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    const onSubmitSignIn = (event) => {

        console.log(signInEmail)
        console.log(signInPassword)
        fetch('https://gentle-tundra-43518.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    loadUser(data)
                    Router('home')

                }
            })


    }

    return (
        <article className="br3 ba b--black-10  mv6 w-100 w-50-m w-25-l shadow-5 mw6 center ">
            <main className="pa4 black-80 center ">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                d="password" />
                        </div>

                    </fieldset>
                    <div className="">
                        <input

                            onClick={onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />

                    </div>
                    <div className="lh-copy mt3">
                        <p
                            onClick={() => Router('register')}
                            className="f6 link dim black db pointer ">Register</p>
                    </div>
                </div>
            </main>
        </article>

    )
}
import React from 'react';
// import Tilt from 'react-tilted'

export default function Register({ Router, loadUser }) {
    // console.log(`boom: ${imgURL}`)
    const [RegEmail, setRegEmail] = React.useState('')
    const [RegPassword, setRegPassword] = React.useState('')
    const [Name, setName] = React.useState('')


    const onEmailChange = (event) => {
        setRegEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setRegPassword(event.target.value)
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onButtonSubmit = (event) => {


        // console.log(Name)
        // console.log(RegEmail)
        // console.log(RegPassword)
        fetch('https://gentle-tundra-43518.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: Name,
                email: RegEmail,
                password: RegPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    loadUser(data)
                    Router('signin')

                }
            })
    }

    return (
        <article className="br3 ba b--black-10  mv6 w-100 w-50-m w-25-l shadow-5 mw6 center ">
            <main className="pa4 black-80 center ">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                            <input
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="tezt"
                                name="email-address"
                                id="email-address" />
                        </div>

                        <div className="mv3">
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
                                id="password" />
                        </div>

                    </fieldset>
                    <div className="">
                        <input

                            onClick={onButtonSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register" />

                    </div>

                </div>
            </main>
        </article>

    )
}
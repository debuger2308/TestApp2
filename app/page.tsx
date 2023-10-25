"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {


    const [isUserAuth, setIsUserAuth] = useState({})

    const [errorMsg, setErrorMsg] = useState('')

    const [isLoadSubmitReq, setIsLoadSubmitReq] = useState(false)
    const [isLoadLoginReq, setIsLoadLoginReq] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsUserAuth(JSON.parse(localStorage.getItem("TestApp/login-info") || '{}'))
    }, [])

    useEffect(() => {
        async function isAuthHandler() {
            const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isUserAuth)
            },)
            if (res.status === 200) setIsAuth(true)
            else setIsAuth(false)
            setIsLoadLoginReq(false)
        }
        if (JSON.stringify(isUserAuth) !== '{}') isAuthHandler()
        else setIsLoadLoginReq(false)
    }, [isUserAuth])

    return (

        <main className="main-login">

            {
                isLoadLoginReq
                    ? <div className="login__loading">
                        <span className={isLoadLoginReq ? "loader loader--active login__loader" : "loader login__loader"}></span>
                        <h1 className="loading__title">Loading...</h1>
                    </div>
                    : isAuth
                        ? <div className="login__authed">
                            <h1>You already authenticated</h1>
                            <Link href="/table" className="login__authed-link">To table page <span className="authed-link__arrow">{"->"}</span></Link>
                            <button
                                className="login__authed-btn"
                                onClick={() => {
                                    if (typeof window !== 'undefined') localStorage.setItem("TestApp/login-info", JSON.stringify({}))
                                    setIsAuth(false)
                                }}>Sign out</button>
                        </div>
                        : <form
                            className="auth-form login__form"
                            onSubmit={async (event) => {
                                event.preventDefault()
                                setIsLoadSubmitReq(true)
                                const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ username: username, password: password })
                                },)
                                console.log(res);
                                if (res.status !== 200) {
                                    if (res.status === 401) {
                                        setErrorMsg('Wrong username or password')
                                    }
                                    else setErrorMsg('Sorry, unexpected error')
                                }
                                else {
                                    if (typeof window !== 'undefined') {
                                        localStorage.setItem("TestApp/login-info", JSON.stringify({ username: username, password: password }))
                                        location.replace('/table')
                                    }

                                }

                                setIsLoadSubmitReq(false)
                            }}
                        >
                            <input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.currentTarget.value)
                                }}
                                type="text"
                                className="auth-form__input"
                                placeholder="Username"
                                required
                            />
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value)
                                }}
                                type="password"
                                className="auth-form__input"
                                placeholder="Password"
                                required
                            />
                            <strong className="auth-form__error-msg">{errorMsg}</strong>
                            <div className="auth-form__btn-wrapper">
                                <span className={isLoadSubmitReq ? "loader loader--active auth-form__loader" : "loader auth-form__loader"}></span>
                                <button
                                    disabled={isLoadSubmitReq}
                                    className="auth-form__login-btn">
                                    Log In
                                </button>
                            </div>

                        </form>
            }



        </main>
    )
}

import styles from '../styles/Home.module.css'
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image';

export default function Home({ providers }) {
  const { data: session, loading } = useSession()
  useEffect(() => {
    if (session) {
      if (session.access_token_key != "") {
        var auth_token = session
        backendapi(auth_token)
      }

    }

  }, [session])
  function backendapi(auth_token) {
    console.log(JSON.stringify(auth_token))
    // var tag = document.getElementById("user_token").innerHTML = auth_token
    fetch(`http://127.0.0.1:8000/twitter/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth_token),
    }).then((data) => data.json())
      .then((res) => {
        if (res.tokens) {
          document.getElementById("email_id").innerText = res.email
          document.getElementById("token").innerText = res.tokens
        }
      })
  }
  return (
    <>

      <div id='google-login-btn'>
        <div
          type="submit"
          id='googlelogin'
          onClick={() => signIn("twitter")}
        >
          <div className="twiiter-btn">
            <div >
              <Image className="google-icon" src="/twitter.webp" alt='image' width={100} height={100} />
            </div>
            <p className="btn-text"><b>Sign In With Twiiter</b></p>
          </div>
        </div>
        <h6 id='user_token'></h6>
        <div className='twitter_info'>
          <div >
            <label>Email Id :</label>
            <label id='email_id'></label>
          </div>
          <div >
            <label>Auth token :</label>
            <label id='token'></label>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useRef, useState, useEffect } from 'react';
import useScript from '../../hooks/useScript';
import jwt_decode from 'jwt-decode';
import Typography from 'src/theme/overrides/Typography';
import { getSiteUserInfo, getUserByEmail } from 'src/api/GoogleUser';
// import { postGoogleLogin } from 'api/auth';

export default function GoogleLogin({ user, setUser, setSiteUser, setLogin, login, site }) {
  const googleSignInButton = useRef(null);

  const onGoogleSignIn = async (res) => {
    var userObject = await jwt_decode(res.credential);
    if (site) {
      if (site.restriction === 3) {
        if (userObject.hd !== site.domain) {
          alert('허가된 이메일 도멘인이 아닙니다');
        }
      } else {
        console.log(userObject);
        await getUserByEmail(userObject).then(function (data) {
          setUser(data);
          setLogin(true);
          sessionStorage.setItem('user', JSON.stringify(data));
          // getSiteUserInfo(data.id, site.id).then(function (respData) {
          //   setSiteUser(respData);
          //   sessionStorage.setItem('usersavedinfo', JSON.stringify(respData));
          //   if (respData.status === 1) {
          //     alert('미승인 사용자입니다');
          //   }
          // });
        });
      }
    } else {
      await getUserByEmail(userObject).then(function (data) {
        setUser(data);
        setLogin(true);
        sessionStorage.setItem('user', JSON.stringify(data));
      });
    }

    //콜백 함수
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      width: '250',
      type: 'icon',
      shape: 'circle',
      // type: 'standard',
      // theme: 'outline',
    });
    // window.google.accounts.id.prompt();
  });
  // console.log(user);
  return <div id="signInDiv" ref={googleSignInButton}></div>;
}

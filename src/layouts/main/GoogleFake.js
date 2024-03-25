import React, { useRef, useState, useEffect } from 'react';
import OurGoogleForm from './OurGoogleForm';

export default function GoogleFake({
  user,
  setUser,
  setSiteUser,
  setLogin,
  login,
  site,
  open,
  setOpen,
}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  return (
    <>
      <OurGoogleForm
        open={open}
        setOpen={setOpen}
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        site={site}
        user={user}
        setUser={setUser}
        setSiteUser={setSiteUser}
        setLogin={setLogin}
        login={login}
      ></OurGoogleForm>
    </>
  );
}

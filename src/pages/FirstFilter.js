import { Helmet } from "react-helmet-async";
// @mui
import { Container, Box } from "@mui/material";
// _mock
import { _mapContact } from "../_mock/arrays";
// sections
import { FilterHero, FilterForm, FilterMap } from "../sections/filter";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSiteByLink } from "src/api/site";
import session from "redux-persist/lib/storage/session";
import { getSiteUserInfo } from "src/api/GoogleUser";

// ----------------------------------------------------------------------

export default function FirstFilter({
  user,
  setUser,
  siteUser,
  setSiteUser,
  site,
  setSite,
  login,
  setLogin,
  setReservable,
  reservable,
}) {
  const { link } = useParams();
  useEffect(() => {
    if (link) {
      async function fetchSite() {
        await getSiteByLink(link).then(function (data) {
          if (sessionStorage.getItem("site") === null) {
            setSite(data);
            sessionStorage.setItem("site", JSON.stringify(data));
            if (sessionStorage.getItem("user") !== null) {
              setUser(JSON.parse(sessionStorage.getItem("user")));
              setLogin(true);
              if (
                JSON.parse(sessionStorage.getItem("user")) &&
                site &&
                !siteUser
              ) {
                getSiteUserInfo(
                  JSON.parse(sessionStorage.getItem("user")).id,
                  data.id
                ).then(function (data) {
                  if (user && site && !siteUser) {
                    sessionStorage.setItem(
                      "usersavedinfo",
                      JSON.stringify(data)
                    );
                    setSiteUser(data);
                    if (data.status === 1) {
                      alert("미승인 사용자입니다");
                    }
                  }
                });
              }
            }
          } else {
            var s = JSON.parse(sessionStorage.getItem("site"));
            if (data.link != s.link) {
              setSite(data);
              sessionStorage.setItem("site", JSON.stringify(data));
              if (sessionStorage.getItem("user") !== null) {
                setUser(JSON.parse(sessionStorage.getItem("user")));
                setLogin(true);
                if (
                  JSON.parse(sessionStorage.getItem("user")) &&
                  site &&
                  !siteUser
                ) {
                  getSiteUserInfo(
                    JSON.parse(sessionStorage.getItem("user")).id,
                    data.id
                  ).then(function (data) {
                    if (user && site && !siteUser) {
                      sessionStorage.setItem(
                        "usersavedinfo",
                        JSON.stringify(data)
                      );
                      setSiteUser(data);
                      if (data.status === 1) {
                        alert("미승인 사용자입니다");
                      }
                    }
                  });
                }
              }
            } else {
              setSite(data);
              if (sessionStorage.getItem("user") !== null) {
                setUser(JSON.parse(sessionStorage.getItem("user")));
                setLogin(true);
                if (
                  JSON.parse(sessionStorage.getItem("user")) &&
                  site &&
                  !siteUser
                ) {
                  getSiteUserInfo(
                    JSON.parse(sessionStorage.getItem("user")).id,
                    data.id
                  ).then(function (data) {
                    if (user && site && !siteUser) {
                      sessionStorage.setItem(
                        "usersavedinfo",
                        JSON.stringify(data)
                      );
                      setSiteUser(data);
                      if (data.status === 1) {
                        alert("미승인 사용자입니다");
                      }
                    }
                  });
                }
              }
            }
          }
        });
      }
      fetchSite();
    }
  }, [link]);

  useEffect(() => {
    if (user && site && !siteUser) {
      getSiteUserInfo(user.id, site.id).then(function (data) {
        sessionStorage.setItem("usersavedinfo", JSON.stringify(data));
        setSiteUser(data);
        if (data.status === 1) {
          alert("미승인 사용자입니다");
        }
      });
    }
  }, [user]);

  return (
    <>
      {link && site ? (
        <>
          <Container sx={{ py: 10 }}>
            <Box
              gap={1}
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
            >
              {site ? (
                <FilterForm
                  user={user}
                  setUser={setUser}
                  login={login}
                  setLogin={setLogin}
                  link={link}
                  site={site}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  setReservable={setReservable}
                  reservable={reservable}
                />
              ) : (
                <></>
              )}
            </Box>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

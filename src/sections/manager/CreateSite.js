import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Slider from 'react-slick';
import CreateSiteModal from './CreateSiteModal';
import SiteSearch from './SiteSearch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// @mui
import {
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';

import roomImg from '../../assets/img/뉴턴220호.jpg';
import cafeImg from '../../assets/img/cafe10.jpeg';
import christImg from '../../assets/img/christ.jpeg';
import groupImg from '../../assets/img/group.png';
import left from '../../assets/img/left.png';
import right from '../../assets/img/right.png';
import SiteFormValidationPage from '../../pages/components/extra/SiteFormValidationPage';
import CreateSiteFormValidationPage from '../../pages/components/extra/CreateSiteFormValidationPage';
import CreateFormValidationPage from 'src/pages/components/extra/CreateFormValidationPage';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, backgroundImage: { right } }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundImage: `url(${left})` }}
      onClick={onClick}
    />
  );
}

export default function CreateSite({
  user,
  setUser,
  siteUser,
  setSiteUser,
  login,
  setLogin,
  site,
  setSite,
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/create-site-detail');
  }

  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    const fetchGetSiteList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/site/all-sites`);
        setSiteList(response.data);
        console.log('전체사이트 불러오기', siteList);
      } catch (err) {
        console.log('전체 사이트 불러오기 에러');
      }
    };
    fetchGetSiteList();
  }, []);

  useEffect(() => {
    if (!user) {
      if (sessionStorage.getItem('user') !== null) {
        setUser(JSON.parse(sessionStorage.getItem('user')));
        setLogin(true);
      }
    }
  }, [user]);
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setLogin(true);
    }
    setSite();
    setSiteUser();
    if (sessionStorage.getItem('usersavedinfo') !== null)
      sessionStorage.removeItem('usersavedinfo');
    if (sessionStorage.getItem('site') !== null) sessionStorage.removeItem('site');
  }, []);

  const [searchFilter, setSearchFilter] = useState('');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const [mySiteSettingOpen, setMySiteSettingOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const handleSiteSettingClose = () => {
    setMySiteSettingOpen(false);
  };

  const handleSiteSettingOpen = () => {
    setMySiteSettingOpen(true);
  };
  const print = () => {
    console.log(user);
    console.log(siteUser);

    console.log(site);

    console.log(login);
  };

  return (
    <>
      <div style={{ margin: '10%' }}>
        <div style={{ marginBottom: '5%' }}>
          <flex>
            <Typography>
              <br />
            </Typography>
          </flex>
          <flex style={{ float: 'right' }}>
            {user ? (
              <Button variant="contained" color="primary" onClick={handleSiteSettingOpen}>
                사이트 만들기
              </Button>
            ) : null}
            {login && user ? (
              <>
                <Dialog
                  open={mySiteSettingOpen}
                  keepMounted
                  onClose={handleSiteSettingClose}
                  aria-describedby="alert-dialog-slide-description"
                  fullWidth={true}
                >
                  <DialogContent>
                    <CreateSiteFormValidationPage
                      setMySiteSettingOpen={setMySiteSettingOpen}
                      user={user}
                    />
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <></>
            )}
          </flex>
        </div>
        <div></div>
        <div>
          <Slider {...settings}>
            {siteList.map((site, i) => {
              if (site.name.includes(searchFilter)) {
                return (
                  <div
                    onClick={() => {
                      navigate('/Hanspace/' + site.link);
                      console.log('이동');
                    }}
                  >
                    <Card sx={{ maxWidth: 375, height: 500 }}>
                      <CardMedia sx={{ height: 375 }} image={site.logo} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {site.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {site.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import styled from 'styled-components';
import './RightNav.css'

// Packages
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import Select from 'react-select';
import FadeIn from 'react-fade-in';

// Images
import Settings from '../../assets/icons/settings.svg';
import LongLogo from '../../assets/logo/long-logo.svg';

const Ul = styled.ul`
    text-align: left;
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    background: rgba( 0, 0, 0, 0.7 );
    backdrop-filter: blur( 20px );
    -webkit-backdrop-filter: blur( 20px );
    z-index: 18;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100%;
    min-width: 300px;
    width: 100%;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
`;

// pass vanta theme when close


// https://nexo.io/ref/avlggq3sxy?src=web-link

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <FadeIn>
        <div className='container'>

          <Row align="middle" justify="center">
            <Col>   
            <div className='menuItem'>
            <li>Select Theme: Coming Soon</li>
            {/* <Select
                    defaultValue={{ label: "Dark", value: 0 }}
                    value={firstSelectObject}
                    placeholder={"Cryptocurrency 🅰️"}
                    options={sessionData}
                    isLoading={isLoading}
                    onChange={(e) => {
                      firstHandler(e);
                      // console.log(e.marketcap);
                    }}
                    styles={customStyles}
                  /> */}
            </div>
            </Col>
          </Row>
        
          <Row align="middle" justify="center">
            <Col>   <div className='menuItem'>
              <li>Wanna Advertise with Us?</li>
            </div></Col>
          </Row>
          <Row align="middle" justify="center">
            <Col>   <div className='menuItem'>
              <li>Follow us on Twitter</li>
            </div></Col>
          </Row>
          <Row align="middle" justify="center">
            <Col>   <div className='menuAboutText'>
            <img src={LongLogo} className='menuLogo' />
              <li style={{  opacity: '0.5' }}>A Cryptocurency Calculation and Prediction Tool that used various Token Metrics.
              <br/>Remember this is only a tool! Please do your own research and seek help from a professional before investing!
              <br/><br/>
              Version 1.0.6
              </li>

            </div></Col>
          </Row>
          <Row align="middle" justify="center">
            <Col>  <div className='menuItemLogo'>
              
              
            </div></Col>
          </Row>

        </div>
      </FadeIn>
    </Ul>
  )
}

export default RightNav
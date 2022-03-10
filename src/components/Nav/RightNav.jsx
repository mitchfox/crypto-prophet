import React from 'react';
import styled from 'styled-components';
import './RightNav.css'

// Packages
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

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

// https://nexo.io/ref/avlggq3sxy?src=web-link

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <div className='container'>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li></li>
          </div></Col>
        </Row>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li>Nexo</li>
          </div></Col>
        </Row>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li>Buy Us a Coffee</li>
          </div></Col>
        </Row>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li>Wanna Advertise with Us?</li>
          </div></Col>
        </Row>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li>Follow us on Twitter</li>
          </div></Col>
        </Row>
        <Row align="midde" justify="center">
          <Col>   <div className='menuItem'>
            <li>Crypto Prophets. 2022</li>
          </div></Col>
        </Row>
      </div>
    </Ul>
  )
}

export default RightNav
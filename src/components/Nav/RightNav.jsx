import React from 'react';
import styled from 'styled-components';
import './RightNav.css'

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    background: rgba( 0, 0, 0, 0.85 );
    backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
    z-index: 18;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    min-width: 300px;
    width: 50vw;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>

      <li>Dark Mode</li>
      <li>Donate</li>
      <li>Contact Us</li>
      <li>Sign In</li>
      <li>Sign Up</li>
      <div className='box'>

      </div>
    </Ul>
  )
}

export default RightNav
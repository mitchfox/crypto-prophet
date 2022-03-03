import React, { useState, useEffect, Component, useRef } from 'react';
import IntToString from './components/ToString';
// import Meatballs from './components/Meatballs';

// Packages
import axios from 'axios';
import Select from 'react-select';
import { motion } from "framer-motion"
import Popup from 'reactjs-popup';
import FadeIn from 'react-fade-in';

// Edit Background Template
import FOG from 'vanta/dist/vanta.fog.min'

// CSS Packages
import './App.css';
// import 'bulma/css/bulma.min.css';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries } from 'react-vis';
import format from 'date-fns/format';
import { Button, Columns } from 'react-bulma-components';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import AnchorLink from 'react-anchor-link-smooth-scroll';



// Images
// import CrossSVG from './assets/icons/cross.svg';
import Logo from './assets/LOGO.svg';
import Coin from './assets/COIN.svg';
import Compare from './assets/compare.svg';
import Arrow from './assets/icons/down.svg';
import Dumbell from './assets/icons/barbell.png';


// TODO
// Add ranks next to coins on the left
// Add extra api calls for more complex graohs and stats using original api ticker symbols for search
// Add memu icon
// Add info icons next to names explaining what they mean because of abbreviated names
// Set up donations



function App() {
  // Coingecko MAX = 250 per call
  const numOfCoins = 100;
  var pageNumber = [1, 2, 3, 4, 5, 6, 7]
  var [isLoading, setIsLoading] = useState(true);
  var stableData = [];
  var cryptoData = [];
  var [sessionData, setSessionData] = useState([]);

  var [totalInvestment, setTotalInvestment] = useState(0);
  var [updatedInvestment, setUpdatedInvestment] = useState(0);

  var [firstSelected, setFirstSelected] = useState('');
  var [secondSelected, setSecondSelected] = useState('');
  var [firstAdditional, setFirstAdditional] = useState('');
  var [secondAdditional, setSecondAdditional] = useState('');



  var [percent, setPercent] = useState(0);

  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)

  // Retreive Inital API Crypto Data
  var getListData = async () => {
    setIsLoading(true);
    // Ad - To be Decided
    var adObject = {
      value: 'I am an ad!',
      label: "I am an ad!",
      // Add link to Advertiser - Also could add an ad every 10 coins
    };

    try {

      // Add Ad to start of array
      cryptoData.push(adObject);

      // Return Array of Coingecko Stablecoins
      const stables = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      for (var s in stables.data) {
        var stableID = {
          name: stables.data[s].id
        }
        var stableObj = Object.assign(stableID);
        stableData.push(stableObj);
      }


      // Return Array of Crypto Data
      for (var x in pageNumber) {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page="
          + numOfCoins + "&page=" + pageNumber[x] + "&sparkline=false");

        // Create New Array with Loops
        for (var i in res.data) {
          // Name ID = for mapping list IMPORTANT

          var assetValue = {
            value: res.data[i].id
          }
          // Name & Image = Label in List
          var href = res.data[i].image;
          var name = res.data[i].name;
          var price = res.data[i].current_price
          var assetLabel = {
            label: <div>
              <Row justify="center" align="middle">
                <Col span={12}>
                  <div className='iconLabel'>
                    <img src={href} height="30px" width="30px" style={{ display: 'inline-block', marginBottom: '-10px', marginRight: '10px' }} />
                    <p style={{ display: 'inline-block', textTransform: 'uppercase', marginRight: '10px' }}>{name}</p>
                    <p style={{ display: 'inline-block', color: '#c9c9c9' }}>${price}</p>
                  </div>
                </Col>
              </Row>
            </div>
          }

          // Adding Objects to Neat Crypto Data Array
          var assetName = {
            name: res.data[i].name
          }
          var assetImage = {
            image: res.data[i].image
          }
          var assetSymbol = {
            symbol: res.data[i].symbol
          }
          var assetPrice = {
            price: res.data[i].current_price
          }
          var assetMarketCapRounded = {
            marketcaprounded: IntToString(res.data[i].market_cap)
          }
          var assetVolumeRounded = {
            volumerounded: IntToString(res.data[i].total_volume)
          }
          var assetMarketCap = {
            marketcap: res.data[i].market_cap
          }
          var assetVolume = {
            volume: res.data[i].total_volume
          }
          var assetHighChange = {
            highchange: res.data[i].ath_change_percentage
          }
          var assetDailyChange = {
            dailychange: res.data[i].price_change_percentage_24h
          }
          var listObj = Object.assign(assetValue, assetLabel, assetName, assetImage, assetSymbol, assetPrice, assetMarketCapRounded, assetMarketCap,
            assetVolume, assetVolumeRounded, assetHighChange, assetDailyChange);
          cryptoData.push(listObj);
        }
      }

      setSessionData(cryptoData);
      setIsLoading(false);


    } catch (error) {
      console.error(error);
    }
  };

  var fetchFirstAddtionalData = async (selected) => {
    try {
      var response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/" + selected +
        "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true");
      setFirstAdditional(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  var fetchSecondAddtionalData = async (selected) => {
    try {
      var response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/" + selected +
        "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true");

      // checkForStableCoin(response.data)
      console.log(response.data);

      setSecondAdditional(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  // First Handler for Input
  var firstHandler = (e) => {
    // Fetching Additional Data
    fetchFirstAddtionalData(e.value);
    setFirstSelected(e);

    if (secondSelected != []) {
      console.log('The Second is not empty');
      var f = e.marketcap;
      var s = secondSelected.marketcap;
      setPercent((s / f) * 1);
      if (totalInvestment != 0) {
        setUpdatedInvestment(totalInvestment * percent);
      }
    }
    else {
    }
  }

  // Second Handler for Input
  var SecondHandler = (e) => {
    fetchSecondAddtionalData(e.value);
    setSecondSelected(e);

    if (firstSelected != []) {
      var f = firstSelected.marketcap;
      var s = e.marketcap;
      setPercent((s / f) * 1);
      if (totalInvestment != 0) {
        setUpdatedInvestment(totalInvestment * percent);
      }
    }
    else {
    }
  }


  // var testArrayFoo = () => {
  //   var testArray = [
  //     {
  //       name: 'bitcoin',
  //       catergory: 'crypto'
  //     },
  //     {
  //       name: 'tether',
  //       catergory: 'stablecoin'
  //     },
  //     {
  //       name: 'bnb',
  //       catergory: 'crypto'
  //     }
  //   ];
  //   console.log(testArray);
  //   var testArray = testArray.filter(person => person.catergory != 'stablecoin');

  //   console.log(testArray);
  // }






  // Similiar to OnMount -> [] = rerender when changed!
  useEffect(() => {

    // Getting Crypto Data
    getListData();
  }, [])


  // Rerending without API CALLS!
  useEffect(() => {
  }, [[firstSelected, secondSelected, percent, totalInvestment, updatedInvestment]])


  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(FOG({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        // minHeight: 2000,
        minWidth: 200.00,
        highlightColor: 0x24244d,
        midtoneColor: 0x3d4282,
        lowlightColor: 0xff87eb,
        baseColor: 0x20242a,
        blurFactor: 0.71,
        speed: 2.40,
        zoom: 2.21
      }))
    }
    return () => {
      // if (vantaEffect) vantaEffect.destroy()
    }

    console.log(myRef.current)


  }, [vantaEffect])
  return <div ref={myRef} className={'main'}>
    <div>
      <div className='content'>
        <div className='contentChildren'>
          <FadeIn
            delay={400}
            transitionDuration={800}
            onComplete={() => {
              // Possible function once everything has faded into frame
            }}
          >
            {/* Logo */}
            <div>
              <img
                src={Logo} className={'Logo'} />
            </div>

            {/* React Select Boxes */}
            <div>
              <Row gutter={0} align={'middle'} className={'inputRow'}>
                <Col span={12}>
                  <Select
                    defaultValue={{ label: "Search A Crypto 😇", value: 0 }}
                    options={sessionData}
                    isLoading={isLoading}
                    onChange={(e) => {
                      firstHandler(e);
                    }}
                    styles={customStyles}
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={0} align={'middle'}>
                <Col span={12} className='iconContainer'>
                  <img
                    src={Compare}
                    className={'icon'}
                    alt={'Crypto Battle Icon'}
                    style={{ width: 'auto', height: 'calc(2vw + 10px)', maxHeight: '120px', color: 'white' }}
                  /></Col>
              </Row>

            </div>
            <div>
              <Row gutter={0} align={'middle'} className={'inputRow'}>
                <Col span={12}>
                  <Select
                    defaultValue={{ label: "Search A Crypto 🥵", value: 0 }}
                    options={sessionData}
                    isLoading={isLoading}
                    onChange={(e) => {
                      SecondHandler(e)
                    }}
                    styles={customStyles}
                  /></Col>
              </Row>
            </div>
            <div>
            </div>

            {/* Check if Both Inputs aren't set to their defaults of 0 */}
            {firstSelected != 0 && secondSelected != 0 ? (
              <div>
                <FadeIn>
                  {/* Calculation Area */}
                  <div className='resultContainer shimmer'>
                    {firstSelected == 1 || secondSelected == 1 ?
                      <p className='resultText'></p> : <p className='resultText'>{firstSelected.name} with the same Market Cap as {secondSelected.name}</p>}
                    <div className={'xArea'}>
                      <div className={'labelSide'}>
                        <img src={firstSelected.image} className={'xImage'} />
                        <p id="priceText">${(percent * firstSelected.price).toFixed(4)}</p>
                      </div>
                      <div className={'xSide'}>

                        <p id="xText">{percent.toFixed(1)}X</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Crypto Compete Area */}
                    {/* Rank */}


                  </div>
                  <Popup
                    trigger={<button className="modalButton">Open Advanced Analysis</button>}
                    modal
                    nested>
                    {close => (
                      <div className="modal">
                        <div className="content">
                          <FadeIn
                            delay={200}
                            transitionDuration={500}>
                            <Row gutter={0} className={'comparisonRow'} style={{ marginBottom: '2vh' }}>
                              <Col span={3} className={'competitorItem'}><img src={firstSelected.image} style={{ width: '40px', height: 'auto' }}></img></Col>
                              <Col span={6} className={'competitorType'} style={{ marginTop: 'auto', marginBottom: 'auto', textTransform: 'uppercase' }}>{firstSelected.symbol} vs {secondSelected.symbol}</Col>
                              <Col span={3} className={'competitorItem'}><img src={secondSelected.image} style={{ width: '40px', height: 'auto' }}></img></Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRow'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.market_cap_rank}</Col>
                              <Col span={6} className={'competitorType'}>Rank</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.market_cap_rank}</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRowAlt'}>
                              <Col span={3} className={'competitorItem'}>{firstSelected.marketcaprounded}</Col>
                              <Col span={6} className={'competitorType'}>Market Cap</Col>
                              <Col span={3} className={'competitorItem'}>{secondSelected.marketcaprounded}</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRow'}>
                              <Col span={3} className={'competitorItem'}>{firstSelected.dailychange.toFixed(1)}%</Col>
                              <Col span={6} className={'competitorType'}>24HR Change</Col>
                              <Col span={3} className={'competitorItem'}>{secondSelected.dailychange.toFixed(1)}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRowAlt'}>
                              <Col span={3} className={'competitorItem'}>{firstSelected.dailychange.toFixed(1)}%</Col>
                              <Col span={6} className={'competitorType'}>24HR Change</Col>
                              <Col span={3} className={'competitorItem'}>{secondSelected.dailychange.toFixed(1)}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRow'}>
                              <Col span={3} className={'competitorItem'}>{firstSelected.highchange}%</Col>
                              <Col span={6} className={'competitorType'}>ATH % Change</Col>
                              <Col span={3} className={'competitorItem'}>{secondSelected.highchange}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRowAlt'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.liquidity_score}%</Col>
                              <Col span={6} className={'competitorType'}>Liquidity Score</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.liquidity_score}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRow'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.developer_score}%</Col>
                              <Col span={6} className={'competitorType'}>Developer Score</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.developer_score}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRowAlt'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.community_score}%</Col>
                              <Col span={6} className={'competitorType'}>Community Score</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.community_score}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRow'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.sentiment_votes_up_percentage}%</Col>
                              <Col span={6} className={'competitorType'}>CG Upvote %</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.sentiment_votes_up_percentage}%</Col>
                            </Row>

                            <Row gutter={0} className={'comparisonRowAlt'}>
                              <Col span={3} className={'competitorItem'}>{firstAdditional.public_interest_score}%</Col>
                              <Col span={6} className={'competitorType'}>Public Interest Score</Col>
                              <Col span={3} className={'competitorItem'}>{secondAdditional.public_interest_score}%</Col>
                            </Row>

                            <button id="modalClose" onClick={close}>
                              {/* &times; */}
                              Exit
                            </button>

                          </FadeIn>
                        </div>
                      </div>
                    )}
                  </Popup>
                </FadeIn>
              </div>
            ) : (
              <div></div>
            )}
          </FadeIn>
        </div>
       
      </div>
      
    </div>
    {/* <div className='footer'>
      <Row className='footerRow'>
        <Col span={3}><img
                    src={Compare}
                    alt={'Crypto Battle Icon'}
                    style={{ width: '10px' }}
                  /></Col>
        <Col span={6}><p>Crypto Prophets. 2022</p></Col>
        <Col span={3}><p>Icon</p></Col>
      </Row>
          
        </div> */}
  </div>

}

{/* 
            <Row gutter={0}>
              <Col span={4} className={'competitorItem'}>
                <Sparklines data={firstAdditional.market_data.sparkline_7d.price} limit={60} width={40} height={40} margin={5}>
                  <SparklinesLine style={{ fill: "none" }} /></Sparklines>
              </Col>
              <Col span={4} className={'competitorType'}>Price Action</Col>
              <Col span={4} className={'competitorItem'}>
               <Sparklines data={secondAdditional.market_data.sparkline_7d.price} style={{ fill: "none", strokeWidth: '1', stroke: '#ffffff' }} limit={60} width={25} height={25} margin={5}>
                  <SparklinesLine style={{ fill: "none" }} /></Sparklines>
              </Col>
            </Row> */}


// Input Styling
const customStyles = {
  // Input Box
  control: (base, state) => ({
    ...base,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    background: 'rgba( 255, 255, 255, 0.2 )',
    boxShadow: '0 8px 22px 0 rgba( 31, 38, 135, 0.07 )',
    backdropFilter: 'blur( 10px )',
    webkitBackdropFilter: 'blur( 10px )',
    border: '1px solid rgba( 255, 255, 255, 0.10 )',
    marginBottom: '15px',
    marginTop: '15px',

  }),
  // Typed Text & Search
  input: (provided) => ({
    ...provided,
    color: '#ffffff',
    height: '6vh',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  // Box Container
  container: (provided) => ({
    ...provided,
    color: '#ffffff',
    width: '100%',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }),

  // Selected Item in Box
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff',
    textTransform: 'uppercase',
    marginLeft: '30px'
  }),

  // Drop down Items
  option: (base, state) => ({
    ...base,
    color: '#ffffff',
    // paddingBottom: 10,
    paddingTop: 10,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: state.isFocused ? 'rgba( 255, 255, 255, 0.25 )' : 'rgba( 255, 255, 255, 0.0 )',
    borderBottom: '1px solid #C7D2DD',
    backdropFilter: 'blur( 10px )',
    webkitBackdropFilter: 'blur( 10px )',

  }),

  // Dropdown Menu Front
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: '20px',
    marginTop: '0px',
    marginBottom: '0px',
  }),

  menu: (provided, state) => ({
    ...provided,
    borderRadius: '20px',
    background: 'rgba( 255, 255, 255, 0.25 )',
    boxShadow: '0 8px 22px 0 rgba( 31, 38, 135, 0.07 )',
    border: '1px solid rgba( 255, 255, 255, 0.10 )'
  }),

  indicatorSeparator: (base) => ({
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#ffffff'
  }),

};


export default App;

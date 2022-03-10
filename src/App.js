import React, { useState, useEffect, Component, useRef, useContext, input } from 'react';
import IntToString from './components/ToString';
import Navbar from './components/Nav/Navbar';

// Packages
import axios from 'axios';
import Select from 'react-select';
import { motion } from "framer-motion";
import Popup from 'reactjs-popup';
import FadeIn from 'react-fade-in';

// Edit Background Template
import FOG from 'vanta/dist/vanta.fog.min'

// CSS Packages
import './App.css';
import '../node_modules/react-vis/dist/style.css';

import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

// Images
import Logo from './assets/logo/LOGO.svg';
import LongLogo from './assets/logo/long-logo.svg';
import IconLogo from './assets/logo/icon-logo.svg';
import Swap from './assets/icons/swap.svg';
// import Expand from './assets/icons/down-arrow.svg';
import Twitter from './assets/icons/twitter.svg';
import Customise from './assets/icons/customise.svg';
import Analytics from './assets/icons/analytics.svg';

// TODO
// Add info icons next to names explaining what they mean because of abbreviated names
// Set up donations
//

function App() {
  // API Variables
  const numOfCoins = 100;   // Coingecko MAX = 250 per call
  var pageNumber = [1, 2, 3, 4, 5, 6, 7]
  var [isLoading, setIsLoading] = useState(true);

  // API DATA
  var stableData = [];
  var cryptoData = [];
  var [sessionData, setSessionData] = useState([]);

  // React Select States & Results
  var [firstSelectObject, setFirstSelectObject] = useState('');
  var [secondSelectObject, setSecondSelectObject] = useState('');
  var [percent, setPercent] = useState(0);
  var [swapActive, setSwapActive] = useState(false);
  var [customisedActive, setCustomisedActive] = useState(false);

  // Additional Data API
  var [firstSpecific, setFirstSpecific] = useState('');
  var [secondSpecific, setSecondSpecific] = useState('');

  // Customised Data
  var [totalInvestment, setTotalInvestment] = useState(0);
  var [updatedInvestment, setUpdatedInvestment] = useState(0);

  // Vanta Background
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)

  // Retreive Inital API Crypto Data
  var getListData = async () => {
    setIsLoading(true);
    // Ad - To be Decided
    var adObject = {
      value: '',
      label:
        <div className='iconLabelAd'>
          <a
            className='adlink'
            style={{ textDecoration: 'none' }}
            href='https://nexo.sjv.io/cryptoprophets'
          >
            <p className='iconLabelAd'>GET UP TO $100 FREE BTC WITH NEXO</p>
          </a>
        </div>
      // Add link to Advertiser - Also could add an ad every 10 coins
    };

    try {
      // Add Ad to start of array
      cryptoData.push(adObject);
      // Return Array of Coingecko Stablecoins
      const stables = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      console.log(stables.data)

      // Return Array of Crypto Data
      for (var x in pageNumber) {
    
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page="
          + numOfCoins + "&page=" + pageNumber[x] + "&sparkline=false");

        // Creating Array of Crypto Data for session
        for (var i in res.data) {
          // Check for stables to exclude them from data
          var checkID = res.data[i].id;
          if (checkID == stables.data[0].id || checkID == stables.data[1].id || checkID == stables.data[2].id || checkID == stables.data[3].id || checkID == stables.data[4].id ||
            checkID == stables.data[5].id || checkID == stables.data[6].id || checkID == stables.data[7].id || checkID == stables.data[8].id || checkID == stables.data[9].id ||
            checkID == stables.data[10].id || checkID == stables.data[11].id || checkID == stables.data[12].id || checkID == stables.data[13].id || checkID == stables.data[14].id ||
            checkID == stables.data[15].id || checkID == stables.data[16].id || checkID == stables.data[17].id || checkID == stables.data[18].id || checkID == stables.data[19].id ||
            checkID == stables.data[20].id || checkID == stables.data[21].id || checkID == stables.data[23].id || checkID == stables.data[23].id || checkID == stables.data[24].id ||
            checkID == stables.data[25].id || checkID == stables.data[26].id || checkID == stables.data[27].id || checkID == stables.data[28].id || checkID == stables.data[29].id
          ) {
            // Do Nothing with Stable
          } else {
            // if (i % 10 == 0 && i < 100) {
            //   cryptoData.push(adObject);
            // } else {
            //   // Do nothing
            // }
            var assetValue = {
              value: res.data[i].id
            }
            // Name & Image = Label in List
            var href = res.data[i].image;
            var name = res.data[i].name;
            var price = res.data[i].current_price
            var rank = res.data[i].market_cap_rank
            var assetLabel = {
              label: <div>
                <Row justify="center" align="middle">
                  <Col span={12}>
                    <div className='iconLabel'>
                      <p style={{ display: 'inline-block', color: '#c9c9c9', marginRight: '10px' }}>{rank}. </p>
                      <img src={href} height="30px" width="30px" style={{ display: 'inline-block', marginBottom: '-10px', marginRight: '10px' }} />
                      <p style={{ display: 'inline-block', textTransform: 'uppercase', marginRight: '10px' }}>{name}</p>
                      <p style={{ display: 'inline-block', color: '#c9c9c9' }}>${price}</p>
                    </div>
                  </Col>
                  {/* <Col span={1}>
                  
                  </Col> */}
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
      }



      setSessionData(cryptoData);
      setIsLoading(false);


    } catch (error) {
      console.error(error);
    }
  };

  // Grab additional market data not available in initial broad api call
  var fetchFirstSpecificData = async (selected) => {
    try {
      var response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/" + selected +
        "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true");
      setFirstSpecific(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  var fetchSecondSpecificData = async (selected) => {
    try {
      var response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/" + selected +
        "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true");
      setSecondSpecific(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  // First Handler for Input
  var firstHandler = (e) => {
    // Fetching Additional Data
    fetchFirstSpecificData(e.value);
    setFirstSelectObject(e);

    if (secondSelectObject != []) {
      var f = e.marketcap;
      var s = secondSelectObject.marketcap;
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
    fetchSecondSpecificData(e.value);
    setSecondSelectObject(e);

    if (firstSelectObject != []) {
      var f = firstSelectObject.marketcap;
      var s = e.marketcap;
      setPercent((s / f) * 1);
      if (totalInvestment != 0) {
        setUpdatedInvestment(totalInvestment * percent);
      }
    }
    else {
    }
  }

  // Similiar to OnMount -> 
  useEffect(() => {
    // Getting Crypto Data
    getListData();
  }, [])

  // Rerending without API CALLS. [] = Variables rerender when changed.
  useEffect(() => {
  }, [[firstSelectObject, secondSelectObject, percent, totalInvestment, updatedInvestment]])

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(FOG({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0x151952,
        midtoneColor: 0x3c002b,
        lowlightColor: 0x121228,
        baseColor: 0x20202,
        blurFactor: 0.67,
        speed: 3.20,
        zoom: 2.00
      }))
    }

    return () => {
      // if (vantaEffect) vantaEffect.destroy()
    }

  }, [vantaEffect])
  return <div ref={myRef} className={'main'}>
    <div>
      <div className='content'>
        {/* Menu Burger - Positioned Far Right */}
        <Row style={{ marginTop: '20px', marginRight: '20px', alignContent: 'right', height: '30px' }}>
          <Col span={11}></Col>
          <Col span={1}>
            <Navbar />
          </Col>
        </Row>
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
                    defaultValue={{ label: "Select Crypto 🅰️", value: 0 }}
                    value={firstSelectObject}
                    placeholder={"Cryptocurrency 🅰️"}
                    options={sessionData}
                    isLoading={isLoading}
                    onChange={(e) => {
                      firstHandler(e);
                      console.log(e.marketcap);
                    }}
                    styles={customStyles}
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={0} align={'middle'}>
                <Col span={12} className='iconContainer'>
                  <motion.img
                    src={Swap}
                    className={'icon'}
                    alt={'Crypto Swap Icon'}
                    animate={{
                      rotate: swapActive ? 180 : 0,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setSwapActive(!swapActive);
                      firstHandler(secondSelectObject);
                      SecondHandler(firstSelectObject);
                      setPercent((firstSelectObject.marketcap / secondSelectObject.marketcap) * 1);
                    }}
                  /></Col>
              </Row>

            </div>
            <div>
              <Row gutter={0} align={'middle'} className={'inputRow'}>
                <Col span={12}>
                  <Select
                    defaultValue={{ label: "Select Crypto 🅱️", value: 0 }}
                    placeholder={"Cryptocurrency 🅱️"}
                    value={secondSelectObject}
                    options={sessionData}
                    isLoading={isLoading}
                    onChange={(e) => {
                      SecondHandler(e)
                      console.log(e.marketcap);
                    }}
                    styles={customStyles}
                  /></Col>
              </Row>
            </div>
            <div>
            </div>

            {/* Check if Both Inputs aren't set to their defaults of 0 */}
            {firstSelectObject != 0 && secondSelectObject != 0 ? (
              <div>

                {/* Calculation Area */}
                <div className='shinyContainer shimmer'>
                  <FadeIn>
                    {firstSelectObject == 1 || secondSelectObject == 1 ?
                      <p className='resultText'></p> :
                      <Row align="center">
                        <Col span={1}></Col>
                        <Col span={10} align="center" style={{ alignContent: 'center' }}><p className='resultText'>{ }{firstSelectObject.name} with {secondSelectObject.name}s Market Cap</p>
                        </Col>
                        <Col span={1}>
                        </Col>
                      </Row>
                    }
                    <div className={'xArea'}>
                      <div className={'labelSide'}>
                        <img src={firstSelectObject.image} className={'xImage'} />
                        <p className='priceText'>${(percent * firstSelectObject.price).toFixed(4)}</p>
                      </div>
                      <div className={'xSide'}>
                        {percent * firstSelectObject.price > firstSelectObject.price ?
                          <p className='xText positive'>{percent.toFixed(1)}X</p>
                          :
                          <p className='xText negative'>{percent.toFixed(4)}X</p>
                        }
                      </div>

                      <Row align="center" justify="middle" style={{ marginBottom: '2vh', marginTop: '2vh', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Col span={2} align="left">
                          <Popup
                            trigger={ModalIcon}
                            modal
                            nested>
                            {close => (
                              <div className="modal">
                                <div className="content">
                                  <FadeIn
                                    delay={200}
                                    transitionDuration={500}>
                                    <Row gutter={0} className={'comparisonRow'} style={{ marginBottom: '2vh' }}>
                                      <Col span={3} className={'competitorItem'}><img src={firstSelectObject.image} style={{ width: '40px', height: 'auto' }}></img></Col>
                                      <Col span={6} className={'competitorType'} style={{ marginTop: 'auto', marginBottom: 'auto', textTransform: 'uppercase' }}>{firstSelectObject.symbol} vs {secondSelectObject.symbol}</Col>
                                      <Col span={3} className={'competitorItem'}><img src={secondSelectObject.image} style={{ width: '40px', height: 'auto' }}></img></Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRow'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.market_cap_rank}</Col>
                                      <Col span={6} className={'competitorType'}>Rank</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.market_cap_rank}</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRowAlt'}>
                                      <Col span={3} className={'competitorItem'}>{firstSelectObject.marketcaprounded}</Col>
                                      <Col span={6} className={'competitorType'}>Market Cap</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSelectObject.marketcaprounded}</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRow'}>
                                      <Col span={3} className={'competitorItem'}>{firstSelectObject.dailychange.toFixed(1)}%</Col>
                                      <Col span={6} className={'competitorType'}>24HR Change</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSelectObject.dailychange.toFixed(1)}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRowAlt'}>
                                      <Col span={3} className={'competitorItem'}>{firstSelectObject.dailychange.toFixed(1)}%</Col>
                                      <Col span={6} className={'competitorType'}>24HR Change</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSelectObject.dailychange.toFixed(1)}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRow'}>
                                      <Col span={3} className={'competitorItem'}>{firstSelectObject.highchange}%</Col>
                                      <Col span={6} className={'competitorType'}>ATH % Change</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSelectObject.highchange}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRowAlt'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.liquidity_score}%</Col>
                                      <Col span={6} className={'competitorType'}>Liquidity Score</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.liquidity_score}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRow'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.developer_score}%</Col>
                                      <Col span={6} className={'competitorType'}>Developer Score</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.developer_score}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRowAlt'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.community_score}%</Col>
                                      <Col span={6} className={'competitorType'}>Community Score</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.community_score}%</Col>
                                    </Row>

                                    <Row gutter={0} className={'comparisonRow'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.sentiment_votes_up_percentage}%</Col>
                                      <Col span={6} className={'competitorType'}>CG Upvote %</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.sentiment_votes_up_percentage}%</Col>
                                    </Row>

                                    {/* <Row gutter={0} className={'comparisonRowAlt'}>
                                      <Col span={3} className={'competitorItem'}>{firstSpecific.public_interest_score}%</Col>
                                      <Col span={6} className={'competitorType'}>Public Interest Score</Col>
                                      <Col span={3} className={'competitorItem'}>{secondSpecific.public_interest_score}%</Col>
                                    </Row> */}

                                    <button id="modalClose" onClick={close}>
                                      {/* &times; */}
                                      Exit
                                    </button>

                                  </FadeIn>
                                </div>
                              </div>
                            )}
                          </Popup></Col>
                        <Col span={8} align="center" style={{ alignContent: 'center' }}><img src={LongLogo} className={'LongLogo'} />
                        </Col>
                        <Col span={2} align="right">
                          <img
                            src={Customise}
                            className={'containerIcon'}
                            onClick={() => {
                              setCustomisedActive(!customisedActive);
                            }}
                          />
                        </Col>
                      </Row>
                    </div>


                  </FadeIn>
                </div>

                <div>
                </div>

                {/* Featured Products */}
                {/* 
                <div className='shinyContainer featuredProduct'>
                  <div id='children'>
                    <Row style={{ height: '5vh' }}>
                      <Col span={3}></Col>
                      <Col span={9}>
                        <div id="coinwidget" data-icon="true" data-type="primary" data-text="Buy me coffee with Bitcoin" data-wallet="1JBTco78X6zPhqKvzYAX7HaJvqLmNJE6a4">
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div> */}


              </div>
            ) : (
              <div></div>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
}

// Modal Icon
const ModalIcon = () => {
  return (
    <img src={Analytics} className={'containerIcon'} />
  );
}

const CustomiseIcon = () => {

}

// Input Styling
const customStyles = {
  // Input Box
  control: (base, state) => ({
    ...base,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    background: 'rgba( 255, 255, 255, 0.12 )',
    boxShadow: '0 8px 22px 0 rgba( 31, 38, 135, 0.07 )',
    backdropFilter: 'blur( 5px )',
    webkitBackdropFilter: 'blur( 5px )',
    border: '1px solid rgba( 255, 255, 255, 0.10 )',
    marginBottom: '15px',
    marginTop: '15px',
    transition: 'all .17s ease-in-out',
    "&:hover": {
      transform: 'scale(1.05)',
    }
  }),

  // Typed Text & Search
  input: (provided) => ({
    ...provided,
    color: '#ffffff',
    height: '5vh',
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
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: state.isFocused ? 'rgba( 255, 255, 255, 0.2 )' : 'rgba( 255, 255, 255, 0.0 )',
    borderBottom: '1.2px solid rgba( 255, 255, 255, 0.25 )',
    backdropFilter: 'blur( 40px )',
    webkitBackdropFilter: 'blur( 40px )',

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
    marginTop: '15px',
    background: 'rgba( 255, 255, 255, 0.15 )',
    boxShadow: '0 8px 22px 0 rgba( 31, 38, 135, 0.07 )',
    border: '1px solid rgba( 255, 255, 255, 0.10 )'
  }),

  indicatorSeparator: (base) => ({
  }),

  placeholder: (base) => ({
    ...base,
    color: '#ffffff',
    marginLeft: '30px',
    textTransform: 'uppercase',
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#ffffff',
  }),
};


export default App;

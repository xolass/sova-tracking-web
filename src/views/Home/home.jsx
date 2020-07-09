import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import { faMap, faSignOutAlt, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../providers/auth';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './home.css';
import { getAllDevicesHistory } from '../../providers/api';

const HomePage = (props) => {

  const [devices, setDevices] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      const deviceLocation = await getAllDevicesHistory();
      setDevices(deviceLocation);
    }, 3000);
  }, []);

  const logoutHandler = () => {
    logout();
    props.history.push('/login');
  }

  const toggleDevicesHandler = () => {
    setDrawerOpen(!isDrawerOpen);
  }

  const getLastFromArray = (array) => array[array.length - 1];

  const getLastLocationCoordinates = (location) => {
    const last = getLastFromArray(location);
    return last ? ({
      lat: last.coordinates.coordinates[0],
      lng: last.coordinates.coordinates[1]
    }) : { lat: 45, lng: 45 };
  };


  return (
    <div className="page-container">
      <nav>
        <ul>
          <li className="logo">
            <div className="nav-link">
              <img className="logo-img" src={logo} alt={'logo'} />
            </div>
          </li>
          <li className="nav-item">
            <Link to={'/map'} className="nav-link">
              <FontAwesomeIcon className={'icon'} icon={faMap} />
              Mapa
            </Link>
          </li>
          <li className="nav-item">
            <div onClick={toggleDevicesHandler} className="nav-link">
              <FontAwesomeIcon className={'icon'} icon={faMobile} />
              Dispositivos
            </div>
          </li>
          {isDrawerOpen &&
            <div className="sub-list">
              {devices.map((device) => {
                return (
                  <div key={Math.random()} className="sub-list-item">{device.deviceMac}</div>
                );
              })}
            </div>
          }
          <li className="nav-item">
            <div onClick={logoutHandler} className="nav-link">
              <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
              Logout
            </div>
          </li>
        </ul>
      </nav>
      <LoadScript
        googleMapsApiKey='API-KEY'
        loadingElement={<div>Loading...</div>}

      >
        <GoogleMap
          mapContainerClassName="map-container"
          zoom={4}
          center={{ lat: -22.41269482, lng: -45.44910908 }}
        >
          {devices.map((device, index) => {
            const { Locations } = device;
            const position = getLastLocationCoordinates(Locations);

            return (
              <Marker key={index} position={position} title={device.deviceMac}>
              </Marker>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default HomePage;

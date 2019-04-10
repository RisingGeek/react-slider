import React, { Fragment } from 'react';
import './slider.css';

const SliderComponent = props => {
    return (
        <Fragment>
        <div id="slider" className="slider">
            <a href="#" className="control_next">
                <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Right%20Control3fc6d2d.png" />
            </a>
            <a href="#" className="control_prev">
                <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Left%20Control577660a.png" />
            </a>
            <ul>
                <li><img src="http://mgzavrebi.ge/site/local_sources/images/room_photo/room_photo_1_03a21d6e6d84361de45d6c83a51d77d0.jpg"/></li>
                <li style={{background: '#aaa'}}><img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/></li>
                <li><img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/></li>
                <li style={{background: '#aaa'}}>SLIDE 4</li>
            </ul>  
        </div>
        </Fragment>
    );
}

export default SliderComponent;
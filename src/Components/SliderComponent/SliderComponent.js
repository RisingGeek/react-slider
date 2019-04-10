import React, { Fragment } from 'react';
import './slider.css';

const SliderComponent = props => {
    return (
        <div id="slider" className="slider">
        <h1>Avengers Avenue</h1>
            <a href="#" className="control_next">
                <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Right%20Control3fc6d2d.png" />
            </a>
            <a href="#" className="control_prev">
                <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/Left%20Control577660a.png" />
            </a>
            <ul>
                {
                    props.images.map(image => (
                        <li key={image.data.id}>
                            <img src={image.data.url} />
                        </li>
                    ))
                }
            </ul>  
        </div>
    );
}

export default SliderComponent;
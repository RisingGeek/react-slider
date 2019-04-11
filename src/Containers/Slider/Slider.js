import React, { Component } from 'react';
import SliderComponent from '../../Components/SliderComponent/SliderComponent';
import $ from 'jquery';
import axios from 'axios';
var sliderDelay;

class Slider extends Component {
    state = {
        images: [],
        slideCount: 0,
        slideWidth: 0,
        slideHeight: 0,
        sliderUlWidth: 0
    }
    componentDidMount() {
        this.getImages();
    }
    /* Gets slider images */
    getImages = () => {
        /* Get image IDs */
        axios({
            method: "get",
            url: "https://screeningtest.vdocipher.com/api/image/",
            headers: {
                "Authorization": "Bearer "+process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            let promiseArray=[];
            res.data.map(id => {
                /* Get slider image URLs */
                promiseArray.push(axios({
                    method:"post",
                    url:`https://screeningtest.vdocipher.com/api/image/${id.id}`,
                    headers: {
                        "Authorization": "Bearer fc1be0ce7f79cfe74502163bbc76613e"
                    }
                }))
            })
            Promise.all(promiseArray).then(images => {
                this.setState({ images: images});
                this.sliderInit();
            })
        })
    }
    sliderInit = () => {
        $(document).ready(() => {
            var slideCount = $('#slider ul li').length;
            var slideWidth = $('#slider ul li').width();
            var slideHeight = $('#slider ul li').height();
            var sliderUlWidth = slideCount * slideWidth;
            
            $('#slider').css({ width: slideWidth, height: slideHeight });
            $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
            $('#slider ul li:last-child').prependTo('#slider ul');

            this.setState({ 
                slideCount: slideCount,
                slideWidth: slideWidth,
                slideHeight: slideHeight,
                sliderUlWidth: sliderUlWidth
            });

            sliderDelay = setInterval(this.moveRight, 1000);
        
            /* Control previous button */
            $('a.control_prev').click(() => {
                this.moveLeft();
                clearInterval(sliderDelay);
                sliderDelay = setInterval(this.moveRight, 1000)
            });
        
            /* Control next button */
            $('a.control_next').click(() => {
                this.moveRight();
                clearInterval(sliderDelay);
                sliderDelay = setInterval(this.moveRight, 1000)
            });
        
        });    
    }
    /* Slide Left */
    moveLeft = () => {
        $('#slider ul').animate({
            left: + this.state.slideWidth
        }, 200, () => {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }
    /* Slide Right */
    moveRight = () => {
        $('#slider ul').animate({
            left: - this.state.slideWidth
        }, 200, () => {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }
    render() {
        return (
            <SliderComponent images={this.state.images} />
        );
    }
};

export default Slider;
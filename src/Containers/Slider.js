import React, { Component } from 'react';
import SliderComponent from '../Components/SliderComponent';
import $ from 'jquery';
import axios from 'axios';

class Slider extends Component {
    state = {
        images: []
    }
    componentDidMount() {
        this.getIds();
        
    }
    getIds = () => {
        axios({
            method: "get",
            url: "https://screeningtest.vdocipher.com/api/image/",
            headers: {
                "Authorization": "Bearer "+process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            let promiseArray=[];
            res.data.map(id => {
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
                $(document).ready(function ($) {
    
                    var slideCount = $('#slider ul li').length;
                    var slideWidth = $('#slider ul li').width();
                    var slideHeight = $('#slider ul li').height();
                    var sliderUlWidth = slideCount * slideWidth;
                    
                    $('#slider').css({ width: slideWidth, height: slideHeight });
                    
                    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
                    
                    $('#slider ul li:last-child').prependTo('#slider ul');
                
                    function moveLeft() {
                        $('#slider ul').animate({
                            left: + slideWidth
                        }, 200, function () {
                            $('#slider ul li:last-child').prependTo('#slider ul');
                            $('#slider ul').css('left', '');
                        });
                    };
                
                    function moveRight() {
                        $('#slider ul').animate({
                            left: - slideWidth
                        }, 200, function () {
                            $('#slider ul li:first-child').appendTo('#slider ul');
                            $('#slider ul').css('left', '');
                        });
                    };
                
                    $('a.control_prev').click(function () {
                        moveLeft();
                    });
                
                    $('a.control_next').click(function () {
                        moveRight();
                    });
                
                });    
            })
        })
    }
    render() {
        return (
            <SliderComponent images={this.state.images} />
        );
    }
};

export default Slider;
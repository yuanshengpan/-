'use strict'
require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var templateBanner = require('./banner.string');

var bannerHtml = _mm.renderHtml(templateBanner);
$('.banner-con').html(bannerHtml);

var lb = document.getElementById("lb");
var b_ul = document.getElementById("b-ul");
var b_li = b_ul.getElementsByTagName("li");
var n_ol = document.getElementById("n-ol");
var n_li = n_ol.getElementsByTagName("li");
var l_btn = document.getElementsByClassName("l-btn")[0];
var r_btn = document.getElementsByClassName("r-btn")[0];
var keywords_list = document.getElementsByClassName("keywords-list")[0];

console.log($("#lb"),"123")
var width = b_li[0].offsetWidth;
var index = 0;
var key = 0;
var timer = null;
var navData = [
    {"rgba":"67,98,81,0.4"},
    {"rgba":"160,161,158,0.4"},
    {"rgba":"153,64,73,0.4"},
    {"rgba":"64,87,97,0.4"},
    {"rgba":"151,149,151,0.4"}
    ];
function autoPlay(){
    index ++ ;
    key ++ ;
    if (index > (b_li.length - 1)) {
        b_ul.style.marginLeft = 0;
        index = 1;
    }
    if (key > (n_li.length - 1)) {
        key = 0;
    }
    keywords_list.style.backgroundColor = "rgba("+navData[key].rgba+")";
    animate(b_ul , {marginLeft:-(index * width)});
    highLight(key);
}
function highLight(current){
    for (var i = 0; i < n_li.length; i++) {
        n_li[i].className = "";
    }
    n_li[current].className = "active";
}
timer = setInterval(autoPlay,1500)
lb.onmouseover = function(){
    clearInterval(timer);
}
lb.onmouseout = function(){
    clearInterval(timer);
    timer = setInterval(autoPlay,1500)
}
l_btn.onclick = function(){
    index -- ;
    key --;
    if (index < 0) {
        b_ul.style.marginLeft = -(5 * width) + "px";
        index = 4;
    }
    key = key < 0 ? n_li.length - 1 : key;
    keywords_list.style.backgroundColor = "rgba("+navData[key].rgba+")";
    animate(b_ul , {marginLeft:-(index * width)});
    highLight(key);
}
r_btn.onclick = function(){
    index ++ ;
    key ++ ;
    if (index > (b_li.length - 1)) {
        b_ul.style.marginLeft = 0;
        index = 1;
    }
    if (key > (n_li.length - 1)) {
        key = 0
    }
    keywords_list.style.backgroundColor = "rgba("+navData[key].rgba+")";
    animate(b_ul , {marginLeft:-(index * width)});
    highLight(key);
}
for (var k = 0; k < n_li.length; k++) {
    n_li[k].count = k;
    n_li[k].onclick = function(){
        index = this.count;
        key = this.count;
        keywords_list.style.backgroundColor = "rgba("+navData[key].rgba+")";
        animate(b_ul , {marginLeft:-(index * width)});
        highLight(key);
    }
}


function animate(dom , option) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var bool = true;
        for(var k in option){
            var target = parseInt(option[k]);
            var current = parseInt(getComputedStyle(dom, null)[k]);
            var speed = (target - current ) / 5 ;
            speed =  speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(current != target){
                bool = false;
            }
            dom.style[ k ] = current + speed + "px";
        }
        if(bool){
            clearInterval(dom.timer);
            return ;
        }
    },30)
}

// 倒计时
var seckill = document.getElementsByClassName("seckill")[0]
var countDownSpan = seckill.getElementsByTagName("span");
var str = 5000;
var h,m,s,h1,h2,m2,m1,s1,s2;
var arr1=""; 
var arr2=""; 
var arr3="";
var timer2 = null;
function downTime(){
    timer2 = setInterval(function(){
        str -- ;
        h = Math.floor((str / 60 / 60) % 24 );
        m = Math.floor((str / 60) % 60);
        s = Math.floor( str % 60);
        if(s < 0){
            clearInterval(timer);
            return;
        };
        h = h >= 10 ? h : "0"+h;
        m = m >= 10 ? m : "0"+m;
        s = s >= 10 ? s : "0"+s;
        arr1 = h.toString();
        h1 = arr1.substring(0,1);
        h2 = arr1.substring(1,2);
        countDownSpan[0].innerHTML = h1;
        countDownSpan[1].innerHTML = h2;
        arr2 = m.toString();
        m1 = arr2.substring(0,1);
        m2 = arr2.substring(1,2);
        countDownSpan[2].innerHTML = m1;
        countDownSpan[3].innerHTML = m2;
        arr3 = s.toString();
        s1 = arr3.substring(0,1);
        s2 = arr3.substring(1,2);
        countDownSpan[4].innerHTML = s1;
        countDownSpan[5].innerHTML = s2;
    },1000)
}
downTime()
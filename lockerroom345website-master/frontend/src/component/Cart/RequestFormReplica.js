import React from "react";
import { Parser } from "html-to-react";
import "./RequestFormReplica.css";
import { Helmet } from "react-helmet";
import background1 from "../../images/background1.jpg"
// var __html = require('./RequestFormReplicaHtml.html');
// var template = { __html: __html };
const RequestFormReplica = () => {
  const rawHTML = `  <div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
    <div style="position:absolute;left:0px;top:0px">
    <img src=${background1} width="612" height="792" /></div>
    <div style="position:absolute;left:85.71px;top:21.44px" class="cls_003"><span class="cls_003">The mission of Locker Room 345 is to help students</span></div>
    <div style="position:absolute;left:117.85px;top:36.43px" class="cls_003"><span class="cls_003">and their families with basic clothing needs.</span></div>
    <div style="position:absolute;left:262.88px;top:81.60px" class="cls_005"><span class="cls_005">Locker Room 345 is a joint partnership with Kim Myers and</span></div>
    <div style="position:absolute;left:262.88px;top:96.60px" class="cls_005"><span class="cls_005">Binghamton University Communities Schools, with donated</span></div>
    <div style="position:absolute;left:262.88px;top:111.60px" class="cls_005"><span class="cls_005">items primarily from Dick’s Sporting Goods.</span></div>
    <div style="position:absolute;left:262.88px;top:141.60px" class="cls_005"><span class="cls_005">• Fill out the information below with your requested items</span></div>
    <div style="position:absolute;left:262.88px;top:161.60px" class="cls_005"><span class="cls_005">• Complete 1 form per student</span></div>
    <div style="position:absolute;left:262.88px;top:181.61px" class="cls_005"><span class="cls_005">•</span><span class="cls_006"> Email completed forms to</span><span class="cls_007"> lockerroom345@gmail.com</span></div>
    <div style="position:absolute;left:262.88px;top:201.61px" class="cls_005"><span class="cls_005">• Items will be  delivered to the building within a few days</span></div>
    <div style="position:absolute;left:262.88px;top:221.62px" class="cls_005"><span class="cls_005">• Items cannot be returned to any store, but arrangements</span></div>
    <div style="position:absolute;left:262.88px;top:241.62px" class="cls_005"><span class="cls_005">can be made to exchange sizes with Locker Room 345.</span></div>
    <div style="position:absolute;left:27.10px;top:313.46px" class="cls_008"><span class="cls_008">Date:</span></div>
    <div style="position:absolute;left:276.10px;top:313.63px" class="cls_008"><span class="cls_008">School district/building:</span></div>
    <div style="position:absolute;left:27.10px;top:339.34px" class="cls_008"><span class="cls_008">Your name and title:</span></div>
    <div style="position:absolute;left:275.10px;top:339.34px" class="cls_008"><span class="cls_008">Your email:</span></div>
    <div style="position:absolute;left:27.10px;top:366.36px" class="cls_008"><span class="cls_008">Student ID:</span></div>
    <div style="position:absolute;left:275.10px;top:366.07px" class="cls_008"><span class="cls_008">Phone number:</span></div>
    <div style="position:absolute;left:22.13px;top:429.68px" class="cls_009"><span class="cls_009">*Identify items</span><span class="cls_010"> </span><span class="cls_009">such as:</span><span class="cls_006"> winter coats, hat, gloves, pants, shorts, socks,</span></div>
    <div style="position:absolute;left:22.13px;top:444.08px" class="cls_006"><span class="cls_006">long-sleeved/short-sleeved shirts, sweatshirts, sneakers, boots, backpack, etc.</span></div>
    <div style="position:absolute;left:24.26px;top:470.82px" class="cls_011"><span class="cls_011">Gender:</span><span class="cls_012"> </span><span class="cls_013"> </span><span class="cls_012">Male, Age ___  </span><span class="cls_013"> </span><span class="cls_012">Female, Age</span></div>
    <div style="position:absolute;left:297.67px;top:470.82px" class="cls_011"><span class="cls_011">Size:</span></div>
    <div style="position:absolute;left:350.01px;top:472.83px" class="cls_012"><span class="cls_012">Youth</span></div>
    <div style="position:absolute;left:421.94px;top:472.83px" class="cls_012"><span class="cls_012">Adult</span></div>
    <div style="position:absolute;left:142.91px;top:498.34px" class="cls_014"><span class="cls_014">Item Requested</span></div>
    <div style="position:absolute;left:446.32px;top:498.98px" class="cls_014"><span class="cls_014">Size</span></div>
    <div style="position:absolute;left:523.87px;top:498.98px" class="cls_014"><span class="cls_014">QTY</span></div>
    <div style="position:absolute;left:28.09px;top:524.27px" class="cls_015"><span class="cls_015">1.</span></div>
    <div style="position:absolute;left:28.09px;top:555.02px" class="cls_015"><span class="cls_015">2.</span></div>
    <div style="position:absolute;left:28.09px;top:584.49px" class="cls_015"><span class="cls_015">3.</span></div>
    <div style="position:absolute;left:28.09px;top:615.25px" class="cls_015"><span class="cls_015">4.</span></div>
    <div style="position:absolute;left:28.09px;top:644.72px" class="cls_015"><span class="cls_015">5.</span></div>
    <div style="position:absolute;left:17.33px;top:688.49px" class="cls_002"><span class="cls_002">Note any unique circumstance:</span></div>
    <div style="position:absolute;left:369.55px;top:695.50px" class="cls_003"><span class="cls_003">Email completed forms to</span></div>
    <div style="position:absolute;left:369.55px;top:711.50px" class="cls_003"><span class="cls_003">Lockerroom345@gmail.com</span></div>
    <div style="position:absolute;left:358.18px;top:743.99px" class="cls_017"><span class="cls_017">Contact Kim Myers at Lockerroom345@gmail.com</span></div>
    <div style="position:absolute;left:220.45px;top:765.66px" class="cls_018"><span class="cls_018">*Quantities may be limited</span></div>
    </div>`;

  return (
    <div>
      <Helmet>
     
      </Helmet>
      {Parser().parse(rawHTML)}
    </div>
  );
};

export default RequestFormReplica;

import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../layout/Header/Header";
import lockerroomlogo from "../../images/lockerroomlogo.PNG";
import busbuckslogo from "../../images/busbucks.jpg";

import Footer from "../../component/layout/Footer/Footer";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <div className="containerWrapper">
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
              <div className="contentWrapper">
                <h1>About Us</h1>
                <div className="imageWrapper">
                  <img src={lockerroomlogo} alt="" />
                  <img src={busbuckslogo} alt="" />
                </div>
                {/* <div className="textWrapper"> */}

                <h2>Who we are</h2>
                <p>
                  Locker Room 345 is a division of B.U.S. BUCKS, led by Kim
                  Myers supported by Dick’s Sporting Goods and generous donors.
                  We provide needed footwear and clothing for area students and
                  families.
                </p>
                <h2>What we do</h2>
                <p>
                  Locker Room 345 is located at 345 Court Street in Binghamton.
                  The majority of inventory is donated by Dick’s Sporting Goods.
                  Volunteers sort and organize the donations to accommodate
                  needs quickly. Any school or organization can make a request
                  on behalf of individual students or families by placing an
                  order through our website. For additional questions, please
                  contact{" "}
                  <a href="mailto: lockerroom345@gmail.com">
                    lockerroom345@gmail.com
                  </a>
                  . In-stock items are picked, packed and delivered within 24 -
                  48 hours.
                </p>
                <h2>Why we do what we do</h2>
                <hr></hr>
                <p>
                  Many children do not attend school due to the lack of the most
                  basic clothing such as a pair of sneakers, clothing that fits
                  or a coat to keep them warm. Without these necessities,
                  students struggle to attend school with dignity and ready to
                  learn. The need for our program has increased substantially.
                </p>
                <h2>How can you help</h2>

                <p>
                  There are needs our inventory cannot meet. Items such as
                  children’s clothing in sizes smaller than Dick’s carries,
                  underwear, socks, or depleted/unusual sizes. We try to
                  purchase these needed items from various local or online
                  retail stores. Your monetary donation will be used to help
                  fulfill these necessities. Your support provides students with
                  some of the most basic requirements that will increase their
                  self-confidence and improve attendance: crucial components for
                  academic success. Please reach out to any of our advisory
                  board members with questions or to discuss how you can partner
                  with us. You can also reach out to Kim Myers directly at 
                  <a href="mailto: lockerroom345@gmail.com">
                    lockerroom345@gmail.com
                  </a>
                </p>
                <h1>B.U.S. Bucks Advisory Board Members</h1>
                <p className="boardmemberp">
                  Kate Allman | Laura Bronstein | Patty Gazda-Grace | Kate
                  Fitzgerald | Luann Kida | Micki Matthews | Mary Monopoli | Kim
                  Myers | Marc Newman | Margherita Rossi | Ray Stanton | Jody
                  Zevan | Elissa Brown
                </p>

                {/* </div>

                <div className="PeopleCard">
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVEhUYGBUYGhgYGBkYGBgYGBgYGBgZGRwYGBkcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCw0NDY2NDQ0NDQ2NjQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIANQA7QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAABAwIDBQUHAwMEAwAAAAABAAIRAyEEEjEFIkFRYQYycYGRE0KhscHR8AdS4SNichSCkqIkQ/H/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/xAAkEQACAgICAQUBAQEAAAAAAAAAAQIRAyESMUEEIjJRYXHBgf/aAAwDAQACEQMRAD8A8ZREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEVbGFxhokngFmjZb4l0N8TdRaXZZRb6Rr0WXVwZFpB81ZdQI4ImmHFotIhCKSoRIRAEREAREQBERSAiIgCIiAIiKAERFICIiAIiKAEREAV7D0C4wPMq0AtrQpOAAaPNRJ0XhHkyoVBT3Wd7jxJ8TwVBe9/N3ONPMrOwOz87soIAF3vNhHHyW9/wBOwANoghoElwEOcOYnuN/uKzSmov8ATbCDa/DlGbNc4wTB5ReFRWwjW61N7iNb8rLoMVSaAS52VouQy8k/uqHvmxs3N4haau9urW5W6g++7rJvHWVeMmznKCXgwn0ba25kRKtez5fngq303G4aQOZk/E6qwQQuqOMv1GTTxAFsoP8Al9lcLGP0GU9NPRa9ZGGdBRqtkRfLTLVSmQYOqoWzxlGWgjhp16LWKYu0UlHi6CIisVCIiAIiIAiIgCIiAIiIAiIgCIiAIiKAZeDpgmTw4dVtqDiSBz0HzJ6LTsNo4alb7ZtAsAce8/5clxyOlZqwxvRn0KBcRB3JENAu+OMcui2OJYcsuIjWPdB6D3z1M9FQ3EMYQNajoho70fQdVtH4V2QvqANEacfMm5+A6LBNyuz0IxSVI0mE2YKzva19yi2zGuN3u4vdzHPyGgVXsmSXUKOdx/8AbVEt/wBjPqeS3LKQcBn7jRoODf2gcys3DYdz4cRlYO60aAfVQ87bOixJI8+2lg67jvlzugsB5Cw8FpqmEcOBXreJwheQPd5Izs4wsDsl/wAsusPUyWqOU/TQlts8ccyFeoWNxZdd2g7MuZLmCw1AHpC5qkA0gO0nVa45VOOjG/TuEr8G6p4UVGZb6ajh5LnMTQLTGvwvpoujwOJA3XQBwIJ48eiw9sYc5t64doRz5FUxSak4snPjTjyOfRVPbBI5KlajCERSpAREQghFKhQSERFIJRECEBFKIClCpUKCQgUgLJw9HM4AcfgFD0iUrdGVhqF2g8bnwH58VuqTyXFwuAPiR9lRhsJOcxZoAHiTC22CwY9jYCSTHxH2WLLNUenhhRa7EbPNV7qz7nNqV123KjWsDf3HTo2/zha/sNRy03tNiCQfmqe0dT+q1jd55aGtA5lx4ei4ZXybo7Y48aRk7Np5yBy1jT8+y6Wlh4EKns/sh1NgkbxF1u6WC/cZPwVIQdE5MqukapmFHAeB+qzv9NDQAs11JrBJIjWStXW2tSByh2Z37WDMfguqjRxlkcujEx+EBaREgryntRsc03kt7pvyXrVXEOOtN7R1C5ntDhQ9hcNALqU+LtEp8o8WeaYWraCIj81WVicISwS7W4WNRqBtSDBaTHlormPc5gLDMasJ/brC01bVHKTqO9mrxlFzXDMLkevBYy2j8WKjC143gJa7qNR5hatd43WzBJK9BERXKBERSAiIoAUKUQBSoUqQSoUlQgChSigFTAtxs2uxjSQJdzN4nlwC1DFk4OqJgnjpErnNWjpidSOnwT2hrpNjljya4wsrZuK3r91u7fnGZaqlUkTFosI4m3yn1VVOrL202+7mc7/IiIWGUbs9ODqjuez+DDnVHPO651mtMTYarMfsbB03FznhjyZEv0+qtYDBPZTaCQHuB6w46eisYLsy8Q99IVam9mqOfmJnuw10AAHgNeanDji17mRnySj8Tf7L9ox2ZtTPTGoBzQt/hq4dJGi0eBwhpyfYhklxIz2gm1m2nqreysbBczUCfSbfBTJKL0c43NW1TNzjt9uTgdb/AGXLOxtDDPLabH1HjXIJjpPD1W2OJ35ngRz1i/wVQ2Rnh3tSACXABrAJJBnToFaHG/cVnyiqia7A9rKNY5BLX/seCx8TBMHUa6KdoUWmY7rhB9LFXHdnqDXNcS572SWOcScuZ2YxAtdXq7G5SIg8OR9FE+N+0vi5KrPD9r0iys9h91xH8rLxmLDqbWvFwJafqDwPTRZHbakBiiR7zWuPjp9FqMVU3GiLgm/Q3XeO0mc5a5GC7VUq9Egql1FwuQV2TMbi0W0RFYoERSpBCIiAIiKASFIVKkKQSiIgIRFcpRN7jiBYqAVU2TqsvCYIuIIBjnwnkOa2WEw2GeRlrPZNsr6RcfJzSR6rqMPhcPTG4573wLublA6wf4WfLkaWkacEE3bOcxLHMblBghtzxk6DosPs3V/rgH3piel1nbSGZr3akmB4afdaPAvyVmOHBzZ9YK541yi7NOV8ZRaPbMBwJ1gD+Fu6DyFzmAfIaed/sumwjJC4Xs6yimrZh7SrucC0C3HmVpMA0l7gOfoug2qS1uWn33GJ5A8Vg7KYynULHEl+pJa6CTydEH1RtsmNRVpFLGHPB1PzC2ppkDksfaDGOcGgPEnVrXED/JwEALMwtQxD7kWn6qOiJSvZjVadpAla+vN+X3XQ1gMtlosQ25/PzUJ0yYu0eS9tBmxUf2N+biucrvJhdD23MYk/4tHzXP0mSdCfALZD4pmTLuTRl7OLfeMAXNp9Ofgre0cY11mNMfud3j5cF2GxaLQz+oyWkXIYH+rTp5hcv2iZTFQ+zAA4wC3/AKnTyTHNSk9EZYOMVs0ylQpWkxhERAQilQgCIigBSoUoCVClFIIhSCihQDNw1V4IyOg8PLVdNSqPbTz1HE6xMARzA59VzGAxjqbswANousyvj31Xb3d5Ljki5HfFNLXky8bioptnvOcXHoIho9FraeHcd5o429VaqPNR4A5wFvKrDSw5cLEFsTzn+Fz+KSXbNPLlbfSPQ9jPD6LHMM7oNukfddPgaloNl5x+nW1c4NIwCxxIA0yv5TyP0XpNBodrr9Rqs848ZUdlNSin4MfaVfeyjoq8JcgO+JlaftPXrMLX0cpaO+0tlxHHK6bHyWPsvbVJ8Z6tam+L7jHNmLiwk3lRx/SyTcdJ/wDNnX1NIEQsVhcDzHRabE7VotZPtKz3XgNaGN87SsHZjqteqHuL2UmHdYHvhxn3jMu5cuilxXllVCSXTr7Z2T7t8lqsWIB5/wAfwtm8yD5D89VoO0+PbQouqONgCep4ADqTA81FNshSrs8h7aVg7EvggxAsZ9eRWDs3FBh3p4Xtb1ssLEVC9xc65cS4+JMlXMOxrt0nKToTp5rbxXGmYub5uSOxr4pzWBzILSPcdEfGJXIY/EZ3SdesT5kaql7X05Fxzgy09ZFljEkpDGojJmclVUQpUKV3M4REQBQpUIAiIoAUqFKAKVEqAVIKlCSolQCqVU1x4Teytq9QxBabRrM5QT8VDJRt8BhHMAe5pkAloNiSYvHgVkbdqAUWtmXOIPpb7rEGNc7KC62bUkTHKBYaLG2vis7gODQB/wDFn4tzTZr5RUGkNj7Qdh6rarfdMEfuadR+dF7vsfGtqMZUYZa4C45HQr59cJkr0v8ATvaUUAw3DXOaeknMPLeUZ4qrIwN24nZ4ynmdKvYTAUyJLBPOAqXcCNOBWRhGOJkmyzeTapa06L7cHTiMjf8AiFaawC4sFnPaItqsOoQ0wjKcm+2X3GwXnH6n1s1ERpnaPGGuld1Vrk7rfAn84riv1Aw5OHNu6QfgRPxUwdTRVxuL/h5cG3+HotocNDQ6nBMbzTdpWrrC0jjqpw2LczTQ6g6La03tGS1F0yuriMwLS0NiSIn0vKxJVdV0kmIngFbV0cZdhSoRXKkoihAERFACIiABSihAEREAUIigkIiKAAr9jqb8VZAmw1W6wfZzEvv7FwB0zbvwN1DLR7MFotAvOi679PmmarToY9Rr8wtW/Zlem4UvZgPdlFoJGbQeOlp4hdV2fwwpVCBpOUS4uOVstEk8bXiBMwAFnyyXFo244e5NHU4B5achuFuKVNw7ui1z6Fsw1F1uMHUDmhZ7OkvwNY/iQFQ+iBqZKy3VPBYzzJk+SiyqTZZpsAvz+S0+38IKlN7XaOELeubJWHjmZgR0UHSPZ4PiGGm5zH95pIP5yWGXDiB5L0rb+wWPeHHdc85XHSbGOBk+FzouK2r2fq0iCAXNIFwDInmFsx5Yy77M2bHKPWzUOeIgDxPNWlcq0nNMOaWnkQQfQq2u5kbsKVCKSCURFJAREQBEUICUUIhJMqERRYCLN2Vs9+IqCnTiSCSTMADUmPy69D2J2LYwBzwHvsZcLDwboobIs8zp0nOIDWkk6AAknwAXV7G7D1qsOrH2bTwiXny0b+WXpuE2OJl11tKeFDdAquX0LOX2N2Uo0DLGb3737zvLgPJdFh8GAZ/LrObTV1rPmqNg882rTz1y45Muc947tj73JsC5nSVm4TDQGuJ1/tDfgLBWq74JcReZ8b8OS2WGdnAkyWuM7pbeZIy8BdYZO9nsQjx1+G1ovtl9Fm4dkcFrn7rhK2tF9rImRKOrRXrwUClxKk1I1hUZ5U6OasmyxsUyZhKtYDjf84rGxGMDWySAProosuovs1GPYS6wIDREhwbd1u8byG5ja/hqMapSEXFuvLqs5jMwzENJN8wdmmQCLiwgE2FlnbL2f7R8uG4yCep4N+E+Sqk5SSRdyUYuTMPC9nKbqWWsxrw6XZXCcgMQGz3fLmuC7Rfp7Vpy/DHOy5yGz2jodHceR8V7Z7LjzViphpW+LcUeRKXJtnzFUYWkhwLSLEEEEeIKtr37tB2UoYkb7AH8Hizh5/deXdqOxNXCN9o0+0pcSBvN6uHEdV0UkyDkkRFcBSoRSCURQgCIigBVsYSQAJJMADUk6AKhdv8AptsP21Y1niWUzDZ4v5+Q+YUMHZ9hOywoMzVBNR4Bf0HBo6BdicKALBXsFSAkfmiynssFzeyq+zEo0VU5l1fpN1VI1KqSW/ZKtrFdhS0KQcA/BZmkfNU4JpZBFgWiDvFpgAbs90CzY0EWtC2j3Q4t5Fw+JCxmhodBy8ZItaQAIiCfMmAbQF578o9q+mX2Oc4i1ltWPIF/qsGnTLbjkqqlcxpNvBRf2WavSLlXE3gXjkrT67naacVRSuJcCDyt81cY7iAPqidjil4LFRsLHhznBwjdMtB94tc2eHxkaFZFSq0uySAeJM26DrZXGFoECLGxDco+pjzOiLQe9FNCnlhoHIQBqTYAea6rC4UMYGcdXHmTr9vALVbEo5nGobhshkcXGxPlp5lbwD14rVhjSs871WTk+K8EOVlyuPKoXcyFiqLLAxtEOYWuAIMyDxBWxe2SqK9GbKAePbd7AEuc7CEcT7NxjyY76H1XA16LmOLXtLXNMFpEEHqF9JVsIB4rkO2/ZQYqmatJv/kMEiPfaNWnryK6KQTPF0VREWOqpVyQiIpAREVQF772F2V7DDMaRvRLv8nXPxMeS8a7LbPNfEsb7rSHu/xaRbzMDzX0Js9kBoVWVb8GWyxPkfosh+oCsubofEequi5b5/JVCIAiVbptuVeeLKkNhQSQFLeKQpAQHKY/DRUeP7if+W99VY9lYC3AzGbS4kWm40kTccVudt0Ie1/BwynxFx8CfRa9zQVhnHjJnr4ZKWNWYp2jkADgZhuoIG8JtOujh1ylUOxRdrB8oPrxVFamDIESQBwMQZBB4HX1KUqLASS0hure8QCRBzQ4ZmzeBELk9+Tsrj2rKDizfgB1+6rw73vAcO5BM5mNJi1sxGrobmNp8IV1opAy1hkaSSHAnMC8PmZgiBG6RIuq6tVzxc7tra6czqb3k8SipebJblLSVf0pfUybjHOLRqZEO3YndAtJcbk6pQoOc4MGrjAH1PlJUtFlvdhYSB7U6uszo3i7z+nVdMcXORzzTWKGu/8ATZ4agGNDW91ogdTxKuuMKYjwCoct54rdlKpeYCqVAGY9EBVSZzU1nBoJPBXw1YtRuZ4bwFygKKeFz7zuKr9i1o3RCy3cvVW3Nspohnzv+omzfYY6qAIa+KjeW/3v+wcuWXrv6ybOmnSrgXY4scf7X3BPm0D/AHLyJXTLIIiKwCIigHc/pawGvUn9g+Z+y9ownu+P0KhFSRV9mc7ijNfM/JEVWSXVbRFIIKkIigGNtRgNIzwgjxXPv+ihFlz9o9D0fxf9MapoVcdYeX1RFnZvXgsNF0b9fuiKhcvUKQJAOmZo8ibrtGsAJA0EAdBCItnp+meZ63tAq2URaTAUlXKAUIgL4WNhtXHjKlEBcbopciKyIZx/6jUGuwFeRo2R4ghw+K+e0RWiSugiIrEn/9k="></img>
                  <div className="peopleContent">
                    <h1>Kim Myers</h1>
                    <h2>Founder</h2>
                    <p>
                      Legislature from 2015-2016 and was appointed back into the
                      Legislature in 2019 after former Legislator Daniel D.
                      Reynolds resigned to become Elections Commissioner, and
                      was re-elected to a new term representing Legislative
                      District 4 in 2020. District 4 includes portions of the
                      Town of Vestal, including Binghamton University's main
                      campus.
                    </p>
                  </div>
                </div>
                <div className="PeopleCard">
                  <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>{" "}
                  <div className="peopleContent">
                    <h1>Jamie</h1>
                    <h2>Administrator</h2>
                    <p>
                      Jamie has been apart for the Locker Room 345 team since
                      day 1. She volunteers her time to help students in need.
                    </p>
                  </div>
                </div>
                <div className="PeopleCard">
                  <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>{" "}
                  <div className="peopleContent">
                    <h1>TBA</h1>
                    <h2>TBA</h2>
                    <p>TBA</p>
                  </div>
                </div>
                <div className="PeopleCard">
                  <img src="https://www.binghamton.edu/img/hi-res/directory/yoons.jpg?resolution=200"></img>{" "}
                  <div className="peopleContent">
                    <h1>Sang Won Yoon</h1>
                    <h2>Professor</h2>
                    <p>
                      With a MS from Korea University and a PHD from Purdue
                      University in Industrial and Systems Engineering, Dr.Yoon
                      has shown exemplary knowledge in enterprise systems, as he
                      is a top-tier professor at the State University of New
                      York at Binghamton University. Yoon has research
                      experience in integrated production and service systems,
                      healthcare systems engineering, Decentralized decision
                      modeling, collaborative control theory, and enterprise
                      collaboration and coordination with more than a dozen
                      papers published. Dr.Yoon’s daughter, a middle school
                      student in the greater Binghamton area, has also
                      contributed her time to this project.
                    </p>
                  </div>
                </div>
                <div className="PeopleCard">
                  <img src="https://www.cappex.com/sites/default/files/styles/college_hero_desktop/public/images/hero/college/196079_hero.jpg?itok=nyGkYijQ"></img>{" "}
                  <div className="peopleContent">
                    <h1>Students of Binghamton University</h1>
                    <h2>Watson School of Engineering</h2>
                    <p>
                      The State University of New York at Binghamton is a public
                      research university with campuses in Binghamton, Vestal,
                      and Johnson City, New York. Students from the Thomas J.
                      Watson College of Engineering and Applied Science have
                      been provided the project Locker Room 345 as a project to
                      complete their curriculum. Alongside graduate students,
                      senior undergraduate student have joined together to
                      optimize and develop the state of Locker Room 345 to
                      expand this organization to students in need a across the
                      country.
                    </p>
                  </div>
                </div>
                <div className="PeopleCard">
                  <img src="data:image/png;base64,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"></img>{" "}
                  <div className="peopleContent">
                    <h1>Dick's Sporting Goods</h1>
                    <h2>Donator</h2>
                    <p>
                      With their first establishment being in downtown
                      Binghamton, Dick’s Sporting Goods wants to give back to
                      the community that started their nationwide business.
                      Dick’s donates a plethora of items to Locker Room 345 to
                      help students that don't have access to clothing
                      necessities.
                    </p>
                  </div>
                </div> */}
              </div>
              <Footer></Footer>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Profile;

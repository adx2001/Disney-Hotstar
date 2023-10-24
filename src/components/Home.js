import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, apiUrl, imageUrl } from "../constants/constants";
import { FiChevronRight } from "react-icons/fi";
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { PiTelevisionSimple } from "react-icons/pi";
import { MdOutlineLocalMovies, MdOutlineSportsBaseball } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [movie, setMovie] = useState(null);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`)
      .then((response) => {
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        setMovie(response.data.results[randomIndex]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        setTrending(response.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/movie/popular?language=en-US&page=2&api_key=${API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        setTrending(response.data.results);
      });
  }, []);

  const remainingTrending = trending.slice(6);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };


  return (
    <>
      <div className="fixed z-10 top-0 left-0 h-screen w-28 p-5" id="sidebar">
        <div className="">
          <a href="/">
            <img
              src="https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg"
              alt=""
              className="w-30"
            />
          </a>
          <button className="rounded-full bg-[#2d1804e2] text-xs font-semibold mt-3 p-1 text-[#ffcc6db0] flex justify-center items-center gap-1">
            <span>Subscribe</span>
            <FiChevronRight />
          </button>
        </div>

        <div className="mt-16">
          <ul
            className="text-2xl text-[#919191] flex flex-col justify-center items-center"
            id="sul"
          >
            <Link to="/login">
              <li>
                <BiUserCircle />
                <p>My Space</p>
              </li>
            </Link>
            <Link to="/explore">
              <li>
                <BiSearch />
                <p>Search</p>
              </li>
            </Link>
            <Link to="/">
              <li>
                <GoHomeFill />
                <p>Home</p>
              </li>
            </Link>

            <Link to="/shows">
              <li>
                <PiTelevisionSimple />
                <p>TV</p>
              </li>
            </Link>

            <Link to="/movies">
              <li>
                <MdOutlineLocalMovies />
                <p>Movies</p>
              </li>
            </Link>
            <Link to="/sports">
              <li>
                <MdOutlineSportsBaseball />
                <p>Sports</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="pl-28">
        <div className="relative">
          <div
            className={`bg-fixed bg-no-repeat bg-cover h-[90vh] ${
              movie ? "bg-" + imageUrl + movie.backdrop_path : ""
            }`}
            style={{
              backgroundImage: movie
                ? `linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent), url(${
                    imageUrl + movie.backdrop_path
                  })`
                : "none",
            }}
          ></div>

          <div className="absolute top-0 left-0 h-full w-full pl-3 shadow-inset-0">
            <p className="text-3xl mt-40 text-white uppercase font-bold">
              {movie ? movie.title : ""}
            </p>
            <div className="text-stone-300 text-[1.1rem] mt-6">
              <div className="flex gap-2 justify-start items-center">
                {/* <span className="h-2 w-2 inline-grid rounded-full blink"></span>
                <span className="block font-semibold text-white">
                  LIVE 4L ICC Men's Cricket World Cup
                </span> */}
              </div>
              <p className="w-[28rem]">{movie ? movie.overview : ""}</p>
              <br />
              <br />
              <button className="p-3 bg-[rgba(255,255,255,.2)] w-[26.4rem] rounded-lg flex justify-center items-center gap-3 font-bold tracking-wider text-white hover:scale-105 hover:bg-[rgba(255,255,255,.3)] transition-all">
                <BsFillPlayFill className="text-3xl" />
                <p>Watch Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-screen bg-[#0f0f0ffd] pe-[70px]">
        <div className="ms-[120px] pt-4">
          <h4 className="text-[2.4rem] font-semibold text-white">Trending</h4>
        </div>
        <div className="ml-32">
          <div className="flex flex-wrap ">
            {trending.slice(0, 6).map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                {/* Card Component */}
              </div>
            ))}
          </div>
        </div>
        <div className="ml-32 mt-4">
          <Slider {...carouselSettings}>
            {remainingTrending.map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="ms-[120px] pt-4">
          <h4 className="text-[2.4rem] font-semibold text-white">Movies</h4>
        </div>
        <div className="ml-32">
          <div className="flex flex-wrap ">
            {trending.slice(0, 6).map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                {/* Card Component */}
              </div>
            ))}
          </div>
        </div>
        <div className="ml-32 mt-4">
          <Slider {...carouselSettings}>
            {remainingTrending.map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="ms-[120px] pt-4">
          <h4 className="text-[2.4rem] font-semibold text-white">Series</h4>
        </div>
        <div className="ml-32">
          <div className="flex flex-wrap ">
            {trending.slice(0, 6).map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                {/* Card Component */}
              </div>
            ))}
          </div>
        </div>
        <div className="ml-32 mt-4">
          <Slider {...carouselSettings}>
            {remainingTrending.map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
           <div className="ms-[120px] pt-4">
          <h4 className="text-[2.4rem] font-semibold text-white">Top Rated</h4>
        </div>
        <div className="ml-32">
          <div className="flex flex-wrap ">
            {trending.slice(0, 6).map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                {/* Card Component */}
              </div>
            ))}
          </div>
        </div>
        <div className="ml-32 mt-4">
          <Slider {...carouselSettings}>
            {remainingTrending.map((item, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/6 px-2">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`${imageUrl}${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      
    </>
  );
};

export default Home;

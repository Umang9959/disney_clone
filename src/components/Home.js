import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { uniqBy } from "lodash";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    console.log("hello");
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      const allMovies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const recommendedMovies = uniqBy(
        allMovies.filter((movie) => movie.type === "recommend"),
        "id"
      );
      const newDisneyMovies = uniqBy(
        allMovies.filter((movie) => movie.type === "new"),
        "id"
      );
      const originalMovies = uniqBy(
        allMovies.filter((movie) => movie.type === "original"),
        "id"
      );
      const trendingMovies = uniqBy(
        allMovies.filter((movie) => movie.type === "trending"),
        "id"
      );
  
      dispatch(
        setMovies({
          recommend: recommendedMovies,
          newDisney: newDisneyMovies,
          original: originalMovies,
          trending: trendingMovies,
        })
      );
    });
  
    return unsubscribe;
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
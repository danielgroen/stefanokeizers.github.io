import Carousel       from './modules/carousel.js';
import GridVisualizer from './modules/grid-visualizer.js';
import ParallaxScroll from './modules/parallax-scroll.js';
import Scroll         from './modules/scroll.js';

window.addEventListener("load", () => {
  Carousel();
  GridVisualizer();
  ParallaxScroll();
  Scroll();
});
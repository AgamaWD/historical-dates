import './svg-sprite';

// Библиотеки (styles)
import 'normalize.css/normalize.css';
import 'swiper/css/bundle';

// Основные стили (styles)
import '../styles/main.scss';

// Mодули (scripts)
import datesSlidersInit from '../modules/dates-slider/dates-slider';
import tabsBlockInit from '../modules/tabs-block/tabs-block';

document.addEventListener('DOMContentLoaded', () => {
    datesSlidersInit();
    tabsBlockInit();
})
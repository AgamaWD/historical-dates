import './svg-sprite';

// Библиотеки (styles)
import 'normalize.css/normalize.css';
import 'swiper/css/bundle';

// Основные стили (styles)
import '../styles/main.scss';

// Компоненты и модули (scripts)
import datesSlidersInit from '../blocks/modules/dates-slider/dates-slider';
import tabsBlockInit from '../blocks/modules/tabs-block/tabs-block';

document.addEventListener('DOMContentLoaded', () => {
    datesSlidersInit();
    tabsBlockInit();
})
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

Swiper.use([Navigation]);

export default function datesSlidersInit() {

    const datesSliders = document.querySelectorAll('[data-js="datesSlider"]') as NodeListOf<HTMLElement>

    if (datesSliders.length < 1) return

    datesSliders.forEach((slider) => {
        const datesSliderPrev = slider.querySelector('[data-js="datesSliderPrev"]') as HTMLElement;
        const datesSliderNext = slider.querySelector('[data-js="datesSliderNext"]') as HTMLElement;
        const datesSliderEl = slider.querySelector('[data-js="datesSliderSlider"]') as HTMLElement;

        const swiperParams: SwiperOptions = {
            slidesPerView: 3,
            spaceBetween: 80,
            navigation: {
                nextEl: datesSliderNext,
                prevEl: datesSliderPrev,
            },
            watchOverflow: true,
        };

        const datesSliderEx = new Swiper(datesSliderEl, swiperParams);
    })
}
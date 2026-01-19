import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

Swiper.use([Navigation]);

export default function datesSlidersInit() {

    const datesSliders = document.querySelectorAll('[data-js="datesSlider"]') as NodeListOf<HTMLElement>

    if (datesSliders.length < 1) return

    datesSliders.forEach((slider) => {
        const datesSliderPrev = slider.querySelector('[data-js="datesSliderPrev"]') as HTMLElement | null;
        const datesSliderNext = slider.querySelector('[data-js="datesSliderNext"]') as HTMLElement | null;
        const datesSliderEl = slider.querySelector('[data-js="datesSliderSlider"]') as HTMLElement | null;

        const navigation = datesSliderPrev && datesSliderNext ? {
            nextEl: datesSliderNext,
            prevEl: datesSliderPrev,
        } : false

        const swiperParams: SwiperOptions = {
            slidesPerView: 1.59,
            spaceBetween: 25,
            watchOverflow: true,
            navigation: navigation,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 80
                },
                1250: {
                    slidesPerView: 3
                }
            },
        };

        if (datesSliderEl) {
            const datesSliderEx = new Swiper(datesSliderEl, swiperParams);
        }

    })
}
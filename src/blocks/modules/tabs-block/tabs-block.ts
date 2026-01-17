import Swiper from 'swiper';
import { Thumbs, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

Swiper.use([Thumbs, EffectFade]);

export default function tabsBlockInit() {
    const tabsBlocks = document.querySelectorAll('[data-js="tabsBlock"]') as NodeListOf<HTMLElement>;

    if (tabsBlocks.length < 1) return

    tabsBlocks.forEach((tabsBlock) => {
        const slides = tabsBlock.querySelector('[data-js="tabsBlockSlides"]') as HTMLElement;
        const tabs = tabsBlock.querySelector('[data-js="tabsBlockList"]') as HTMLElement;
        const tabsPrev = tabsBlock.querySelector('[data-js="tabsBlockPrev"]') as HTMLElement;
        const tabsNext = tabsBlock.querySelector('[data-js="tabsBlockNext"]') as HTMLElement;

        const tabsParams: SwiperOptions = {
            slidesPerView: 'auto',
            watchSlidesProgress: true,
        };

        const tabsSliderEx = new Swiper(tabs, tabsParams);

        const slidesParams: SwiperOptions = {
            slidesPerView: 1,
            spaceBetween: 100,
            allowTouchMove: false,
            simulateTouch: false,
            effect: 'fade',
            thumbs: {
                swiper: tabsSliderEx,
            },
            navigation: {
                nextEl: tabsNext,
                prevEl: tabsPrev,
            },
        };

        const slidesSliderEx = new Swiper(slides, slidesParams);

    })
}
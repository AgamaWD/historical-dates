import Swiper from 'swiper';
import { Thumbs, EffectFade, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

Swiper.use([Thumbs, EffectFade, Pagination]);

export default function tabsBlockInit() {
    const tabsBlocks = document.querySelectorAll('[data-js="tabsBlock"]') as NodeListOf<HTMLElement>;

    if (tabsBlocks.length < 1) return

    tabsBlocks.forEach((tabsBlock) => {
        const slides = tabsBlock.querySelector('[data-js="tabsBlockSlides"]') as HTMLElement | null;
        const tabs = tabsBlock.querySelector('[data-js="tabsBlockList"]') as HTMLElement | null;
        const tabsPrev = tabsBlock.querySelector('[data-js="tabsBlockPrev"]') as HTMLElement | null;
        const tabsNext = tabsBlock.querySelector('[data-js="tabsBlockNext"]') as HTMLElement | null;
        const navigation = tabsPrev && tabsNext ? {
            nextEl: tabsNext,
            prevEl: tabsPrev,
        } : false
        const tabsFraction = tabsBlock.querySelector('[data-js="tabsBlockFraction"]') as HTMLElement | null;
        const pagination = tabsFraction ? {
            el: tabsFraction,
            type: "fraction" as const,
            renderFraction: function (currentClass: string, totalClass: string) {
                return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
            },
            formatFractionCurrent: (number: number) => {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: (number: number) => {
                return ('0' + number).slice(-2);
            }
        } : undefined
        const tabsBlockFrom = tabsBlock.querySelector('[data-js="tabsBlockFrom"]') as HTMLElement | null;
        const tabsBlockTo = tabsBlock.querySelector('[data-js="tabsBlockTo"]') as HTMLElement | null;

        if (!slides || !tabs) return

        const tabsList = Array.from(tabs.querySelectorAll('[data-js="tabsBlockTab"]') as NodeListOf<HTMLElement>);
        const originalTransforms: { [key: string]: string } = {};
        const vw: number = window.innerWidth
        const mobileBP: number = 767

        if (vw > mobileBP) {
            arrangeItemsOnCircle(tabs, tabsList)
        }

        const tabsParams: SwiperOptions = {
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    spaceBetween: 0
                }
            }
        };

        const tabsSliderEx = new Swiper(tabs, tabsParams);

        const slidesParams: SwiperOptions = {
            slidesPerView: 1,
            spaceBetween: 100,
            allowTouchMove: false,
            simulateTouch: false,
            effect: 'fade',
            speed: 500,
            thumbs: {
                swiper: tabsSliderEx,
            },
            navigation: navigation,
            pagination: pagination,
            on: {
                init: function () {
                    if (tabsBlockFrom && tabsBlockTo) {
                        updateFromToLabels(tabsList, tabsBlockFrom, tabsBlockTo)
                    }
                },
                slideChange: function () {
                    if (vw > mobileBP) {
                        rotateToActiveThumb(tabs, tabsList, originalTransforms);
                    }
                    if (tabsBlockFrom && tabsBlockTo) {
                        updateFromToLabels(tabsList, tabsBlockFrom, tabsBlockTo);
                    }
                },
            },
        };

        const slidesSliderEx = new Swiper(slides, slidesParams);
    })

    function rotateToActiveThumb(container: HTMLElement, items: HTMLElement[], originalTransforms: { [key: string]: string }): void {
        const thumbActiveClass = 'swiper-slide-thumb-active';
        const currentActiveClass = 'curent-active-class';
        const activeThumb = items.find(item => item.classList.contains(thumbActiveClass)) as HTMLElement;
        const numItems = items.length;
        const angleStep = (2 * Math.PI) / numItems;
        const startAngle = -Math.PI / 3;
        const activeIndex = items.indexOf(activeThumb);
        const currentAngle = startAngle + activeIndex * angleStep;
        const rotationAngle = startAngle - currentAngle;

        items.forEach((item) => {
            const id = item.dataset.id ?? '';
            if (!id || originalTransforms[id] !== undefined) return;
            originalTransforms[id] = item.style.transform || '';
        });

        const previousActive = items.find(item =>
            item.classList.contains(currentActiveClass)
        );
        if (previousActive) {
            previousActive.classList.remove(currentActiveClass);
        }
        activeThumb.classList.add(currentActiveClass);

        container.style.transition = 'transform 0.6s linear';
        container.style.transform = `rotate(${rotationAngle}rad)`;

        items.forEach((item) => {
            const id = item.dataset.id ?? '';
            const baseTransform = id ? (originalTransforms[id] ?? '') : '';
            item.style.transition = item.style.transition || 'transform 0s linear';
            item.style.transform = `rotate(${-rotationAngle}rad) ${baseTransform}`.trim();
        });
    }

    function arrangeItemsOnCircle(container: HTMLElement, items: HTMLElement[]): void {
        const rect = container.getBoundingClientRect();
        const size = rect.width;
        const cx = size / 2;
        const cy = size / 2;
        const radius = size / 2;
        const numItems = items.length;
        const angleStep = (2 * Math.PI) / numItems;
        const startAngle = -Math.PI / 3;

        items.forEach((item, i) => {
            const angle = startAngle + i * angleStep;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);

            item.setAttribute('data-id', i.toString())
            item.style.transform = 'translate(-50%, -50%)';
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            if (i === 0) {
                item.classList.add('curent-active-tab')
            }

            setTimeout(() => {
                item.style.transition = 'width 0.3s linear, height 0.3s linear, background-color 0.3s linear';
            }, 0)
        });
    }

    function updateFromToLabels(tabs: HTMLElement[], fromElement: HTMLElement, toElement: HTMLElement): void {
        const activeTab = tabs.find(tab =>
            tab.classList.contains('swiper-slide-thumb-active')
        );

        const dataFrom = activeTab?.dataset.from;
        const dataTo = activeTab?.dataset.to;

        if (!dataFrom || !dataTo) {
            return;
        }

        const currentFromText = fromElement.textContent?.trim() || '';
        const targetFrom = parseInt(dataFrom);

        if (!isNaN(targetFrom) && /^\d+$/.test(currentFromText)) {
            const currentFromNum = parseInt(currentFromText);
            animateNumber(fromElement, currentFromNum, targetFrom);
        } else {
            fromElement.textContent = dataFrom;
        }

        const currentToText = toElement.textContent?.trim() || '';
        const targetTo = parseInt(dataTo);

        if (!isNaN(targetTo) && /^\d+$/.test(currentToText)) {
            const currentToNum = parseInt(currentToText);
            animateNumber(toElement, currentToNum, targetTo);
        } else {
            toElement.textContent = dataTo;
        }
    }
}

function animateNumber(element: HTMLElement, from: number, to: number): void {
    if (from === to) {
        element.textContent = to.toString();
        return;
    }

    const duration = 600;
    const startTime = performance.now();

    function stepAnimation(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(from + (to - from) * progress);

        element.textContent = current.toString();

        if (progress < 1) {
            requestAnimationFrame(stepAnimation);
        }
    }

    requestAnimationFrame(stepAnimation);
}
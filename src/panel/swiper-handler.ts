import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";

export function initializeSwiper(panelCard: any) {
    if (panelCard._bodyTiles.length <= 1) return;
    const swiperContainer = panelCard.shadowRoot?.querySelector(".swiper");
    if (!swiperContainer) return;

    const swiperParams: SwiperOptions = {
        initialSlide: 0,
        loop: true,
        modules: [Navigation],
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    };

    panelCard._swiper = new Swiper(swiperContainer as HTMLElement, swiperParams);
    if (panelCard._swiper) {
        Swiper.use([Navigation]);
    }
}

export function resetToFirstPage(panelCard: any) {
    if (panelCard._swiper && panelCard._swiper.activeIndex !== 0) {
        panelCard._swiper.slideTo(0);
    }
    panelCard._startResetTimer();
}

export function startResetTimer(panelCard: any) {
    if (panelCard._resetTimer) {
        clearTimeout(panelCard._resetTimer);
    }
    panelCard._resetTimer = setTimeout(() => {
        resetToFirstPage(panelCard);
    }, 5 * 60 * 1000); // 5 minutes
}

export function handleSwiperNavigation(panelCard: any, direction: "prev" | "next") {
    if (panelCard._swiper) {
        if (direction === "prev") {
            panelCard._swiper.slidePrev();
        } else {
            panelCard._swiper.slideNext();
        }
        startResetTimer(panelCard);
    }
}

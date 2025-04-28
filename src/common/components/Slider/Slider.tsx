import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { forwardRef, memo, useRef, useState } from 'react';
import { Event } from '@/common/types/DataTimePeriod';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Slider.module.scss';

interface SliderProps {
    data: Event[];
}

export const Slider = memo(
    forwardRef<HTMLDivElement, SliderProps>(({ data }, ref) => {
        const [activeSlide, setActiveSlide] = useState(0);
        const prevRef = useRef<HTMLButtonElement>(null);
        const nextRef = useRef<HTMLButtonElement>(null);

        return (
            <section className={styles.slider} ref={ref}>
                <div className={styles.navigationButtons}>
                    <button className={styles.buttonPrev} ref={prevRef}></button>
                    <button className={styles.buttonNext} ref={nextRef}></button>
                </div>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={1.5}
                    spaceBetween={25}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 80,
                        },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                >
                    <>
                        {data.map((item, index) => (
                            <SwiperSlide
                                className={activeSlide !== index ? styles.inactiveSlide : styles.slide}
                                key={index}
                            >
                                <p className={styles.date}>{item.date}</p>
                                <p className={styles.description}>{item.description}</p>
                            </SwiperSlide>
                        ))}
                    </>
                </Swiper>
            </section>
        );
    })
);

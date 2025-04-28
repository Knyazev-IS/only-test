import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { Slider } from '@/common/components/Slider/Slider';
import { Spinner } from '@/common/components/Spinner/Spinner';
import { useFetchTimePeriods } from '@/common/hooks/useFetchTimePeriods';
import { SpinnerNavigation } from '@/common/components/SpinnerPagination/SpinnerNavigation';
import styles from './App.module.scss';

export const App = () => {
    const { dataTimePeriods, periodNum, dotAngle, animationTime } = useFetchTimePeriods();
    const [period, setPeriod] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(dotAngle);
    const [rotationTime, setRotationTime] = useState(animationTime * 1000);
    const [startDate, setStartDate] = useState(dataTimePeriods[0].events[0].date);
    const [endDate, setEndDate] = useState(dataTimePeriods[0].events.at(-1).date);

    const startDateRef = useRef<HTMLDivElement>(null);
    const endDateRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const mobileTitleRef = useRef<HTMLHeadingElement>(null);

    const changeEvents = useCallback(
        (index: number) => {
            const newStartDate = dataTimePeriods[index].events[0].date;
            const newEndDate = dataTimePeriods[index].events.at(-1).date;
            const curAnimationTime = rotationTime / 1000;

            gsap.to([sliderRef.current, mobileTitleRef.current], {
                opacity: 0,
                duration: 0,
                delay: 0,
                onComplete: () => {
                    setRotationTime(Math.abs(period - index) * animationTime * 1000);
                    setRotationAngle(dotAngle - index * dotAngle);
                    setPeriod(index);
                    gsap.to([sliderRef.current, mobileTitleRef.current], {
                        opacity: 1,
                        duration: curAnimationTime,
                        delay: animationTime,
                    });
                },
            });

            gsap.to(startDateRef.current, {
                duration: curAnimationTime,
                innerText: newStartDate,
                snap: { innerText: 1 },
                onUpdate: () => setStartDate(newStartDate),
            });

            gsap.to(endDateRef.current, {
                duration: curAnimationTime,
                innerText: newEndDate,
                snap: { innerText: 1 },
                onUpdate: () => setEndDate(newEndDate),
            });
        },
        [dataTimePeriods, period, animationTime, dotAngle]
    );

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Исторические даты</h1>
            <Spinner
                refs={{ startDateRef, endDateRef }}
                data={dataTimePeriods}
                periodNum={periodNum}
                changeEvents={changeEvents}
                startDate={startDate}
                endDate={endDate}
                angle={rotationAngle}
                time={rotationTime}
                curPeriod={period}
            />
            <SpinnerNavigation curPeriod={period} periodNum={periodNum} changeEvents={changeEvents} />
            <Slider data={dataTimePeriods[period].events} ref={sliderRef} />
            <h2 className={styles.mobileTitle} ref={mobileTitleRef}>
                {dataTimePeriods[period].title}
            </h2>
        </main>
    );
};

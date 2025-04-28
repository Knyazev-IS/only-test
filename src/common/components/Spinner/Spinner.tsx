import { memo } from 'react';
import { DateRefs } from '@/common/types/DateRefs';
import { DataTimePeriod } from '@/common/types/DataTimePeriod';
import styles from './Spinner.module.scss';

interface SpinnerProps {
    data: DataTimePeriod[];
    refs: DateRefs;
    startDate: number;
    endDate: number;
    changeEvents: (event: number) => void;
    angle: number;
    time: number;
    curPeriod: number;
    periodNum: number;
}

export const Spinner = memo(
    ({ data, refs, changeEvents, startDate, endDate, angle, curPeriod, periodNum, time }: SpinnerProps) => {
        return (
            <section>
                <div className={styles.title}>
                    <p className={styles.startDate} ref={refs.startDateRef}>
                        {startDate}
                    </p>
                    <p className={styles.endDate} ref={refs.endDateRef}>
                        {endDate}
                    </p>
                </div>
                <div className={styles.container}>
                    <div
                        className={styles.spinner}
                        style={{
                            transform: `rotate(${angle}deg)`,
                            transition: `all ${time}ms ease`,
                        }}
                    >
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={curPeriod === index ? styles.activeItem : styles.item}
                                style={{
                                    transform: `rotate(${(360 / periodNum) * (index + 1)}deg)`,
                                }}
                                onClick={() => changeEvents(index)}
                            >
                                <div className={styles.itemContent}>
                                    <p
                                        className={styles.itemNumber}
                                        style={{
                                            transform: `rotate(${(-360 / periodNum) * (index + 1) - angle}deg)`,
                                        }}
                                    >
                                        {index + 1}
                                        <span
                                            className={styles.itemTitle}
                                            style={{
                                                transition: `opacity 300ms ease ${time}ms`,
                                            }}
                                        >
                                            {item.title}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
);

import styles from './SpinnerNavigation.module.scss';
import { memo } from 'react';

interface SpinnerNavigationProps {
    curPeriod: number;
    periodNum: number;
    changeEvents: (event: number) => void;
}

export const SpinnerNavigation = memo(({ curPeriod, periodNum, changeEvents }: SpinnerNavigationProps) => {
    const handleClickNext = () => {
        changeEvents(curPeriod + 1);
    };

    const handleClickPrev = () => {
        changeEvents(curPeriod - 1);
    };

    return (
        <section className={styles.section}>
            <p className={styles.range}>
                {(curPeriod + 1).toString().padStart(2, '0')}/{periodNum.toString().padStart(2, '0')}
            </p>
            <div className={styles.navButtons}>
                <button className={styles.buttonPrev} onClick={handleClickPrev} disabled={curPeriod === 0}></button>
                <button
                    className={styles.buttonNext}
                    onClick={handleClickNext}
                    disabled={curPeriod === periodNum - 1}
                ></button>
            </div>
        </section>
    );
});

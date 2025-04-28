import { dataTimePeriods } from '@/common/constants/dataTimePeriods';

export const useFetchTimePeriods = () => {
    const periodNum = dataTimePeriods.length;
    const dotAngle = 360 / periodNum;
    const animationTime = 0.3;

    return {
        dataTimePeriods,
        periodNum,
        dotAngle,
        animationTime,
    };
};

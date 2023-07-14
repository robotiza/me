import { isValidCronExpression } from ".";
import {
    CRON_DAILY,
    CRON_FRI,
    CRON_FRI_NOON,
    CRON_HOURLY,
    CRON_MON,
    CRON_MONTHLY,
    CRON_MONTHLY_NOON,
    CRON_MON_NOON,
    CRON_SAT,
    CRON_SAT_NOON,
    CRON_SUN,
    CRON_SUN_NOON,
    CRON_THU,
    CRON_THU_NOON,
    CRON_TUE,
    CRON_TUE_NOON,
    CRON_WED,
    CRON_WED_NOON,
    C_D1,
    C_D12,
    C_D13,
    C_D6,
    C_DEC,
    C_DH1,
    C_H12,
    C_H15,
    C_H2,
    C_H3,
    C_H4,
    C_H6,
    C_H8,
    C_HE,
    C_HO,
    C_JAN,
    C_JAN_FEB_MAR_APR,
    C_JAN_JUN,
    C_JUN,
    C_M,
    C_M10,
    C_M15,
    C_M2,
    C_M3,
    C_M30,
    C_M4,
    C_M5,
    C_MDL,
    C_MDL2,
    C_ME,
    C_MIN_2,
    C_MO,
    C_MX1,
    C_MX2,
    C_MX31,
    C_M_15W,
    C_M_1W,
    C_M_FRI1,
    C_M_LW,
    C_M_MON1,
    C_M_MON2,
    C_M_THU3,
    C_S,
    C_SEPT_DEC,
    C_W1,
    C_WD1
} from "./constants";

describe('isValidCronExpression', () => {
    it('should return true', () => {
        expect(isValidCronExpression('* * * * * ? *')).toBeTruthy();
        expect(isValidCronExpression('* * * ? * * *')).toBeTruthy();
        expect(isValidCronExpression('0 * * ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 */2 * ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 1/2 * ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 15,30,45 * ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 0 */2 ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 0 1/2 ? * *')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 */7 * ?')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 2/7 * ?')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 2 * ?')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 L * ?')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 LW * ?')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 L-5 * ?')).toBeTruthy();
        expect(isValidCronExpression('0 * * 10,30 * ? *')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? * 2#1')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? * 5#3')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? JAN *')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? JAN,JUN *')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? 9-12 *')).toBeTruthy();
        expect(isValidCronExpression('0 0 12 ? * L')).toBeTruthy();
        expect(isValidCronExpression('0/5 14,18,3-39,52 * ? JAN,MAR,SEP MON-FRI 2002-2010')).toBeTruthy();
    });

    it('should return false', () => {
        expect(isValidCronExpression('* * * * * * *')).toBeFalsy();
        expect(isValidCronExpression('* * * ? * ? *')).toBeFalsy();
        expect(isValidCronExpression('* ? * * * ? *')).toBeFalsy();
        expect(isValidCronExpression('0 0 12 2L * ?')).toBeFalsy();
        expect(isValidCronExpression('0 0 12 * * WED')).toBeFalsy();
        expect(isValidCronExpression('* * * ? * JAN *')).toBeFalsy();
        expect(isValidCronExpression('* * * * WED ? *')).toBeFalsy();
    });

    it('should be true for all predefined constant', () => {
        expect(isValidCronExpression(C_S)).toBeTruthy();   // Every second
        expect(isValidCronExpression(C_M)).toBeTruthy();   // Every minute
        expect(isValidCronExpression(C_ME)).toBeTruthy();   // Every even minute
        expect(isValidCronExpression(C_MO)).toBeTruthy();   // Every uneven minute
        expect(isValidCronExpression(C_MIN_2)).toBeTruthy();   // Every 2 minutes
        expect(isValidCronExpression(C_M3)).toBeTruthy();   // Every 3 minutes
        expect(isValidCronExpression(C_M4)).toBeTruthy();   // Every 4 minutes
        expect(isValidCronExpression(C_M5)).toBeTruthy();   // Every 5 minutes
        expect(isValidCronExpression(C_M10)).toBeTruthy();   // Every 10 minutes
        expect(isValidCronExpression(C_M15)).toBeTruthy();   // Every 15 minutes
        expect(isValidCronExpression(C_M30)).toBeTruthy();   // Every 30 minutes
        expect(isValidCronExpression(C_H15)).toBeTruthy();   // Every hour at minutes 15, 30 and 45
        expect(isValidCronExpression(CRON_HOURLY)).toBeTruthy();   // Every hour
        expect(isValidCronExpression(C_H2)).toBeTruthy();   // Every hour
        expect(isValidCronExpression(C_HE)).toBeTruthy();   // Every even hour
        expect(isValidCronExpression(C_HO)).toBeTruthy();   // Every uneven hour
        expect(isValidCronExpression(C_H3)).toBeTruthy();   // Every three hours
        expect(isValidCronExpression(C_H4)).toBeTruthy();   // Every four hours
        expect(isValidCronExpression(C_H6)).toBeTruthy();   // Every six hours
        expect(isValidCronExpression(C_H8)).toBeTruthy();   // Every eight hours
        expect(isValidCronExpression(C_H12)).toBeTruthy();   // Every twelve hours
        expect(isValidCronExpression(CRON_DAILY)).toBeTruthy();   // Every day at midnight - 12am
        expect(isValidCronExpression(C_D1)).toBeTruthy();   // Every day at 1am
        expect(isValidCronExpression(C_D6)).toBeTruthy();   // Every day at 6am
        expect(isValidCronExpression(C_D12)).toBeTruthy();   // Every day at noon - 12pm
        expect(isValidCronExpression(C_D13)).toBeTruthy();   // Every day at noon - 12pm
        expect(isValidCronExpression(CRON_SUN)).toBeTruthy();   // Every Sunday at noon
        expect(isValidCronExpression(CRON_MON)).toBeTruthy();   // Every Monday at noon
        expect(isValidCronExpression(CRON_TUE)).toBeTruthy();   // Every Tuesday at noon
        expect(isValidCronExpression(CRON_WED)).toBeTruthy();   // Every Wednesday at noon
        expect(isValidCronExpression(CRON_THU)).toBeTruthy();   // Every Thursday at noon
        expect(isValidCronExpression(CRON_FRI)).toBeTruthy();   // Every Friday at noon
        expect(isValidCronExpression(CRON_SAT)).toBeTruthy();   // Every Saturday at noon
        expect(isValidCronExpression(CRON_SUN_NOON)).toBeTruthy();   // Every Sunday at noon
        expect(isValidCronExpression(CRON_MON_NOON)).toBeTruthy();   // Every Monday at noon
        expect(isValidCronExpression(CRON_TUE_NOON)).toBeTruthy();   // Every Tuesday at noon
        expect(isValidCronExpression(CRON_WED_NOON)).toBeTruthy();   // Every Wednesday at noon
        expect(isValidCronExpression(CRON_THU_NOON)).toBeTruthy();   // Every Thursday at noon
        expect(isValidCronExpression(CRON_FRI_NOON)).toBeTruthy();   // Every Friday at noon
        expect(isValidCronExpression(CRON_SAT_NOON)).toBeTruthy();   // Every Saturday at noon
        expect(isValidCronExpression(C_W1)).toBeTruthy();            // Every Weekday at noon
        expect(isValidCronExpression(C_WD1)).toBeTruthy();            // Every Saturday and Sunday at noon
        expect(isValidCronExpression(C_DH1)).toBeTruthy();                // Every 7 days at noon
        expect(isValidCronExpression(CRON_MONTHLY)).toBeTruthy();                  // Every month on the 1st
        expect(isValidCronExpression(CRON_MONTHLY_NOON)).toBeTruthy();                  // Every month on the 1st, at noon
        expect(isValidCronExpression(C_M2)).toBeTruthy();                  // Every month on the 2nd, at noon
        expect(isValidCronExpression(C_MX2)).toBeTruthy();                 // Every month on the 15th, at noon
        expect(isValidCronExpression(C_MX1)).toBeTruthy();                // Every 2 days starting on the 1st of the month, at noon
        expect(isValidCronExpression(C_MX31)).toBeTruthy();                // Every 4 days staring on the 1st of the month, at noon
        expect(isValidCronExpression(C_MDL)).toBeTruthy();                  // Every month on the last day of the month, at noon
        expect(isValidCronExpression(C_MDL2)).toBeTruthy();                // Every month on the second to last day of the month, at noon
        expect(isValidCronExpression(C_M_LW)).toBeTruthy();                 // Every month on the last weekday, at noon
        // expect(isValidCronExpression(C_M_1L)).toBeTruthy();                 // Every month on the last Sunday, at noon
        // expect(isValidCronExpression(C_M_2L)).toBeTruthy();                 // Every month on the last Monday, at noon
        // expect(isValidCronExpression(C_M_6L)).toBeTruthy();                 // Every month on the last Friday, at noon
        expect(isValidCronExpression(C_M_1W)).toBeTruthy();                 // Every month on the nearest Weekday to the 1st of the month, at noon
        expect(isValidCronExpression(C_M_15W)).toBeTruthy();                // Every month on the nearest Weekday to the 15th of the month, at noon
        expect(isValidCronExpression(C_M_MON1)).toBeTruthy();                // Every month on the first Monday of the Month, at noon
        expect(isValidCronExpression(C_M_FRI1)).toBeTruthy();                // Every month on the first Friday of the Month, at noon
        expect(isValidCronExpression(C_M_MON2)).toBeTruthy();                // Every month on the second Monday of the Month, at noon
        expect(isValidCronExpression(C_M_THU3)).toBeTruthy();                // Every month on the third Thursday of the Month, at noon - 12pm
        expect(isValidCronExpression(C_JAN)).toBeTruthy();                // Every day at noon in January only
        expect(isValidCronExpression(C_JUN)).toBeTruthy();                // Every day at noon in June only
        expect(isValidCronExpression(C_JAN_JUN)).toBeTruthy();            // Every day at noon in January and June
        expect(isValidCronExpression(C_DEC)).toBeTruthy();                // Every day at noon in December only
        expect(isValidCronExpression(C_JAN_FEB_MAR_APR)).toBeTruthy();    // Every day at noon in January, February, March and April
        expect(isValidCronExpression(C_SEPT_DEC)).toBeTruthy();               // Every day at noon between September and December
    });
});
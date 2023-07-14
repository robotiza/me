export const C_S = '* * * ? * *';   // Every second
export const C_M = '0 * * ? * *';   // Every minute
export const C_ME = '0 */2 * ? * *';   // Every even minute
export const C_MO = '0 1/2 * ? * *';   // Every uneven minute
export const C_MIN_2 = '0 */2 * ? * *';   // Every 2 minutes
export const C_M3 = '0 */3 * ? * *';   // Every 3 minutes
export const C_M4 = '0 */4 * ? * *';   // Every 4 minutes
export const C_M5 = '0 */5 * ? * *';   // Every 5 minutes
export const C_M10 = '0 */10 * ? * *';   // Every 10 minutes
export const C_M15 = '0 */15 * ? * *';   // Every 15 minutes
export const C_M30 = '0 */30 * ? * *';   // Every 30 minutes
export const C_H15 = '0 15,30,45 * ? * *';   // Every hour at minutes 15, 30 and 45
export const CRON_HOURLY = '0 0 * ? * *';   // Every hour
export const C_H2 = '0 0 */2 ? * *';   // Every hour
export const C_HE = '0 0 0/2 ? * *';   // Every even hour
export const C_HO = '0 0 1/2 ? * *';   // Every uneven hour
export const C_H3 = '0 0 */3 ? * *';   // Every three hours
export const C_H4 = '0 0 */4 ? * *';   // Every four hours
export const C_H6 = '0 0 */6 ? * *';   // Every six hours
export const C_H8 = '0 0 */8 ? * *';   // Every eight hours
export const C_H12 = '0 0 */12 ? * *';   // Every twelve hours
export const CRON_DAILY = '0 0 0 * * ?';   // Every day at midnight - 12am
export const C_D1 = '0 0 1 * * ?';   // Every day at 1am
export const C_D6 = '0 0 6 * * ?';   // Every day at 6am
export const C_D12 = '0 0 12 * * ?';   // Every day at noon - 12pm
export const C_D13 = '0 0 12 * * ?';   // Every day at noon - 12pm
export const CRON_SUN = '0 0 0 ? * SUN';   // Every Sunday at noon
export const CRON_MON = '0 0 0 ? * MON';   // Every Monday at noon
export const CRON_TUE = '0 0 0 ? * TUE';   // Every Tuesday at noon
export const CRON_WED = '0 0 0 ? * WED';   // Every Wednesday at noon
export const CRON_THU = '0 0 0 ? * THU';   // Every Thursday at noon
export const CRON_FRI = '0 0 0 ? * FRI';   // Every Friday at noon
export const CRON_SAT = '0 0 0 ? * SAT';   // Every Saturday at noon
export const CRON_SUN_NOON = '0 0 12 ? * SUN';   // Every Sunday at noon
export const CRON_MON_NOON = '0 0 12 ? * MON';   // Every Monday at noon
export const CRON_TUE_NOON = '0 0 12 ? * TUE';   // Every Tuesday at noon
export const CRON_WED_NOON = '0 0 12 ? * WED';   // Every Wednesday at noon
export const CRON_THU_NOON = '0 0 12 ? * THU';   // Every Thursday at noon
export const CRON_FRI_NOON = '0 0 12 ? * FRI';   // Every Friday at noon
export const CRON_SAT_NOON = '0 0 12 ? * SAT';   // Every Saturday at noon
export const C_W1 = '0 0 12 ? * MON-FRI';            // Every Weekday at noon
export const C_WD1 = '0 0 12 ? * SUN,SAT';            // Every Saturday and Sunday at noon
export const C_DH1 = '0 0 12 */7 * ?';                // Every 7 days at noon

/**
 * Every month on the 1st
 */
export const CRON_MONTHLY = '0 0 0 1 * ?';

/**
 * Every month on the 1st, at noon
 */
export const CRON_MONTHLY_NOON = '0 0 12 1 * ?';

export const C_M2 = '0 0 12 2 * ?';                  // Every month on the 2nd, at noon
export const C_MX2 = '0 0 12 15 * ?';                 // Every month on the 15th, at noon
export const C_MX1 = '0 0 12 1/2 * ?';                // Every 2 days starting on the 1st of the month, at noon
export const C_MX31 = '0 0 12 1/4 * ?';                // Every 4 days staring on the 1st of the month, at noon
export const C_MDL = '0 0 12 L * ?';                  // Every month on the last day of the month, at noon
export const C_MDL2 = '0 0 12 L-2 * ?';                // Every month on the second to last day of the month, at noon
export const C_M_LW = '0 0 12 LW * ?';                 // Every month on the last weekday, at noon
// export const C_M_1L = '0 0 12 1L * ?';                 // Every month on the last Sunday, at noon
// export const C_M_2L = '0 0 12 2L * ?';                 // Every month on the last Monday, at noon
// export const C_M_6L = '0 0 12 6L * ?';                 // Every month on the last Friday, at noon
export const C_M_1W = '0 0 12 1W * ?';                 // Every month on the nearest Weekday to the 1st of the month, at noon
export const C_M_15W = '0 0 12 15W * ?';                // Every month on the nearest Weekday to the 15th of the month, at noon
export const C_M_MON1 = '0 0 12 ? * 2#1';                // Every month on the first Monday of the Month, at noon
export const C_M_FRI1 = '0 0 12 ? * 6#1';                // Every month on the first Friday of the Month, at noon
export const C_M_MON2 = '0 0 12 ? * 2#2';                // Every month on the second Monday of the Month, at noon
export const C_M_THU3 = '0 0 12 ? * 5#3';                // Every month on the third Thursday of the Month, at noon - 12pm
export const C_JAN = '0 0 12 ? JAN *';                // Every day at noon in January only
export const C_JUN = '0 0 12 ? JUN *';                // Every day at noon in June only
export const C_JAN_JUN = '0 0 12 ? JAN,JUN *';            // Every day at noon in January and June
export const C_DEC = '0 0 12 ? DEC *';                // Every day at noon in December only
export const C_JAN_FEB_MAR_APR = '0 0 12 ? JAN,FEB,MAR,APR *';    // Every day at noon in January, February, March and April
export const C_SEPT_DEC = '0 0 12 ? 9-12 *';               // Every day at noon between September and December
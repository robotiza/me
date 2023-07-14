/**
 * Prefined intervals
 * @type {Object}
 */
const PREDEFINED: Record<string, string> = {
    '@yearly': '0 0 1 1 *',
    '@monthly': '0 0 1 * *',
    '@weekly': '0 0 * * 0',
    '@daily': '0 0 * * *',
    '@hourly': '0 * * * *'
};

export default PREDEFINED;
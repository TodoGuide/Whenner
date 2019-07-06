
/**
 * Use instead of Date for easy mocking in tests
 */
export const Time = {
    current: () => new Date(),
    now: () => Date.now(),
} 
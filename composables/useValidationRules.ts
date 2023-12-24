export const useValidationRules = () => {
    return {
        EMAIL_FORMAT: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD_MIN_LENGTH: 12
    };
};

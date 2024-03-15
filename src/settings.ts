const isProduction = import.meta.env.MODE === "production";

const URL = isProduction ?
    import.meta.env.VITE_PROD_API_BASE_URL :
    import.meta.env.VITE_DEV_API_BASE_URL;

const MODE = isProduction ? "Production" : "Development";
console.info(MODE + " API URL: " + URL);
export const API_URL = URL;
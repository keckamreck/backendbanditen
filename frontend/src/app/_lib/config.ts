const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://backend.biber.mom/"
      : "http://localhost:8097/",
} as const;

export default config;

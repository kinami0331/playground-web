/** @type {import("next").NextConfig} */
const nextConfig = {
    // 修复静态页面的问题
    trailingSlash: true,
    exportPathMap: function () {
        return {
            "/": {page: "/"},
            "/lucky": {page: "/lucky"}
        };
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        }); // 针对 SVG 的处理规则

        return config;
    }
};

module.exports = nextConfig;

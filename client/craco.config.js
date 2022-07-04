const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@api': path.resolve(__dirname, 'src/api/'),
            '@appComponents': path.resolve(__dirname, 'src/components/'),
            '@utility': path.resolve(__dirname, 'src/utility/'),
            // "@styles": path.resolve(__dirname, "src/styles/")

        },
    },
};
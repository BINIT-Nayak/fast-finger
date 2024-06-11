export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
        "^.+\\.tsx?$": "ts-jest" ,
        "^.+\\.(js|jsx)$": "babel-jest",
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "^@app/(.*)$": "<rootDir>/$1",
    },
}

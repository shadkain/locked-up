const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: 'development',
    entry: './internal/src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /[\.tsx?$]/,
                use: 'awesome-typescript-loader',
                exclude: '/node_modules/'
            },
        ],
    },   
    resolve: {
        extensions: [ '.ts', '.js', ],
        plugins: [
            new TsConfigPathsPlugin(),
        ]
    },
    externals: {
        'pixi.js': 'PIXI',
    }
}
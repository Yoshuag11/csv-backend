const presets = [ 
    [
        '@babel/env',
        {
            targets: {
                node: 10
            },
            useBuiltIns: 'usage',
            corejs: "3.0.1"
        },
    ] 
];
const plugins = [ "@babel/plugin-transform-arrow-functions" ];

if (process.env["ENV"] === "prod") {
//   plugins.push(...);
}

module.exports = { presets, plugins };
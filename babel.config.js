module.exports = {
    presets: [
        ['@babel/preset-env'],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {regenerator: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        ['@babel/plugin-transform-react-jsx', { pragma:'h' }]
    ]
};

module.exports = {
	renderer: {
		entry: ["@babel/polyfill", './src/renderer/javascripts/index.js'],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react', '@babel/preset-env']
						}
					}
				},
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react', '@babel/preset-env']
						}
					}
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'babel-loader'
						},
						{
							loader: 'react-svg-loader'
						}
					]
				}
			]
		}
	},
	preload: {
		entry: './src/preload/index.js'
	},
	main: {
		entry: './src/main/index.js'
	}
}

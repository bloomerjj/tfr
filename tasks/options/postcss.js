module.exports = {
	dev: {
		options: {
	  		map: true,
	  		processors: [
				require('pixrem')(), // add fallbacks for rem units
				require('autoprefixer')({browsers: 'last 5 versions, ie >= 11'}), // add vendor prefixes
				require('postcss-flexbugs-fixes')
	  		]
		},
		dist: {
		  	src: 'dist/css/*.css'
		}
	},
	prod: {
		options: {
	  		map: false,
	  		processors: [
				require('pixrem')(), // add fallbacks for rem units
				require('autoprefixer')({browsers: 'last 5 versions, ie >= 11'}), // add vendor prefixes
				require('postcss-flexbugs-fixes'),
				// require('cssnano')({safe: true}) // minify the result
	  		]
		},
		dist: {
		  	src: 'dist/css/*.css'
		}
	}
};
module.exports = function(grunt){
	grunt.initConfig({
		express:{
			dev: {
				options:{
					script: './bin/www'
				}
			}
		},
		concat:{
			options:{
				separator: ';'
			},
			main:{
				src: [
						'./public/javascripts/app.js', 
						'./public/javascripts/main/**/*.js',
						'./public/javascripts/main/*.js'
					],
				dest: './public/javascripts/app.concat.js'
			},
			admin:{
				src: [
						'./public/javascripts/app.admin.js', 
						'./public/javascripts/admin/**/*.js',
						'./public/javascripts/admin/*.js'
					],
				dest: './public/javascripts/app.admin.concat.js'
			}
		},
		uglify:{
			main:{
				options:{
					mangle: false
				},
				files:{
					'./public/javascripts/app.min.js': ['./public/javascripts/app.concat.js']
				}
			},
			admin:{
				options:{
					mangle: false
				},
				files:{
					'./public/javascripts/app.admin.min.js': ['./public/javascripts/app.admin.concat.js']
				}
			}
		},
		watch:{
			options:{
				livereload: true
			},
			express:{
				files: [
					'./app.js', './server/routes/*.js', './server/config/*.js', 
					'./api/**/*.js', './api/*.js'
				],
				tasks:['express:dev'],
				options:{
					spawn: false
				}
			},
			public:{
				files: [
					'./server/views/*.jade', './server/views/**/*.jade', 
					'./public/stylesheets/style.css'
				]
			},
			angularMain:{
				files:[
					'./public/javascripts/app.js',
					'./public/javascripts/main/**/*.js',
					'./public/javascripts/main/*.js'
				],
				tasks:['concat:main', 'uglify:main']
			},
			angularAdmin:{
				files:[
					'./public/javascripts/app.admin.js',
					'./public/javascripts/admin/**/*.js',
					'./public/javascripts/admin/*.js'
				],
				tasks:['concat:admin', 'uglify:admin']
			}


		}
		
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['express:dev', 'watch']);
	grunt.registerTask('build', ['concat:main', 'concat:admin', 'uglify:main', 'uglify:admin']);

	grunt.registerTask('jshint', ['jshint']);
};
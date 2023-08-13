// export default () => ({ 
// 	database: {
// 		type: 'mysql',
// 		host: process.env.DB_HOST,
// 		port: parseInt(process.env.DB_PORT),
// 		username: process.env.DB_USERNAME,
// 		password: process.env.DB_PASSWORD,
// 		database: process.env.DB_NAME
// 	}, 
// 	server: { 
// 		port: parseInt(process.env.PORT)
// 	}
// })



export const config = () => ({
	port: process.env.PORT,
	database: {
		type: 'mysql',
		host: 'us-cdbr-east-06.cleardb.net',
		port: 3306, 
		username: 'bce8ef11b95d3a',
		password: 'c3fa51f1',
		database: 'heroku_3df4ab91447196b',
		
		synchronize: false, 
		logging: false, 
		entities: ['dist/**/*.entity.js']

		// host: process.env.DB_HOST,
		// port: parseInt(process.env.DB_PORT),
		// username: process.env.DB_USERNAME,
		// password: process.env.DB_PASSWORD,
		// database: process.env.DB_NAME,
		// host: 'us-cdbr-east-06.cleardb.net',
		// username:'bce8ef11b95d3a',
		// password:'c3fa51f1',
		// database:'heroku_3df4ab91447196b',
		
	}
});
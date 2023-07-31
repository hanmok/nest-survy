export default () => ({ 
	database: {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	}, 
	server: { 
		port: parseInt(process.env.PORT)
	}
})
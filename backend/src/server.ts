import 'dotenv/config'
import app from './app.js';
import { prisma } from './DB/prisma.js';

const PORT = process.env.PORT || 8080;

const connnectDB = async () => {
	try {
		await prisma.$connect();
		console.log("Database connected successfully");

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1);
	}
};

connnectDB();

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit(0);
});
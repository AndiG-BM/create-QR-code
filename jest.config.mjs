export default {
	transform: {
		"^.+\\.mjs$": "babel-jest",
	},
	transformIgnorePatterns: [],
	setupFilesAfterEnv: ["esm"],
	testEnvironment: "node", // Use 'node' for Node.js environment
	testMatch: ["<rootDir>/*.test.mjs"],
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true, // Adjust the path to your test file
};

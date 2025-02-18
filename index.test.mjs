import fs from "node:fs";
import { generateQRCode } from "./index.mjs";
import { jest } from "@jest/globals";

jest.mock("node:fs");

describe("generateQRCode", () => {
	const url = "http://example.com";
	const outputFile = "qrcode.png";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should generate a QR code and save it to a file", async () => {
		const mockWriteStream = {
			on: jest.fn().mockImplementation((event, callback) => {
				if (event === "finish") {
					callback();
				}
				return mockWriteStream;
			}),
			end: jest.fn(),
		};

		fs.createWriteStream.mockReturnValue(mockWriteStream);
		fs.writeFile.mockImplementation((path, data, callback) => callback(null));

		await generateQRCode(url);

		expect(fs.createWriteStream).toHaveBeenCalledWith(outputFile);
		expect(fs.writeFile).toHaveBeenCalledWith("urls.txt", url, expect.any(Function));

		// Ensure the write stream is closed
		mockWriteStream.end();
	});

	it("should log an error if QR code generation fails", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		const error = new Error("Failed to generate QR code");

		const mockWriteStream = {
			on: jest.fn().mockImplementation((event, callback) => {
				if (event === "error") {
					callback(error);
				}
				return mockWriteStream;
			}),
			end: jest.fn(),
		};

		fs.createWriteStream.mockReturnValue(mockWriteStream);

		await expect(generateQRCode(url)).rejects.toThrow(error);

		expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to generate QR code", error);

		consoleErrorSpy.mockRestore();

		// Ensure the write stream is closed
		mockWriteStream.end();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});

/**
 * Resolve --input / --output paths for exam-forge exporters.
 * Relative paths are resolved against process.cwd() first, then __dirname.
 */
const fs = require('fs');
const path = require('path');

function resolveInputPath(inputFile, scriptDir) {
	if (path.isAbsolute(inputFile)) {
		return inputFile;
	}
	const fromCwd = path.resolve(process.cwd(), inputFile);
	if (fs.existsSync(fromCwd)) {
		return fromCwd;
	}
	return path.join(scriptDir, inputFile);
}

function resolveOutputPath(outputFile, scriptDir) {
	if (path.isAbsolute(outputFile)) {
		return outputFile;
	}
	return path.resolve(process.cwd(), outputFile);
}

module.exports = { resolveInputPath, resolveOutputPath };

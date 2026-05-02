// Copyright (C) 2017-2023 Smart code 203358507

const fs = require('fs');

const COPYRIGHT_HEADER = /^(?:\/\/ Copyright \(C\) 2017-\d{4} Smart code 203358507.*|\/\* Copyright \(C\) 2017-\d{4} Smart code 203358507 \*\/)/;

async function walkFiles(directory, extension, acc = []) {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = `${directory}/${entry.name}`;

        if (entry.isDirectory()) {
            await walkFiles(fullPath, extension, acc);
        } else if (entry.name.endsWith(extension)) {
            acc.push(fullPath);
        }
    }

    return acc;
}

describe('copyright', () => {
    test('js', async () => {
        const files = await walkFiles('src', '.js');
        for (const fullPath of files) {
            const content = await fs.promises.readFile(fullPath, 'utf8');
            expect(content).toEqual(expect.stringMatching(COPYRIGHT_HEADER));
        }
    });
    
    test('css', async () => {
        const files = await walkFiles('src', '.css');
        for (const fullPath of files) {
            const content = await fs.promises.readFile(fullPath, 'utf8');
            expect(content).toEqual(expect.stringMatching(COPYRIGHT_HEADER));
        }
    });
});

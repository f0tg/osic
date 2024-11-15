import crypto from 'crypto';

const hexagrams = require('../assets/hexagrams.json');
const url = 'https://www.random.org/integers/?num=18&min=0&max=1&col=1&base=10&format=plain&rnd=new';

export async function generateHexagram() {
    let coinTosses;

    try {
        const response = await fetch(url);
        const data = await response.text();
        //const coinTosses = data ? data.trim().split('\n').map(num => parseInt(num, 10)) : generateRandomBitsFallback();
        coinTosses = data.trim().split('\n').map(num => parseInt(num, 10));
    } catch (error) {
        console.error('Error fetching from random.org:', error.message);
        coinTosses = generateRandomBitsFallback();
        
    }
        // Grouping the coin tosses into sets of three
        const groupedTosses = [];
        for (let i = 0; i < coinTosses.length; i += 3) {
            groupedTosses.push(coinTosses.slice(i, i + 3));
        }

        // Determine the lines 
        const hexagramLines = groupedTosses.map(toss => {
            const sum = toss.reduce((acc, curr) => acc + curr, 0);
            switch (sum) {
                case 0: return 'Changing yin'; // ---x--- 
                case 1: return 'Non-changing yin'; // --- ---
                case 2: return 'Non-changing yang'; // -------
                case 3: return 'Changing yang'; // ---o---
                default: throw new Error('Unexpected sum of coin tosses');
            }
        });

        // Calculate the new hexagram by applying changes
        const newHexagramLines = hexagramLines.map(line => {
            if (line === 'Changing yin') return 'Non-changing yang';
            if (line === 'Changing yang') return 'Non-changing yin';
            return line; // No change for non-changing lines
        });

        const originalBinaryString = linesToBinaryString(hexagramLines);
        const transformedBinaryString = linesToBinaryString(newHexagramLines);

        const originalHexagramInfo = getHexagramInfo(originalBinaryString);
        const transformedHexagramInfo = getHexagramInfo(transformedBinaryString);

        // Prepare the response
        const responseObj = {
            originalHexagram: hexagramLines,
            transformedHexagram: newHexagramLines
        };

        // Add hexagram info to the response
        responseObj.originalHexagramInfo = originalHexagramInfo;
        responseObj.transformedHexagramInfo = transformedHexagramInfo;

        return responseObj;
    
}

// Fallback to generating random bits if fetch fails
function generateRandomBitsFallback() {
    console.log('Falling back to generating random bits using crypto module');
    const randomBytes = crypto.randomBytes(18);
    console.log('bit array:', Array.from(randomBytes).flatMap(byte => byte & 1));
    return Array.from(randomBytes).flatMap(byte => byte & 1);
}

// Convert lines to binary string to match the hexagrams.json keys
function linesToBinaryString(lines) {
    return lines.map(line => {
        switch(line) {
            case 'Non-changing yin': return '0';
            case 'Non-changing yang': return '1';
            case 'Changing yin': return '0';
            case 'Changing yang': return '1';
            default: throw new Error('Unexpected line type');
        }
    }).join('');
}

// Get hexagram info from hexagrams.json
function getHexagramInfo(binaryString) {
    const key = `0b${binaryString}`;
    const hexagram = hexagrams[key];
    if (!hexagram) {
        throw new Error(`Hexagram not found for key: ${key}`);
    }
    return hexagram;
}


import { generateHexagram } from './generateHexagram.js';
import { renderAbout } from './about.js';
import yang from '../assets/images/yang.svg';
import yin from '../assets/images/yin.svg';

const generateButton = document.getElementById('generateHexagram');
const infoButton = document.getElementById('infoBtn');

generateButton.addEventListener('click', async () => {
  //const hexagram = await generateHexagram();
  //console.log(hexagram);
    const originalHexagram = document.getElementById('originalHexagram');
    const transformedHexagram = document.getElementById('transformedHexagram');

    originalHexagram.style.opacity = 0;
    transformedHexagram.style.opacity = 0;

    setTimeout(async () => {
        const data = await generateHexagram();
        //const data = await response.json();

        // Before rendering, reserve space for the lines to prevent layout shift
        const originalLinesDiv = document.getElementById('originalLines');
        const transformedLinesDiv = document.getElementById('transformedLines');

        originalLinesDiv.style.height = '132px';
        originalLinesDiv.style.width = '100px';
        transformedLinesDiv.style.height = '132px';
        transformedLinesDiv.style.width = '100px';

        // Render the hexagram lines
        renderHexagramLines(data.originalHexagram, originalLinesDiv, data.originalHexagramInfo);

        const originalHexagramInfo = data.originalHexagramInfo;
        const originalHexLink = `https://www.jamesdekorne.com/GBCh/hex${originalHexagramInfo.kingwen}.htm`;
        const originalTextDiv = document.getElementById('originalText');

        originalTextDiv.innerHTML = `
            <h2>Cast hexagram</h2>
            <h3>
                ${originalHexagramInfo.kingwen} -
                ${originalHexagramInfo.name.chinese} -
                ${originalHexagramInfo.name.english}
            </h3>
            <p><i>${originalHexagramInfo.judgement.replace(/\n/g, '<br>')}</i></p>
            <p>${originalHexagramInfo.images.replace(/\n/g, '<br>')}</p>
            <a href="${originalHexLink}" target="_blank">read more...</a>
        `;

        // Repeat the process for the transformed hexagram
        renderHexagramLines(data.transformedHexagram, transformedLinesDiv, data.transformedHexagramInfo);
        
        const transformedHexagramInfo = data.transformedHexagramInfo;
        const transformedHexLink = `https://www.jamesdekorne.com/GBCh/hex${transformedHexagramInfo.kingwen}.htm`;
        const transformedTextDiv = document.getElementById('transformedText');
        transformedTextDiv.innerHTML = `
            <h2>Transformed hexagram</h2>
            <h3>
                ${transformedHexagramInfo.kingwen} -
                ${transformedHexagramInfo.name.chinese} -
                ${transformedHexagramInfo.name.english}
            </h3>
            <p><i>${transformedHexagramInfo.judgement.replace(/\n/g, '<br>')}</i></p>
            <p>${transformedHexagramInfo.images.replace(/\n/g, '<br>')}</p>
            <a href="${transformedHexLink}" target="_blank">read more...</a>
        `;

        originalHexagram.style.opacity = 1;
        transformedHexagram.style.opacity = 1;

    }, 500);

});

function renderHexagramLines(lines, container, hexagramInfo) {
    container.innerHTML = '';

    lines.forEach((line, index) => {
        const originalIndex = lines.length - index - 1;
        const lineMeaning = hexagramInfo.lines[originalIndex].meaning;

        const svgContainer = document.createElement('div');
        svgContainer.classList.add('line-svg');

        const isYang = line.includes('yang');
        const isChanging = line.includes('Changing');
        const svgPath = isYang ? yang : yin;
        svgContainer.innerHTML = `<object type="image/svg+xml" data="${svgPath}" class="hex-line-svg"></object>`;
        container.appendChild(svgContainer);

        if (isChanging) {
            svgContainer.classList.add('changing');
        }

        // Tooltip setup
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = `Line ${originalIndex + 1}: ${lineMeaning.replace(/\n/g, '<br>')}`;
        
        svgContainer.appendChild(tooltip); // Append the tooltip but keep it hidden initially

        svgContainer.addEventListener('mouseenter', () => {
            tooltip.classList.add('visible');
            // Get the bounding rectangle of the svgContainer
            const rect = svgContainer.getBoundingClientRect();
            
            tooltip.style.top = rect.top + window.scrollY + 'px'; // Add window's scrollY to account for scrolling
            tooltip.style.left = rect.right + window.scrollX + 10 + 'px'; // Add window's scrollX to account for scrolling
        });
        
        svgContainer.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible'); // Hide tooltip when mouse leaves
        });
    });

    setTimeout(() => {
        container.querySelectorAll('.line-svg').forEach(svg => {
            svg.style.opacity = 1;
        });
    }, 500);
}

infoButton.addEventListener('click', renderAbout);

// --------------------------------------------------------------------------------

// rad particle background visualizer (thx Claude!):

// Create canvas element and add it as background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.body.firstChild);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';

// Set actual canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particle system
const particles = Array(50).fill().map(() => new Particle());

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();
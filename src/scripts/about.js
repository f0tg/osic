/**
 * This file renders the information modal component.
 * The text is hardcoded here to avoid CORB troubles.
 */

const aboutContent = `# one shot i ching 🎯

_Simple webapp to facilitate I Ching readings using true random numbers_

## about
This is an instance of the I Ching, an ancient Chinese classic used in divination and self-examination for thousands of years. 
This application can be used either as a means to quickly cast I Ching readings, or just familiarizing oneself with the contents of the Book of Changes.

A reading is cast by pressing the _generate hexagram_ -button. As the hexagrams (cast and changing) are displayed, you can read the comments on each
individual line by hovering over them (or tapping them if on mobile). At the bottom of both descriptions is a link to James DeKorne's website for more detailed exposition of the meaning of the cast hexagram.

This version of the app does not store the readings.

## logic 
The app is based on a variation of the coin tossing method for generating hexagrams. In this method, one throws three coins six times; each throw constitutes a line which is either _yin_ or _yang_, and these lines form one of the 64 hexagrams whose significances are described in the Book of Changes. 

Instead of casting each line individually, this app makes a call to random.org for 18 randomly generated bits (0s and 1s; 0s for yin, 1s for yang), and divides the 18 bits into an array of 6 bit arrays of length 3, each representing a line of the hexagram. The hexagram constituted by these arrays is rendered to the page; if a line is changing, it becomes its opposite in the transformed hexagram, denoted by a red line in the cast hexagram. 

random.org generates random numbers using atmospheric noise. In the case that random.org is down, the app generates the reading using a cryptographic pseudorandom number generator.

## why use it?

The I Ching is something hard to pin down. 
Most guides on using it tell you to have some specific issue in mind you'd like to address;
 and doing this certainly grants you new insight into the matter. But I've found it can also be very fruitful even when you have nothing in particular in your mind: often I find it's only when I have nothing specific of which to inquire that the oracle grants me an insight that is relevant to something that has been bothering me. Had I had something too premeditated on my mind, I would already know what I am inquiring about, rendering it futile to consult the I Ching. This is one motivation behind this instance of the I Ching; to quickly let the oracle inform you about something you might have been overlooking consciously.
`;


function openModal() {
    const modal = document.getElementById('aboutModal');
    const contentDiv = document.getElementById('markdownContent');

    contentDiv.innerHTML = marked.parse(aboutContent);
    
    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
}

// Make sure marked is loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    if (typeof marked === 'undefined') {
        console.error('Marked library not loaded!');
        return;
    }
    
    marked.setOptions({
        silent: false,  
        pedantic: false,
        gfm: true
    });
});

// Create modal HTML structure
const modalHTML = `
<div id="aboutModal" class="modal" style="display: none;">
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <div id="markdownContent"></div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

// Add styles
const styles = `
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-content {
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  margin: 20px;
  color: #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #fff;
}

/* Style the about button */
#infoBtn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: none;
  border: 1px solid #666;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

#infoBtn:hover {
  border-color: #fff;
  color: #fff;
}

/* Markdown content styles */
#markdownContent {
  line-height: 1.6;
}

#markdownContent h1, 
#markdownContent h2 {
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

#markdownContent code {
  background: #2a2a2a;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

#markdownContent pre {
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Modal controls
const modal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-button');
const infoBtn = document.getElementById('infoBtn');

function closeModal() {
  modal.style.opacity = '0';
  setTimeout(() => modal.style.display = 'none', 300);
}

infoBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
// IT Terms Glossary Data
const itTerms = [
    { id: 0, term: "CPU", definition: "Central Processing Unit - The brain of the computer", photo: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop" },
    { id: 1, term: "RAM", definition: "Random Access Memory - Temporary storage for running programs", photo: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop" },
    { id: 2, term: "Hard Drive", definition: "Permanent storage device for files and programs", photo: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop" },
    { id: 3, term: "Motherboard", definition: "Main circuit board connecting all components", photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop" },
    { id: 4, term: "GPU", definition: "Graphics Processing Unit - Handles visual rendering", photo: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop" },
    { id: 5, term: "SSD", definition: "Solid State Drive - Fast storage device", photo: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop" },
    { id: 6, term: "USB", definition: "Universal Serial Bus - Connection port", photo: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop" },
    { id: 7, term: "WiFi", definition: "Wireless network connection technology", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
    { id: 8, term: "Browser", definition: "Software to access the internet", photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
    { id: 9, term: "Firewall", definition: "Security system protecting networks", photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop" },
    { id: 10, term: "Virus", definition: "Malicious software that harms computers", photo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop" },
    { id: 11, term: "Software", definition: "Programs and applications for computers", photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
    { id: 12, term: "Hardware", definition: "Physical components of a computer", photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop" },
    { id: 13, term: "Operating System", definition: "Software that manages computer resources", photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
    { id: 14, term: "Cloud", definition: "Internet-based storage and services", photo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop" },
    { id: 15, term: "Database", definition: "Organized collection of data", photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop" },
    { id: 16, term: "Server", definition: "Computer that provides services to other computers", photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop" },
    { id: 17, term: "Router", definition: "Device that directs network traffic", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
    { id: 18, term: "IP Address", definition: "Unique identifier for devices on a network", photo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop" },
    { id: 19, term: "Password", definition: "Secret code for authentication", photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop" },
    { id: 20, term: "Backup", definition: "Copy of data for safety", photo: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop" },
    { id: 21, term: "Download", definition: "Transferring files from internet to computer", photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
    { id: 22, term: "Upload", definition: "Transferring files from computer to internet", photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
    { id: 23, term: "Email", definition: "Electronic mail messaging system", photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop" }
];

// Get DOM elements
const termTitleElement = document.getElementById('termTitle');
const termDescriptionElement = document.getElementById('termDescription');
const termPhotoElement = document.getElementById('termPhoto');
const voiceButton = document.getElementById('voiceButton');

// Text-to-Speech functionality
let isSpeaking = false;
let currentUtterance = null;

function speakText(text) {
    // Stop any current speech
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        voiceButton.classList.remove('playing');
        return;
    }

    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to use a natural-sounding English voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.localService === false
        ) || voices.find(voice => voice.lang.startsWith('en'));
        
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        // Event handlers
        utterance.onstart = () => {
            isSpeaking = true;
            voiceButton.classList.add('playing');
        };
        
        utterance.onend = () => {
            isSpeaking = false;
            voiceButton.classList.remove('playing');
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            isSpeaking = false;
            voiceButton.classList.remove('playing');
        };
        
        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Your browser does not support text-to-speech. Please use a modern browser like Chrome, Firefox, or Edge.');
    }
}

// Load voices when available (some browsers need this)
if ('speechSynthesis' in window) {
    // Chrome loads voices asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
        // Voices are now loaded
    };
}

// Voice button click handler (will be initialized in DOMContentLoaded)
function initVoiceButton() {
    if (voiceButton) {
        voiceButton.addEventListener('click', function() {
            const title = termTitleElement.textContent;
            const description = termDescriptionElement.textContent;
            
            // Don't read if it's the default placeholder text
            if (title === 'Select a term' || description === 'Click on a term above to see its definition') {
                return;
            }
            
            // Combine title and description
            const textToSpeak = `${title}. ${description}`;
            speakText(textToSpeak);
        });
    }
}

// Function to update the template widget
function updateTemplate(termId) {
    const term = itTerms.find(t => t.id === termId);
    
    if (term) {
        // Stop any ongoing speech when switching terms
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            voiceButton.classList.remove('playing');
        }
        
        termTitleElement.textContent = term.term;
        termDescriptionElement.textContent = term.definition;
        termPhotoElement.src = term.photo;
        termPhotoElement.alt = `${term.term} illustration`;
    }
}

// Function to create glossary cards
function createGlossary() {
    const glossaryGrid = document.getElementById('glossaryGrid');
    
    itTerms.forEach(term => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        card.setAttribute('data-id', term.id);
        card.innerHTML = `
            <h3>${term.term}</h3>
        `;
        
        // Add click event listener
        card.addEventListener('click', function() {
            // Remove active class from all cards
            document.querySelectorAll('.glossary-card').forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            // Update template
            const termId = parseInt(this.getAttribute('data-id'));
            updateTemplate(termId);
        });
        
        glossaryGrid.appendChild(card);
    });
}

// Initialize dropdowns
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown-header');
        
        header.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        });
    });
}

// Initialize glossary when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGlossary();
    initDropdowns();
    initVoiceButton();
    // Initialize with first term
    if (itTerms.length > 0) {
        updateTemplate(0);
        document.querySelectorAll('.glossary-card')[0].classList.add('active');
    }
});

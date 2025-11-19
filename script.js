// IT Terms Glossary Data
const itTerms = [
    { id: 0, term: "CPU", definition: "Central Processing Unit - The brain of the computer", photo: "img/imgglos/cpu.jpg" },
    { id: 1, term: "Hardware", definition: "The physical parts of a computer, like the keyboard, monitor, and hard drive. These components work together to process and store information and allow users to interact with the system.", photo: "img/imgglos/hardware.jpg" },
    { id: 2, term: "Software", definition: "The programs and operating systems that tell a computer what to do. Software controls the hardware and enables users to perform specific tasks such as writing documents, browsing the web, or playing games.", photo: "img/imgglos/software.jpg" },
    { id: 3, term: "Internet", definition: "A global network that connects millions of computers for sharing information. It allows people to communicate, access data, and use online services anywhere in the world.", photo: "img/imgglos/internet.png" },
    { id: 4, term: "Website", definition: "A collection of web pages found under one domain name on the internet. Websites can provide information, entertainment, services, or allow users to interact through online forms and tools.", photo: "img/imgglos/website.jpg" },
    { id: 5, term: "Browser", definition: "A program used to view websites (e.g., Chrome, Safari, Firefox). It interprets code from web pages and displays it as text, images, and videos that users can easily navigate.", photo: "img/imgglos/browser.jpg" },
    { id: 6, term: "Download", definition: "To copy data or files from the internet or another computer to your own device. This allows users to access and use the files offline or at a later time.", photo: "img/imgglos/download.jpg" },
    { id: 7, term: "File", definition: "A collection of information saved on a computer (e.g., document, picture, video). Files are used to store data that can be opened, edited, or shared by different programs.", photo: "img/imgglos/file.jpg" },
    { id: 8, term: "Network", definition: "A group of connected computers that share information and resources. Networks can be as small as two connected devices or as large as the global internet.", photo: "img/imgglos/network.jpg" },
    { id: 9, term: "Cloud", definition: "Online storage that lets you save files and access them from anywhere. It allows users to store data on remote servers instead of on their personal devices, improving accessibility and security.", photo: "img/imgglos/cloud.jpg" },
    { id: 10, term: "Backup", definition: "A copy of important data made to prevent loss if something goes wrong. Backups can be stored on external drives or in the cloud to recover files after accidental deletion or system failure.", photo: "img/imgglos/backup.jpeg" },
    { id: 11, term: "Virus", definition: "A harmful program that can spread between computers and cause damage. It can delete files, slow down systems, or steal personal information, often spreading through email or downloads.", photo: "img/imgglos/virus.jpg" },
    { id: 12, term: "VPN", definition: "Virtual Private Network – A secure connection that encrypts data transmitted over the internet, providing privacy and anonymity. It is commonly used to protect online activity and access restricted content safely.", photo: "img/imgglos/vpn.png" },
    { id: 13, term: "LAN", definition: "Local Area Network – A network that connects computers within a limited area, such as a home, school, or office building. LANs allow devices to share files, printers, and internet connections quickly and efficiently.", photo: "img/imgglos/LAN.jpg" },
    { id: 14, term: "Firewall", definition: "A network security device or software that monitors and controls incoming and outgoing network traffic based on security rules. It acts as a barrier between trusted and untrusted networks to prevent unauthorized access.", photo: "img/imgglos/firewall.png" },
    { id: 15, term: "AI", definition: "Artificial Intelligence – The simulation of human intelligence in machines designed to think and learn like humans. AI systems can analyze data, recognize patterns, and make decisions with minimal human input.", photo: "img/imgglos/Ai.jpg" },
    { id: 16, term: "Open Source", definition: "Software whose source code is freely available for anyone to inspect, modify, and distribute. This promotes collaboration among developers and encourages innovation and transparency.", photo: "img/imgglos/opensource.jpg" },
    { id: 17, term: "Virtualization", definition: "The creation of a virtual version of something, such as a server, storage device, or network resource. It allows multiple systems to run on a single physical machine, improving efficiency and reducing costs.", photo: "img/imgglos/virtualization.png" },
    { id: 18, term: "Phishing", definition: "A cyberattack technique where attackers impersonate legitimate entities to trick users into revealing sensitive information. These scams often appear as fake emails, messages, or websites that look authentic.", photo: "img/imgglos/phishing.jpeg" },
    { id: 19, term: "Upload", definition: "To send data or files from your device to the internet or another computer. Uploading is used when sharing files, posting photos, or transferring documents to online platforms or cloud storage.", photo: "img/imgglos/upload.png" }
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

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Get all navigation elements
    const navLinks = Array.from(document.querySelectorAll('nav a'));
    const sections = document.querySelectorAll('.page-section');
    let currentSection = document.getElementById('about');
    let currentIndex = 0; // Track current section index
    
    // Create map of section IDs to their order in navigation
    const sectionOrder = navLinks.map(link => link.getAttribute('href'));
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const targetIndex = sectionOrder.indexOf(targetId);
            
            // Don't animate if clicking the same link
            if (this.classList.contains('active')) return;
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Determine animation direction based on navigation order
            let exitDirection, enterDirection;
            
            if (targetIndex > currentIndex) {
                // Moving forward in navigation (right to left)
                exitDirection = 'exit-left';
                enterDirection = 'enter-right';
            } else {
                // Moving backward in navigation (left to right)
                exitDirection = 'exit-right';
                enterDirection = 'enter-left';
            }
            
            // Set up exit animation for current section
            currentSection.classList.add(exitDirection);
            currentSection.classList.remove('active-section');
            
            // Set up enter animation for new section
            targetSection.style.display = 'block';
            targetSection.classList.add(enterDirection);
            
            // Force reflow to trigger animations
            void targetSection.offsetWidth;
            
            // Start animations
            setTimeout(() => {
                currentSection.style.display = 'none';
                currentSection.classList.remove(exitDirection);
                
                targetSection.classList.remove(enterDirection);
                targetSection.classList.add('active-section');
                
                // Update current section and index
                currentSection = targetSection;
                currentIndex = targetIndex;
                
                // Smooth scroll to top of section
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }, 50);
        });
    });
    
    // Set default active section (About Me)
    const defaultLink = document.querySelector('nav a[href="#about"]');
    defaultLink.classList.add('active');
    document.getElementById('about').style.display = 'block';
    setTimeout(() => {
        document.getElementById('about').classList.add('active-section');
    }, 100);
    
    // Initialize current index
    currentIndex = sectionOrder.indexOf('#about');
    
    // [Keep your existing form submission code here]
});
// In your navigation click handler, add this at the beginning:
header.style.pointerEvents = 'none'; // Disable interaction during transition
footer.style.pointerEvents = 'none';

// And this in the setTimeout where you complete the animations:
header.style.pointerEvents = 'auto'; // Re-enable after transition
footer.style.pointerEvents = 'auto';
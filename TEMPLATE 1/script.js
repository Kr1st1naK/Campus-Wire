document.addEventListener("DOMContentLoaded", ()=>{
    // Sidebar functions
    function showSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    }

    function closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }

    // Function to handle the typewriting effect
    const typewriterEffect = (element, textArray, delay = 100) => {
        let textIndex = 0;
        let charIndex = 0;
        const type = () => {
            if (charIndex < textArray[textIndex].length) {
                element.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, delay);
            } else {
                setTimeout(() => {
                    element.textContent = "";
                    charIndex = 0;
                    textIndex = (textIndex + 1) % textArray.length;
                    type();
                }, 1000); 
            }
        };
        type();
    };

    // Start the typewriting effect as soon as the page loads
    const typewriterElement = document.getElementById("typewriter");
    const words = ["Stay Connected", "Stay Informed"];
    typewriterEffect(typewriterElement, words);
});
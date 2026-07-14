// ============================
// Typing Animation
// ============================

const text = "Aspiring AI Engineer 🚀";
let index = 0;
const title = document.querySelector(".hero-text h3");

title.innerHTML = "";

function typeWriter() {
    if (index < text.length) {
        title.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();


// ============================
// Scroll Reveal Animation
// ============================

const elements = document.querySelectorAll(
    "section, .project-card, .skills div"
);

function reveal() {

    elements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }

    });

}

window.addEventListener("scroll", reveal);
reveal();


// ============================
// Navbar Shadow Effect
// ============================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 5px 20px rgba(56,189,248,0.2)";

    }

    else {

        navbar.style.boxShadow = "none";

    }

});


// ============================
// Toast Notification
// ============================

function showToast(message, success = true) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.padding = "15px 22px";
        toast.style.borderRadius = "10px";
        toast.style.fontWeight = "bold";
        toast.style.color = "#fff";
        toast.style.zIndex = "9999";
        toast.style.transition = "0.3s";
        toast.style.boxShadow = "0 5px 20px rgba(0,0,0,.3)";

        document.body.appendChild(toast);

    }

    toast.style.background = success ? "#16a34a" : "#dc2626";

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}



// ============================
// Contact Form (Web3Forms)
// ============================

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData(form);

    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {

            showToast(
                "✅ Thank you! Your message has been sent successfully."
            );

            form.reset();

        }

        else {

            showToast(
                "❌ Failed to send message.",
                false
            );

            console.log(result);

        }

    }

    catch (error) {

        console.log(error);

        showToast(
            "❌ Network error. Please try again.",
            false
        );

    }

});


console.log("Portfolio Loaded Successfully 🚀");
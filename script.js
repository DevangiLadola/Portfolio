$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Toggle the navbar visibility on menu icon click
  $('.menu_icon').click(function () {
    $('.navbar').toggleClass('show');
  });

  // Smooth scroll on header link click
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });
  ScrollReveal().reveal(".skills-content", {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
    delay: 200,
  });

  // Contact form to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_URL/exec'; // Correct your deployed script URL here
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  // Form submission event listener
  form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        console.log('Response status:', response.status); // Check status
        return response.json(); // Parse JSON response
      })
      .then(data => {
        console.log('Response data:', data); // Log data for debugging
        if (data.result === "success") {
          msg.innerHTML = "Message sent successfully!";
        } else {
          msg.innerHTML = "Failed to send the message.";
        }
        msg.style.display = "block"; // Show message
        setTimeout(function () {
          msg.style.display = "none"; // Hide message after 5 seconds
        }, 5000);
        form.reset(); // Reset the form after submission
      })
      .catch(error => {
        console.error('Error:', error); // Log errors
        msg.innerHTML = "Message failed to send. Please try again.";
        msg.style.display = "block"; // Show error message
        setTimeout(function () {
          msg.style.display = "none"; // Hide message after 5 seconds
        }, 5000);
      });
  });
  
  // Update active section based on scroll position
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function () {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});
function toggleMenu() {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('show'); // Toggle the 'show' class to show/hide the menu
}
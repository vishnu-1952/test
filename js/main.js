
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skillsContent = select('.skillbar');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '90%',
      handler: function (direction) {
        let progress = select('.skillbar .skillbar-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });



})()


/* Feedback Form */

$(window).load(function () {
  $(".nps.floatingActionButton").click(function () {
    $("#name-err-1").css("display", "none")
    $("#email-err-1").css("display", "none")
    $("#msg-err-1").css("display", "none")
    $("#name-1").css("border", "none")
    $("#email-1").css("border", "none")
    $("#message-1").css("border", "none")
    $("#email-1").val("")
    $("#name-1").val("")
    $("#message-1").val("")
    $(".nps.formContainer").addClass("transitionIn").removeClass("transitionOut");

    $(this).removeClass("thankYou")

  });

  $(".nps.close").click(function () {

    $(".nps.formContainer").addClass("transitionOut").removeClass("transitionIn");
    $(".nps.floatingActionButton").text("Feedback").removeClass("thankYou");
  });

  $(".nps.button").click(function () {
    var emailFlag = emailValidation();
    var nameFlag = nameValidation();
    var msgFlag = msgValidation();


    if (emailFlag && nameFlag && msgFlag) {
      setTimeout(function () {
        $(".nps.floatingActionButton").fadeOut();
      }, 3000);
      $(".nps.floatingActionButton").addClass("thankYou").text("Thank you ❤️");
      $(".nps.formContainer").addClass("transitionOut").removeClass("transitionIn");
    }
  });
});

/*Skill bar */
jQuery(document).ready(function () {
  jQuery('.skillbar').each(function () {
    jQuery(this).find('.skillbar-bar').animate({
      width: jQuery(this).attr('data-percent')
    }, 6000);
  });
});

// contact form
function emailValidationJS(param) {
  const emailInput = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    emailInput.style.border = "1px solid red";
    document.getElementById("email-err").style.display = "flex";
    return false;
  } else {
    emailInput.style.border = "1px solid #ced4da";
    document.getElementById("email-err").style.display = "none";
    return true;
  }
}

function nameValidationJS(param) {
  const FnameInput = document.getElementById("name");
  const FnamePattern = /^[a-zA-Z]+$/;

  if (!FnamePattern.test(FnameInput.value)) {
    FnameInput.style.border = "1px solid red";
    document.getElementById("name-err").style.display = "flex";
    return false;
  } else {
    FnameInput.style.border = "1px solid #ced4da";
    document.getElementById("name-err").style.display = "none";
    return true;
  }
}
function msgValidationJS(param) {
  const msgInput = document.getElementById("message");
  const msgPattern = /^[a-zA-Z0-9]+$/;

  if (!msgPattern.test(msgInput.value)) {
    msgInput.style.border = "1px solid red";
    document.getElementById("msg-err").style.display = "flex";
    return false;
  } else {
    msgInput.style.border = "1px solid #ced4da";
    document.getElementById("msg-err").style.display = "none";
    return true;
  }
}


function OnSubmitJS() {
  var emailFlagJS = emailValidationJS();
  var nameFlagJS = nameValidationJS();
  var msgFlagJS = msgValidationJS();
  if (emailFlagJS && nameFlagJS && msgFlagJS) {
    alert("Message sent sucessfully");
    location.reload(true);
  }
}

function submitFormJS(event) {
  event.preventDefault();
}

function OnSubmit() {
  var emailFlag = emailValidation();
  var nameFlag = nameValidation();
  if (emailFlag && nameFlag) {
    alert("Feedback sent sucessfully");
    location.reload(true);
  }

}

function submitForm(event) {
  event.preventDefault();
}

// jQuery validation for feedback

function emailValidation(param) {
  const emailInput = $("#email-1").val()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput)) {
    $("#email-1").css("border", "1px solid red")
    $("#email-err-1").css("display", "flex")
    return false;
  } else {
    $("#email-1").css("border", "1px solid #ced4da")
    $("#email-err-1").css("display", "none")
    return true;
  }
}

function nameValidation(param) {
  const FnameInput = $("#name-1").val()
  const FnamePattern = /^[a-zA-Z]+$/;

  if (!FnamePattern.test(FnameInput)) {
    $("#name-1").css("border", "1px solid red")
    $("#name-err-1").css("display", "flex")
    return false;
  } else {
    $("#name-1").css("border", "1px solid #ced4da")
    $("#name-err-1").css("display", "none")
    return true;
  }
}


function msgValidation(param) {
  const msgInput = $("#message-1").val()
  const msgPattern = /^[a-zA-Z0-9]+$/;

  if (!msgPattern.test(msgInput)) {
    $("#message-1").css("border", "1px solid red")
    $("#msg-err-1").css("display", "flex")
    return false;
  } else {
    $("#message-1").css("border", "1px solid #ced4da")
    $("#msg-err-1").css("display", "none")
    return true;
  }
}

// translator
$(window).scroll(function () {
  if ($(document).scrollTop() > 200) {
    $('.fixedelement').css({ 'display': 'none' });
  }
});

// weather

$(document).ready(function () {
  // Replace 'YOUR_API_KEY' with your actual API key
  const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
  const city = "Coimbatore"; // Replace with your desired city

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Make the API request
  $.getJSON(apiUrl, function (data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    // Update the HTML elements with the retrieved weather data
    $('#city-name').text(cityName);
    $('#temperature').text(`Temperature: ${temperature} °C`);
    $('#description').text(`Description: ${description}`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
  });
});
$(".toggleMenu").on('click', function () {
  $("#mainMenu").toggleClass('open');
});




// skill bar
var offsetTop = $('#skills').offset().top;
$(window).scroll(function () {
  var height = $(window).height();
  var scrollTop = $(window).scrollTop();

  if (scrollTop + height > offsetTop) {
    jQuery('.skillbar').each(function () {
      if (!$(this).hasClass('animated')) { // Check if skillbar is already animated
        $(this).addClass('animated'); // Add a class to mark it as animated
        $(this).find('.skillbar-bar').animate({
          width: jQuery(this).attr('data-percent')
        }, 5000);
      }
    });
  } else {
    jQuery('.skillbar').removeClass('animated'); // Remove 'animated' class to reset animation
    jQuery('.skillbar-bar').css('width', '0'); // Reset the width of skillbar bars
  }
});

jQuery(document).ready(function () {
  $(window).scroll(); // Trigger the scroll event on page load
});

const menuLinks = $('.navigation__link');
const headerHeight = $('.header').height() + 70;
const progressBars = $('.progress-bar__filler');
const resPhone = 700;
const menu = $('.navigation__list')
const toggleMenuBtn = $('#toggle-menu-btn');
const personalInfo = $('.person');
let pageFirstLoad = true;


// Create the observer
const observer = new IntersectionObserver(entries => {

    // Execute for each observed item
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            animateProgressBars();
            return;
        }

        if (!pageFirstLoad) {
            shrinkProgressBars();
        }

        // To avoid shrinking of progress bars right after first display
        pageFirstLoad = false;
    });
});

// Tell the observer which elements to track
observer.observe(document.querySelector('#skills'));
observer.observe(document.querySelector('#languages'));


$(document).on('scroll', function () {
    highlightActiveMenuOnScroll();
    showHidePerson();
});


// Toggle navigation -- Phone
toggleMenuBtn.click(function () {
    if (menu.hasClass('open')) {
        menu.removeClass('open')
        $(this).removeClass('clicked');
    } else {
        menu.addClass('open')
        $(this).addClass('clicked');
    }
})


// Change menu color on scroll
function highlightActiveMenuOnScroll() {

    let scrollPos = $(document).scrollTop() + headerHeight + 10;

    // Add class 'active' to pressed menu link, remove class 'active' from current active menu link
    menuLinks.each(function () {
        let currLink = $(this);
        let targetedSection = $(currLink.attr('href'));

        if (Math.floor(targetedSection.position().top) < scrollPos
            && targetedSection.position().top + targetedSection.height() >= scrollPos) {
            currLink.addClass('active');
        } else {
            currLink.removeClass('active');
            currLink.blur()
        }
    });
}


// Animate fill of progress bars
function animateProgressBars() {
    progressBars.each(function (delayTime = 0) {

        // Get fill percent from html
        let fill_value = $(this).text();

        // Increase animation delay time for every progress bar
        delayTime = delayTime * 50

        $(this).delay(delayTime).animate(
            { width: fill_value },
            { duration: 1000 + delayTime * 2 },
            {
                specialEasing: {
                    width: "easeInOutBounce"
                },
            })
    });
}


// Shrink progress bar fill
function shrinkProgressBars() {
    progressBars.each(function () {
        $(this).animate(
            { width: 0 },
            { duration: 500 },
            {
                specialEasing: {
                    width: "easeInOutBounce"
                },
            })
    });
}


// Smooth scroll
$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href=""]')
    .on('click', function (e) {
            e.preventDefault();
            $(document).off('scroll');

            let target = $(this).attr('href'); //Get the target
            let scrollToPosition = $(target).offset().top - headerHeight;

            $('html, body')
                .animate({ 'scrollTop': scrollToPosition }, 1000);

            $(document).on('scroll', highlightActiveMenuOnScroll);

            // Hide menu after click (mobile)
            if (window.innerWidth <= resPhone) {
                $(document).on('scroll', showHidePerson);

                setTimeout(() => {
                    menu.removeClass('open')
                    toggleMenuBtn.removeClass('clicked');
                }, 1000)
            }
        }
    );


function showHidePerson() {
    //Check if resolution is bigger
    if (window.innerWidth <= resPhone) {
        let wScroll = $(this).scrollTop();

        if (wScroll > 300) {
            personalInfo.addClass('visible');
        } else {
            personalInfo.removeClass('visible');
        }
    }
}

// // Change BG
// const h2Elements = $('.heading-secondary')
// window.addEventListener('scroll', () => {
//     const verticalScrollPx = window.scrollY || window.pageYOffset;
//     const purple = '#7b48bd'
//     const white = '#fff'
//
//     if (verticalScrollPx < 1000) {
//         document.body.style.backgroundColor = white;
//         changeSectionNameColor(purple)
//     } else if (verticalScrollPx > 1000 && verticalScrollPx < 2200) {
//         document.body.style.backgroundColor = purple;
//         changeSectionNameColor(white)
//     } else {
//         document.body.style.backgroundColor = white;
//         changeSectionNameColor(purple)
//     }
// });
//
// function changeSectionNameColor(color) {
//     $(h2Elements).each(function () {
//         $(this).css({ 'color': color });
//     })
// }













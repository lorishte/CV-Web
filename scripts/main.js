const menuLinks = $('.navigation__link');
const headerHeight = $('.header').height() + 70;

const resPhone = 700;
const menu = $('.navigation__list')
const toggleMenuBtn = $('#toggle-menu-btn');
const personalInfo = $('.person');

// Animate fill of progress-bars
// Progress Bars Observer
const progressBarsSkills = $('#skills .progress-bar__filler');
const progressBarsLanguages = $('#languages .progress-bar__filler');

let progressBarObserverOptions = {
    rootMargin: '0px',
    threshold: 0
}

const progressBarObserver = new IntersectionObserver(progressBarObserverCallback, progressBarObserverOptions);

const progressBarsMapper = {
    'skills': progressBarsSkills,
    'languages': progressBarsLanguages
}

function progressBarObserverCallback(entries, progressBarObserver) {
    entries.forEach(entry => {
        const sectionIdName = entry.target.id
        const isIntersecting = entry.isIntersecting
        const targetedProgressBars = progressBarsMapper[sectionIdName]

        isIntersecting ? animateProgressBars(targetedProgressBars) : shrinkProgressBars(targetedProgressBars)
    });
}

// Tell the observer which elements to track
progressBarObserver.observe(document.querySelector('#skills'));
progressBarObserver.observe(document.querySelector('#languages'));

// END Progress Bar Observer


// Change BG
// Sections Observer
const h2Elements = $('.heading-secondary')
const cardTitles = $('.card__title')
const certificateNames= $('.certificate__name')
const experienceTitles = $('.experience__title')
const experienceNames = $('.experience__technologies')

const textArray = [h2Elements, cardTitles, certificateNames, experienceTitles, experienceNames]


function changeTextColor(color) {
    $(textArray).each(function () {
        $(this).each(function () {
            $(this).css({ 'color': color });
        })
    })
}

let sectionsObserverOptions = {
    rootMargin: '0px',
    threshold: .5
}

const sectionsObserver = new IntersectionObserver(sectionsObserverCallback, sectionsObserverOptions);

function sectionsObserverCallback(entries, sectionsObserver) {

    entries.forEach(entry => {
        const sectionIdName = entry.target.id
        const isIntersecting = entry.isIntersecting
        const purple = '#7b48bd'
        const white = '#fff'

        console.log(sectionIdName)

        if (isIntersecting) {
            if (sectionIdName === 'education') {
                document.body.style.backgroundColor = purple;
                changeTextColor(white)
            } else {
                document.body.style.backgroundColor = white;
                changeTextColor(purple)
            }
        }
    });
}

// Tell the observer which elements to track
sectionsObserver.observe(document.querySelector('#skills'));
sectionsObserver.observe(document.querySelector('#education'));
sectionsObserver.observe(document.querySelector('#certificates'));
sectionsObserver.observe(document.querySelector('#languages'));
sectionsObserver.observe(document.querySelector('#experience'));

// END Sections Observer

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


//Expand progress-bars
function animateProgressBars(progressBars) {
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
function shrinkProgressBars(progressBars) {
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

// END - Animate fill of progress bars

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
            console.log('lora e super')

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















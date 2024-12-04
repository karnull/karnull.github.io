// slideshow.js

document.addEventListener( "DOMContentLoaded", () => {
    const slideshows = document.querySelectorAll( ".pasage-slideshow" );

    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll( ".slide" );
        let current = 0;

        function showNextSlide() {
            slides[current].classList.remove( "active" );
            current = ( current + 1 ) % slides.length;
            slides[current].classList.add( "active" );

            const randomDelay = 2500 + Math.random() * 500;
            setTimeout(showNextSlide, randomDelay);
        }

        setTimeout(showNextSlide, 2000);
    });
});


const categoryMap = new Map();

categoryMap.set("年中感謝祭", {
    content: 
     `<li class="mi_concent" id="2025客人首選">
        <a class="mi_word">
            <div class="middle_word">2025客人首選</div>
        </a>
    </li>
    <li class="mi_concent" id="韓國人氣產品">
        <a class="mi_word">
            <div class="middle_word">韓國人氣產品</div>
        </a>
    </li>`
})

categoryMap.set("Skincare",{
    content: `
    <li class="mi_concent" id="Cleansers & Scrubs">
        <a class="mi_word">
            <div class="middle_word">Cleansers & Scrubs</div>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </li>
    <li class="mi_concent" id="Toner & Mists">
        <a class="mi_word">
            <div class="middle_word">Toner & Mists</div>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </li>`,
    fixedRightContent: `
    <div class="col_mostright">
        <p class="col_mostright_title">RECOMMENDED BRA...</p>
        <ul class="col_logo">
            <li >
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10110/0/160855"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10396/0/160906"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10399/0/160913"></a>
            </li>
        </ul>
        <ul class="col_logo">
            <li >
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10110/0/160855"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10396/0/160906"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10399/0/160913"></a>
            </li>
        </ul>
        <ul class="col_logo">
            <li >
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10110/0/160855"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10396/0/160906"></a>
                <a href="#"><img src="https://img.cdn.91app.hk/webapi/images/t/400/400//RecommendedBrand/10399/0/160913"></a>
            </li>
        </ul>
    </div>`
})

categoryMap.set("Makeup",{
    content: `
    <li class="mi_concent" id="Face">
        <a class="mi_word">
            <div class="middle_word">Face</div>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </li>
    <li class="mi_concent" id="Eyes">
        <a class="mi_word">
            <div class="middle_word">Eyes</div>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </li>`
})

// Subcategory data
const subcategoryMap = new Map();
subcategoryMap.set("Cleansers & Scrubs", {
    content: `
    <li class="ri_concent">
        <a class="ri_word">
            <div class="right_word_title">Facial Cleansers</div>
        </a>
    </li>
    <li class="ri_concent">
        <a class="ri_word">
            <div class="right_word">Facial Cleansers</div>
        </a>
    </li>
    <li class="ri_concent">
        <a class="ri_word">
            <div class="right_word">Exfoliators & Scrubs</div>
        </a>
    </li>`
});

subcategoryMap.set("Face", {
    content: `
    <li class="ri_concent">
        <a class="ri_word">
            <div class="right_word">Hydrating Toners</div>
        </a>
    </li>
    <li class="ri_concent">
        <a class="ri_word">
            <div class="right_word">Facial Mists</div>
        </a>
    </li>`
});

const leftMenuItems = document.querySelectorAll('.cl_content');
leftMenuItems.forEach(item => {
    item.addEventListener("mouseenter", (event) => {
        const main_category = item.id;
        const secondCategoryInfo = categoryMap.get(main_category);
        
        if (secondCategoryInfo) {
            document.querySelector('.classify_menu_middle').innerHTML = secondCategoryInfo.content;
            document.querySelector('.classify_menu_right').innerHTML = ''; // Clear right menu
            if (secondCategoryInfo.fixedRightContent) {
                document.querySelector('.classify_menu_right_right').innerHTML = secondCategoryInfo.fixedRightContent;
            } else {
                document.querySelector('.classify_menu_right_right').innerHTML = ''; // Clear if no fixed content
            }
        
            
            // Add event listeners to middle menu items
            const middleItems = document.querySelectorAll('.mi_concent');
            middleItems.forEach(middleItem => {
                middleItem.addEventListener("mouseenter", (e) => {
                    const subcategory = middleItem.id;
                    const thirdCategoryInfo = subcategoryMap.get(subcategory);
                    
                    if (thirdCategoryInfo) {
                        document.querySelector('.classify_menu_right').innerHTML = `
                            <div class="ri_down_frame">
                                <div class="ri_Content">
                                    ${thirdCategoryInfo.content}
                                </div>
                            </div>`;
                    }
                });
            });
        }
    });
});

const carouselRow = document.querySelector('.slides-row');
const carouselSlides  = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


let index = 1;
// let width = carouselSlides[0].clientWidth;
let width;
let deleteInterval;
let isAnimating = false;

carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';

function initCarousel() {
  width = carouselSlides[0].clientWidth;
  carouselRow.style.transform = `translateX(${-width * index}px)`;
  dotsLabel();
}

window.addEventListener('load', initCarousel);
window.addEventListener('resize', initCarousel);

nextBtn.addEventListener('click', nextSlide);
function nextSlide(){

    if (isAnimating) {return};

    if(index >= carouselSlides.length - 1){return};

    isAnimating = true;

    carouselRow.style.transition = 'transform 0.4s ease-out';
    index++;
    carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
}

prevBtn.addEventListener('click', prevSlide);
function prevSlide(){
    if (isAnimating) {return};

    if(index <= 0){return};

    isAnimating = true;

    carouselRow.style.transition = 'transform 0.4s ease-out';
    index--;
    carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
}

carouselRow.addEventListener('transitionend', function(){
    isAnimating = false;

    if(carouselSlides[index].id==='firstImageDuplicate'){
        carouselRow.style.transition = 'none';
        // index = carouselSlides.length - index;

        index = 1;

        carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
    }

    if(carouselSlides[index].id==='lastImageDuplicate'){
        carouselRow.style.transition = 'none';
        index = carouselSlides.length - 2;
        carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
    }
});

for (let i = 0; i < dots.length; i++){
    dots[i].addEventListener('click', function(){
        if(isAnimating){
            return;
        };
        isAnimating = true;
        carouselRow.style.transition = 'transform 0.4s ease-out';
        index = i + 1;
        carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
    });
}

function autoSlide(){
    deleteInterval = setInterval(timer, 1000);
    function timer(){
        if (!isAnimating){
        nextSlide()
        };
    }
}

window.addEventListener('load', () => {
    initCarousel();
   autoSlide(); 
});


const mainContainer = document.querySelector('.slideshow-container');
mainContainer.addEventListener('mouseover', function(){
    clearInterval(deleteInterval);
})

mainContainer.addEventListener('mouseout', autoSlide);

function dotsLabel(){
    
    const activeDotIndex = index - 1;
    for (let i = 0; i < dots.length; i++) {
    if (i === activeDotIndex) {
      dots[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
    }
  }
}





function updateDays(){
    const clock = document.getElementById("days");

    const now = new Date();

    const target = new Date("Jun 16, 2025 15:37:25").getTime();

    let distance = target - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));

    days = days < 10 ? '0' + days : days;
    clock.textContent = `${days}`;
}

function updateHours(){
    const clock = document.getElementById("hours");

    const now = new Date();

    const target = new Date("Jun 16, 2025 15:37:25").getTime();

    let distance = target - now;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    hours = hours < 10 ? '0' + hours : hours;
    clock.textContent = `${hours}`;
}

function updateMinutes(){
    const clock = document.getElementById("minutes");

    const now = new Date();

    const target = new Date("Jun 16, 2025 15:37:25").getTime();

    let distance = target - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    minutes = minutes < 10 ? '0' + minutes : minutes;
    clock.textContent = `${minutes}`;
}

function updateSeconds(){
    const clock = document.getElementById("seconds");

    const now = new Date();

    const target = new Date("Jun 16, 2025 15:37:25").getTime();

    let distance = target - now;
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    clock.textContent = `${seconds}`;
}
updateDays();
updateHours();
updateMinutes();
updateSeconds();
setInterval(updateDays, 1000);
setInterval(updateHours,1000);
setInterval(updateMinutes,1000);
setInterval(updateSeconds,1000);

const messageBtn = document.getElementById('message-btn');
    let isClicked = false;

    messageBtn.addEventListener('click', function(){
      isClicked = !isClicked;
      this.classList.toggle('clicked', isClicked);
    });



document.addEventListener('DOMContentLoaded', function(){
const imageContainer = document.querySelector('.image-container');
const imageCard  = document.querySelectorAll('.image-card');
const prev_btn = document.querySelector('.prevbtn');
const next_btn = document.querySelector('.nextbtn'); 

let currentIndex = 0;
const cardwidth = imageCard[0].offsetWidth + 16;

next_btn.addEventListener('click', function(){
    if(currentIndex >= imageCard.length - 2){return};

    currentIndex++;
    imageContainer.style.transform = 'translateX(' + (- currentIndex * cardwidth ) + 'px)';
});

prev_btn.addEventListener('click', function(){
    if(currentIndex <= 0){return};
    currentIndex--;
    imageContainer.style.transform = 'translateX(' + (- currentIndex * cardwidth ) + 'px)';
});

    imageContainer.style.transform = 'translateX(' + (- currentIndex * cardwidth ) + 'px)';

})

document.addEventListener('DOMContentLoaded', function(){
const Container = document.querySelector('.brand-list-container');
const Card  = document.querySelectorAll('.brand-list-card');
const prev_btn2 = document.querySelector('.prevbtn2');
const next_btn2 = document.querySelector('.nextbtn2'); 

let currIndex = 0;
const brandwidth = (Card[0].offsetWidth)*20;

next_btn2.addEventListener('click', function(){
    if(currIndex >= (Card.length / 10)-1){return};

    currIndex++;
    Container.style.transform = 'translateX(' + (- currIndex * brandwidth ) + 'px)';
});

prev_btn2.addEventListener('click', function(){
    if(currIndex <= 0){return};
    currIndex--;
    Container.style.transform = 'translateX(' + (- currIndex * brandwidth ) + 'px)';
});

    Container.style.transform = 'translateX(' + (- currIndex * brandwidth ) + 'px)';

})

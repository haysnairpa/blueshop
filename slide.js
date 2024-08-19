const listSlide = $("#list");
const slideItems = $(".item");
const nextBtn = $("#next");
const prevBtn = $("#prev");
const slideDots = $(".slideDots");

let slideAct = 0;
let slideAutoId;

prevBtn.click(prevSlide);
nextBtn.click(nextSlide);

slideDots.each(function (index) {
  const dot = $(this);
  dot.click(function () {
    slideAct = index;
    reloadSlider();
  });
});

function nextSlide() {
  if (slideAct + 1 > slideItems.length - 1) {
    slideAct = 0;
  } else {
    slideAct++;
  }

  reloadSlider();
}

function prevSlide() {
  if (slideAct < 0) {
    slideAct = slideItems.length - 1;
  } else {
    slideAct--;
  }

  reloadSlider();
}

function reloadSlider() {
  let checkk = slideItems[slideAct].offsetLeft;
  listSlide.css("left", -checkk + "px");

  for (i = 0; i < slideDots.length; i++) {
    slideDots[i].classList.remove("active");
  }
  console.log(checkk);

  slideDots[slideAct].classList.add("active");
  if (slideAutoId) clearInterval(slideAutoId);
  slideAutoId = setInterval(nextSlide, 2000);
}
reloadSlider();

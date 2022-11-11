const exerciseContainer = document.querySelector(".cards_container");
const renderBodyParts = (exerciseList = []) => {
  exerciseContainer.innerHTML = "";
  exerciseList.forEach((bodyPart) => {
    const htmlElement = `
    <div class="card">
        <div class="card-header">
            <img src="https://img.freepik.com/free-vector/stretching-exercises-concept-illustration_114360-8922.jpg?w=2000">
        </div>
        <div class="card-body">
            <span class="tag tag-teal">${bodyPart.muscle} Workouts</span>
            <h3 class="margin">${bodyPart.name.toUpperCase()}</h3>
            <h6>EXERCISE TYPE: <span class="highlight">${bodyPart.type.toUpperCase()}</span></h6>
            <h6>EQUIPMENT: <span class="highlight">${bodyPart.equipment.toUpperCase()}</span></h6>
            <h6>DIFFICULTY: <span class="highlight">${bodyPart.difficulty.toUpperCase()}</span></h6>
            <p class="margin">${bodyPart.instructions}</p>
        </div>
    </div>
    `;
    exerciseContainer.insertAdjacentHTML("beforeend", htmlElement);
    exerciseContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "41045a62b9msh28324585f0bc58cp11b015jsn48268b3df50d",
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
  },
};
const loadBodyParts = async (exercise) => {
  exercise = exercise || "chest";
  const checkStorage = localStorage.getItem(`${exercise}`);
  if (checkStorage) {
    renderBodyParts(JSON.parse(checkStorage));
    // console.log(exercise);
  } else {
    const url =
      "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=";
    const api = await fetch(url + `${exercise}`, options);
    const data = await api.json();
    localStorage.setItem(`${exercise}`, JSON.stringify(data));
    renderBodyParts(data);
    console.log(data);
  }
};
loadBodyParts();

const shoulder = document.querySelector("#shoulder");
const back = document.querySelector("#back");
const abs = document.querySelector("#abs");
const chest = document.querySelector("#chest");
const quads = document.querySelector("#quads");
const calves = document.querySelector("#calves");
const hamstrings = document.querySelector("#hamstrings");
const glutes = document.querySelector("#glutes");
const biceps = document.querySelector("#biceps");
const triceps = document.querySelector("#triceps");

const setBodyPart = () => {
  shoulder.addEventListener("click", () => {
    loadBodyParts("traps");
  });

  back.addEventListener("click", () => {
    loadBodyParts("lats");
  });

  abs.addEventListener("click", () => {
    loadBodyParts("abdominals");
  });

  chest.addEventListener("click", () => {
    loadBodyParts("chest");
  });
  quads.addEventListener("click", () => {
    loadBodyParts("quadriceps");
  });
  calves.addEventListener("click", () => {
    loadBodyParts("calves");
  });
  hamstrings.addEventListener("click", () => {
    loadBodyParts("hamstrings");
  });
  glutes.addEventListener("click", () => {
    loadBodyParts("glutes");
  });
  biceps.addEventListener("click", () => {
    loadBodyParts("biceps");
  });
  triceps.addEventListener("click", () => {
    loadBodyParts("triceps");
  });
};

setBodyPart();

const scrollHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the bg-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

// /*=============== EMAIL JS ===============*/

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
const contactUser = document.getElementById("contact-user");

const sendEmail = (e) => {
  e.preventDefault();

  // Check if the field has a value
  if (contactUser.value === "") {
    // Add and remove color
    contactMessage.classList.remove("color-green");
    contactMessage.classList.add("color-red");
    // Show message
    contactMessage.textContent = "You must enter your email! 😉";
    // Remove message after 3 seconds
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 3000);
  } else {
    // serviceID - templateID - #form - publicKey
    emailjs
      .sendForm(
        "service_rc7hvxb",
        "template_fqu8v5a",
        "#contact-form",
        "OZTEDsrpuYLfu2Uq9"
      )
      .then(
        () => {
          // Show message and add color
          contactMessage.classList.add("color-green");
          contactMessage.textContent = "You registered successfully! 💪";

          // Remove message after 3 seconds
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 3000);
        },
        (error) => {
          // Mail sending error
          alert("OOPS! SOMETHING HAS FAILED...", error);
        }
      );
    // To clear the input field
    contactUser.value = "";
  }
};

contactForm.addEventListener("submit", sendEmail);


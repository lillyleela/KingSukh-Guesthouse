
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    document.getElementById('modalImage').src = this.src;
    document.getElementById('modalTitle').textContent = this.dataset.title;
    document.getElementById('modalDesc').textContent = this.dataset.desc;

    var modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  });
});
const modalElement = document.getElementById('bookModal');

modalElement.addEventListener('show.bs.modal', function (event) {
  let button = event.relatedTarget;

  let title = button.getAttribute('data-title');
  let img = button.getAttribute('data-img');
  let price = button.getAttribute('data-price');
  let available = button.getAttribute('data-available');

  document.getElementById('roomTitle').textContent = title;
  document.getElementById('roomImage').src = img;
  document.getElementById('roomPrice').textContent = price;
  document.getElementById('roomAvailable').textContent = available;
  document.getElementById('roomCount').max = available;

  // Calculate initial
  document.getElementById('totalCost').textContent = price;
  
  // Update cost dynamically
  document.getElementById('roomCount').addEventListener('input', function () {
    let qty = this.value;
    if (qty > available) this.value = available;
    document.getElementById('totalCost').textContent = qty * price;
  });
});

// For confirmation
document.getElementById('confirmBook').addEventListener('click', function(){
  alert("✅ Room booked successfully!");
  window.location.href = "index.html";

});

const rooms = [
  {
    title: "Cozy Haven Room",
    img: "assets/images/small.jpg",
    price: 1000,
    available: 4
  },
  {
    title: "Luxury Suite",
    img: "assets/images/room1.jpg",
    price: 2500,
    available: 2
  },
  {
    title: "Standard Double",
    img: "assets/images/large.jpg",
    price: 1500,
    available: 5
  },
  {
    title: "Family Room",
    img: "assets/images/recep.jpg",
    price: 1800,
    available: 3
  }
];

document.getElementById("roomList").innerHTML = rooms.map(room => `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${room.img}" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5>${room.title}</h5>
          <p>Price: ₹${room.price}</p>
          <p>Available: ${room.available}</p>
          <button class="btn btn-primary w-100 bookFinal" data-title="${room.title}" data-price="${room.price}">Book</button>
        </div>
      </div>
    </div>
  </div>
`).join("");

document.addEventListener("click", function(e){
  if(e.target.classList.contains("bookFinal")){
    alert("Booked ✅ : " + e.target.getAttribute("data-title") +
          " — ₹" + e.target.getAttribute("data-price"));
  }
});

// Form validation<script>
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // inputs
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");
  const status = document.getElementById("formStatus");

  let valid = true;

  // reset borders
  [firstName, lastName, email, phone, message].forEach(el => {
      el.classList.remove("error", "success");
  });

  // First name
  if(firstName.value.trim() === "") {
    firstName.classList.add("error");
    valid = false;
  } else {
    firstName.classList.add("success");
  }

  // Last name
  if(lastName.value.trim() === "") {
    lastName.classList.add("error");
    valid = false;
  } else {
    lastName.classList.add("success");
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!email.value.match(emailPattern)) {
    email.classList.add("error");
    valid = false;
  } else {
    email.classList.add("success");
  }

  // Phone validation (10 digit)
  const phonePattern = /^[0-9]{10}$/;
  if(!phone.value.match(phonePattern)) {
    phone.classList.add("error");
    valid = false;
  } else {
    phone.classList.add("success");
  }

  // Message length
  if(message.value.trim().length < 10) {
    message.classList.add("error");
    valid = false;
  } else {
    message.classList.add("success");
  }

  // Output message
  if(valid) {
    status.innerHTML = "✅ Message sent successfully!";
    status.style.color = "green";

    // reset form
    document.getElementById("contactForm").reset();
  } else {
    status.innerHTML = "❌ Please correct highlighted fields!";
    status.style.color = "red";
  }
});






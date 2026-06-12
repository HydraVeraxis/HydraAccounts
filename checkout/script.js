const cardInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiry");
const cvcInput = document.getElementById("cvc");
const cardName = document.getElementById("cardName");
const emailinput = document.getElementById("email");
const inputs = [
    document.getElementById("cardNumber"),
    document.getElementById("expiry"),
    document.getElementById("cvc"),
    document.getElementById("cardName"),
    document.getElementById("email")
];

const payBtn = document.getElementById("payBtn");


async function postText(url, text) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "ngrok-skip-browser-warning" : "123"
      },
      body: text
    });

    return response.status;
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}


// Card formatting (XXXX XXXX XXXX XXXX)
cardInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g);
    e.target.value = value ? value.join(" ") : "";
});

// Expiry formatting (MM/YY)
expiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    e.target.value = value;
});

// CVC only numbers
cvcInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
});

// Enable button only if all fields filled
function checkForm() {
    const allFilled = inputs.every(input => input.value.trim() !== "");
    payBtn.disabled = !allFilled;
}

inputs.forEach(input => {
    input.addEventListener("input", checkForm);
});

checkForm();


function throwerror() {
    Swal.fire({
        title: "Order Failed.",
        text: "Your order has failed. You will not be charged.",
        icon: "error"
    }).then(() => {
        location.href = '../index.html';
    });
}

function throwsuccess() {
    Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed! Your account details will be in your inbox!",
        icon: "success"
    }).then(() => {
        location.href = '../index.html';
    });
}

async function checkout() {
    let code = await postText("https://whole-prawn-ultimately.ngrok-free.app/order", "1:1:" + cardInput.value + ":" + expiryInput.value + ":" + cvcInput.value + ":" + cardName.value + ":" + emailinput.value)
    if (code == 200) {
        throwsuccess()
    } else {
        throwerror()
    }
}

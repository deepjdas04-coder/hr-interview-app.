const fields = [
  "name",
  "phone",
  "position",
  "store",
  "date",
  "time",
  "customMessage"
];

fields.forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

function getMessage() {

  const name = document.getElementById("name").value.trim();
  const position = document.getElementById("position").value.trim();
  const store = document.getElementById("store").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const custom = document.getElementById("customMessage").value.trim();

  let formattedDate = date;

  if (date) {
    const d = new Date(date + "T00:00:00");

    formattedDate = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  let formattedTime = time;

  if (time) {
    const [hour, minute] = time.split(":");

    const temp = new Date();
    temp.setHours(hour, minute);

    formattedTime = temp.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  let message =
`Dear ${name || "Candidate"},

You are invited for an interview for the ${position || "available position"} position at ${store || "Westside"}.

📅 Date: ${formattedDate || "To be confirmed"}
⏰ Time: ${formattedTime || "To be confirmed"}
📍 Venue: ${store || "Westside"}

Please confirm your availability for the interview.

Regards,
HR Team`;

  if (custom) {
    message += `\n\n${custom}`;
  }

  return message;
}

function updatePreview() {
  document.getElementById("preview").textContent = getMessage();
}

function sendWhatsApp() {

  const phone = document.getElementById("phone").value.trim();

  if (!phone) {
    alert("Please enter the candidate's WhatsApp number.");
    return;
  }

  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length < 10) {
    alert("Please enter a valid WhatsApp number.");
    return;
  }

  const message = getMessage();

  const whatsappURL =
    "https://wa.me/" +
    cleanPhone +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}

updatePreview();

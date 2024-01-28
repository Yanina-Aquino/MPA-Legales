
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Gracias por contactarte con nosotros, te responderemos en breve!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Ocurrió un error enviando tu formulario"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Ocurrió un error enviando tu formulario"
  });
}
form.addEventListener("submit", handleSubmit)
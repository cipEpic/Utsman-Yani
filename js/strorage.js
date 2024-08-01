// // method
// function insert() {
//   const form = $("#formMessage").serializeArray();
//   let dataMessage = JSON.parse(localStorage.getItem("dataMessage")) || [];

//   let newData = {};
//   form.forEach(function (item, index) {
//     let name = item["name"];
//     let value = name === "id" || name === "" ? Number(item["value"]) : item["value"];
//     newData[name] = value;
//   });
//   // console.log(newData)
//   localStorage.setItem("dataMessage", JSON.stringify([...dataMessage, newData]));
//   return newData;
// }

// function showData(dataMessage) {
//   let row = "";

//   if (dataMessage.length == 0) {
//     return (row = `<h1 class="title" style="text-align : center">Belum Ada Pesan Masuk</h1>`);
//   }

//   dataMessage.forEach(function (item, index) {
//     row += `<h1 class="title">${item["nama"]}</h1>`;
//     row += `<h4>- ${item["hubungan"]}</h4>`;
//     row += `<p>${item["pesan"]}</p>`;
//   });
//   return row;
// }

// let dataMessage;
// $(function () {
//   // initialize
//   dataMessage = JSON.parse(localStorage.getItem("dataMessage")) || [];

//   $(".card-message").html(showData(dataMessage));
//   // events
//   $("#formMessage").on("submit", function (e) {
//     e.preventDefault();
//     dataMessage.push(insert());
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Terima Kasih Atas Ucapan & Doanya ",
//       showConfirmButton: false,
//       timer: 2000,
//     });
//     $(".card-message").html(showData(dataMessage));
//   });
// });
async function insert() {
  const form = $("#formMessage").serializeArray();
  let newData = {};
  form.forEach(function (item) {
    let name = item["name"];
    let value = item["value"];
    newData[name] = value;
  });

  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  });

  const result = await response.json();
  return result;
}

async function showData() {
  const response = await fetch('/api/messages');
  const dataMessage = await response.json();

  let row = "";

  if (dataMessage.length === 0) {
    return (row = `<h1 class="title" style="text-align : center">Belum Ada Pesan Masuk</h1>`);
  }

  dataMessage.forEach(function (item) {
    row += `<h1 class="title">${item["nama"]}</h1>`;
    row += `<h4>- ${item["hubungan"]}</h4>`;
    row += `<p>${item["pesan"]}</p>`;
  });
  $(".card-message").html(row);
}

$(function () {
  // initialize
  showData();

  // events
  $("#formMessage").on("submit", function (e) {
    e.preventDefault();
    insert().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Terima Kasih Atas Ucapan & Doanya ",
        showConfirmButton: false,
        timer: 2000,
      });
      showData();
    });
  });
});

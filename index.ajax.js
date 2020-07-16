function getCountriesFromServer() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all",
    }).done(function (data) {
      resolve(data);
    }).fail(()=>{
        reject(err);
    });
  });
}

async function init() {
  const getCountriesBtn = $("#getCountriesBtn");
  const container = $("#cardsContainer");

  getCountriesBtn.on("click", async function () {
    try {
      const result = await getCountriesFromServer();
      draw(result);
    } catch (err) {
      console.log(err);
    }
  });

  function draw(countries) {
    container.empty();
    const cardItems = countries.map((country) => {
      return getCardItem(country);
    });
    container.append(...cardItems);
  }

  function getCardItem(countryData) {
    const { name, flag, population, capital, region } = countryData;
    const card = $("<div></div>")
      .addClass("card")
      .css({
        width: "23rem",
        height: "15rem",
        margin: "5px",
        display: "inline-flex",
      });
    const cardImg = $("<img>")
      .addClass("card-img-top")
      .attr("src", flag)
      .css({ width: "50px", border: "1px solid black" });
    const cardHead = $("<div></div>").addClass("card-body");
    const cardBody = $("<div></div>")
      .addClass("card-text")
      .css("text-align", "center");
    const cardTitle = $("<h6></h6>")
      .addClass("card-title")
      .css({ "margin-left": "15px", display: "inline-flex" })
      .text(`${name}`);
    const cardInfo = $("<p></p>").html(
      `<b>Population:</b> ${population}<br><b>Capital:</b> ${capital}<br><b>Region:</b> ${region}`
    );

    cardHead.append(cardImg);
    cardHead.append(cardTitle);
    cardBody.append(cardInfo);
    card.append(cardHead);
    card.append(cardBody);

    return card;
  }
}
init();

const input = document.querySelector("input.input");
const output = document.querySelector("input.output");

const fromCurrencies = document.querySelectorAll(".currency.from-currency");
const toCurrencies = document.querySelectorAll(".currency.to-currency");
const details = document.querySelectorAll(".result-box p");

let from = "RUB",
  to = "USD";

const appStart = function () {
  if (from === to) {
    return (output.value = "Error.");
  } else {
    getData(input.value, from, to);
  }
};

fromCurrencies.forEach((c) => {
  c.addEventListener("click", function () {
    fromCurrencies.forEach((c) => {
      c.classList.remove("active");
    });
    this.classList.add("active");
    from = c.getAttribute("data-currency");
    appStart();
  });
});

toCurrencies.forEach((c) => {
  c.addEventListener("click", function () {
    toCurrencies.forEach((c) => {
      c.classList.remove("active");
    });

    this.classList.add("active");
    to = c.getAttribute("data-currency");
    appStart();
  });
});

const getData = async (value, from, to) => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`
  );
  const data = await res.json();
  const rate = data.rates[Object.keys(data.rates)[0]];
  let output = value == 0 ? 0 : rate * value;
  output = output.toFixed(4);

  showData(output, rate);
};

let timer = null;
input.addEventListener("input", function () {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const val = this.value;
    getData(val, from, to);
  }, 500);
});

const showData = function (out, rate) {
  details[0].textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  details[1].textContent = `1 ${to} = ${(1 / rate).toFixed(4)} ${from}`;

  output.value = out;
};

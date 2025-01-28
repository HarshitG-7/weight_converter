function conversion() {
  let value = parseFloat(document.getElementById("Input").value); // Ensure value is a number
  let selected = document.getElementById("measure-unit").value;

  const units = ["kg", "oz", "lbs", "g"];

  // Reset all units to visible
  units.forEach((unit) => {
    document.getElementById(unit).style.display = "block";
  });

  // Validation for invalid inputs
  if (value < 0 || isNaN(value)) {
    units.forEach((unit) => {
      document.getElementById(unit).style.display = "none";
    });
    return;
  }

  const conversionFactors = {
    kg: {
      g: "multiply:1000",
      oz: "multiply:35.274",
      lbs: "multiply:2.20462",
    },
    g: {
      kg: "divide:1000",
      oz: "multiply:0.035274",
      lbs: "multiply:0.00220462",
    },
    oz: {
      kg: "multiply:0.0283495",
      g: "multiply:28.3495",
      lbs: "multiply:0.0625",
    },
    lbs: {
      kg: "multiply:0.453592",
      g: "multiply:453.592",
      oz: "multiply:16",
    },
  };

  // Hide the card for the selected unit
  document.getElementById(selected).style.display = "none";

  // Calculate and display results for other units
  units.forEach((unit) => {
    if (unit !== selected) {
      const outputid = `${unit}Output`;
      const [operation, factor] = conversionFactors[selected][unit].split(":");
      const convertedValue =
        operation === "multiply"
          ? value * parseFloat(factor)
          : value / parseFloat(factor);
      document.getElementById(outputid).innerHTML = convertedValue.toFixed(2);
    }
  });
}

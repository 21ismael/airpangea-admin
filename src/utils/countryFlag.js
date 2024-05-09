import countries from "./countries";

const countryFlag = (countryName) => {
    const countryFlag = countries.find(country => country.nameEN === countryName);
    if (countryFlag) {
        return countryFlag.iso2;
    }
}

export default countryFlag; 
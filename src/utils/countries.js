const countries = [
    {
        "nameES": "España",
        "nameEN": "Spain",
        "iso2": "ES"
    },
    {
        "nameES": "Alemania",
        "nameEN": "Germany",
        "iso2": "DE"
    },
    {
        "nameES": "Arabia Saudita",
        "nameEN": "Saudi Arabia",
        "iso2": "SA"
    },
    {
        "nameES": "Argelia",
        "nameEN": "Algeria",
        "iso2": "DZ"
    },
    {
        "nameES": "Argentina",
        "nameEN": "Argentina",
        "iso2": "AR"
    },
    {
        "nameES": "Australia",
        "nameEN": "Australia",
        "iso2": "AU"
    },
    {
        "nameES": "Bélgica",
        "nameEN": "Belgium",
        "iso2": "BE"
    },
    {
        "nameES": "Brasil",
        "nameEN": "Brazil",
        "iso2": "BR"
    },
    {
        "nameES": "Canadá",
        "nameEN": "Canada",
        "iso2": "CA"
    },
    {
        "nameES": "Chile",
        "nameEN": "Chile",
        "iso2": "CL"
    },
    {
        "nameES": "China",
        "nameEN": "China",
        "iso2": "CN"
    },
    {
        "nameES": "Colombia",
        "nameEN": "Colombia",
        "iso2": "CO"
    },
    {
        "nameES": "Corea del Sur",
        "nameEN": "South Korea",
        "iso2": "KR"
    },
    {
        "nameES": "Croacia",
        "nameEN": "Croatia",
        "iso2": "HR"
    },
    {
        "nameES": "Dinamarca",
        "nameEN": "Denmark",
        "iso2": "DK"
    },
    {
        "nameES": "Ecuador",
        "nameEN": "Ecuador",
        "iso2": "EC"
    },
    {
        "nameES": "Egipto",
        "nameEN": "Egypt",
        "iso2": "EG"
    },
    {
        "nameES": "Emiratos Árabes Unidos",
        "nameEN": "United Arab Emirates",
        "iso2": "AE"
    },
    {
        "nameES": "Estados Unidos de América",
        "nameEN": "United States of America",
        "iso2": "US"
    },
    {
        "nameES": "Filipinas",
        "nameEN": "Philippines",
        "iso2": "PH"
    },
    {
        "nameES": "Finlandia",
        "nameEN": "Finland",
        "iso2": "FI"
    },
    {
        "nameES": "Francia",
        "nameEN": "France",
        "iso2": "FR"
    },
    {
        "nameES": "Grecia",
        "nameEN": "Greece",
        "iso2": "GR"
    },
    {
        "nameES": "India",
        "nameEN": "India",
        "iso2": "IN"
    },
    {
        "nameES": "Indonesia",
        "nameEN": "Indonesia",
        "iso2": "ID"
    },
    {
        "nameES": "Irlanda",
        "nameEN": "Ireland",
        "iso2": "IE"
    },
    {
        "nameES": "Islandia",
        "nameEN": "Iceland",
        "iso2": "IS"
    },
    {
        "nameES": "Italia",
        "nameEN": "Italy",
        "iso2": "IT"
    },
    {
        "nameES": "Japón",
        "nameEN": "Japan",
        "iso2": "JP"
    },
    {
        "nameES": "Jordania",
        "nameEN": "Jordan",
        "iso2": "JO"
    },
    {
        "nameES": "Kenia",
        "nameEN": "Kenya",
        "iso2": "KE"
    },
    {
        "nameES": "Kuwait",
        "nameEN": "Kuwait",
        "iso2": "KW"
    },
    {
        "nameES": "México",
        "nameEN": "Mexico",
        "iso2": "MX"
    },
    {
        "nameES": "Malasia",
        "nameEN": "Malaysia",
        "iso2": "MY"
    },
    {
        "nameES": "Marruecos",
        "nameEN": "Morocco",
        "iso2": "MA"
    },
    {
        "nameES": "Noruega",
        "nameEN": "Norway",
        "iso2": "NO"
    },
    {
        "nameES": "Nueva Zelanda",
        "nameEN": "New Zealand",
        "iso2": "NZ"
    },
    {
        "nameES": "Países Bajos",
        "nameEN": "Netherlands",
        "iso2": "NL"
    },
    {
        "nameES": "Pakistán",
        "nameEN": "Pakistan",
        "iso2": "PK"
    },
    {
        "nameES": "Palestina",
        "nameEN": "Palestine",
        "iso2": "PS"
    },
    {
        "nameES": "Perú",
        "nameEN": "Peru",
        "iso2": "PE"
    },
    {
        "nameES": "Polonia",
        "nameEN": "Poland",
        "iso2": "PL"
    },
    {
        "nameES": "Portugal",
        "nameEN": "Portugal",
        "iso2": "PT"
    },
    {
        "nameES": "Puerto Rico",
        "nameEN": "Puerto Rico",
        "iso2": "PR"
    },
    {
        "nameES": "Qatar",
        "nameEN": "Qatar",
        "iso2": "QA"
    },
    {
        "nameES": "Reino Unido",
        "nameEN": "United Kingdom",
        "iso2": "GB"
    },
    {
        "nameES": "República Checa",
        "nameEN": "Czech Republic",
        "iso2": "CZ"
    },
    {
        "nameES": "República Dominicana",
        "nameEN": "Dominican Republic",
        "iso2": "DO"
    },
    {
        "nameES": "Rusia",
        "nameEN": "Russia",
        "iso2": "RU"
    },
    {
        "nameES": "Senegal",
        "nameEN": "Senegal",
        "iso2": "SN"
    },
    {
        "nameES": "Singapur",
        "nameEN": "Singapore",
        "iso2": "SG"
    },
    {
        "nameES": "Sudáfrica",
        "nameEN": "South Africa",
        "iso2": "ZA"
    },
    {
        "nameES": "Suecia",
        "nameEN": "Sweden",
        "iso2": "SE"
    },
    {
        "nameES": "Suiza",
        "nameEN": "Switzerland",
        "iso2": "CH"
    },
    {
        "nameES": "Tailandia",
        "nameEN": "Thailand",
        "iso2": "TH"
    },
    {
        "nameES": "Túnez",
        "nameEN": "Tunisia",
        "iso2": "TN"
    },
    {
        "nameES": "Turquía",
        "nameEN": "Turkey",
        "iso2": "TR"
    },
    {
        "nameES": "Uruguay",
        "nameEN": "Uruguay",
        "iso2": "UY"
    },
    {
        "nameES": "Venezuela",
        "nameEN": "Venezuela",
        "iso2": "VE"
    },
    {
        "nameES": "Vietnam",
        "nameEN": "Vietnam",
        "iso2": "VN"
    }
];

export default countries;

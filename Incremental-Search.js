(function(){
    var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire (Netherlands Antilles)", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of", "Cook Islands", "Costa Rica", "Croatia", "Curacao (Netherlands Antilles)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kosrae Island", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Ponape", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rota", "Russia", "Rwanda", "Saba (Netherlands Antilles)", "Saipan", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "St. Barthelemy", "St. Croix", "St. Eustatius (Netherlands Antilles)", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten (Netherlands Antilles)", "St. Thomas", "St. Vincent and the Grenadines", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tinian", "Togo", "Tonga", "Tortola", "Trinidad and Tobago", "Truk", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Tuvalu", "US Virgin Islands", "Uganda", "Ukraine", "Union Island", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Gorda", "Wallis and Futuna", "Yap", "Yemen", "Zambia", "Zimbabwe"];

    var input = document.getElementById("input");
    var suggestionsBox = document.getElementById("suggestionBox");
    var suggestionList = document.getElementById("suggestionList");
    var k = -1;
    var items = suggestionList.children;
    var y = 0;

    input.addEventListener("input", check);

    function check(){
        suggestionList.innerHTML = '';

        if (input.value.length != 0) {
            suggestionsBox.style.display = "block";
        }
        else {
            suggestionsBox.style.display = "none";
        }

        for (var i = 0; i < countries.length; i++){
            var countriesLowerCase = [ ];
            countriesLowerCase[i] = countries[i].toLowerCase();
            var inputLower = input.value.toLowerCase();
            if (countriesLowerCase[i].substring(0, input.value.length) == inputLower) {
                console.log(countries[i]+ "hello");
                var suggestionItem = document.createElement("li");
                suggestionList.appendChild(suggestionItem);
                suggestionItem.innerHTML = countries[i];

                suggestionItem.addEventListener("mouseenter", hoverOver);
                suggestionItem.addEventListener("mouseleave", hoverOut);
                function hoverOver(e) {
                    e.target.style.backgroundColor = "lightgrey";
                    e.target.style.color = "blue";
                    e.target.addEventListener("click", function(){
                        input.value = e.target.innerHTML;
                        suggestionList.innerHTML = e.target.innerHTML;
                    });
                }
                function hoverOut(e){
                    e.target.style.backgroundColor = "";
                    e.target.style.color = "";
                }
            }
        }

        if (suggestionList.innerHTML === ""){
            suggestionItem = document.createElement("li");
            suggestionList.appendChild(suggestionItem);
            suggestionItem.innerHTML = "No results";
        }
        document.body.addEventListener("click", function(e){
            if (e.target !== input) {
                suggestionsBox.style.display = "none";
            }
            //add click on list item itself
        }, true);
        input.addEventListener("focus", function(){
            suggestionsBox.style.display = "block";
        });
    }

    document.addEventListener("keydown", keySelect);
    function keySelect(e){
        var offset = (suggestionList.offsetHeight - suggestionsBox.offsetHeight);
        switch (e.which) {
        case 40:
            if (k < (items.length-1)) {
                k++;
            }
            if (k < items.length) {
                console.log("you pressed down!");
                items[k].style.backgroundColor = "lightgrey";
                items[k].style.color = "blue";
                if (k > 0){
                    items[k-1].style.backgroundColor = "";
                    items[k-1].style.color = "";
                }
            }
            if ((k > 3) && (y > -offset)) {
                y -= 24;
                suggestionList.style.transform = "translateY("+y+"px)";
            }
            e.preventDefault();
            break;
        case 38:
            if (k > 0){
                items[k].style.color = "";
                items[k].style.backgroundColor = "";
                k--;
                items[k].style.backgroundColor = "lightgrey";
                items[k].style.color = "blue";
            }
            if (items[k].offsetTop < -y) {
                console.log("yay");
                y += 24;
                suggestionList.style.transform = "translateY("+y+"px)";
            }
            e.preventDefault();
            break;
        case 13:
            if (k > -1) {
                input.value = items[k].innerHTML;
                suggestionList.innerHTML = items[k].innerHTML;
                k = -1;
            }
            e.preventDefault();
            break;
        }
    }



})();



var codigo = 2; //1 = morse; 2 = cesar



var dict = {};
dict[" "] = "&nbsp;";
dict["\n"] = "&nbsp;";
dict["a"] = ".-";
dict["b"] = "-...";
dict["c"] = "-.-.";
dict["d"] = "-..";
dict["e"] = ".";
dict["f"] = "..-.";
dict["g"] = "--.";
dict["h"] = "....";
dict["i"] = "..";
dict["j"] = ".---";
dict["k"] = "-.-";
dict["l"] = ".-..";
dict["m"] = "--";
dict["n"] = "-.";
dict["o"] = "---";
dict["p"] = ".--.";
dict["q"] = "--.-";
dict["r"] = ".-.";
dict["s"] = "...";
dict["t"] = "-";
dict["u"] = "..-";
dict["v"] = "...-";
dict["w"] = ".--";
dict["x"] = "-..-";
dict["y"] = "-.--";
dict["z"] = "--..";
dict["1"] = ".----";
dict["2"] = "..---";
dict["3"] = "...--";
dict["4"] = "....-";
dict["5"] = ".....";
dict["6"] = "-....";
dict["7"] = "--...";
dict["8"] = "---..";
dict["9"] = "----.";
dict["0"] = "-----";
dict["."] = ".-.-.-";
dict[","] = "--..--";
dict["!"] = "---.";
dict["?"] = "..--..";





//só permite numeros no textarea
function validate(e) {
    //getting key code of pressed key
    var keycode = (e.which) ? e.which : e.keyCode;
    var phn = document.getElementById('textarea');
    //comparing pressed keycodes
    if (keycode < 48 || keycode > 57) {
        e.preventDefault();
        console.log("FAIL");
        return false;
    } else {
        console.log("OK!");
    }
}


function SetMorse () {
	codigo = 1;
	document.getElementById("BotaoMorse").style.background = "#C4C4C4";
	document.getElementById("BotaoCesar").style.background = "white";

	document.getElementById("senha").style.visibility = "hidden"; 
	document.getElementById("infosenha").style.visibility = "hidden"; 
	document.getElementById("maiszinho").style.visibility = "hidden"; 
	document.getElementById("labelsenha").style.visibility = "hidden"; 



}


function SetCesar () {
	codigo = 2;
	document.getElementById("BotaoMorse").style.background = "white";
	document.getElementById("BotaoCesar").style.background = "#C4C4C4";

	document.getElementById("senha").style.visibility = "visible"; 
	document.getElementById("infosenha").style.visibility = "visible"; 
	document.getElementById("maiszinho").style.visibility = "visible"; 
	document.getElementById("labelsenha").style.visibility = "visible"; 


}

function replaceAll(chars, to, originalString) {
	var str = originalString.replace(chars, to);

	while (str != originalString) {
		originalString = str;
		str = originalString.replace(chars, to);
	}

	return str;
}

function limpaString (str) {
	str = str.toLowerCase();

	str = replaceAll("é", "e", str);
	str = replaceAll("ê", "e", str);
	str = replaceAll("ẽ", "e", str);
	str = replaceAll("è", "e", str);
	str = replaceAll("ë", "e", str);

	str = replaceAll("ã", "a", str);
	str = replaceAll("á", "a", str);
	str = replaceAll("à", "a", str);
	str = replaceAll("â", "a", str);
	str = replaceAll("ä", "a", str);

	str = replaceAll("ó", "o", str);
	str = replaceAll("õ", "o", str);
	str = replaceAll("ô", "o", str);
	str = replaceAll("ò", "o", str);
	str = replaceAll("ö", "o", str);

	str = replaceAll("í", "i", str);
	str = replaceAll("ì", "i", str);
	str = replaceAll("î", "i", str);
	str = replaceAll("ĩ", "i", str);
	str = replaceAll("ï", "i", str);

	str = replaceAll("ú", "u", str);
	str = replaceAll("û", "u", str);
	str = replaceAll("ù", "u", str);
	str = replaceAll("ũ", "u", str);
	str = replaceAll("ü", "u", str);

	str = replaceAll("ç", "c", str);

	str = replaceAll("ñ", "n", str);

	return str;
}

function CodificaMorse() {
    document.getElementById("cyphertext").innerHTML = limpaString(document.getElementById("plaintext").value);
    document.getElementById("cyphertext").className = "morse";
}


function CodificaMorse2 () {
	var plaintext = limpaString(document.getElementById("plaintext").value);
	var cypher = "";
	var len = plaintext.length;
	
	for (var i = 0; i < len; i++) {
		var char = dict[plaintext[i]];
		if (char != undefined){
			cypher = cypher + char + " ";
		}
	}

	document.getElementById("cyphertext").innerHTML = cypher;
	document.getElementById("cyphertext").className = "morse2";
}


var caesar = caesar || (function() {
	var doStaff = function (txt, desp, action) {
		var replace = (function() {
			var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var l = abc.length;
			return function(c) {
				var i = abc.indexOf(c.toLowerCase());
				if (i != -1) {
					var pos = i;
					if (action) {
						// forward
						pos += desp;
						pos -= (pos >= l)?l:0;
					} else {
						// backward
						pos -= desp;
						pos += (pos < 0)?l:0;
					}
					return abc[pos];
				}
				return c;
			};
		})();
		var re = (/([a-z])/ig);
		return String(txt).replace(re, function (match) {
			return replace(match);
		});
	};

	return {
			encode: function(txt, desp) {
			return doStaff(txt, desp, true);
		},
			decode: function(txt, desp) {
			return doStaff(txt, desp, false);
		}
	};
})();

function CodificaCesar()
{
	var senha = parseInt(document.getElementById("senha").value);

	if (isNaN(senha)){
		senha = 0;
	}

	while (senha > 26) {
		senha = senha - 26;
	}

	document.getElementById("cyphertext").innerHTML=caesar.encode(limpaString(document.getElementById("plaintext").value), senha);
	document.getElementById("cyphertext").className = "cesar";   
}
function decodificar()
{
	document.getElementById("resultado").innerHTML=caesar.decode(document.getElementById("cadena").value, 3);
}


function Traduz () {
	
	if (codigo == 1) {
		CodificaMorse2();
	}


	if (codigo == 2) {
		CodificaCesar();
	}
}

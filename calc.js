var screen, value, pattern;

screen = "";
// max length screen 10

value = 0;
pattern = '';


function isPlus() {
	return parseFloat( screen ) > 0;
}

function reset() {
	if ( screen != "" ) {
		screen = "";
		show( "0" );
	}
}
function back() {
	if ( screen.length == 1 ) {
		screen = "";
		show( "0" );
	}
	else if ( screen != "" ) {
		screen = screen.slice( 0, screen.length-1 );
		show( screen );
	}
}

function percent() {
	if ( screen != "" && value != 0 ) {
		if ( pattern == "+" ) {
			value += ( parseFloat( screen ) / 100 * parseFloat( value ) );
		}
		else if ( pattern == "-" ) {
			value -= ( parseFloat( screen ) / 100 * parseFloat( value ) );
		}
		else if ( pattern == "*" ) {
			value *= parseFloat( screen ) / 100;
		}
		else if ( pattern == "/" ) {
			value /= parseFloat( screen ) / 100;
		}
		document.getElementById( "screen-e" ).innerHTML = '%';
		show( value );
		screen = "";
	}
}

function plusMinus() {
	if ( screen != "" ) {
		if ( isPlus() ) {
			addMinus = "-";
			for ( var i=0; i<=screen.length; i++ ) {
				addMinus += screen.charAt( i );
			}
			screen = addMinus;
			isMinus = false;
			show( screen );
		}
		else {
			screen = screen.slice( 1, screen.length );
			isMinus = true;
			show( screen );
		}
	}
}

function number(n) {
	var screenLength;
	screenLength = screen.length;
	if ( screenLength < 10 ) {
		if ( n == '00' && screenLength == 9 ) {
			screen += 0;
		}
		else if ( n == "." && screen.indexOf( "." ) == -1 ) {
			if ( screen == "" ) {
				screen += "0" + n
			}
			else {
				screen += n
			}
		}
		else if ( ( n == 0 || n == "00" ) && screen != "" ) {
			screen += n;
		}
		else if ( n != 0 && n != "00" && n != "." ) {
			screen += n;
		}
	}
	if ( screen == "" ) {
		show( "0" );
	}
	else {
		show( screen );
	}
}

function action(sign) {
	if ( pattern == "" ) {
		if ( sign == "sqrt" && screen != "" ) {
			if ( parseFloat( screen ) < 0 ) {
				screen = "";
				return document.getElementById( "screen-text" ).innerHTML = "Error";
			}
			else {
				value = Math.sqrt( parseFloat( screen ) );
			}
		}
		else if ( screen == "" ) {
			value = 0;
			show( value );
			screen = "";
			return document.getElementById( "screen-e" ).innerHTML = pattern;
		}
		else {
			value = parseFloat( screen );
		}
	}
	else if ( screen != "" ) {
		if ( pattern == "+" ) {
			value += parseFloat( screen );
		}
		else if ( pattern == "-" ) {
			value -= parseFloat( screen );
		}
		else if ( pattern == "*" ) {
			value *= parseFloat( screen );
		}
		else if ( pattern == "/" ) {
			value /= parseFloat( screen );
		}
	}
	else if ( sign == "sqrt" ) {
		if ( parseFloat( screen ) < 0 ) {
			screen = "";
			return document.getElementById( "screen-text" ).innerHTML = "Error";
		}
		else {
			value = Math.sqrt( parseFloat( value ) );
		}
	}
	show( value );
	pattern = sign;
	document.getElementById( "screen-e" ).innerHTML = pattern;
	screen = "";
}
		
function result() {
	if ( screen != "" ) {
		if ( pattern == "+" ) {
			document.getElementById( "screen-e" ).innerHTML = '=';
			value += parseFloat( screen );
		}
		else if ( pattern == "-" ) {
			document.getElementById( "screen-e" ).innerHTML = '=';
			value -= parseFloat( screen );
		}
		else if ( pattern == "*" ) {
			document.getElementById( "screen-e" ).innerHTML = '=';
			value *= parseFloat( screen );
		}
		else if ( pattern == "/" ) {
			document.getElementById( "screen-e" ).innerHTML = '=';
			value /= parseFloat( screen );
		}
	}
	show( value );
	screen = "";
}

function show( number ) {
	if ( number.toString().length > 10 ) {
		if ( parseFloat( number ) > 9999999999 || parseFloat( number ) < -9999999999 ) {
			document.getElementById( "screen-text" ).innerHTML = "long number";
		}
		else {
			document.getElementById( "screen-text" ).innerHTML = (number.toString()).slice( 0, 10 );
		}
	}
	else {
		document.getElementById( "screen-text" ).innerHTML = number;
	}
}

























var doc = activeDocument;

var bR = foregroundColor.rgb.red;

var bG = foregroundColor.rgb.green;

var bB = foregroundColor.rgb.blue 

var myColor = 'rgb('+Math.round(bR) + ',' + Math.round(bG) + ',' + Math.round(bB)+')';

var d = new ActionDescriptor();  

d.putString(stringIDToTypeID("textData"), myColor);  

executeAction(stringIDToTypeID("textToClipboard"), d, DialogModes.NO);  
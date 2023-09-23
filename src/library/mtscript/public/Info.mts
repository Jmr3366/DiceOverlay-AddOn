[h:'<!-- start dialog settings-->']
[h: dialogName = 'Info macro']
[h: height      = 550        ][h: width       = 640        ][h: closebutton = 1          ]
[h: input       = 0          ][h: noframe     = 0          ][h: scrollreset = 1          ]
[h: title       = dialogName ][h: tabtitle    = title      ][h: temporary   = 1          ]
[h: value       = 'data'     ]
[h: props=strPropFromVars("width, height, closebutton, input, noframe, temporary, title, tabtitle, value")]
[h:'<!-- end dialog settings-->

<!-- display dialog -->']

[h: iDiceMin = json.get(getTableEntry("DO_Controls",11),"assetid")]
[h: iDiceMain = json.get(getTableEntry("DO_Controls",12),"assetid")]

[r, dialog5(dialogName, props): {
<html lang="en-au">
	<head>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
	<p>
		<b>For the community. . . .</b><br><br>
		<img src="[r: iDiceMain]" width=100%><br>
		<img src="[r: iDiceMin]" width=15%>
	<p>Controls<br>
		<b>Move:</b> drag and drop<br>
		<b>Min:</b> minimizes the dice<br>
		<b>Clear:</b> clears dice from the field<br>
		<b>Config:</b> runs config macro<br>
		<b>Roll:</b> rolls the dice (both do the same <i>for now</i>)<br>
		<p>
		Each player has their own dice and configuration when token Ownership is checked to All Players<br<br>
	<p><b>Info macro</b><br>This macro . . .
	<p><b>DiceMain macro</b><br>Main Die overlay.<br>Opens the overlay with default settings. See image above for controls.<br>  
	<p><b>ConfigDice macro</b><br>Provides access to all the configuration options available.<br>  
	<p><b>ResetDice macro</b><br>Resets dice to default settings (I have lost mine off view....)<br>  
	<p><b>rollDO macro</b><br>Is a UDF and provides easy integration into current frameworks and other macros.<br>
	<p><b><i>~Utils macro group and macros</i></b><br>Functional macros to make magic happen.<br>
	<p><b>Library Requirements</b><br>
	Lib:org.jmr.diceoverla Database - will be created if it does not exist<br>
	<p><b>Table Requirements</b><br>2 Tables are required,<b>DO_Controls and a Dice Table of your chosing </b><br>
	<p><b>Library Properties</b><br>DiceOverlay<br>(in Lib:org.jmr.diceoverlay Database, you can read it for syntax, simple stuff)<br>
	<p><b>Known bugs and notes</b><br>
	None I am aware of <br><br>	
	<b>Misc Credits</b><br>
	Development and Support staff, the user community, for without their help this would not have been possible.<br>
	<p>@melek#4527 for the initial overlay framework code that provided the spark.<br>
	<p>@Reverend#8587 for the animation code that gave fuel to the fire.<br>
	<p>gunnarskeep (RPTools Forum user) for creating the fantastic die sets as without these images the fire would have been extinguished.<br><br>
	https://forums.rptools.net/viewtopic.php?f=8&t=29377<br>
	<p>and . . .  <br>
	aliasmask, wolfph42 for help with optimizations<br>
	Fullbleed for great feedback, suggestions and look/feel tweaks<br>
	maclud (RPTools Forum user) for creating several new die sets 
	</body>
</html>
}]
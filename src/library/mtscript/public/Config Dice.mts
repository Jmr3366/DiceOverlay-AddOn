[h: tParse = macro.args]
[h: log.info("Config Dice macro.args=" + macro.args)]

[h, if(indexOf(tParse,"^")>=0),CODE:{
	[h: jDice = listGet(tParse,0,"^")]
	[h: tParse = listGet(tParse,1,"^")]
	
 };{[h: jDice = ""]}]

[h: this = getMacroLocation()]

[h: dialogName='Configure Dice']

[h, if(indexOf(tParse,'"close"')>=0),CODE:{
	[h: closeFrame(dialogName)]
	[h: abort(0)]
}]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]
[h: tName = getPlayername()]
[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]


[h: cSize = json.get(jConfig,"size")]
[h: cDiceTable = json.get(jConfig,"dicetable")]
[h: cDSize = json.get(jConfig,"dsize")]
[h: cAutoX = json.get(jConfig,"autox")]
[h: cXplode = json.get(jConfig,"xplode")]
[h: cColor = json.get(jConfig,"color")]
[h: cThrow = json.get(jConfig,"ttype")]
[h: cStartXY = json.get(jConfig,"startxy")]
[h: cFieldXY = json.get(jConfig,"fieldxy")]
[h: chatchan = json.get(jConfig,"chat")]
[h: chatt = json.get(jConfig,"chatt")]
[h: chatf = json.get(jConfig,"chatf")]
[h: chatb = json.get(jConfig,"chatb")]
[h: cminimg = json.get(jConfig,"minimg")]
[h: cxpbg = json.get(jConfig,"xpbg")]
[h: cpColor = upper(listGet(cColor,0),1)]
[h: csColor = upper(listGet(cColor,1),1)]
[h: FullColorList = json.get(getTableEntry(cDiceTable,0),"value")+",Random"]

[h: chatt = if(chatt=="","black",chatt)]
[h: chatf = if(chatf=="","blue",chatf)]
[h: chatb = if(chatb=="","lightblue",chatb)]


[h: tVar = cminimg+",1,2,3,4,5,6,7,8,9,10"]
[h: vMinDrop = listformat( tVar, "<select name='minimg'>%list</select>", "<option value='%item'>%item</option>", "" )]

[h: tVar = cxpbg+",1,2,3,4,5,6,7,8,9"]
[h: vExpDrop = listformat( tVar, "<select name='xpbg'>%list</select>", "<option value='%item'>%item</option>", "" )]

[h: tVar = cThrow+",Plain,Bounce,Crazy "]
[h: vThrowDrop = listformat( tVar, "<select name='ttype'>%list</select>", "<option value='%item'>%item</option>", "" )]

[h: tVar = cDiceTable+","+getTableNames()] 
[h: vTableHTML = listformat( tVar, "<select name='dicetable'>%list</select>", "<option value='%item'>%item</option>", "" )]

[h: processorLink = '"'+macroLinkText("Config Dice@"+this,"self", "", "")+'"']

[h: vColorList = cpColor+", "+FullColorList]
[h: pcolorlist=listformat( vColorList, "<select name='pcolor'>%list</select>", "<option value='%item'>%item</option>", "" )]


[h: aixFR = json.get(getTableEntry("DO_Controls",20),"assetid")]
[h: aixGFR = json.get(getTableEntry("DO_Controls",21),"assetid")]
[h: aixFB = json.get(getTableEntry("DO_Controls",22),"assetid")]
[h: aixGFB = json.get(getTableEntry("DO_Controls",23),"assetid")]
[h: aixPwG = json.get(getTableEntry("DO_Controls",24),"assetid")]
[h: aixFXi = json.get(getTableEntry("DO_Controls",25),"assetid")]
[h: aixFXpg = json.get(getTableEntry("DO_Controls",26),"assetid")]
[h: aixFXpp = json.get(getTableEntry("DO_Controls",27),"assetid")]
[h: aixFXs = json.get(getTableEntry("DO_Controls",28),"assetid")]

[h: css='
	<style>
	a, td, th {font-size:.96em}
	.outerTable { background-color:white; color:black }
	
	.ixSm { position: relative; top:-15px; left:-5px; height: 65px; width: 0px; transform:scale(0.5);}
	
	.ixFR {  height: 120px;  width: 120px; background-image: url('+aixFR+');}
	.ixGFR {  height: 120px;  width: 120px; background-image: url('+aixGFR+');}
	.ixFB {  height: 120px;  width: 120px; background-image: url('+aixFB+');}
	.ixGFB {  height: 120px;  width: 120px; background-image: url('+aixGFB+');}
	.ixPwG {  height: 120px;  width: 120px; background-image: url('+aixPwG+');}
	.ixFXi {  height: 120px;  width: 120px; background-image: url('+aixFXi+');}
	.ixFXpg {  height: 120px;  width: 120px; background-image: url('+aixFXpg+');}
	.ixFXpp {  height: 120px;  width: 120px; background-image: url('+aixFXpp+');}
	.ixFXs {  height: 120px;  width: 120px; background-image: url('+aixFXs+');}
		
	</style>
	
	']

[h: dialogSettings= "
	width=550; 
	height=720; 
	input=1; 
	temporary=1; 
	title=Configure Dice; 
	noframe=0;
	closebutton=1;
	scrollreset=0
	"]

[h, if(length(tParse)>10),CODE:{
	[h: cSize = json.get(tParse,"size")]
	[h: cSize = if(cSize<=0,0.5,cSize)]


	[h: jConfig = json.set(jConfig,"size",cSize)]
	[h: cDSize = json.get(tParse,"dsize")]
	[h: jConfig = json.set(jConfig,"size",cSize)]
	[h: cDSize = json.get(tParse,"dsize")]
	[h: cDSize = if(cSize<=0.2,0.5,cDSize)]
	
	[h: cThrowType = json.get(tParse,"ttype")]
	[h: jConfig = json.set(jConfig,"ttype",cThrowType)]

	[h: xplode = if(indexOf(tParse,'"xplode"')<0,0,1)]
	[h: autox = if(indexOf(tParse,'"autox"')<0,0,1)]
	[h: xplode = if(autox,1,xplode)]
	[h: autox = if(xplode,autox,0)]
	
	[h: jConfig = json.set(jConfig,"autox",autox)]
	[h: jConfig = json.set(jConfig,"xplode",xplode)]
	
	[h: jConfig = json.set(jConfig,"dsize",cDSize)]
	[h: cpColor = lower(json.get(tParse,"pcolor"))]
	[h: csColor = "random")]
	[h: cColor = cpColor+","+csColor+",random"]
	[h: jConfig = json.set(jConfig,"color",cColor)]

	[h: cDiceTable = json.get(tParse,"dicetable")]
	[h: jConfig = json.set(jConfig,"dicetable",cDiceTable)]

	[h: cStartXY = lower(json.get(tParse,"startxy"))]
	[h: cStartXY = if(cStartXY=="","0:0",cStartXY)]
	[h: jConfig = json.set(jConfig,"startxy",cStartXY)]

	[h: cFieldXY = json.get(tParse,"fieldxy")]
	[h: cFieldXY = if(cFieldXY=="","0:0",cFieldXY)]
	[h: jConfig = json.set(jConfig,"fieldxy",cFieldXY)]
	
	[h: jConfig = json.set(jConfig,"fieldxy",cFieldXY)]

	[h: chatchan = json.get(tParse,"cchan")]
	[h: jConfig = json.set(jConfig,"chat",chatchan)]

	[h: chatt = json.get(tParse,"chatt")]
	[h: jConfig = json.set(jConfig,"chatt",chatt)]
	
	[h: chatf = json.get(tParse,"chatf")]
	[h: jConfig = json.set(jConfig,"chatf",chatf)]
	
	[h: chatb = json.get(tParse,"chatb")]
	[h: jConfig = json.set(jConfig,"chatb",chatb)]

	[h: cminimg = json.get(tParse,"minimg")]
	[h: cminimg = if(cminimg<0 || cminimg=="",0,cminimg)]
	[h: jConfig = json.set(jConfig,"minimg",cminimg)]
	[h: jConfig = json.set(jConfig,"min",0)]

	[h: cxpbg = json.get(tParse,"xpbg")]
	[h: cxpbg = if(cxpbg<0 || cxpbg=="",0,cxpbg)]
	[h: jConfig = json.set(jConfig,"xpbg",cxpbg)]

	[h: xLastRoll = json.get(jConfig,"xlastroll")]
	[h: jConfig = json.set(jConfig,"xlastroll",xLastRoll)]
	[h: jSourceConfig = json.set(jSourceConfig,tName,jConfig)]
	[h: jDice = json.get(tParse,"jdice")]
	[h: setLibProperty("DiceOverlay",jSourceConfig,this)]
	[macro("Dice Main@"+this):jDice]
	[h: linkText = macroLinkText("Config Dice@"+this,"",jDice+"^")]
	[h: execlink(linkText,1,"self")]
};{	
	[h: mImg1 = json.get(getTableEntry("DO_Controls",1),"assetid")]
	[h: mImg2 = json.get(getTableEntry("DO_Controls",2),"assetid")]
	[h: mImg3 = json.get(getTableEntry("DO_Controls",3),"assetid")]
	[h: mImg4 = json.get(getTableEntry("DO_Controls",4),"assetid")]
	[h: mImg5 = json.get(getTableEntry("DO_Controls",5),"assetid")]
	[h: mImg6 = json.get(getTableEntry("DO_Controls",6),"assetid")]
	[h: mImg7 = json.get(getTableEntry("DO_Controls",7),"assetid")]
	[h: mImg8 = json.get(getTableEntry("DO_Controls",8),"assetid")]
	[h: mImg9 = json.get(getTableEntry("DO_Controls",9),"assetid")]
	[h: mImg10 = json.get(getTableEntry("DO_Controls",10),"assetid")]
	[h: formHTML=strformat('
		
	<html>
	%{css}
	<body>
	<form action=%{processorLink} method="json">

	<div style="float: right"><input type="submit" name="apply" value="Apply Changes"></div>
	<div style="font-size:12pt" align="center"><b>&emsp; &emsp; &emsp; &emsp; &ensp; &nbsp; Throw and Field</b></div>
	<input type="text" value=%{cStartXY} name="startxy">Start of Throw (X:Y <b>or</b> selected)<br>
	<input type="text" value=%{cFieldXY} name="fieldxy">Size of Field (width:height <b>or</b> 0:0 is view area)<br>
	<input type="hidden" name="ttype" >%{vThrowDrop} Throw Type

	<hr>
	<div style="font-size:12pt" align="center"><b>Die Table and Colors</b><br>
	<font style="font-size:9pt">If Dice Table changed, you must Apply Changes to take affect</div><font style="font-size:12pt">
	<input type="hidden" name="dicetable" >%{vTableHTML} Dice Table Name <br>
	<input type="hidden" name="pcolor" value="Random">%{pcolorlist} Primary color<br>
	<hr>
	<div style="font-size:12pt" align="center"><b>Die and Controls Size</b><br>
	<font style="font-size:9pt">(0.1 is microscopic, 10 is MASSIVE)</div><font style="font-size:12pt">
	<input type="text" value=%{cSize} name="size">Controls Size<br>
	<input type="text" value=%{cDSize} name="dsize">Dice Size<br>
	<hr>
	<div style="font-size:12pt" align="center"><b>Minimize Icon and Explosion options</b></div>
	<input type="hidden" name="minimg" >%{vMinDrop} Minimize Icon<br>
	<table class="outerTable" width="100%" cellspacing="3" cellpadding="0">
	
	<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
	<tr>
	<td><img src="%{mImg1}" width=100%></td>
	<td><img src="%{mImg2}" width=100%></td>
	<td><img src="%{mImg3}" width=100%></td>
	<td><img src="%{mImg4}" width=100%></td>
	<td><img src="%{mImg5}" width=100%></td>
	<td><img src="%{mImg6}" width=100%></td>
	<td><img src="%{mImg7}" width=100%></td>
	<td><img src="%{mImg8}" width=100%></td>
	<td><img src="%{mImg9}" width=100%></td>
	<td><img src="%{mImg10}" width=100%></td>
	</tr>
	</table>
	<input type="checkbox" name="xplode" value=1 '+if(cXplode,'checked', '')+'>Explodable Die
	<input type="hidden" name="xpbg" >%{vExpDrop} Explode Background 
	<input type="checkbox" name="autox" value=1 '+if(cAutoX,'checked', '')+'>Auto-Explode<br>
	<table class="outerTable" width="100%" cellspacing="0" cellpadding="-3">
	<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
	<tr>
	<td><div class="ixSm"><div class="ixFR"></div></div></td>
	<td><div class="ixSm"><div class="ixGFR"></div></div></td>
	<td><div class="ixSm"><div class="ixFB"></div></div></td>
	<td><div class="ixSm"><div class="ixGFB"></div></div></td>
	<td><div class="ixSm"><div class="ixPwG"></div></div></td>
	<td><div class="ixSm"><div class="ixFXi"></div></div></td>
	<td><div class="ixSm"><div class="ixFXpg"></div></div></td>
	<td><div class="ixSm"><div class="ixFXpp"></div></div></td>
	<td><div class="ixSm"><div class="ixFXs"></div></div></td>
	</tr>
	</table>
	<hr>
	<div style="font-size:12pt" align="center"><b>Chat Channel and Colors </b></div>
	<input type="text" value=%{chatchan} name="cchan">Chat Channel (dice output spew)<br>
	<input type="text" value=%{chatt} name="chatt">Chat Color<br>
	<input type="text" value=%{chatb} name="chatb">Chat Background<br>
	<input type="text" value=%{chatf} name="chatf">Chat Frame<br>
	https://www.w3schools.com/tags/ref_colornames.asp
	<div style="font-size:12pt" align="center" valign="bottom"><br>
	<input type="submit" name="apply" value="Apply Changes">
	<input type="submit" name="close" value="Close"></div>
	<input type="hidden" name="jdice" value=%{jDice}>
	</body>
	</html>')]
	[r, dialog5(dialogName, dialogSettings):{
		[r: formHTML]
	}]
}]
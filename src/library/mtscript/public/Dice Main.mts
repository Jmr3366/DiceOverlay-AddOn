[h: tParse = macro.args]

[h: this = getMacroLocation()]

[h: overlayName = "DiceOverlay"]
[h: tName = getPlayername()]

[h: jSourceConfig = getLibProperty("DiceOverlay",this)]

[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]

[h, if(indexOf(tParse,"^max")>=0),CODE:{
	[h: jConfig = json.set(jConfig,"min",0)]
	[h: jSourceConfig = json.set(jSourceConfig,tName,jConfig)]
	[h: setLibProperty("DiceOverlay",jSourceConfig,this)]
	[h: tParse = listGet(tParse,0,"^")]
}]


[h: fSize = json.get(jConfig,"size")]
[h: fColor = json.get(jConfig,"color")]
[h: cLocXY = json.get(jConfig,"locxy")]
[h: locX = listGet(cLocXY,0,":")]
[h: locY = listGet(cLocXY,1,":")]

[h: jDice = if(tParse=="",'{"d2":"","d4":"","d6":"","d8":"","d10":"","d12":"","d20":""}',tParse)]

[h: jsDice = substring(jDice,1,length(jDice)-1)]
[h: jsDice = replace(jsDice,'"','')]

[h: cMaxX = round(765*fSize,0)]
[h: cMaxY = round(94*fSize,0)]

[h: cControlX = round(45*fSize,0)]
[h: cControlY = round(45*fSize,0)]

[h: cDieX = round(90*fSize,0)]
[h: cAddY = round(60*fSize,0)]


[h: cMin = 		cControlX+","				+"0,"						+round(cControlX*2,0)+","			+cControlY]
[h: cConfig = 	"0,"						+cControlY+","				+cControlX+","						+cMaxY]
[h: cRollL =	cControlX+","				+cControlY+","				+round(cControlX*2,0)+","			+cMaxY]
[h: cClear =	round(cDieX*8,0)+","		+"0,"						+cMaxX+","							+cControlY]
[h: cRollR =	round(cDieX*8,0)+","		+cControlY+","				+cMaxX+","							+cMaxY]

[h: cD2a =		cDieX+","					+"0,"						+round(cDieX*2,0)+","				+cAddY]
[h: cD2s =		cDieX+","					+cAddY+","					+round(cDieX*2,0)+","				+cMaxY]
[h: cD4a =		round(cDieX*2,0)+","		+"0,"						+round(cDieX*3,0)+","				+cAddY]
[h: cD4s =		round(cDieX*2,0)+","		+cAddY+","					+round(cDieX*3,0)+","				+cMaxY]
[h: cD6a =		round(cDieX*3,0)+","		+"0,"						+round(cDieX*4,0)+","				+cAddY]
[h: cD6s =		round(cDieX*3,0)+","		+cAddY+","					+round(cDieX*4,0)+","				+cMaxY]
[h: cD8a =		round(cDieX*4,0)+","		+"0,"						+round(cDieX*5,0)+","				+cAddY]
[h: cD8s =		round(cDieX*4,0)+","		+cAddY+","					+round(cDieX*5,0)+","				+cMaxY]
[h: cD10a =		round(cDieX*5,0)+","		+"0,"						+round(cDieX*6,0)+","				+cAddY]
[h: cD10s =		round(cDieX*5,0)+","		+cAddY+","					+round(cDieX*6,0)+","				+cMaxY]
[h: cD12a =		round(cDieX*6,0)+","		+"0,"						+round(cDieX*7,0)+","				+cAddY]
[h: cD12s =		round(cDieX*6,0)+","		+cAddY+","					+round(cDieX*7,0)+","				+cMaxY]
[h: cD20a =		round(cDieX*7,0)+","		+"0,"						+round(cDieX*8,0)+","				+cAddY]
[h: cD20s =		round(cDieX*7,0)+","		+cAddY+","					+round(cDieX*8,0)+","				+cMaxY]


[h: counterXoffset = round(55*fSize,0)]
[h: counterWidth = round((750*fSize)-(60*fSize),0)]

[h: iDice = json.get(getTableEntry("DO_Controls",0),"assetid")]

[h: linkMin = macroLinkText("MinDice@lib:org.jmr.diceoverlay", "", jDice)]
[h: linkRoll = macroLinkText("RollDice@lib:org.jmr.diceoverlay", "", "new^"+jDice)]
[h: linkRollL = macroLinkText("RollDice@lib:org.jmr.diceoverlay", "", "newc^"+jDice)]
[h: linkConfig = macroLinkText("Config Dice@lib:org.jmr.diceoverlay", "", jDice+"^")]
[h: linkMin = macroLinkText("MinDice@lib:org.jmr.diceoverlay", "", jDice)]
[h: linkClear = macroLinkText("ClearDice@lib:org.jmr.diceoverlay", "", "")]
[h: linkAddSub = macroLinkText("AddSubDie@lib:org.jmr.diceoverlay", "", jDice+"^")]

[overlay(overlayName, "zorder=7;"):{
	<style>[r: '.placement {position: relative;top:'+locY+'px;left:'+locX+'px;}']</style>
	<div class="placement"><img src="[r: iDice]" width=[r:cMaxX]; style="--pointermap:blockopaque;" draggable=false usemap='#mainSelect'; ></div>
	<map name="mainSelect">
	 	<area shape="rect" coords="[r:cConfig]" href="[r: linkConfig]" title="Configure" >
	 	<area shape="rect" coords="[r:cMin]" href="[r: linkMin]" title="Minimize" >
	 	<area shape="rect" coords="[r:cRollR]" href="[r: linkRoll]" title="Roll 'em" >
	 	<area shape="rect" coords="[r:cRollL]" href="[r: linkRollL]" title="Crazy roll" >
	 	<area shape="rect" coords="[r:cClear]" href="[r: linkClear]" title="Clear all" >
	 	<area shape="rect" coords="[r:cD2a]" href="[r: linkAddSub]d2a" title=" + D2" >
	 	<area shape="rect" coords="[r:cD2s]" href="[r: linkAddSub]d2s" title=" - D2" >
	 	<area shape="rect" coords="[r:cD4a]" href="[r: linkAddSub]d4a" title=" + D4" >
	 	<area shape="rect" coords="[r:cD4s]" href="[r: linkAddSub]d4s" title=" - D4" >
	 	<area shape="rect" coords="[r:cD6a]" href="[r: linkAddSub]d6a" title=" + D6" >
	 	<area shape="rect" coords="[r:cD6s]" href="[r: linkAddSub]d6s" title=" - D6" >
	 	<area shape="rect" coords="[r:cD8a]" href="[r: linkAddSub]d8a" title=" + D8" >
	 	<area shape="rect" coords="[r:cD8s]" href="[r: linkAddSub]d8s" title=" - D8" >
	 	<area shape="rect" coords="[r:cD10a]" href="[r: linkAddSub]d10a" title=" + D10" >
	 	<area shape="rect" coords="[r:cD10s]" href="[r: linkAddSub]d10s" title=" - D10" >
	 	<area shape="rect" coords="[r:cD12a]" href="[r: linkAddSub]d12a" title=" + D12" >
	 	<area shape="rect" coords="[r:cD12s]" href="[r: linkAddSub]d12s" title=" - D12" >
	 	<area shape="rect" coords="[r:cD20a]" href="[r: linkAddSub]d20a" title=" + D20" >
	 	<area shape="rect" coords="[r:cD20s]" href="[r: linkAddSub]d20s" title=" - D20" >
	</map>
<style>[r: '.dicetable {position: relative;top:'+(locY)+'px;left:'+(locX+counterXoffset)+'px; width:'+(counterWidth)+'px;  table-layout: fixed; font-size:'+round(fSize*33,0)+'px; border-left: '+counterXoffset+'px solid transparent;}']</style>

	<table class="dicetable" style="color:white";>
<tr>
	<td>[r:json.get(jDice,"d2")]</td>
	<td>[r:json.get(jDice,"d4")]</td>
    <td>[r:json.get(jDice,"d6")]</td>
    <td>[r:json.get(jDice,"d8")]</td>
    <td>[r:json.get(jDice,"d10")]</td>
    <td>[r:json.get(jDice,"d12")]</td>
    <td>[r:json.get(jDice,"d20")]</td>
    </tr>
</table>
	</b>

	
	[r:'
	<style>
		#dropped { display: none; }
		#dragimg { --pointermap:block; position:  absolute;top: '+locY+'px;left:'+locX+'px; width:'+cControlX+'px; height:'+cControlY+'px; background-image: url('+iDice+'); background-size:'+cMaxX+'px;}

	</style>
	<a id="dropped" href="macro://Drop@'+this+'/self/Impersonated?'+jsDice+',"></a>

	<div id="dragimg" style="" title="Move"></div>
	<script>
		"use strict"
		const dropd = document.getElementById("dropped");
		const posx = document.getElementById("posX");
		const posy = document.getElementById("posY");
		const posjson = document.getElementById("posjson");

		var startNow = new Date();	
		var mysteryJSON = new Object();
			
		dragElement(document.getElementById("dragimg"));

		function dragElement(elmnt) {
				var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
				if (document.getElementById(elmnt.id + "header")) {
				    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
				} else {
				    elmnt.onmousedown = dragMouseDown;		    				    
				}
		  	function dragMouseDown(e) {
		  		var timeNow = new Date();
			    e = e || window.event;
			    e.preventDefault();
			    // get the mouse cursor position at startup:
			    pos3 = e.clientX;
			    pos4 = e.clientY;
			    document.onmouseup = closeDragElement;
			    // call a function whenever the cursor moves:
			    document.onmousemove = elementDrag;
			    startNow = timeNow.getTime();
			}
		  	function elementDrag(e) {		  		
		  		var timeNow = new Date();
		  		var dragTime = timeNow.getTime();	
			    e = e || window.event;
			    e.preventDefault();
			    // calculate the new cursor position:
			    pos1 = pos3 - e.clientX;
			    pos2 = pos4 - e.clientY;
			    pos3 = e.clientX;
			    pos4 = e.clientY;
			    // set the elements new position:
			    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
			    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          		mysteryJSON["x"] = elmnt.offsetLeft - pos2;
			    mysteryJSON["y"] = elmnt.offsetTop - pos2;
			    	
    			mysteryJSON["time"] = dragTime;
    			mysteryJSON["time2"] = startNow;
			}
			
			function closeDragElement() {
			  	document.onmouseup = null;
		        document.onmousemove = null;
			  	let tmp = dropd.href;			  
			  	dropd.href = dropd.href +  encodeURIComponent(JSON.stringify(mysteryJSON));
			  	dropd.click();
			  	dropd.href = tmp;
			}

		}
	</script>

  ']

}]
[h: jDice = macro.args]

[h: this = "Lib:org.jmr.diceoverlay"]

[h: overlayName = "DiceOverlay"]
[h: tName = getPlayername()]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]

[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]
[h: fSize = json.get(jConfig,"size")]
[h: fColor = json.get(jConfig,"color")]
[h: cLocXY = json.get(jConfig,"locxy")]
[h: fLocX = listGet(cLocXY,0,":")]
[h: fLocY = listGet(cLocXY,1,":")]
[h: fMinN = json.get(jConfig,"minimg")]
[h: iDiceMin = json.get(getTableEntry("DO_Controls",fMinN),"assetid")]

[h: jsDice = substring(jDice,1,length(jDice)-1)]
[h: jsDice = replace(jsDice,'"','')]

[h: jConfig = json.set(jConfig,"min",1)]
[h: jSourceConfig = json.set(jSourceConfig,tName,jConfig)]
[h: setLibProperty("DiceOverlay",jSourceConfig,this)]

[h: cMaxX = round(100*fSize,0)]
[h: cMaxY = round(100*fSize,0)]

[h: cControlX = round(25*fSize,0)]
[h: cControlY = round(25*fSize,0)]

[h: cClear = 	cControlX+","				+"0,"						+cMaxX+","							+cControlY]
[h: cMax = 		"0,"						+cControlY+","				+cMaxX+","							+cMaxY]

[h: linkMax = macroLinkText("Dice Main@"+this, "", jDice+"^")]
[h: linkClear = macroLinkText("ClearDice@"+this, "", "min")]

[overlay("DiceOverlay", "zorder=5;"):{
	<style>[r: '.placement {position: relative;top: '+fLocY+'px;left:'+fLocX+'px;}']</style>
	<div class="placement"><img src="[r: iDiceMin]" width=[r:cMaxX] style="--pointermap:blockopaque;" draggable=false usemap='#mainSelect'></div>
	<map name="mainSelect">
	 	<area shape="rect" coords="[r:cClear]" href="[r: linkClear]" title="Clear all" >
	 	<area shape="rect" coords="[r:cMax]" href="[r: linkMax]max" title="Maximize" >
	</map>
	[r:'
	<style>
		#dropped { display: none; }
		#dragimg { --pointermap:block; position:  absolute;top: '+fLocY+'px;left:'+fLocX+'px; width:'+cControlX+'px; height:'+cControlY+'px; background-image: url('+iDiceMin+'); background-size:'+cMaxX+'px;}

	</style>
	<a id="dropped" href="macro://Drop@'+this+'/self/Impersonated?'+jsDice+',"></a>

	<div id="dragimg" style="" title="Move"></div>
	<script>
		"use strict"
		const dropd = document.getElementById("dropped");
		const posx = document.getElementById("posX");
		const posy = document.getElementById("posY");
		const posjson = document.getElementById("posjson");
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
			    e = e || window.event;
			    e.preventDefault();
			    // get the mouse cursor position at startup:
			    pos3 = e.clientX;
			    pos4 = e.clientY;
			    document.onmouseup = closeDragElement;
			    // call a function whenever the cursor moves:
			    document.onmousemove = elementDrag;
			}
		  	function elementDrag(e) {
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
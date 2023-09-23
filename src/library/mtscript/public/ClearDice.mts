[h: tParse = macro.args]

[h: this = getMacroLocation()]

[h: tName = getPlayername()]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]

[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]

[h: cchan = json.get(jConfig,"chat")]

[h: linkRoll = macroLinkText("RollShow@"+this, cchan,tName+"^<html></html>")]  
[r: execLink(linkRoll, 0, cchan)]

[h, if(tParse=="min"),CODE:{
	[macro("MinDice@"+this):""]
	};{
	[macro("Dice Main@"+this):""]
}]

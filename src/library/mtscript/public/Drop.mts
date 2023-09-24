



[h, if(indexOf(macro.args,"d2")>=0),CODE:{
	[h: jDice = "{"+substring(macro.args,0,indexOf(macro.args,"{"))+"}"]
	[h: jDice = replace(jDice,'d','"d')]
	[h: jDice = replace(jDice,':','":')]
	[h: jDice = replace(jDice,':,',':"",')]
	[h: jDice = replace(jDice,'",}','"}')]
	[h: jDice = replace(jDice,',}','}')]
	[h: tParse = substring(macro.args,indexOf(macro.args,"{"))]
};{
	[h: jDice = ""]
	[h: tParse = macro.args]
}]
[h: broadcast(tParse)]


[h: tTimeOne = number(json.get(tParse,"time"))]
[h: tTimeTwo = number(json.get(tParse,"time2"))]
[h: tTimeNow = json.get(getInfo("server"),"timeInMs")]

[h: mTestA = (tTimeOne - tTimeTwo)]
[h: mTestB = (tTimeNow - tTimeTwo)]

[h: broadcast(mTestA+"^"+mTestB)]

[h: locX = json.get(tParse,"x")]
[h: locY = json.get(tParse,"y")]
[h, if(locX=="" || locY==""),CODE:{
	[h: abort(0)]
}]
[h: this = "Lib:org.jmr.diceoverlay"]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]
[h: tName = getPlayername()]

[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]

[h: vMin = json.get(jConfig,"min")]

[h: jConfig = json.set(jConfig,"locxy",locX+":"+locy)]

[h: jSourceConfig = json.set(jSourceConfig,tName,jConfig)]
[h: setLibProperty("DiceOverlay",jSourceConfig,this)]

[h, if(vMin),CODE:{
	[macro("MinDice@"+this):jDice]
};{
	[macro("Dice Main@"+this):jDice]
}]
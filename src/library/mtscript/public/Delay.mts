[h: runOnce = listGet(macro.args,0,"^")]

[h: rollType = listGet(runOnce,0,":")]
[h: rDOfSize = listGet(rollType,1,"~")]
[h: rollType = if(rDOfSize=="",rollType,listGet(rollType,0,"~"))]

[h: runOnce = if(rollType=="",listGet(macro.args,0,"^"),listGet(runOnce,1,":"))]

[h: tDelay = number(listGet(macro.args,1,"^"))]
[h: timeStart = listGet(macro.args,2,"^")]
[h: cchan = listGet(macro.args,3,"^")]
[h: DiceOutputText = listGet(macro.args,4,"^")]
[h: tName = listGet(macro.args,5,"^")]
[h: fDiceAnim = listGet(macro.args,6,"^")]
[h: macroArgs = rollType+if(rDOfSize=="","","~"+rDOfSize)+if(rollType=="","",":")+runOnce+"^"+tDelay+"^"+timeStart+"^"+cchan+"^"+DiceOutputText+"^"+tName]

[h: this = getMacroLocation()]

[h: timeCurrent = json.get(getInfo("server"),"timeInMs")]

[h, if(timeCurrent - timeStart>= (tDelay*1000)), CODE:	{
	[h: deferLink = ""]
	[h: jSourceConfig=getLibProperty("DiceOverlay",this)]
	[h: jConfig = json.get(jSourceConfig,tName)]
	[h: xPlode = json.get(json.get(jConfig,"xlastroll"),"yes")]
	[h, if(xPlode),CODE:{
		[h: execFunction("playClip", json.append("[]", "https://cdn.discordapp.com/attachments/806124475284324392/1005293920793669743/Explosion_Powder.mp3", 1, 0.05), 0, "all")]
	}]
	[h: broadcast(rollType,"all")]
	[h, if(rollType<3 && tName==getPlayerName()),CODE:{
		[h: broadcast(DiceOutputText,cchan)]
		
	}]
	[h, if(rollType==3),CODE:{
		[h: deferLink = macroLinkText("RollDice@"+this,"","hotbox^")]
		[h: broadcast(DiceOutputText,cchan)]
	}]
	[h, if(rollType==4),CODE:{
		[h: deferLink = ""]
		[h: broadcast(DiceOutputText,cchan)]
		[h: macro.return=DiceOutputText]
	}]
	[h, if(rollType==7),CODE:{
		[h: deferLink = macroLinkText("RollDice@"+this,"","rolldox^"+rDOfSize+"^")]
		[h: broadcast(DiceOutputText,cchan)]
	}]
  };{
		[h, if(runOnce==0), CODE:{
				[macro("RollShow@"+this):tName+"^"+fDiceAnim]	
				[h: macroArgs = rollType+if(rDOfSize=="","","~"+rDOfSize)+if(rollType=="","",":")+"1^"+tDelay+"^"+timeStart+"^"+cchan+"^"+DiceOutputText+"^"+tName]
				[h: deferLink = macroLinkText("Delay@"+this,"",macroArgs)]
			};{
				[h: deferLink = macroLinkText("Delay@"+this,"",macroArgs)]
			}]		
}]
[h, if(runOnce==0), CODE:{
	[h, while(runOnce<250),CODE:{
		[h: runOnce=runOnce+1]
	}]
	[h: execFunction("playClip", json.append("[]", "https://cdn.discordapp.com/attachments/823396251847360582/976514472522940466/Throw_Dice.mp3", 1, 0.3), 0, "all")]
}]
[h: execLink(deferLink,1,"self")]

[h: tArgs = argCount()-1]
[h: iDice = arg(0)]

[h: this = getMacroLocation()]

[h, if(iDice==""):assert(0,"rollDO - Syntax Error")]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]

[h: tName = getPlayername()]

[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]

[h: fColor = json.get(jConfig,"color")]
[h: pColor = listGet(fColor,0)]
[h: sColor = listGet(fColor,1)]

[h: cDiceTable = json.get(jConfig,"dicetable")]

[h, if(tArgs>=1):iColor = arg(1);iColor = ""]
[h, if(tArgs>=2):rSize = arg(2);rSize = json.get(jConfig,"dsize")]
[h: iColor = lower(iColor)]
[h: FullColorList = json.get(getTableEntry(cDiceTable,0),"value")]

[h: nD2 = 0]	[h: nD4 = 0]	[h: nD6 = 0]	[h: nD8 = 0]	[h: nD10 = 0]	[h: nD12 = 0]	[h: nD20 = 0]

[h: rColorList = ""]
[h: colorCnt = listCount(iColor)]
[h: lastColor = pColor]
[h: jDice = '{"d2":"","d4":"","d6":"","d8":"","d10":"","d12":"","d20":""}']
[h: jDiceOrder = ""]
[h: rdResultList =  '{"d2":"","d4":"","d6":"","d8":"","d10":"","d12":"","d20":""}']
[h: rdColorList = ""]
[h: rdBonusList = ""]
[h: tVar = 0]
[h, foreach(oDie,iDice),CODE:{
	[h: dCnt = substring(oDie,0,indexOf(oDie,"d"))]
	[h: drType = substring(oDie,indexOf(oDie,"d"))]
	[h: dType = listGet(drType,0,":")]
	[h, if(indexOf(drType,":")>=0),CODE:{
		[h: rdRes = substring(drType,indexOf(drType,":")+1)]
      };{
      	[h: rdRes = ""]		
	}]
	[h: rdBonusVal = 0]
	[h, if(indexOf(dType,"+")>=0),CODE:{
		[h: rdBonusVal = "+ "+substring(dType,indexOf(dType,"+")+1)]
		[h: dType = substring(dType,0,indexOf(dType,"+"))]
	}]
	[h, if(indexOf(dType,"-")>=0),CODE:{
		[h: rdBonusVal = "- "+substring(dType,indexOf(dType,"-")+1)]
		[h: dType = substring(dType,0,indexOf(dType,"-"))]
	}]
	[h: cCnt = json.get(jDice,dType)]
	[h, switch(dType), CODE:
		case "d2":{			
			[h: jDice = json.set(jDice,"d2",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d2",rdRes)]
		};
		case "d4":{			
			[h: jDice = json.set(jDice,"d4",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d4",rdRes)]
		};
		case "d6":{			
			[h: jDice = json.set(jDice,"d6",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d6",rdRes)]
		};
		case "d8":{			
			[h: jDice = json.set(jDice,"d8",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d8",rdRes)]
		};
		case "d10":{			
			[h: jDice = json.set(jDice,"d10",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d10",rdRes)]
		};
		case "d12":{			
			[h: jDice = json.set(jDice,"d12",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d12",rdRes)]
		};
		case "d20":{			
			[h: jDice = json.set(jDice,"d20",dCnt+cCnt)]
			[h: rdResultList = json.set(rdResultList,"d20",rdRes)]
		}]
	[h, while(dCnt!=0),CODE:{
		[h: rColor = if(listCount(iColor)>tVar,listGet(iColor,tVar),lastColor)]
		[h: rdColorList = listAppend(rdColorList,rColor)]
		[h: lastColor = rColor]		
		[h: rdBonusList = listAppend(rdBonusList,rdBonusVal)]
		[h: jDiceOrder = listAppend(jDiceOrder,dType)]
		[h: dCnt = dCnt - 1]
	}]
	[h: tVar = tVar + 1]
}]
[h: macroArgs = "rolldo^"+rdResultList+"~"+rdBonusList+"~"+rdColorList+"~"+rSize+"~"+jDiceOrder+"^"+jDice]

[h, macro("RollDice@"+this):macroArgs]

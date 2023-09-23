[h: tParse = macro.args]

[h: this = getMacroLocation()]

[h: dCR = decode("%0A")]
[h: tName = getPlayername()]

[h: jSourceConfig=getLibProperty("DiceOverlay",this)]
[h, if(indexOf(jSourceConfig,tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig,"~newuser~")]
  };{
	[h: jConfig = json.get(jSourceConfig,tName)]
}]

[h: tXplode = number(json.get(jConfig,"xplode"))]
[h: autoXplode = number(json.get(jConfig,"autox"))]
[h: fLastRoll = json.get(jConfig,"lastroll")]
[h: fLastTotal = json.get(fLastRoll,"xtotal")]
[h: fSize = ""]

[ ' check inputs ']
[h: cInput = listGet(tParse,0,"^")]


[ ' new crazy roll ']
[h: cRoll = if(cInput=="newc",1,0)]

[' new roll ']
[h, if(cInput=="new" || cInput=="newc" || cInput=="rolldo"),CODE:{
	[h: jConfig = json.set(jConfig,"lastroll",'{"total":0,"xtotal":0}')]
	[h: fLastRoll = '{"total":0,"xtotal":0}']
	[h: fLastTotal = 0]
}]

[' rolldox UDF exploded  ']
[h, if(cInput=="rolldox"),CODE:{
	[h: fSize = listGet(tParse,1,"^")]
	[h: roll_DO = 1]
	[h: cInput="hotbox"]
};{ [h: roll_DO = 0] }]

[' rollDO UDF was used ']
[h, if(cInput=="rolldo"),CODE:{
	[h: roll_DO = 1]
	[h: lRollDO = listGet(tParse,1,"^")]
	[h: rdResultList = listGet(lRollDO,0,"~")]
	[h: rdResCnt = 0]
	[h: rdBonusList = listGet(lRollDO,1,"~")]
	[h: rdBonusCnt = 0]
	[h: rdColorList = listGet(lRollDO,2,"~")]
	[h: rdColorCnt = 0]
	[h: fColor = rdColorList]
	[h: fSize = listGet(lRollDO,3,"~")]
	[h: jDiceOrder = listGet(lRollDO,4,"~")]
	[h: tParse = listGet(tParse,2,"^")]
};{ 
	[h: rdResultList = ""]
	[h: rdResCnt = 0]	
	[h: rdColorList = ""]
	[h: rdColorCnt = 0]
	[h: rdBonusList = ""]
	[h: rdBonusCnt = 0]
	[h: rdBonusList = ""]
	[h: fColor = ""]
	[h: tParse = listGet(tParse,1,"^")]
}]

[ ' hotbox used ']
[h, if(cInput=="hotbox"),CODE:{
	[h: tParse = json.get(jConfig,"xlastroll")]
}]

[h: tParse = if(tParse=="",macro.args,tParse)]

[h: fColor = if(fColor=="",json.get(jConfig,"color"),fColor)]

[h: tType = if(cRoll,"Crazy",json.get(jConfig,"ttype"))]


[h: fSize = if(fSize=="",json.get(jConfig,"dsize"),fSize)]
[h: bSize3 = fSize * 2.2]
[h: bSize2 = fSize * 1.5]
[h: bSize1 = fSize * 1.15]

[h: cStartXY = json.get(jConfig,"startxy")]
[h: sX = listGet(cStartXY,0,":")]
[h: sY = listGet(cStartXY,1,":")]

[h: json.toVars(getViewArea(1, "json"))]
[h: json.toVars(getViewCenter(1, "json"))]

[h, if(cStartXY=="selected" || sX=="" || sY==""),CODE:{
	[h: tID = getSelected()]
	[h, if(tID!=""),CODE:{
		[h: vZ = getZoom()]
		[h: sX = round((getTokenX(1,tID)+(getTokenWidth(tID)/3)-startX)*vZ)]
		[h: sY = round((getTokenY(1,tID)+(getTokenHeight(tID)/3)-startY)*vZ)]
	  };{
		[h: sX = 0]
		[h: sY = 0]
	}]
}]

[h: cFieldXY = json.get(jConfig,"fieldxy")]

[' chosen die table ']
[h: cDiceTable = json.get(jConfig,"dicetable")]

[' xplode background ']
[h: cxpbg = json.get(jConfig,"xpbg")]

[' chat channel ']
[h: cchan = json.get(jConfig,"chat")]

[' color of text ']
[h: chatt = json.get(jConfig,"chatt")]

[' color of forground ']
[h: chatf = json.get(jConfig,"chatf")]

[' color of background ']
[h: chatb = json.get(jConfig,"chatb")]

[h: chatt = if(chatt=="","black",chatt)]
[h: chatf = if(chatt=="","blue",chatf)]
[h: chatb = if(chatt=="","lightblue",chatb)]

[' Colors available from table ']
[h: FullColorList = json.get(getTableEntry(cDiceTable,0),"value")]
[h: FullColorList = lower(FullColorList)]

[' was going to have a primary and secondary color for rolling 100 or whatever but never got around to it ']
[h: pColor = listGet(fColor,0)]
[h: sColor = listGet(fColor,1)]




[' nD# variable to hold number of die to roll of that type ']
[h: nD2 = if(json.get(tParse,"d2")=="",0,json.get(tParse,"d2"))]
[h: nD4 = if(json.get(tParse,"d4")=="",0,json.get(tParse,"d4"))]
[h: nD6 = if(json.get(tParse,"d6")=="",0,json.get(tParse,"d6"))]
[h: nD8 = if(json.get(tParse,"d8")=="",0,json.get(tParse,"d8"))]
[h: nD10 = if(json.get(tParse,"d10")=="",0,json.get(tParse,"d10"))]
[h: nD12 = if(json.get(tParse,"d12")=="",0,json.get(tParse,"d12"))]
[h: nD20 = if(json.get(tParse,"d20")=="",0,json.get(tParse,"d20"))]

[h: totalDie = nD2+nD4+nD6+nD8+nD10+nD12+nD20]
[h, if(tXplode && totalDie==0),CODE:{
	[h: abort(0)]
}]

[h: totalDie = if(totalDie==0,-1,totalDie)]
[h: totalDieOG = totalDie]

[' set the table offset based on color list ']
[h: jColor = ""]
[h: tVar = 0]
[h, foreach(oneColor,FullColorList),CODE:{
	[h: jColor = json.set(jColor,oneColor,tVar)]
	[h: tVar = tVar +100]
}]

[h: colorList = FullColorList]

[h: fDiceAnim = ""]
[h: fDiceDiv = ""]
[h: DiceJson = ""]
[h: DiceOutputText = if(roll_DO,"",'<html><div style="background-color: '+chatf+'; color: white;; padding-top:2px; padding-bottom:1px; padding-left:5px; padding-right:5px;"><b> '+tName+' Roll Results '+if(tXplode && fLastTotal>0,"- Explosion run !!","")+'</b><div style="background-color:'+chatb+'; color: '+chatt+'; padding:2px;">')]

[h: DiceEndXY = ""]
[h: DiceRollTotal = 0]
[h: tDieCnt = 0]

[h: iXplode = 3+19]
[h: iXTjson = getTableEntry("DO_Controls",iXplode)]
[h: aXframes = number(listGet(json.get(iXTjson,"value"),1,":"))-1]
[h: aXTs = listGet(json.get(iXTjson,"value"),2,":")]
[h: iDxp = json.get(iXTjson,"assetid")]

[h: iXplodeFG = 30]
[h: iXTjsonFG = getTableEntry("DO_Controls",iXplodeFG)]
[h: aXframesFG = number(listGet(json.get(iXTjsonFG,"value"),1,":"))-1]
[h: aXTsFG = listGet(json.get(iXTjsonFG,"value"),2,":")]
[h: iDxpFG = json.get(getTableEntry("DO_Controls",iXplodeFG),"assetid")]

[' build a random landing zone json X,Y array that fits in the view area and die size, overlaps only occur if max die count is twice the total x,y view area ']
[h, if(totalDie>0),CODE:{
	[h, macro("DestDice@"+this):fSize+","+totalDie+","+cFieldXY]
	[h: destDieXY = listGet(macro.return,0,"^")]
	[h: fullGridXY = listGet(macro.return,1,"^")]
	[h: fullGridXY = substring(fullGridXY,1,length(fullGridXY)-1)]
	[h: fullGridXY = replace(fullGridXY,'"','')]
}]

[' link for hotbox ']
[h: iTrans = json.get(getTableEntry("DO_Controls",13),"assetid")]
[h: linkXplode = if(tXplode,macroLinkText("RollDice@"+this, "", if(roll_DO,"rolldox^"+fSize+"^","hotbox^")),"")]

[h: ssDiceDiv = ""]
[h: snapShotHTML = ""]
[h: jXplode = '{"d2":0,"d4":0,"d6":0,"d8":0,"d10":0,"d12":0,"d20":0,"yes":0}']
[h: tDsMax = 0]

[h, switch(tType),CODE:
	case "Crazy":{
		[h: tType = "Bounce"]
		[h: cRoll = 1]
		[h: cbRoll = roll(4)]
		[h, switch(cbRoll),CODE:
			case 1: { 
				[h: cbBounce = "0.175, 0.885, 0.32, 1.275"]
			};
			case 2: { 
				[h: cbBounce = "0, 2.5, 1, -1.20"]
			};
			case 3: { 
				[h: cbBounce = "1, -0.01, 0, -0.01"]
			};
			default:{
				[h: cbBounce = "0, -1.20, 1, 2.4"]
		}]

	};
	case "Bounce":{
		[h: cbBounce = ""]	
	};
	default:{
		[h: animBounce = "0"]
		[h: cbBounce = ""]
		
}]
[h, while(totalDie>0),CODE:{
	[h: tDRollMax = 0]
	[h: itDa = 0]
	[h: iD = ""]
	[h: iDa = ""]
[' COLOR - BEGIN get the color of the die we are rolling ']
	[h, if(pColor!="random"),CODE:{
		[h: cColor = pColor]
	  };{
		[h: cRan = roll(listCount(colorList))-1]
		[h: cColor = listGet(FullColorList,cRan)]		
	}]
	
	[h: cColor = if(roll_DO && cInput!="hotbox",listGet(rdColorList,rdColorCnt),cColor)]
	
	
	[h: rdColorCnt = if(roll_DO && cInput!="hotbox",if(rdColorCnt>listCount(rdColorList),0,rdColorCnt + 1), rdColorCnt)]
[' COLOR - END ']	

[' rollDO UDF was used ']
	[h, if(roll_DO && cInput!="hotbox"),CODE:{
		[h: rdDie = listGet(jDiceOrder,tDieCnt)]
		[h: nD2 = if(rdDie=="d2",1,0)]
		[h: nD4 = if(rdDie=="d4",1,0)]
		[h: nD6 = if(rdDie=="d6",1,0)]
		[h: nD8 = if(rdDie=="d8",1,0)]
		[h: nD10 = if(rdDie=="d10",1,0)]
		[h: nD12 = if(rdDie=="d12",1,0)]
		[h: nD20 = if(rdDie=="d20",1,0)]

		[h: rdResList = json.get(rdResultList,rdDie)]	
		[h: tDRoll = if(rdResList=="",0,listGet(rdResList,rdResCnt,":"))]
		[h: rdResCnt = if(tDRoll==0,0,rdResCnt + 1)]
	  };{ 
		[h: tDRoll = 0]
		[h: rdDie = 0] 
	}]

[' some variables could likly be removed / reduced but things grow organically ']

[' nD# variables holds how many of each die to roll']
[' itDa holds the image type Die animation ']
[' iD holds the image Die final output ']
[' iDa holds the image Die animation spritesheet ']
[' tD holds the table number of where the final die is']
[' itD holds the table number of where the spritesheet is'] 

	
	[h: cbBounce = if(cRoll,cbBounce,"")]
	[h, if(nD2>0),CODE:{
		[h: nD2 = nD2 - 1]
		[h: itDa = "c"] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(2))]
		[h: tDRollMax = if(tDRoll==2,1,0)]
		[h: tDRollType = "d2"]

		[h: iD = json.get(getTableEntry("DO_Controls",number(14+tDRoll)),"assetid"),iD)]
		[h: iDa = json.get(getTableEntry("DO_Controls",17),"assetid"),iDa)]
		
		[h: tD = tDRoll+6]
	}]
	[h, if(nD4>0 && itDa==0),CODE:{
		[h: nD4 = nD4 - 1]
		[h: itDa = 1] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(4))]
		[h: tDRollMax = if(tDRoll==4,1,0)]
		[h: tDRollType = "d4"]
		[h: tD = tDRoll+10+json.get(jColor,cColor)]
	}]
	[h, if(nD6>0 && itDa==0),CODE:{
		[h: nD6 = nD6 - 1]
		[h: itDa = 2] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(6))]	
		[h: tDRollMax = if(tDRoll==6,1,0)]	
		[h: tDRollType = "d6"]
		[h: tD = tDRoll+20+json.get(jColor,cColor)]
	}]
	[h, if(nD8>0 && itDa==0),CODE:{
		[h: nD8 = nD8 - 1]
		[h: itDa = 3] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(8))]
		[h: tDRollMax = if(tDRoll==8,1,0)]
		[h: tDRollType = "d8"]
		[h: tD = tDRoll+30+json.get(jColor,cColor)]
	}]
	[h, if(nD10>0 && itDa==0),CODE:{
		[h: nD10 = nD10 - 1]
		[h: itDa = 4] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(10))]
		[h: tDRollMax = if(tDRoll==10,1,0)]
		[h: tDRollType = "d10"]
		[h: tD = tDRoll+40+json.get(jColor,cColor)]
	}]
	[h, if(nD12>0 && itDa==0),CODE:{
		[h: nD12 = nD12 - 1]
		[h: itDa = 5] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(12))]
		[h: tDRollMax = if(tDRoll==12,1,0)]
		[h: tDRollType = "d12"]
		[h: tD=tDRoll+60+json.get(jColor,cColor)]
	}]
	[h, if(nD20>0 && itDa==0),CODE:{
		[h: nD20 = nD20 - 1]
		[h: itDa = 6] 
		[h: tDRoll = if(tDRoll,tDRoll,roll(20))]
		[h: tDRollMax = if(tDRoll==20,1,0)]
		[h: tDRollType = "d20"]
		[h: tD = tDRoll+80+json.get(jColor,cColor)]
	}]
	
	[h, if(itDa!=0),CODE:{
		[h: tDxy = json.get(destDieXY,tDieCnt)]
		
		[h: tDX = number(listGet(tDxy,0,":"))]
		[h: tDY = number(listGet(tDxy,1,":"))]

		[h: tDieCnt = tDieCnt + 1]


		[h: rdBonusText = if(roll_DO && cInput!="hotbox",listGet(rdBonusList,rdBonusCnt),"")]
		[h: rdBonusText = if(rdBonusText==0,"",rdBonusText)]
		[h: rdBonusCnt = if(roll_DO && cInput!="hotbox",rdBonusCnt + 1,0)]
		
		[h: tDOut = upper(tDRollType)+":"+(number(tDRoll)+number(replace(rdBonusText," ","")))]
		[h: tDRoll = if(roll_DO && cInput!="hotbox",number(tDRoll)+number(replace(rdBonusText," ","")),tDRoll)]
		[h: DiceJson = json.set(DiceJson,tDieCnt,tDOut)]
		[h: cColor = if(itDa=="c","Coin",cColor)]
		[h: tSteps = if(itDa=="c",11,4)]

		[h: tvDs = math.hypot(tDx-sX,tDy-sY)]
		[h: tDs = round((tvDs/240)*0.5,3)]
		[h: itD = if(itDa=="c",9,itDa+json.get(jColor,cColor))]
		[h: itDa = if(itDa=="c",1,itDa)]
		[h: aTs = if(tSteps>5,0.3,0.1)]
		[h: tDsMax = if(tDs>tDsMax,tDs,tDsMax)]

		[h: DiceOutputText = DiceOutputText+ if(roll_DO,","+tDieCnt+":"+tDOut,"Roll "+tDieCnt+" "+upper(cColor,1)+" "+tDOut+"<br>")]
		[h: DiceRollTotal = DiceRollTotal + tDRoll]
		
		[h: animBounce = if(tDs>=2 && tType=="Bounce","
			20%  {transform:scale(%{bSize3});}			
			40%  {transform:scale(%{fSize});}			
			55%  {transform:scale(%{bSize2});}			
			70%  {transform:scale(%{fSize});}			
			85%  {transform:scale(%{bSize1});}",
			if(tDs<2 && tType=="Bounce","
			20%  {transform:scale(%{bSize3});}			
			55%  {transform:scale(%{fSize});}			
			85%  {transform:scale(%{bSize2});}",
			""))]

[' this makes the die clickable and provides the die count and fieldXY ']
[h: hotbox = '
<img src="'+iTrans+'" width=[r:120*fSize]; style="--pointermap:block;" draggable=false usemap="#dieSelect'+tDieCnt+'"; >
	<map name="dieSelect'+tDieCnt+'">
		<area shape="rect" coords="0,0,120,120" href="'+linkXplode+tDieCnt+','+fSize+'"; text-align="center" title="Explode '+upper(tDRollType)+'"; >
	</map>
	']

		[h: hotbox = if(tDRollMax,hotbox,"")]
		[h: tDRollMaxCK = json.get(jXplode,"yes")]
		[h: jXplode = if(tDRollMaxCK==0 && tDRollMax && tXplode,json.set(jXplode,"yes",1),jXplode)]

		
		[h: Xplode = if(tXplode && tDRollMax,'<div class="icxpd'+tDieCnt+'"><div class="idxpd'+tDieCnt+'"></div></div>','')]
		[h: XplodeFG = if(tXplode && tDRollMax,'<div class="icxpfd'+tDieCnt+'"><div class="idxpfdfg'+tDieCnt+'"></div></div>','')]
		
		[h: cXcnt = json.get(jXplode,tDRollType)]
		[h: cXcnt = if(tDRollMax,cXcnt+1,cXcnt)]
		[h: jXplode = json.set(jXplode,tDRollType,cXcnt)]
		
		[h: iD = if(iD=="",json.get(getTableEntry(cDiceTable,tD),"assetid"),iD)]
		
		[h: iDa = if(iDa=="",json.get(getTableEntry(cDiceTable,itD),"assetid"),iDa)]
		[h: XplodeFGcss = if(Xplode=="","","
		.icxpfd%{tDieCnt} {
			animation-name: locxyfdxpfg%{tDieCnt}; 
			animation-direction: normal;   
			animation-fill-mode: forwards;
			animation-delay: %{tDs}s;
			animation-duration: 1.2s; 
			opacity: 0;  
			position: absolute;} 		
		.idxpfdfg%{tDieCnt} {  
			animation-name: stepImage;  
			animation-iteration-count: infinite; 
			animation-timing-function: steps(%{aXframesFG},end); 
			animation-duration: %{aXTsFG}ms; 
			height: 120px;  
			width: 120px;   
			background-image: url(%{iDxpFG});}
			
			@keyframes locxyfdxpfg%{tDieCnt} { 
			0% {transform:scale(%{fSize}); opacity: 1; top: "+(tDY-fSize)+"px; left: %{tDX}px;} 
			99% {transform:scale("+(fSize*2)+"); opacity: 1; top: "+(tDY-fSize)+"px; left: %{tDX}px;} 
			100% {transform:scale(%{fSize}); opacity: 0; top: "+(tDY-fSize)+"px; left: %{tDX}px;}}
		")]
		[h: XplodeBGcss = if(Xplode=="","","
		.icxpd%{tDieCnt} {
			animation-name: locxyfdxp%{tDieCnt}; 
			animation-delay: "+(1+tDs)+"s; 
			animation-direction: normal;   
			animation-fill-mode: forwards;	
			opacity: 0;  
			position: absolute;} 		
		.idxpd%{tDieCnt} {  
			animation-name: stepImage;  
			animation-iteration-count: infinite; 
			animation-timing-function: steps(%{aXframes},end); 
			animation-duration: %{aXTs}ms; 
			height: 120px;  
			width: 120px;   
			background-image: url(%{iDxp});}
		@keyframes locxyfdxp%{tDieCnt} { 
			0% {transform:scale(%{fSize}); opacity: 1; top: "+(tDY-fSize)+"px; left: %{tDX}px;} 
			100% {transform:scale(%{fSize}); opacity: 1; top: "+(tDY-fSize)+"px; left: %{tDX}px;}}
		")]
		[h: fDiceAnim = strformat("%{fDiceAnim}
		.ssDieMotion%{tDieCnt} {
			animation-name: ssDieMove%{tDieCnt};  
			animation-duration: %{tDs}s;  
			animation-iteration-count: 1;  
			animation-direction: normal;  
			animation-fill-mode: forwards;  
			animation-timing-function:cubic-bezier("+cbBounce+");   			 
			position: absolute;  }
			
		@keyframes ssDieMove%{tDieCnt} { 
			0%  {transform:scale(%{fSize}, %{fSize}); opacity: 1; top: %{sY}px; left: %{sX}px;} "+animBounce+"
			99% {transform:scale(%{fSize}, %{fSize}); opacity: 1; top: %{tDY}px; left: %{tDX}px; } 
			100% {transform:scale(%{fSize}, %{fSize}); opacity: 0; top: %{tDY}px; left: %{tDX}px; }} 
			
		.ssDieAnim%{tDieCnt} {  
			animation-name: stepImage;  
			animation-duration: "+aTs+"s;  
			animation-iteration-count: infinite; 
			animation-timing-function: steps("+tSteps+",end);   
			height: 120px;  
			width: 120px;  
			background-image: url(%{iDa});}
		
		"+XplodeFGcss+" "+XplodeBGcss+"
		
		.icfd%{tDieCnt} { 
			animation-name: locxyfd%{tDieCnt};  
			animation-duration: %{tDs}s; 
			animation-delay: "+if(Xplode=="",0.0,(1+aTs))+"s; 
			opacity: 0; 
			animation-fill-mode: forwards; 
			position: absolute; } 
		"+if(Xplode=='','','.idfd%{tDieCnt}:hover { animation: zoomInd%{tDieCnt} 0.4s forwards; }')+"
		.idfd%{tDieCnt} { 
			height: 120px;    
			width: 120px;
			opacity:1;
			background-image: url(%{iD});
			} 
		.bonustext%{tDieCnt} {
			position: absolute;
			top: 50%;
			left: 40%;
			height: 15%;    
			width: 25%;
			color: black;
			text-shadow: 0 0 6px white, 0 0 10px white;			
			font-family: Times New Roman, Times, serif;}
		@keyframes locxyfd%{tDieCnt} { 
			0%  {transform:scale(%{fSize}); opacity: 0; top: %{sY}px; left: %{sX}px;} 
			99% {transform:scale(%{fSize}); opacity: 0; top: %{tDY}px; left: %{tDX}px; } 
			100% {transform:scale(%{fSize}); opacity: 1; top: %{tDY}px; left: %{tDX}px;  }}
		
		@keyframes zoomInd%{tDieCnt}{ to {transform: scale(1.6); background-size:160%; }  }
	")]


		[h: fDiceDiv = fDiceDiv + '
			<div class="ssDieMotion'+tDieCnt+'">
				<div class="ssDieAnim'+tDieCnt+'"></div>
			</div>
'+if(tXplode,XplodeFG,"")+'			
'+if(tXplode,Xplode,"")+'
			<div class="icfd'+tDieCnt+'">
				<div class="idfd'+tDieCnt+'">
					<div class="bonustext'+tDieCnt+'"><b>'+rdBonusText+'</b></div>
					'+if(tXplode,hotbox,"")+'
				</div>
			</div>

		']

[' this will build a snapshot of the die  ']
		[h: snapShotHTML = strformat("%{snapShotHTML}
			.scfd%{tDieCnt} { 			
				position: absolute; 
				transform: scale(%{fSize});
				top: %{tDY}px; 
				left: %{tDX}px;
				opacity: 1;
			}
			.sdfd%{tDieCnt} {
				height: 120px;    
				width: 120px;  
				opacity: 1;
				background-image: "+'url("%{iD}");'+"
				background-position: top;   
			} 			
		")]
		[h: ssDiceDiv = ssDiceDiv + '<div class="scfd'+tDieCnt+'" ><div class="sdfd'+tDieCnt+'" ></div></div>']	
		[h: totalDie = totalDie - 1]
	}]
}]

[h, if(totalDie==0),CODE:{
	
	[h: execFunction("playClip", json.append("[]", "https://cdn.discordapp.com/attachments/823396251847360582/976514472522940466/Throw_Dice.mp3", 1, 0.3), 1, "all")]

	[h: fDiceAnim = '
		@keyframes stepImage { 
			0%   {background-position-y: top; }   
			100% {background-position-y: bottom; }
		}' + fDiceAnim]
	[h: fDiceAnim = "<html><style>"+fDiceAnim+"</style><body>"+fDiceDiv+"</body></html>"]
	[h: DiceOutputText = DiceOutputText + if(roll_DO,"", "<b>TOTAL : "+DiceRollTotal+if(tXplode && fLastTotal>0,"<br>EXPLOSION TOTAL : "+(DiceRollTotal+fLastTotal),"")+"</b></div></div></html>")]
	
	[h: jConfig = json.set(jConfig,"xlastroll",jXplode)]
	[h: DiceJson = json.set(DiceJson,"total",DiceRollTotal)]
	[h: DiceJson = json.set(DiceJson,"xtotal",(DiceRollTotal+fLastTotal))]
	[h: jConfig = json.set(jConfig,"lastroll",DiceJson)]
	[h: jSourceConfig = json.set(jSourceConfig,tName,jConfig)]
	[h: setLibProperty("DiceOverlay",jSourceConfig,this)]

	[h, if(roll_DO),CODE:{
		[h: DiceOutputText = substring(DiceOutputText,1)]
	}]

	[h: timeStart = json.get(getInfo("server"),"timeInMs")]
	[h: timeStart = if(autoXplode, (timeStart + 300+(tDsMax*220)), timeStart)]

	[h: rollType = if(tXplode,1,0)]
	[h: rollType = if(autoXplode,rollType+2,0)]
	[h: rollType = if(roll_DO,(rollType+4)+"~"+fSize,rollType)]
	[h: macroArgs = rollType+":0^"+tDsMax+"^"+timeStart+"^"+cchan+"^"+DiceOutputText+"^"+tName+"^"+fDiceAnim)]
	[h: macro.return = DiceOutputText]
	[h: linkRoll = macroLinkText("Delay@"+this, cchan,macroArgs)]  
	[h: execLink(linkRoll, 1, cchan)]
}]

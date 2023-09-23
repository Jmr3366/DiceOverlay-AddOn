[h: fSize = listGet(macro.args,0)]
[h: totalDie = listGet(macro.args,1)]
[h: cFieldXY = listGet(macro.args,2)]

[h: destDieXY = ""]

[h: vZ = round(number(getZoom()),2)]
[h: json.toVars(getViewArea(1, "json"))]
[h: json.toVars(getViewCenter(1, "json"))]

[h: vMaxX = listGet(cFieldXY,0,":")]
[h: vMaxY = listGet(cFieldXY,1,":")]

[h, if(vMaxX=="" || vMaxY=="" || cFieldXY=="0:0"),CODE:{
	[h: vMaxX = (endX-startX)*vZ]
	[h: vMaxY = (endY-startY)*vZ]
}]

[h: cellSize = round(120*fSize*0.65)]
[h: gridOffset = (120*fSize)/4]
[h: offset = 0]
[h: gridMaxX = round(vMaxX/cellSize)]
[h: gridMaxY = round(vMaxY/cellSize)]
[h: gridFull = ""]

[h: oneX = 1] [h: oneY = 1]

[h, while((oneX+1)<gridMaxX),CODE:{
	
	[h, while((oneY+1)<gridMaxY),CODE:{
		[h: tempXY = (oneX*cellSize)+":"+(oneY*cellSize)]
		[h: gridFull = json.append(gridFull,tempXY)]
		[h: oneY = oneY + 1]
	}]
	[h: oneX = oneX + 1]
	[h: oneY = 1]
	
}]
[h: gridFull = json.shuffle(gridFull)]
[h: gridFullOG = gridFull]
[h: cntDie = 0]

[h, while(cntDie<totalDie),CODE:{
	[h: tempXY = json.get(gridFull,0)]
	[h: gridFull = json.remove(gridFull,0)]
	[h: tempX = number(listGet(tempXY,0,":"))+offset]
	[h: tempY = number(listGet(tempXY,1,":"))+offset]
	[h: tempXY = round(tempX)+":"+round(tempY)]

	[h: destDieXY = json.set(destDieXY,cntDie,tempXY)]

	[h: cntDie = cntDie + 1]
	[h, if(length(gridFull)<3),CODE:{
		[h: gridFull = json.shuffle(gridFullOG)]
		[h: offset = offset+gridOffset]
	}]
}]

[h: macro.return = destDieXY+"^"+gridFullOG]
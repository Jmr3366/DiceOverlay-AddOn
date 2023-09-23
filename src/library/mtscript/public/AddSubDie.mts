[h: tParse = macro.args]

[h: jDice = listGet(tParse,0,"^")]
[h: tDice = listGet(tParse,1,"^")]

[h: tVal = if(indexOf(tDice,"a")>=0, 1, -1)]
[h: tDie = substring(tDice,0,length(tDice)-1)]
[h: tVar = json.get(jDice,tDie)]
[h: tVar = tVar + tVal]
[h: tVar = if(tVar<=0,"",tVar)]
[h: jDice = json.set(jDice,tDie,tVar)]

[macro("Dice Main@THIS"): jDice]

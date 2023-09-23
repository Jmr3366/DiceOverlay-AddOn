[h: tName = listGet(macro.args,0,"^")]
[h: tParse = listGet(macro.args,1,"^")]

[overlay("DiceOverlay_"+tName+"_Rolled", "zorder=6;"): {
    {tParse}
}]
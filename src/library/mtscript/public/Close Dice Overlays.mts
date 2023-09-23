
[h: overlayName = "DiceOverlay"]
[h: tName = getPlayername()]

[h: execFunction("closeOverlay",json.append("[]","DiceOverlay_"+tName+"_Rolled"),0,"all")]
[h: closeOverlay(overlayName)]

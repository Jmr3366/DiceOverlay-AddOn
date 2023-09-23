[h: defineFunction("rollDO", "rollDO@THIS")]

[h: this = getMacroLocation()]

[h: log.info("Macro Location: " + this)]

[overlay("DiceOverlay", "zorder=7;"):{<html><style></style></html>}]

[h: jSourceConfig = getLibProperty("DiceOverlay",this)]

[h, if(jSourceConfig == ""), CODE: {
	[jSourceConfig = data.getStaticData("org.jmr.diceoverlay", "public/dice_overlay.json")]
	[setLibProperty("DiceOverlay", jSourceConfig, this)]
}]

[h: tName = getPlayername()]
[h, if(indexOf(jSourceConfig, tName)<0),CODE:{
	[h: jConfig = json.get(jSourceConfig, "~newuser~")]
};{
	[h: jConfig = json.get(jSourceConfig, tName)]
}]

[h: log.info("DiceOverlay loaded")]
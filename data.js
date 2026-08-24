
const BOSS_STAGES = [
{stage:"Pre-Boss / Early Game",bosses:[
["King Slime","vanilla","Optional early boss; useful mobility and starter drops."],
["Desert Scourge","calamity","First major Calamity boss; commonly tackled very early."],
["Eye of Cthulhu","vanilla","Core early-game progression."],
["Crabulon","calamity","Optional but rewarding Mushroom-biome boss."],
["Eater of Worlds / Brain of Cthulhu","vanilla","Unlocks evil-biome progression."],
["Hive Mind / Perforators","calamity","World-evil-specific Calamity boss."],
["Queen Bee","vanilla","Strong optional pre-Hardmode loot."],
["Deerclops","vanilla","Optional crossover boss."],
["Skeletron","vanilla","Unlocks safe Dungeon exploration."],
["The Slime God","calamity","Major late pre-Hardmode Calamity checkpoint."],
["Wall of Flesh","vanilla","Starts Hardmode."]
]},
{stage:"Early / Mid Hardmode",bosses:[
["Queen Slime","vanilla","Optional early-Hardmode boss."],
["Cryogen","calamity","Early-Hardmode Calamity boss."],
["The Twins","vanilla","Mechanical boss."],
["Aquatic Scourge","calamity","Sulphurous Sea boss."],
["The Destroyer","vanilla","Mechanical boss."],
["Brimstone Elemental","calamity","Brimstone Crag boss."],
["Skeletron Prime","vanilla","Mechanical boss."],
["Calamitas Clone","calamity","Important mid-Hardmode Calamity boss."],
["Plantera","vanilla","Major world-state unlock."],
["Leviathan and Anahita","calamity","Ocean encounter."],
["Astrum Aureus","calamity","Astral Infection boss."],
["Golem","vanilla","Jungle Temple progression."],
["Duke Fishron","vanilla","Powerful optional late-Hardmode boss."],
["The Plaguebringer Goliath","calamity","Late-Hardmode Calamity boss."],
["Empress of Light","vanilla","Powerful optional boss."],
["Ravager","calamity","Late-Hardmode Calamity boss."],
["Lunatic Cultist","vanilla","Starts Lunar Events."],
["Astrum Deus","calamity","Late-Hardmode Astral boss."],
["Moon Lord","vanilla","Unlocks Calamity post-Moon Lord progression."]
]},
{stage:"Post-Moon Lord",bosses:[
["Profaned Guardians","calamity","Opening post-Moon Lord checkpoint."],
["Dragonfolly","calamity","Early post-Moon Lord boss."],
["Providence, the Profaned Goddess","calamity","Major post-Moon Lord progression boss."],
["Ceaseless Void","calamity","Sentinel of the Devourer."],
["Storm Weaver","calamity","Sentinel of the Devourer."],
["Signus","calamity","Sentinel of the Devourer."],
["Polterghast","calamity","Post-Providence Dungeon progression."],
["The Old Duke","calamity","Late-game Sulphurous Sea boss."],
["The Devourer of Gods","calamity","Major cosmic progression checkpoint."],
["Yharon, Dragon of Rebirth","calamity","Unlocks Auric-tier progression."],
["Exo Mechs","calamity","One of Calamity's final bosses."],
["Supreme Witch, Calamitas","calamity","One of Calamity's final bosses."],
["Boss Rush","calamity","Endgame challenge."]
]}];

const POIS = [
["Aether / Shimmer","vanilla","Find and mark the Shimmer for transmutations and permanent upgrades."],
["Dungeon","vanilla","Revisit after major progression gates for new enemy/drop pools."],
["Jungle / Temple","vanilla","Plantera, Life Fruit and Golem progression."],
["Underground Desert","vanilla","Early loot and useful exploration."],
["Floating Islands","vanilla","Early mobility and utility loot."],
["Sulphurous Sea","calamity","Calamity biome with unique materials, enemies and bosses."],
["The Abyss","calamity","High-risk Calamity biome with tiered progression and unique loot."],
["Astral Infection","calamity","Hardmode Calamity biome tied to Astral progression."],
["Brimstone Crag","calamity","Calamity biome tied to Brimstone progression."],
["Arsenal Labs","calamity","Search for schematics, tech materials and Codebreaker progression."],
["Planetoids","calamity","Space structures useful for materials and exploration."],
["Boss Arenas","custom","Track purpose-built arenas for difficult progression fights."]
];

const UPGRADES = [
"Max Life: early Life Crystals","Max Mana: Mana Crystals","Goblin Tinkerer found","Tinkerer's Workshop","Pylons / fast travel network","Aether / Shimmer found",
"Hardmode wings acquired","Life Fruit progression","Extra accessory slot(s) where applicable","Best available healing potion stocked","Potion/buff crafting station ready",
"Rod of Discord / mobility utility","Codebreaker progression started","Abyss exploration gear","Endgame permanent HP upgrades"
];

const TERRA_WIKI="https://terraria.wiki.gg/wiki/";
const CAL_WIKI="https://calamitymod.wiki.gg/wiki/";
const CAL_CLASS="https://calamitymod.wiki.gg/wiki/Guide:Class_setups";
const CAL_PROG="https://calamitymod.wiki.gg/wiki/Guide:Mod_progression";

/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the Nekomancer Class and Subclasses
	Source: 	https://www.dandwiki.com/wiki/Nekomancer_(5e_Class)
	Code by:	BlazeDemon & Xika.
	Date:		2024-11-13 (sheet v13)
*/

var iFileName = "Nekomancer-5e.js";
RequiredSheetVersion("13.2");

SourceList["DanDw"] = {
    name : "D\u0026D Wiki, Nekomancer",
    abbreviation : "D\u0026Dwiki",
    group : "Homebrew",
    url : "https://www.dandwiki.com/wiki/Nekomancer_(5e_Class)",
    date : "2024/11/13"
};

ClassList.nekomancer = {
    regExpSearch : /nekomancer/i,
    name : "Nekomancer",
    source : ["DanDw"],
    primaryAbility : "Dexterity",
    prereqs : "Dexterity 13 and Wisdom 13",
    die : 8,
    improvements : levels.map(function(n) { return (n === 4 || n === 8 || n === 12 || n === 16 || n === 19) ? 1 : 0; }),
    saves: ["Dex", "Wis"],
    skills : ["Animal Handling"],
    skillstxt : "\n\n" + toUni("Nekomancer") + "Choose two from: Arcana, Performance, Medicine, History, Nature, Survival, and Perception",
    armor: [
        [true, false, false, false],
    ],
    weapons: [
        [true, false],
        [true, false]
    ],
    equipment: "Nekomancer starting equipment:" +
            "\n \u2022 A component pouch -or- an arcane focus;" +
            "\n \u2022 Simple weapon, light crossbow with 20 bolts and leather armor;" +
            "\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
            "\n \u2022 A dagger and a set of tinker's tools",
    subclasses: ["Neko Clan", []],
    spellcastingFactor: "warlock2",
    spellcastingAbility: "Charisma",
    spellcastingKnown: {
        cantrips: levels.map(function (n) {
            return n < 4 ? 2 : n < 10 ? 3 : 4;
        }),
        spells: levels.map(function (n) {
            return n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : 5;
        }),
    },
    spellcastingTable : [
        // Level:      Cantrips Known, Spells Known, Spell Slots, Slot Level
        [2, 2, 2, 1],   // Level 1
        [2, 3, 3, 1],   // Level 2
        [2, 4, 3, 2],   // Level 3
        [3, 5, 3, 2],   // Level 4
        [3, 6, 4, 3],   // Level 5
        [3, 7, 4, 3],   // Level 6
        [3, 8, 4, 4],   // Level 7
        [3, 9, 4, 4],   // Level 8
        [3, 10, 4, 4],  // Level 9
        [4, 10, 4, 5],  // Level 10
        [4, 11, 5, 5],  // Level 11
        [4, 11, 5, 5],  // Level 12
        [4, 12, 5, 5],  // Level 13
        [4, 12, 5, 5],  // Level 14
        [4, 13, 5, 5],  // Level 15
        [4, 13, 5, 5],  // Level 16
        [4, 14, 6, 5],  // Level 17
        [4, 14, 6, 5],  // Level 18
        [4, 15, 6, 5],  // Level 19
        [4, 15, 6, 5]   // Level 20
    ],
    spellcastingList: {
        class: "druid",
        level: [0, 5]
    },
    features : {
        "spellcasting" : {
            name : "Spellcasting",
            source : ["DanDw"],
            minlevel : 1,
            description :  desc(["I can cast spells using Charisma as my spellcasting ability. I use the Druid spell list but cast", 
                                "spells at the highest level"])
        },
        "neko summoning" : {
            name : "Neko Summoning",
            source : ["DanDw"],
            minlevel : 1,
            usages : "1 until CL 10, then 2 ",
			usagescalc : "event.value = (classes.known.nekomancer.level < 11) ? 1 : 2",
            recovery : "short rest",
            description :   desc(["Summon a spectral Neko to fight alongside you as an action, appearing in a 5ft cube within", 
                            "10ft. The Neko follows your commands for up to 10 minutes or until its HP drops to 0, then it",
                            "disappears. Cannot summon another Neko until completing a short or long rest"]),
        },
        "young neko" : {
            name : "Young Neko",
            source : ["DanDw"],
            minlevel : 1,
            description : desc(["Young Nekos are immature Nekomata. They resemble the common cat except for their two", 
                                "tails that on occasion glow with spectral fire."]),
            action : [
                ["action", "Summmon Neko"]
            ],
            creaturesAdd: [
                ["Young Neko", true]
            ]
        },
        "neko channeling" : {
            name : "Neko Channeling",
            source : ["DanDw"],
            minlevel : 2,
            usages : 1,
            recovery : "2 min",
            description :   desc(["Channel the Nekomata's power to gain spectral claws, two tails, and cat ears",
                            "Use an action to make a claw attack and a bonus action to make a tail attack",
                            "Each attack deals 1d4 + Dexterity modifier damage (slashing for claws, bludgeoning for tails)",
                            "Channeling last 1 minute, and can be used after it has not been used for 1 minute"]),
            weaponOptions : [
				{
					baseWeapon : "unarmed strike",
					regExpSearch: /^(?=.*\bneko\b)(?=.*\bclaws?\b).*$/i,
					name : "Neko Claws",
					source : ["DanDw"],
					ability : 2,
					abilitytodamage : true,
					damage : [1, 4, "slashing"],
					range : "Melee, 5 ft",
					selectNow : true,
					description : "useable during Neko Channeling",
					isAlwaysProf : true,
				},
				{
					baseWeapon : "unarmed strike",
					regExpSearch: /^(?=.*\bneko\b)(?=.*\btail?\b).*$/i,
					name : "Neko Tail",
					source : ["DanDw"],
					ability : 2,
					abilitytodamage : true,
					damage : [1, 4, "bludgeoning"],
					range : "Melee, 5 ft",
					selectNow : true,
					description : "useable during Neko Channeling",
					isAlwaysProf : true,
				}
			],
            action : [
                        ["action", "Claw"],
						["bonus action", "Tail"]
                ]
        },
        
        "subclassfeature" : {
            name : "Neko Clans",
            source : ["DanDw"],
            minlevel : 3,
            description : desc(["Choose a clan of Nekomata to follow: Beast Clan, Guardian Clan, or Charmer Clan"]),
        },
        "keen senses" : {
            name : "Keen Senses",
            source : ["DanDw"],
            minlevel : 6,
            description : desc(["While neko channeling, gain advantage on initiative and perception checks, and cannot be",
                                "surprised"]),
            savetxt : {
                text :  ["Keen Senses during Neko Channeling"]
            }
        },
        "hunting pair" : {
            name : "Hunting Pair",
            source : ["DanDw"],
            minlevel : 11,
            description : desc(["The number of Nekos that can be summoned between short and long rests increases to 2.", 
                                "If both Nekos are out at the same time, only one can be a clan Neko"])
        },
		"attack upgrade" : {
			name : "Attack Upgrade",
			source : ["DanDw"],
			minlevel : 11,
			description : desc(["I can now attack twice with my Claws. My Claws and Tail are considered magical."]),
			action : [
				["action", "2 Attacks with Claws"],
			],
			calcChanges: {
				atkAdd: [
					function(fields, v) {
						if (/\bNeko\b/i.test(v.WeaponText)) {
							fields.Description = "Magical, " + fields.Description;
						}
					},
					"Attacks with my Neko Claws and Tails are considered magical."
				]
			},			
			
		},		
        "feline grace" : {
            name : "Feline Grace",
            source : ["DanDw"],
            minlevel : 13,
            description : desc(["Gain advantage on all Dexterity saving throws and while neko channeling, your speed",
                                "increases by 10 ft"]),
            advantages : [
                ["Dex", true]
            ],
            savetxt : {
                text : ["\nDex Adv on Saves"]
            },
            speed : { allModes : "+10" }
        },
        "predator's leap" : {
            name : "Predator's Leap",
            source : ["DanDw"],
            minlevel : 14,
            description : desc(["Both you and your neko summons can make a supernatural",
                                "leap up to 60 ft in any direction as a bonus action."]),
            action : ["bonus action", "Leap"]
        },
        "fire of the fey cat" : {
            name : "Fire of the Fey Cat",
            source : ["DanDw"],
            minlevel : 17,
            description : desc(["While neko channeling, your spectral tails and claws burn with neko fire"]),
            calcChanges: {
				atkAdd: [
					function(fields, v) {
						if (/\bNeko\b/i.test(v.WeaponText)) {
							fields.Description = fields.Description + ", +1d4 fire damage"
						}
					},
                    "Claw and tail attacks deal an additional 1d4 fire damage"
				]
			},
        },
        "veteran neko" : {
            name : "Veteran Neko",
            source : ["DanDw"],
            minlevel : 18,
            description : desc(["At level 18, you begin summoning Veteran Nekos instead of Young Nekos.",
                                "Veteran Nekos are larger, mature Nekomata with higher stats and abilities."]),
            creaturesAdd: [
                        ["Veteran Neko", true]
            ]
        }
    },
};

// Define each Neko Clan subclass with AddSubClass
AddSubClass("nekomancer", "beast clan", {
    regExpSearch : /^(?=.*beast)(?=.*clan).*$/i,
    subname : "Beast Clan",
    source : ["DanDw"],
    features : {
        "subclassfeature3" : {
            name : "Neko Clans",
            source : ["DanDw"],
            minlevel : 3,
            speed : { allModes : "+10" },
            description : desc(["while Neko channeling your claws and tail grows larger and more deadly.",
                                "The damage dice increases by one size and you gain a 10ft bonus to your base",
                                "speed."]),
            calcChanges: {
                atkCalc : [
                    function (fields, v, output) {
                        if (/\bNeko\b/i.test(v.WeaponText)) {
                            output.die = output.die.replace('d4','d6');
                        };
                    },
                    "The Damage Die for my Neko Weapon changes to a D6."
                ],                
            },
        },
        "subclassfeature9" : {
            name : "Beast Summon",
            source : ["DanDw"],
            minlevel : 9,
            action : [
                ["action", "Summmon Beast Neko"]
            ],
            description : desc(["Beast Nekos are mature clan Nekomata. They have a far more wild and bestial",
                                "appearance that emits darkness that obscures itself."]),
            creaturesAdd: [
                ["Beast Neko", true]
            ]
        },
        "subclassfeature15" : {
            name : "Beast Fangs",
            source : ["DanDw"],
            minlevel : 15,
            description : desc(["The beast neko focuses its magic to create a poison on its fangs.",
                                "When the beast Neko lands a bite attack the target will take an additional 1d6 poison damage",
                                "and must make a constitution saving throw DC 16 or become poisoned and gain one level of exhaustion.",
                                "Once a creature has suffered from the poison's exhaustion effect it is immune to gaining more",
                                "exhaustion from the poison for the next 24 hours."])
        },
        "subclassfeature20" : {
            name : "Beast Nekomata",
            source : ["DanDw"],
            minlevel : 20,
            description : desc(["The beast neko can use their Shadow Step action an unlimited number of times while they are summoned.",
                                "The nekomancer while neko channeling also have their dex grows by 4 and max increases to 24."])
        }
    }
});


AddSubClass("nekomancer", "guardian clan", {
    regExpSearch : /^(?=.*guardian)(?=.*clan).*$/i,
    subname : "Guardian Clan",
    source : ["DanDw"],
    features : {
        "subclassfeature3" : {
            name : "Neko Clans",
            source : ["DanDw"],
            minlevel : 3,
            description : desc(["while Neko channeling you now form spectral armor around yourself giving",
                                "you a +1 to AC and temporary hitpoints equal to (proficiency bonus + nekomancer level)."]),
        },
        "subclassfeature9" : {
            name : "Guardian Summon",
            source : ["DanDw"],
            minlevel : 9,
            action : [
                ["action", "Summmon Guardian Neko"]
            ],
            description : desc(["Guardian Nekos are mature clan Nekomata. They are the tallest of the Nekomata",
                                "as they have adapted to standing on two legs so that they can wear armor and wield weapons."]),
            creaturesAdd: [
                ["Guardian Neko", true]
            ]
        },
        "subclassfeature15" : {
            name : "Guardian Taunt",
            source : ["DanDw"],
            minlevel : 15,
            description : desc(["The Guardian Neko can as an action release a magical bellow.",
                                "Enemies within 60ft of the Guardian Neko that can hear the bellow must",
                                "succeed a DC 16 wisdom saving throw of be magically compelled to fight",
                                "the Guardian Neko for the next minute. For that time the compelled creatures have",
                                "disadvantage on attack rolls against creatures other than the Guardian Neko,",
                                "and must make a Wisdom saving throw DC 16 each time they attempt to move to",
                                "a space that is more than 60 feet away from the Guardian Neko",
                                "if they succeed on this saving throw, this spell doesn't restrict their movement for that turn.",
                                "The Guardian Taunt can only be used once per summoning."])
        },
        "subclassfeature20" : {
            name : "Guardian Nekomata",
            source : ["DanDw"],
            minlevel : 20,
            description : desc(["The Guardian Neko's Swig action can be used 4 times per summon, and the Guardian's aid dice increase to 2d4.",
                                "The nekomancer while neko channeling also have their Con grows by 4 and max increases to 24."])
        }
    }
});

AddSubClass("nekomancer", "charmer clan", {
    regExpSearch : /^(?=.*charmer)(?=.*clan).*$/i,
    subname : "Charmer Clan",
    source : ["DanDw"],
    features : {
        "subclassfeature3" : {
            name : "Neko Clans",
            source : ["DanDw"],
            action : [
                ["reaction", "Mystifying Strikes (tail attack)"]
            ],
            minlevel : 3,
            description : desc(["While Neko Channeling, you gain the following benefits:",
                                "Blurred Form: Attackers have disadvantage on the first melee or ranged attack against you each turn.",
                                "Mystifying Strikes (Reaction): Tail attacks create an illusory afterimage, imposing disadvantage on the target's",
                                "next attack roll until the start of your next turn."])
        },
        "subclassfeature9" : {
            name : "Charmer Summon",
            source : ["DanDw"],
            minlevel : 9,
            action : [
                ["action", "Summmon Charmer Neko"]
            ],
            description : desc(["Charmer Nekos are mature clan Nekomata. They have disguised most of their bodies",
                                "to appear as human but certain cat traits remain such as their ears, eyes, and tails."]),
            creaturesAdd: [
                ["Charmer Neko", true]
            ]
        },
        "subclassfeature15" : {
            name : "Charmer Wind",
            source : ["DanDw"],
            minlevel : 15,
            description : desc(["The Charmer Neko as an action can summon a mix of magical fire and illusory wind and petals to sweep out from them.",
                                "This mix of fire and illusion lasts for up to one minute or until the Charmer Neko moves from where they started the action.",
                                "Each creature in a 25-foot cube originating from the Charmer Neko must make a dexterity saving throw DC 16.",
                                "On a failed save, a creature takes 4d6 fire damage. On a successful save, the creature takes half as much damage.",
                                "Each creature must then make a Wisdom saving throw or become mentally unable to walk towards the Charmer Neko",
                                "while still inside the area of the illusion. Creatures that failed their dexterity saving throw have disadvantage",
                                "on this wisdom saving throw. Each round a creature begins its turn inside the area they must make the dexterity save again,",
                                "and at the end of their turn they can make the wisdom save again to break its effect."])
        },
        "subclassfeature20" : {
            name : "Charmer Nekomata",
            source : ["DanDw"],
            minlevel : 20,
            description : desc(["The charmer neko's hypnotic dance's DC increases to 19 and their Sudden Attraction's",
                                "dice change to 2d4. The nekomancer while neko channeling also have their Charisma",
                                "grows by 4 and max increases to 24."])
        }
    }
});

CreatureList["young neko"] = {
    name : "Young Neko",
    nameAlt : ["Young Neko"],
    source : ["DanDw"],
	minlevel : 1, //min Main Character level to show this Creature
    size : 4,
    type : "fey",
    companion : "familiar",
	alignment : "unaligned",	
	ac: 15,
	hp: 8,
	hd : [0],
    speed : "40 ft",
    proficiencyBonus : 2,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [12, 16, 12, 10, 14, 10],
	saves : ["", 5, "", "", 4, ""],
	senses : "Darkvision 60 ft",
	attacksAction : 1,
	skills: {
		stealth: 5
	},
	passivePerception: 15,
	languages : "Common, Elvish, Sylvan",
    attacks : [{
		name : "Claw",
		ability : 2,
        abilitytodamage : true,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Melee Weapon Attack: +5 to hit, reach 5 ft, one creature. Hit: 6 (1d6 + 3) slashing damage."
	}],
    traits : [{
        name : "Twin Tailed Revenge",
        description : desc(["When either the Neko or Nekomancer takes damage from an enemy within 90 ft of them, the Neko can mark the enemy as a reaction.", 
                            "The next time the marked enemy is hit by the Neko or Nekomancer, they take an extra 1d6 fire damage."])
    }],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.nekomancer) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;

			HDobj.alt.push( Math.max(creaHP, 4 + 3 * classes.known.nekomancer.level) );
			HDobj.altStr.push("Young Nekos HP is 4 + 3 times my Nekomancer Level");
		
		},
		setAltHp : true
	}
};

CreatureList["veteran neko"] = {
    name : "Veteran Neko",
    nameAlt : ["Veteran Neko"],
    source : ["DanDw"],
	minlevel : 18, //min Main Character level to show this Creature
    size : 3,
    type : "fey",
    companion : "familiar",
	alignment : "unaligned",	
	ac: 16,
	hp: 76,
	hd : [0],
    speed : "40 ft",
    proficiencyBonus : 6,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [14, 18, 14, 10, 16, 10],
	saves : ["", 10, "", "", 9, ""],
	senses : "Darkvision 60 ft",
	attacksAction : 2,
	skills: {
		stealth: 8
	},
    damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
	passivePerception: 18,
	languages : "Common, Elvish, Sylvan",
    attacks : [{
		name : "Claws",
		ability : 2,
        abilitytodamage : true,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Melee Weapon Attack (Magical): +8 to hit, reach 5 ft, one creature. Hit: 10 (2d6 + 4) slashing damage."
	}],
    traits : [{
        name : "Twin Tailed Revenge",
        description : desc(["When either the Neko or Nekomancer takes damage from an enemy within 90 ft of them, the Neko can mark the enemy as a reaction." + 
                            "The next time the marked enemy is hit by the Neko or Nekomancer, they take an extra 2d6 fire damage."])
    }],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.nekomancer) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;

			HDobj.alt.push( Math.max(creaHP, 4 + 4 * classes.known.nekomancer.level) );
			HDobj.altStr.push("Veteran Nekos HP is 4 + 4 times my Nekomancer Level");
		
		},
		setAltHp : true
	}
};

CreatureList["beast neko"] = {
    name : "Beast Neko",
    nameAlt : ["Beast Neko"],
    source : ["DanDw"],
	minlevel : 9, //min Main Character level to show this Creature
    size : 3,
    type : "fey",
    companion : "familiar",
	alignment : "unaligned",	
	ac: 18,
	hp: 40,
	hd : [0],
    speed : "50 ft",
    proficiencyBonus : 4,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [14, 20, 14, 10, 16, 10],
	saves : ["", 9, "", "", 7, ""],
	senses : "Darkvision 60 ft",
	attacksAction : 2,
	skills: {
		stealth: 12
	},
    damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
	passivePerception: 18,
	languages : "Common, Elvish, Sylvan",
    attacks : [{
		name : "Bite",
		ability : 2,
        abilitytodamage : true,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Melee Weapon Attack (Magical): +9 to hit, reach 5 ft, one creature. Hit: 11 (2d6 + 5) slashing damage."
	}],
    traits : [{
        name : "Terrifying Pin",
        description : desc(["When the Beast Neko makes an opportunity attack they can if they hit, grapple the target.", 
                            "The grappled target is feared and is also considered restrained if they are medium size or smaller."])
    }],
    actions : [{
        name : "Shadow Step",
        description : desc(["The beast Neko can teleport itself to a point that it can see within 60ft of its current position.",
                            "This action can be used three time per summoning."])
    }],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.nekomancer) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;

			HDobj.alt.push( Math.max(creaHP, 4 + 4 * classes.known.nekomancer.level) );
			HDobj.altStr.push("Beast Nekos HP is 4 + 4 times my Nekomancer Level");
		
		},
		setAltHp : true
	}
};

CreatureList["guardian neko"] = {
    name : "Guardian Neko",
    nameAlt : ["Guardian Neko"],
    source : ["DanDw"],
	minlevel : 9, //min Main Character level to show this Creature
    size : 3,
    type : "fey",
    companion : "familiar",
	alignment : "unaligned",	
	ac: 20,
	hp: 50,
	hd : [0],
    speed : "30 ft",
    proficiencyBonus : 4,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [18, 14, 18, 10, 16, 10],
	saves : ["", "", 8, "", 7, ""],
	senses : "Darkvision 60 ft",
	attacksAction : 2,
	skills: {
		Intimidation: 8
	},
    damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
	passivePerception: 18,
	languages : "Common, Elvish, Sylvan",
    attacks : [{
		name : "Great Club",
		ability : 1,
        abilitytodamage : true,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "Melee Weapon Attack (Magical): +8 to hit, reach 5 ft, one creature. Hit: 12 (2d8 + 4) slashing damage."
	}],
    traits : [{
        name : "Guardian's Aid",
        description : desc(["When either the Nekomancer or another ally is attacked within 30ft of the Guardian Neko as a reaction the Neko",
                            "can form a weak magical shield around them that grants a +1 to their AC and 1d4 of temporary hit points.", 
                            "This shield disappears at the beginning of the Nekomancer's turn."])
    }],
    actions : [{
        name : "Swig",
        description : desc(["The Guardian Neko takes a quick drink from a gourd that they keep tied to their waist and restore 6d4 hit points.",
                            "This action can only be used twice per summoning."])
    }],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.nekomancer) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;

			HDobj.alt.push( Math.max(creaHP, 5 + 5 * classes.known.nekomancer.level) );
			HDobj.altStr.push("Guardian Nekos HP is 5 + 5 times my Nekomancer Level");
		
		},
		setAltHp : true
	}
};

CreatureList["charmer neko"] = {
    name : "Charmer Neko",
    nameAlt : ["Charmer Neko"],
    source : ["DanDw"],
	minlevel : 9, //min Main Character level to show this Creature
    size : 3,
    type : "fey",
    companion : "familiar",
	alignment : "unaligned",	
	ac: 16,
	hp: 40,
	hd : [0],
    speed : "40 ft",
    proficiencyBonus : 4,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [14, 16, 14, 10, 16, 18],
	saves : ["", 7, "", "", "", 8],
	senses : "Darkvision 60 ft",
	attacksAction : 2,
	skills: {
		Persuasion: 10
	},
    damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
	passivePerception: 18,
	languages : "Common, Elvish, Sylvan",
    attacks : [{
		name : "Throwing Blade",
		ability : 2,
        abilitytodamage : true,
		damage : [2, 6, "piercing"],
		range : "Ranged (20 ft)",
		description : "Ranged Weapon Attack (Magical): +7 to hit, reach 20 ft, one creature. Hit: 9 (2d6 + 3) piercing damage."
	}],
    traits : [{
        name : "Sudden Attraction",
        description : desc([" When an ally is attacked from an enemy within 60ft of the Charmer Neko the Charmer neko",
                            "can as a reaction distract the the attacker and drop their attack roll by 1d4."])
    }],
    actions : [{
        name : "Hypnotic Dance",
        description : desc(["The Charmer Neko releases a swarm of illusory flower petals and performs a hypnotic dance.",
                            "Each creature within 30ft who sees the Charmer Neko's dance must make a Wisdom saving throw DC 16.",
                            "On a failed save, the creature becomes charmed for the duration. While charmed the creature is",
                            "incapacitated and has a speed of 0. The charmed status ends for an affected creature if it takes",
                            "any damage or if someone else uses an action to shake the creature out of its stupor.",
                            "This action can be used once per summoning."])
    }],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.nekomancer) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;

			HDobj.alt.push( Math.max(creaHP, 4 + 4 * classes.known.nekomancer.level) );
			HDobj.altStr.push("Guardian Nekos HP is 4 + 4 times my Nekomancer Level");
		
		},
		setAltHp : true
	}
};
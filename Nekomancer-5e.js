var iFileName = "Nekomancer-5e.js";
RequiredSheetVersion("13.2");

SourceList["HB:NM"] = {
    name : "Homebrew: Nekomancer",
    abbreviation : "HB:NM",
    group : "Homebrew",
    url : "https://www.dandwiki.com/wiki/Nekomancer_(5e_Class)",
    date : "2024/11/10"
};

ClassList["nekomancer"] = {
    regExpSearch : /nekomancer/i,
    name : "Nekomancer",
    source : ["HB:NM", 0],
    primaryAbility : "Dexterity",
    prereqs : "Dexterity 13 and Wisdom 13",
    die : 8,
    improvements : levels.map(function(n) { return (n === 4 || n === 8 || n === 12 || n === 16 || n === 19) ? 1 : 0; }),
    saves: ["Dex", "Wis"],
    skillstxt: "Animal Handling and Choose two from Arcana, Performance, Medicine, History, Nature, Survival, and Perception",
    armor: [
        [true, false, false, false],
        [true, true, false, false]
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
    attacks: levels.map(function (n) {
        return n < 11 ? 1 : 2;
    }),
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
            source : ["HB:NM", 0],
            minlevel : 1,
            description :   "\n I can cast spells using Charisma as my spellcasting ability, similar to a Warlock." + 
                            "\n I use the Druid spell list but cast spells at the highest level as per Warlock mechanics."
        },
        "neko summoning" : {
            name : "Neko Summoning",
            source : ["HB:NM", 0],
            minlevel : 1,
            usages : 1,
            //usagescalc : ["", "", "", "", "", "", "", "", "", "", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2"],
            recovery : "short rest",
            description :   "\n Summon a spectral Neko to fight alongside you as an action, appearing in a 5ft cube within 10ft" + 
                            "\n The Neko follows your commands for up to 10 minutes or until its HP drops to 0, then it disappears" + 
                            "\n Cannot summon another Neko until completing a short or long rest",
            action : ["action", " (Summon Neko)"],
        },
        "young neko" : {
            name : "Young Neko",
            source : ["HB:NM", 0],
            minlevel : 1,
            description : "\n Young Nekos are immature Nekomata. They resemble the common cat except for their two tails that on occasion glow with spectral fire."
        },
        "neko channeling" : {
            name : "Neko Channeling",
            source : ["HB:NM", 0],
            minlevel : 2,
            usages : 1,
            //usagescalc : ["", "", "", "", "", "", "", "", "", "", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2"],
            recovery : "short rest",
            description :   "\n Channel the Nekomata's power to gain spectral claws, two tails, and cat ears" + 
                            "\n Use an action to make two claw attacks and a bonus action to make a tail attack" + 
                            "\n Each attack deals 1d4 + Dexterity modifier damage (slashing for claws, bludgeoning for tails)" + 
                            "\n Channeling lasts 1 minute, usable once per short or long rest",
        },
        /*"claws" : {
            name : "Claws",
            source : ["HB:NM", 0],
            minlevel : 2,
            weaponsAdd : ["Claws"],
            weaponOptions : [{
                baseWeapon : "unarmed strike",
                regExpSearch : /^(?=.*claws).*$/i,
                name : "Claws",
                source : ["HB:NM", 0],
                type : AlwaysProf,
                ability : 2,
                abilitytodamage : true,
                damage : [1, 4, "slashing"],
                range : "Melee, 5/5 ft",
                selectNow : true,
                description : "Finesse, magical",
                isAlwaysProf : true,
            }],
            action : [
                        ["action", "2 Attacks with Claws"],
                        ["bonus action", "Tail"]
                ]
        },
        doesn't work yet*/
        "subclassfeature3" : {
            name : "Neko Clans",
            source : ["HB:NM", 0],
            minlevel : 3,
            description : "\n Choose a clan of Nekomata to follow: Beast Clan, Guardian Clan, or Charmer Clan",
        },
        "keen senses" : {
            name : "Keen Senses",
            source : ["HB:NM", 0],
            minlevel : 6,
            description : "\n While neko channeling, gain advantage on initiative and perception checks, and cannot be surprised",
            advantages : [
                            ["Initiative", true],
                            ["Perception", true]]
        },
        "hunting pair" : {
            name : "Hunting Pair",
            source : ["HB:NM", 0],
            minlevel : 11,
            description :   "\n The number of Nekos that can be summoned between short and long rests increases to 2" + 
                            "\n If both Nekos are out at the same time, only one can be a clan Neko" +
                            "\n The Nekomancer gains an extra attack per attack action"
        },
        "feline grace" : {
            name : "Feline Grace",
            source : ["HB:NM", 0],
            minlevel : 13,
            description :   "\n Gain advantage on all Dexterity saving throws" + 
                            "\n While neko channeling, your speed increases by 10 ft",
            speed : { allModes : "+10 ft" }
        },
        "predator's leap" : {
            name : "Predator's Leap",
            source : ["HB:NM", 0],
            minlevel : 14,
            description :   "\n Both the nekomancer and their neko summons can make a supernatural leap up to 60 ft in any direction as a bonus action",
            action : ["bonus action", "(Leap)"]
        },
        "fire of the fey cat" : {
            name : "Fire of the Fey Cat",
            source : ["HB:NM", 0],
            minlevel : 17,
            description :   "\n While neko channeling, your spectral tails and claws burn with neko fire" + 
                            "\n Claw and tail attacks deal an additional 1d4 fire damage"
        },
        "experienced hunters" : {
            name : "Experienced Hunters",
            source : ["HB:NM", 0],
            minlevel : 18,
            description : "\n   " + "The nekomancer stops summoning young nekos and summons veteran nekos"
        },
        "veteran neko" : {
            name : "Veteran Neko",
            source : ["HB:NM", 0],
            minlevel : 18,
            description : "\n   " + "At level 18, you begin summoning Veteran Nekos instead of Young Nekos. Veteran Nekos are larger, mature Nekomata with higher stats and abilities."
        }
    },
};

// Define each Neko Clan subclass with AddSubClass
AddSubClass("nekomancer", "beast clan", {
    regExpSearch : /^(?=.*beast)(?=.*clan).*$/i,
    subname : "Beast Clan",
    source : ["HB:NM", 0],
    features : {
        "subclassfeature9" : {
            name : "Beast Summon",
            source : ["HB:NM", 0],
            minlevel : 9,
            description : "\n   " + "Summon a Beast Neko with enhanced stats and abilities"
        },
        "subclassfeature15" : {
            name : "Beast Fangs",
            source : ["HB:NM", 0],
            minlevel : 15,
            description : "\n   " + "Beast Neko's bite deals 1d6 poison damage and can cause exhaustion"
        },
        "subclassfeature20" : {
            name : "Beast Nekomata",
            source : ["HB:NM", 0],
            minlevel : 20,
            description : "\n   " + "Unlimited Shadow Step for Beast Neko; Nekomancer gains +4 Dexterity, max 24"
        }
    }
}),


AddSubClass("nekomancer", "guardian clan", {
    regExpSearch : /^(?=.*guardian)(?=.*clan).*$/i,
    subname : "Guardian Clan",
    source : ["HB:NM", 0],
    features : {
        "subclassfeature9" : {
            name : "Guardian Summon",
            source : ["HB:NM", 0],
            minlevel : 9,
            description : "\n Summon a Guardian Neko with defensive abilities and support skills"
        },
        "subclassfeature15" : {
            name : "Guardian Taunt",
            source : ["HB:NM", 0],
            minlevel : 15,
            description : "\n Force enemies to focus attacks on Guardian Neko within a 60 ft radius"
        },
        "subclassfeature20" : {
            name : "Guardian Nekomata",
            source : ["HB:NM", 0],
            minlevel : 20,
            description : "\n Guardian Neko has resistance to all damage types; Nekomancer gains +4 Constitution, max 24"
        }
    }
}),

AddSubClass("nekomancer", "charmer clan", {
    regExpSearch : /^(?=.*charmer)(?=.*clan).*$/i,
    subname : "Charmer Clan",
    source : ["HB:NM", 0],
    features : {
        "subclassfeature9" : {
            name : "Charmer Summon",
            source : ["HB:NM", 0],
            minlevel : 9,
            description : "\n   " + "Summon a Charmer Neko with enchanting abilities and distraction skills"
        },
        "subclassfeature15" : {
            name : "Charmer Wind",
            source : ["HB:NM", 0],
            minlevel : 15,
            description : "\n   " + "Create illusory fire/wind with fire damage and movement hindrance effects"
        },
        "subclassfeature20" : {
            name : "Charmer Nekomata",
            source : ["HB:NM", 0],
            minlevel : 20,
            description : "\n   " + "Charmer Neko's enchantment effects are maximized; Nekomancer gains +4 Charisma, max 24"
        }
    }
});


CreatureList["young neko"] = {
    name : "Young Neko",
    nameAlt : ["Young Neko"],
    source : ["HB:NM", 0],
    defaultExcluded : false,
    size : 2, // Small
    type : "fey",
    companion : "familiar",
    alignment : "unaligned",
    ac : 15,
    hp : 4 + 3, //* What("Character Level"), // 3 + three times the Nekomancer's level
    hd : [1, 4],
    speed : "40 ft",
    proficiencyBonus : 2,
    proficiencyBonusLinked : true,
    challengeRating: "1/2",
    scores : [12, 16, 12, 10, 14, 10],
    saves : ["", (3 + proficiencyBonusLinked), "", "", (2 + proficiencyBonusLinked), ""],
    senses : "Darkvision 60 ft, Passive Perception 15",
    attacksAction : 2,
    attacks : [{
		name : "Claws",
		ability : 2,
        abilitytodamage : true,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Two claws attacks as an Attack action"
	}],
    skills : {
        "stealth" : 5
    },
    languages : "Common, Elvish, Sylvan",
    actions : [{
        name : "Claw",
        description : "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) slashing damage."
    }],
    traits : [{
        name : "Twin Tailed Revenge",
        description :   "\n When either the Neko or Nekomancer takes damage from an enemy within 90 ft of them, the Neko can mark the enemy as a reaction." + 
                        "\n The next time the marked enemy is hit by the Neko or Nekomancer, they take an extra 1d6 fire damage."
    }],
    notes : [{
		name : "Young Neko",
		minlevel : 13,
		description : desc([
			"Young Nekos are immature Nekomata.",
			"They resemble the common cat except for their two tails that on occasion glow with spectral fire."
		]),
		joinString : "\n"
	}],
};

CompanionList["young neko"] = {
    name : "Young Neko",
    nameMenu : "Young Neko",
    source : ["HB:NM", 0],
    includeCheck : function(sCrea, objCrea, iCreaCR, bIsAL) {
        return objCrea.type.toLowerCase() === "young neko" && objCrea.size >= 1/4 && iCreaCR <= 1;
    },
    action : [
        ["action", "Claw"],
        ["reaction", "Twin Tailed Vengeance"]
    ]
};


/*

CreatureList["veteran neko"] = {
    name : "Veteran Neko",
    source : ["HB:NM", 0],
    size : 2, // Medium
    type : "fey",
    alignment : "unaligned",
    ac : 16,
    hp : 4 + 4 * What("Character Level"), // 4 + four times the Nekomancer's level
    speed : "40 ft",
    scores : [14, 18, 14, 10, 16, 10],
    saves : ["", (4 + ProficiencyBonus(What("Character Level"))), "", "", (3 + ProficiencyBonus(What("Character Level"))), ""],
    skills : {
        "stealth" : 8
    },
    damage_resistances : "Non-magical slashing, piercing, bludgeoning",
    senses : "Darkvision 60 ft, Passive Perception 18",
    languages : "Common, Elvish, Sylvan",
    traits : [{
        name : "Twin Tailed Vengeance",
        description :   "\n When either the Neko or Nekomancer takes damage from an enemy within 90 ft of them, the Neko can mark the enemy as a reaction." + 
                        "\n The next time the marked enemy is hit by the Neko or Nekomancer, they take an extra 2d6 fire damage."
    }],
    actions : [{
        name : "Claw",
        description : "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 4) slashing damage."
    }]
};

CreatureList["beast neko"] = {
    name : "Beast Neko",
    source : ["HB:NM", 0],
    size : 2,
    type : "fey",
    alignment : "unaligned",
    ac : 18,
    hp : 4 + 4 * What("Character Level"), // 4 + four times the Nekomancer's level
    speed : "50 ft",
    scores : [14, 20, 14, 10, 16, 10],
    saves : ["", (5 + ProficiencyBonus(What("Character Level"))), "", "", (3 + ProficiencyBonus(What("Character Level"))), ""],
    skills : {
        "stealth" : 12
    },
    damage_resistances : "Non-magical slashing, piercing, bludgeoning",
    senses : "Darkvision 60 ft, Passive Perception 18",
    languages : "Common, Elvish, Sylvan",
    traits : [{
        name : "Terrifying Pin",
        description :   "\n When the Beast Neko makes an opportunity attack they can if they hit, grapple the target." +
                        "\n The grappled target is feared and is also considered restrained if they are medium size or smaller."
    }],
    actions : [{
        name : "Bite",
        description : "Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 11 (2d6 + 5) piercing damage."
    },
    {
        name: "Shadow Step",
        description : "The beast Neko can teleport itself to a point that it can see within 60ft of its current position. This action can be used three time per summoning."
    }]
};

CreatureList["guardian neko"] = {
    name : "Guardian Neko",
    source : ["HB:NM", 0],
    size : 2,
    type : "fey",
    alignment : "unaligned",
    ac : 20,
    hp : 5 + 4 * What("Character Level"), // 4 + four times the Nekomancer's level
    speed : "30 ft",
    scores : [18, 14, 18, 10, 16, 10],
    saves : ["", (4 + ProficiencyBonus(What("Character Level"))), "", "", (3 + ProficiencyBonus(What("Character Level"))), ""],
    skills : {
        "intimidation" : 8
    },
    damage_resistances : "Non-magical slashing, piercing, bludgeoning",
    senses : "Darkvision 60 ft, Passive Perception 18",
    languages : "Common, Elvish, Sylvan",
    traits : [{
        name : "Guardian's Aid",
        description :   "\n When either the Nekomancer or another ally is attacked within 30ft of the Guardian Neko" +
                        "\n as a reaction the Neko can form a weak magical shield around them that grants a +1 to their AC and 1d4 of temporary hit points." +
                        "\n This shield disappears at the beginning of the Nekomancer's turn."
    }],
    actions : [{
        name : "Great Club",
        description : "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 4) bludgeoning damage."
    },
    {
        name: "Swig",
        description :   "\n The Guardian Neko takes a quick drink from a gourd that they keep tied to their waist and restore 6d4 hit points." +
                        "\n This action can only be used twice per summoning."
    }]
};

CreatureList["charmer neko"] = {
    name : "Charmer Neko",
    source : ["HB:NM", 0],
    size : 2,
    type : "fey",
    alignment : "unaligned",
    ac : 16,
    hp : 4 + 4 * What("Character Level"), // 4 + four times the Nekomancer's level
    speed : "40 ft",
    scores : [14, 16, 14, 10, 16, 18],
    saves : ["", (3 + ProficiencyBonus(What("Character Level"))), "", "", (4 + ProficiencyBonus(What("Character Level"))), ""],
    skills : {
        "persuasion" : 10
    },
    damage_resistances : "Non-magical slashing, piercing, bludgeoning",
    senses : "Darkvision 60 ft, Passive Perception 18",
    languages : "Common, Elvish, Sylvan",
    traits : [{
        name : "Sudden Attraction",
        description : "When an ally is attacked from an enemy within 60ft of the Charmer Neko the Charmer neko can as a reaction distract the the attacker and drop their attack roll by 1d4."
    }],
    actions : [{
        name : "Throwing Blade",
        description : "Ranged Weapon Attack: +7 to hit, reach 20ft., one creature. Hit: 12 (1d6+ 3) piercing damage."
    },
    {
        name: "Hypnotic Dance",
        description :   "\n The Charmer Neko releases a swarm of illusory flower petals and performs a hypnotic dance." +
                        "\n Each creature within 30ft who sees the Charmer Neko's dance must make a Wisdom saving throw DC 16." +
                        "\n On a failed save, the creature becomes charmed for the duration. While charmed the creature is incapacitated and has a speed of 0." +
                        "\n The charmed status ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor." +
                        "\n This action can be used once per summoning."
    }]
};

currently not working */
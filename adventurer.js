function Adventurer(){
	this.level = 1;
	this.experience = 0;
	this.strength = Math.floor((Math.random() * 10) + 5);
	this.health = Math.floor((Math.random() * 10) + 5);
	this.magicpower = Math.floor((Math.random() * 10) + 5);
	this.dexterity = Math.floor((Math.random() * 10) + 5);
	this.agility = Math.floor((Math.random() * 10) + 5);
	this.luck = Math.floor((Math.random() * 10) + 5);
	//bonus
	var bonus_type = Math.floor((Math.random() * 6));
	var bonus_val = Math.floor((Math.random() * 10));
	if(bonus_type==0)this.strength+=bonus_val;
	else if(bonus_type==1)this.health+=bonus_val;
	else if(bonus_type==2)this.magicpower+=bonus_val;
	else if(bonus_type==3)this.dexterity+=bonus_val;
	else if(bonus_type==4)this.agility+=bonus_val;
	else if(bonus_type==5)this.luck+=bonus_val;
	//reincarnate lv
	this.reincarnate=0;
	//pantsu
	this.pantsu=0;
	//eris
	this.eris=0;
}

Adventurer.prototype.set = function(level, experience, strength, health, magicpower, dexterity, agility, luck, reincarnate, pantsu, eris){
	this.level = level;
	this.experience = experience;
	this.strength = strength;
	this.health = health;
	this.magicpower = magicpower;
	this.dexterity = dexterity;
	this.agility = agility;
	this.luck = luck;
	this.reincarnate = reincarnate;
	this.pantsu = pantsu;
	this.eris = eris;
	//back compability
	if(isNaN(reincarnate))this.reincarnate = 0;
	if(isNaN(pantsu))this.pantsu = 0;
	if(isNaN(eris))this.eris = 0;
}

Adventurer.prototype.showExp = function(){
	/*var previous=this.level*(this.level-1);
	var exp=Math.floor((this.experience-previous)*100/(this.level*2));
	if(exp<0)exp=0;
	return exp;*/
	return Math.floor(this.experience*100/this.nextLv());
}

Adventurer.prototype.stats = function(name){
    return "```\n"+name+" Lv "+this.level+
	"\nNext Lv: "+this.showExp()+"%"+
	"\n"+this.jobclass()+"\n"+
	"\nStrength      : "+this.strength+
	"\nHealth        : "+this.health+
	"\nMagic Power   : "+this.magicpower+
	"\nDexterity     : "+this.dexterity+
	"\nAgility       : "+this.agility+
	"\nLuck          : "+this.luck+
	"\n"+
	"\nReicarnateLv  : "+this.reincarnate+
	"\n"+this.eris+" eris"+
	"\n"+this.pantsu+" pantsu(s)"+
	"\n```";
};

function reincarnationBonus(val){
	return Math.ceil(Math.sqrt(val/10));
}

Adventurer.prototype.reincarnation = function(){
	this.reincarnate+=(this.level-1);
	this.level = 1;
	this.experience = 0;
	var reBonus=reincarnationBonus(this.reincarnate);
	this.strength = Math.floor((Math.random() * 10) + 5+reBonus);
	this.health = Math.floor((Math.random() * 10) + 5+reBonus);
	this.magicpower = Math.floor((Math.random() * 10) + 5+reBonus);
	this.dexterity = Math.floor((Math.random() * 10) + 5+reBonus);
	this.agility = Math.floor((Math.random() * 10) + 5+reBonus);
	this.luck = Math.floor((Math.random() * 10) + 5+reBonus);
	//bonus
	var bonus_type = Math.floor((Math.random() * 6));
	var bonus_val = Math.floor((Math.random() * 10)+reBonus);
	if(bonus_type==0)this.strength+=bonus_val;
	else if(bonus_type==1)this.health+=bonus_val;
	else if(bonus_type==2)this.magicpower+=bonus_val;
	else if(bonus_type==3)this.dexterity+=bonus_val;
	else if(bonus_type==4)this.agility+=bonus_val;
	else if(bonus_type==5)this.luck+=bonus_val;
}

Adventurer.prototype.jobclass = function(){
	if(this.strength>=this.health && this.strength>=this.magicpower && this.strength>=this.dexterity && this.strength>=this.agility && this.strength>=this.luck)
		return "Swordsman";
	else if(this.health>=this.strength && this.health>=this.magicpower && this.health>=this.dexterity && this.health>=this.agility && this.health>=this.luck){
		if(this.strength>=this.magicpower && this.strength>=this.dexterity && this.strength>=this.agility && this.strength>=this.luck)
			return "Arch Priest";
		else
			return "Crusader";
	}
	else if(this.magicpower>=this.strength && this.magicpower>=this.health && this.magicpower>=this.dexterity && this.magicpower>=this.agility && this.magicpower>=this.luck)
		return "Arch Wizard";
	else if(this.dexterity>=this.strength && this.dexterity>=this.health && this.dexterity>=this.magicpower && this.dexterity>=this.agility && this.dexterity>=this.luck)
		return "Archer";
	else if(this.agility>=this.strength && this.agility>=this.health && this.agility>=this.magicpower && this.agility>=this.dexterity && this.agility>=this.luck)
		return "Thief";
	else
		return "Adventurer";
}

Adventurer.prototype.randomStatSwap = function(multiplier){
	var stat1=Math.floor(Math.random()*6);
	var stat2=Math.floor(Math.random()*6);
	var str="";
	//swap
	var temp=0;
	if(stat1==0){str="strength"; temp=this.strength;}
	else if(stat1==1){str="health"; temp=this.health;}
	else if(stat1==2){str="magicpower"; temp=this.magicpower;}
	else if(stat1==3){str="dexterity"; temp=this.dexterity;}
	else if(stat1==4){str="agility"; temp=this.agility;}
	else if(stat1==5){str="luck"; temp=this.luck;}
	str+=" swapped with ";
	var temp2=0;
	if(stat2==0){str+="strength"; temp2=this.strength; this.strength=temp;}
	else if(stat2==1){str+="health"; temp2=this.health; this.health=temp;}
	else if(stat2==2){str+="magic power"; temp2=this.magicpower; this.magicpower=temp;}
	else if(stat2==3){str+="dexterity"; temp2=this.dexterity; this.dexterity=temp;}
	else if(stat2==4){str+="agility"; temp2=this.agility; this.agililty=temp;}
	else if(stat2==5){str+="luck"; temp2=this.luck; this.luck=temp;}
	if(stat1==0){this.strength=temp2;}
	else if(stat1==1){this.health=temp2;}
	else if(stat1==2){this.magicpower=temp2;}
	else if(stat1==3){this.dexterity=temp2;}
	else if(stat1==4){this.agility=temp2;}
	else if(stat1==5){this.luck=temp2;}
	return str;
}

Adventurer.prototype.addStat = function(adv){
	var shadow=new Adventurer();
	shadow.set(this.level+adv.level,0,this.strength+adv.strength,this.health+adv.health,this.magicpower+adv.magicpower,this.dexterity+adv.dexterity,this.agility+adv.agility,this.luck+adv.luck);
	return shadow;
}

Adventurer.prototype.getShadow = function(multiplier){
	var shadow=new Adventurer();
	shadow.set(1,0,this.strength*multiplier,this.health*multiplier,this.magicpower*multiplier,this.dexterity*multiplier,this.agility*multiplier,this.luck*multiplier);
	return shadow;
}

Adventurer.prototype.nextLv = function(lv){
	if(lv==undefined)lv=this.level;
	//return lv*(lv+1);
	return lv*2;
}

Adventurer.prototype.getExp = function(exp){
	this.experience+=exp;
	//check lv up
	var next=this.nextLv();
	if(this.experience>=next){
		this.levelUp();
		//reset exp
		var surplus=this.experience-next;
		this.experience=0;
		//recheck lv up again
		this.getExp(surplus);
	}
}

Adventurer.prototype.randomGain = function(){
	var reBonus=reincarnationBonus(this.reincarnate);
	var bonus_type = Math.floor((Math.random() * 6));
	var bonus_val = Math.ceil(Math.random() * (2+reBonus));
	if(bonus_type==0)this.strength+=bonus_val;
	else if(bonus_type==1)this.health+=bonus_val;
	else if(bonus_type==2)this.magicpower+=bonus_val;
	else if(bonus_type==3)this.dexterity+=bonus_val;
	else if(bonus_type==4)this.agility+=bonus_val;
	else if(bonus_type==5)this.luck+=bonus_val;
}

Adventurer.prototype.levelUp = function(){
	this.level+=1;
	var reBonus=reincarnationBonus(this.reincarnate);
	this.strength+=Math.floor((Math.random() * (2+reBonus)) + 1);
	this.health+=Math.floor((Math.random() * (2+reBonus)) + 1);
	this.magicpower+=Math.floor((Math.random() * (2+reBonus)) + 1);
	this.dexterity+=Math.floor((Math.random() * (2+reBonus)) + 1);
	this.agility+=Math.floor((Math.random() * (2+reBonus)) + 1);
	this.luck+=Math.floor((Math.random() * (2+reBonus)) + 1);
}

//parameter: this name, enemy name, enemy adventurer
Adventurer.prototype.fight = function(name1, name2, enemy){
	var battleLog="";
	var hp1=this.health;
	var hp2=enemy.health;
	while(hp1>0 && hp2>0){
		var result=this.combat(name1, name2, enemy);
		battleLog+=result[0]+"\n";
		hp2-=result[1];

		if(hp2<=0)break;

		result=enemy.combat(name2, name1, this);
		battleLog+=result[0]+"\n";
		hp1-=result[1];
	}
	if(hp1>0){
		battleLog+=name2+" lose...\n"+name1+" win!\n";
		this.getExp(enemy.level);
	} else {
		battleLog+=name1+" lose...\n"+name2+" win!\n";
		enemy.getExp(this.level);
	}
	return battleLog;
}

var odds={
attack:100,
explosion:10,
steal:25,
godblow:50,
lightofsaber:40,
partytrick:25
};

Adventurer.prototype.combat = function(name1, name2, target){
	var chance=0;
	for(attack in odds){
		chance+=odds[attack];
	}
	var skill=Math.floor((Math.random() * chance));
	for(attack in odds){
		if(skill<odds[attack]){
			if(attack=="attack")return this.attack(name1, name2, target);
			else if(attack=="explosion")return this.explosion(name1, name2, target);
			else if(attack=="steal")return this.steal(name1, name2, target);
			else if(attack=="godblow")return this.godblow(name1, name2, target);
			else if(attack=="lightofsaber")return this.lightofsaber(name1, name2, target);
			else if(attack=="partytrick")return this.partytrick(name1, name2, target);
		}
		else skill-=odds[attack];
	}
}

//skills

Adventurer.prototype.attack = function(name1, name2, target){
	var randomizer=Math.random()+0.5;
	var multiplier=this.level/target.level;
	//limit multiplier 0.5~1.5
	if(multiplier>1.5)multiplier=1.5;
	else if(multiplier<0.5)multiplier=0.5;
	var power=1;
	var damage=Math.ceil(this.strength*multiplier*randomizer*power);
	//critical chance ~5% max 10%
	var criticalChance=this.luck/(this.luck+target.luck*19);
	if(criticalChance>0.1)criticalChance=0.1;
	//miss chance ~10% max 50%
	var missChance=target.agility/(this.dexterity*9+target.agility);
	if(missChance>0.5)missChance=0.5;
	//critical
	if(Math.random()<criticalChance){
		damage*=3;
		return [name1+" attacked "+name2+". Critical! "+name2+" took "+damage+" damage...",damage];
	}
	//miss
	else if(Math.random()<missChance){
		return [name1+" attacked "+name2+". But missed...",0];
	}
	//normal attack
	else return [name1+" attacked "+name2+". "+name2+" took "+damage+" damage...",damage];
}

Adventurer.prototype.explosion = function(name1, name2, target){
	return [name1+" used Explosion! "+name2+" exploded...",target.health];
}

Adventurer.prototype.steal = function(name1, name2, target){
	//success chance ~50% min 50%
	var successChance=this.luck/(target.luck+this.luck);
	if(successChance<0.5)successChance=0.5;
	//miyuchi safety pantsu
	if(name2=="Miyuchi")return [name1+" used Steal! But failed...",0];
	//failed
	else if(Math.random()>successChance)return [name1+" used Steal! But failed...",0];
	//success
	else {
		this.pantsu++;
		return [name1+" used Steal! "+name1+" got "+name2+"'s pantsu",0];
	}
}

Adventurer.prototype.godblow = function(name1, name2, target){
	return [name1+" used GOD BLOW! "+name2+" took 1 damage... Pfft",1];
}

Adventurer.prototype.lightofsaber =  function(name1, name2, target){
	if(this.jobclass()=="Crusader")
		return [name1+" used Light of Saber... Just kidding... Tee-hee",0];
	var randomizer=Math.random()+0.5;
	var multiplier=this.level/target.level;
	//limit multiplier 0.5~1.5
	if(multiplier>1.5)multiplier=1.5;
	else if(multiplier<0.5)multiplier=0.5;
	var power=2;
	var damage=Math.ceil(this.magicpower*multiplier*randomizer*power);
	return [name1+" used Light of Saber! "+name2+" took "+damage+" damage!",damage];
}

Adventurer.prototype.partytrick = function(name1, name2, target){
	if(target.eris==0)return [name1+" used party tricks! That was fun...",0];
	else{
		target.eris--;
		this.eris++;
		return [name1+" used party tricks! "+name2+" donated 1 eris in awe...",0];
	}
}

var Kazuma = new Adventurer();
Kazuma.set(1,0,13,12,9,14,15,792,0,0);
var Aqua = new Adventurer();
Aqua.set(21,0,72,81,26,3,46,1,0,0);
var Megumin = new Adventurer();
Megumin.set(6,0,17,26,231,32,21,18,0,0);

module.exports=Adventurer;
module.exports.Kazuma=Kazuma;
module.exports.Aqua=Aqua;
module.exports.Megumin=Megumin;

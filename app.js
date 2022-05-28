new  Vue({
    el:"#app",
    data:{
        playerHeal :100,
        monsterHeal:100,
        gameIsOn:false,
        attackMultiple :10,
        specialAttackMultiple :25,
        monsterAttackMultiple :15,
        gameLogs : []
    },
    methods:{
        startGame:function(){
            this.gameIsOn = !this.gameIsOn;
        },
        attack:function(){
            var point = Math.floor(Math.random() * 10);
            // this.monsterHeal = this.monsterHeal - point;
            this.monsterHeal -= point;
            this.addToLog({turn : "player", text : "Oyuncu Hasarı ("+point+")"});

            this.monsterAttack();
            if(this.monsterHeal < 0){
                this.monsterHeal = 0;
            }

        },
        specialAttack:function(){
            var point = Math.floor(Math.random() * 25);
            // this.monsterHeal = this.monsterHeal - point;
            this.monsterHeal -= point;
            this.addToLog({turn : "player", text : "Özel Oyuncu Hasarı ("+point+")"});
            this.monsterAttack();
            if(this.monsterHeal < 0){
                this.monsterHeal = 0;
            }
       
        },
        healUp:function(){
            var point = Math.floor(Math.random() * 20);
            // this.monsterHeal = this.monsterHeal - point;
            this.playerHeal += point;
            this.addToLog({turn : "player", text : "İlk Yardım("+point+")"});
            this.monsterAttack();
           
        },
        giveUp:function(){
            this.playerHeal = 0;
            this.addToLog({turn : "player", text : "Oyuncu Pes Etti."});

        },
        monsterAttack:function(){
            var point = Math.floor(Math.random() * 12);
            // this.playerHeal = this.playerHeal - point;
            this.playerHeal -= point;
            this.addToLog({turn : "canavar", text : " Canavar Hasarı ("+point+")"});
            if(this.playerHeal < 0){
                this.playerHeal = 0;
            }
        },
        addToLog:function(log){
            this.gameLogs.push(log)
        }
    },
    watch:{
        playerHeal:function(value){
            if(value <= 0){
                this.playerHeal = 0;
                if(confirm("Oyunu Kaybettin. Tekrar Dene!")){
                    this.playerHeal =  100;
                    this.monsterHeal = 100;
                    this.gameLogs =[];
                }
            }else if(value >=100) {
                this.playerHeal = 100;
            }
        },
        monsterHeal:function(value){
            if(value <= 0){
                this.monsterHeal = 0;
                if(confirm("Oyunu Kazandın. Tebrikler!")){
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.gameLogs =[];
                }
            }else if(value >=100) {
                this.monsterHeal = 100;
            }
        }
    }
})
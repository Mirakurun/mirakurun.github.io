new Vue({
    el: '#app',
    data: {
        hp: {
            player: 100,
            monster: 100
        },
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.hp.player = 100;
            this.hp.monster = 100;
            this.turns = [];
        },
        attack: function () {
            var playerAtkDmg = this.damage(5, 10); //between 5 and 10
            this.hp.monster -= playerAtkDmg;
            this.turns.unshift({ isPlayer: true, text: `PLAYER HITS MONSTER FOR ${playerAtkDmg}` });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function () {
            var playerAtkDmg = this.damage(1, 20); //between 1 and 20
            this.hp.monster -= playerAtkDmg;
            this.turns.unshift({ isPlayer: true, text: `PLAYER HITS MONSTER FOR ${playerAtkDmg}` });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            var heal = 10;
            if (this.hp.player <= 90) {
                this.hp.player += heal;
            } else {
                this.hp.player = 100;
            }
            this.turns.unshift({ isPlayer: true, text: `PLAYER HEALS HIMSELF FOR ${heal}` });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        damage: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        monsterAttacks: function () {
            var monsterAtkDmg = this.damage(5, 15); //between 5 and 15

            this.hp.player -= monsterAtkDmg;
            this.turns.unshift({ isPlayer: false, text: `MONSTER HITS PLAYER FOR ${monsterAtkDmg}` });
            this.checkWin();
        },
        giveUp: function () {
            this.isGameRunning = !this.isGameRunning;
            this.turns = [];
        },
        checkWin: function () {
            if (this.hp.monster <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if (this.hp.player <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});
var game = new Phaser.Game(800, 580, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;
var tile;
var i = 0;
var blocks;
function preload() {
    game.load.image('sky', 'assets/starfield.jpg');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('block', 'assets/block.png');
    game.load.image('block2', 'assets/');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function blockSpawn() {
    var block = blocks.create(game.world.width, 200, 'block');
    
    game.physics.arcade.enable(block);
    block.body.bounce.y = 0.2;
    block.body.gravity.y = 800;
    block.width = block.width / 2;
    block.height = block.height / 2;
    block.body.collideWorldBounds = true;
    block.body.gravity.y = 800;
    block.body.gravity.x = 900;
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    tile = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('sky').height, 'sky');
    
    platforms = game.add.group();
    platforms.enableBody = true;
    
    var ground = platforms.create(0, game.world.height - 65, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    player = game.add.sprite(100, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 750;
    player.body.collideWorldBounds = true;
    
    var anim = player.animations.add('right', [5, 6, 7, 8], 10, true);
    //var anim = player.animations.add('right', [1, 2], 100, true);
    anim.killOnComplete = false;
    anim.play(5);
    
    blocks = game.add.group();
    blockSpawn();
    cursors = game.input.keyboard.createCursorKeys();
}

function hitHandler(player, block) {
    window.location.href = "end.html";
    return true;
}

function hitProcess(player, block) {
    return true;
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, blocks, hitHandler, hitProcess, this);
    game.physics.arcade.collide(blocks, platforms);
    /*game.physics.arcade.collide(blocks, blocks);*/
    tile.tilePosition.x -= 1;
    for (var j = 0; j < blocks.children.length; j++) {
        if (blocks.children[j].body.touching.down) {
            blocks.children[j].x -= 0.7;
        }
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
    var rnd = parseInt(Math.random() * (2 - 0) + 0);
    if (i % 75 == 0 && rnd == 0) {
        blockSpawn();
    } else if (i % 75 == 0 && rnd == 1) {
        blockSpawn();
        setTimeout(function () {
            blockSpawn();
        }, 1150);
    }
    i++;
}
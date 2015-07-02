// Dynamically adjust the angles for up-pointing triangles

$(window).on("load", resizeUpTri);
$(window).on("resize", resizeUpTri);

function resizeUpTri() { 
  var triPotenuse = $('.triUpWrap').height();
  var triBase = 0.5 * $('.triUpWrap').width();
  x = Math.acos(triBase/triPotenuse);
  y = 90 - (x * (180/Math.PI));

  $('.leftTriUp').css({
    'transform':'translateX(-100%) rotate(' + y + 'deg)'
  });

  $('.rightTriUp').css({
    'transform':'translateX(100%) rotate(-' + y + 'deg)'
  });
}


// Dynamically adjust the angles for down-pointing triangles

$(window).on("load", resizeDownTri);
$(window).on("resize", resizeDownTri);

function resizeDownTri() { 
  var triPotenuse = $('.triDownWrap').height();
  var triBase = 0.5 * $('.triDownWrap').width();
  x = Math.acos(triBase/triPotenuse);
  y = 90 - (x * (180/Math.PI));

  $('.leftTriDown').css({
    'transform':'translateX(-100%) rotate(-' + y + 'deg)'
  });

  $('.rightTriDown').css({
    'transform':'translateX(100%) rotate(' + y + 'deg)'
  });
}


// Create dice-rolling function. I later discovered it's less code to use: var rand = 1 + Math.floor(Math.random() * 6);

var roll_dice = function () {

  var y = 1 / 6;

  var dieOne = 0;
  var dieOneRandom = Math.random();
  if (dieOneRandom<y) {dieOne=1;
  } else if (dieOneRandom<2*y) {dieOne=2;
    } else if (dieOneRandom<3*y) {dieOne=3;
      } else if (dieOneRandom<4*y) {dieOne=4;
        } else if (dieOneRandom<5*y) {dieOne=5;
          } else {dieOne=6;}
                
  var dieTwo = 0;
  var dieTwoRandom = Math.random();
  if (dieTwoRandom<y) {dieTwo=1;
  } else if (dieTwoRandom<2*y) {dieTwo=2;
    } else if (dieTwoRandom<3*y) {dieTwo=3;
      } else if (dieTwoRandom<4*y) {dieTwo=4;
        } else if (dieTwoRandom<5*y) {dieTwo=5;
          } else {dieTwo=6;}

  return [dieOne, dieTwo];
};


// Create chip object constructor & array of the chips (dies 3 & 4 are for doubles)

function chip (position, die1CanDo, die2CanDo, dieBothCanDo, die3CanDo, die4CanDo, die3xCanDo, die4xCanDo) { 
  this.position = position;
  this.die1CanDo = die1CanDo;
  this.die2CanDo = die2CanDo;
  this.dieBothCanDo = dieBothCanDo;
  this.die3CanDo = die3CanDo;  
  this.die4CanDo = die4CanDo;
  this.die3xCanDo = die3xCanDo;  
  this.die4xCanDo = die4xCanDo;
}

var chips = [];


// Create white chips

chips[0]  =  new chip (0,0,0,0,0,0,0,0);
chips[1]  =  new chip (0,0,0,0,0,0,0,0);
chips[2]  =  new chip (11,0,0,0,0,0,0,0);
chips[3]  =  new chip (11,0,0,0,0,0,0,0);
chips[4]  =  new chip (11,0,0,0,0,0,0,0);
chips[5]  =  new chip (11,0,0,0,0,0,0,0);
chips[6]  =  new chip (11,0,0,0,0,0,0,0);
chips[7]  =  new chip (16,0,0,0,0,0,0,0);
chips[8]  =  new chip (16,0,0,0,0,0,0,0);
chips[9]  =  new chip (16,0,0,0,0,0,0,0);
chips[10] =  new chip (18,0,0,0,0,0,0,0);
chips[11] =  new chip (18,0,0,0,0,0,0,0);
chips[12] =  new chip (18,0,0,0,0,0,0,0);
chips[13] =  new chip (18,0,0,0,0,0,0,0);
chips[14] =  new chip (18,0,0,0,0,0,0,0);


// Create black chips

chips[15] =  new chip (23,0,0,0,0,0,0,0);  
chips[16] =  new chip (23,0,0,0,0,0,0,0);  
chips[17] =  new chip (12,0,0,0,0,0,0,0);  
chips[18] =  new chip (12,0,0,0,0,0,0,0);  
chips[19] =  new chip (12,0,0,0,0,0,0,0);  
chips[20] =  new chip (12,0,0,0,0,0,0,0);  
chips[21] =  new chip (12,0,0,0,0,0,0,0);  
chips[22] =  new chip (7,0,0,0,0,0,0,0);  
chips[23] =  new chip (7,0,0,0,0,0,0,0);  
chips[24] =  new chip (7,0,0,0,0,0,0,0);  
chips[25] =  new chip (5,0,0,0,0,0,0,0);  
chips[26] =  new chip (5,0,0,0,0,0,0,0);
chips[27] =  new chip (5,0,0,0,0,0,0,0);
chips[28] =  new chip (5,0,0,0,0,0,0,0);
chips[29] =  new chip (5,0,0,0,0,0,0,0);


// Create the move object constructor and the arrays of moves and legit moves

function move (die1Chip, die2Chip, dieBothChip, die3Chip, die4Chip, die3xChip, die4xChip, under, off, blot) { 
  this.die1Chip = die1Chip;
  this.die2Chip = die2Chip;
  this.dieBothChip = dieBothChip;
  this.die3Chip = die3Chip;   
  this.die4Chip = die4Chip;
  this.die3xChip = die3xChip;
  this.die4xChip = die4xChip;  
  this.under = under;
  this.off = off;
  this.blot = blot;

}

  var moves = [];
  var legitMoves = [];

// PLAY THE GAME!!!

// Roll dice when click on dice roll activator (if not already rolled); legit moves will then be determined and storred in an array; then either a white or a black move will be triggered (alternatively, starting with white). Computer is white. Computer makes random legit moves. Other player mannually makes moves of his or her choice. 

var diceRolled = false;
var diceValues = [];
var whiteTurn = true;

$('#midBar').click(function() {

  if(!diceRolled) { 

    // Roll dice 

      diceValues = roll_dice();

      $('#die0 span').text(diceValues[0]);      
      $('#die1 span').text(diceValues[1]);

      diceRolled = true;
      console.log('dice roll is ' + diceValues[0] + " " + diceValues[1]);


    // Make random white move (if white turn)

    if(diceRolled && whiteTurn) {
      createArrayofLegitWhiteMoves();
      makeRandomWhiteMove();
    }


    // Make manual black move by clicking on chips and destinations (if black turn)

    if (diceRolled && !whiteTurn) {   
      blackMove();
    }
  }
});


// Create function that make a random white move

function makeRandomWhiteMove () {
  var randomMoveNum = 0;
  function randomMoveNumGenerator () {
    randomMoveNum = Math.round(legitMoves.length * Math.random());
    if(randomMoveNum == legitMoves.length) {randomMoveNum = legitMoves.length -1;}
    console.log('randomMoveNum is ' + randomMoveNum); 
  }
  randomMoveNumGenerator();

  function moveChip (chipToMove, numSpaces) {
    var destinationNum = (chips[chipToMove].position) + numSpaces;
    if (destinationNum > 23) {$('#chip' + chipToMove).detach();
    } else { 
        $('#chip' + chipToMove).detach().appendTo('#positioner' + destinationNum);
        chips[chipToMove].position = destinationNum;
        for(k=15; k<30; k++) {
          if(chips[k].position == destinationNum) {
            $('#chip' + k).detach().appendTo('#barForBlack');
            chips[k].position = 100;
          }
        }
      }
  }

  if(legitMoves.length !== 0) {

    var delayBlinkStart = 0;
    var delayMove = delayBlinkStart + 3000;

    var die1Move = legitMoves[randomMoveNum].die1Chip;
    if (die1Move != -1) {

      $('#chip' + die1Move).effect( "pulsate", {times:3}, 3000 );

      // var triToBlink = chips[die1Move].position + diceValues[0];
      // $('#midTri' + triToBlink).effect( "pulsate", {times:3}, 3000 );

      setTimeout( function() {
        moveChip (die1Move, diceValues[0]); 
      }, 3000 );
    }

    var die2Move = legitMoves[randomMoveNum].die2Chip;
    if (die2Move != -1) { 

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout( function() {
        $('#chip' + die2Move).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart);

      setTimeout( function() {
        moveChip (die2Move, diceValues[1]); 
      }, delayMove);
 
    }

    var dieBothMove = legitMoves[randomMoveNum].dieBothChip;
    if (dieBothMove != -1) {

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + dieBothMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (dieBothMove, diceValues[0]); 
      }, delayMove);
 
      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + dieBothMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (dieBothMove, diceValues[1]); 
      }, delayMove);

    }

    var die3Move = legitMoves[randomMoveNum].die3Chip;
    if (die3Move != -1) {

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die3Move).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die3Move, diceValues[0]); 
      }, delayMove);
 
    }

    var die4Move = legitMoves[randomMoveNum].die4Chip;
    if (die4Move != -1) {

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die4Move).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die4Move, diceValues[0]); 
      }, delayMove);
 
    }

    var die3xMove = legitMoves[randomMoveNum].die3xChip;
    if (die3xMove != -1) {

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;
 
      setTimeout(function() {
        $('#chip' + die3xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die3xMove, diceValues[0]); 
      }, delayMove);
 
      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;
 
      setTimeout(function() {
        $('#chip' + die3xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die3xMove, diceValues[0]); 
      }, delayMove);

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;
 
      setTimeout(function() {
        $('#chip' + die3xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die3xMove, diceValues[0]); 
      }, delayMove);

    }

    var die4xMove = legitMoves[randomMoveNum].die4xChip;
    if (die4xMove != -1) {

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die4xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die4xMove, diceValues[0]); 
      }, delayMove);
 
      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die4xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die4xMove, diceValues[0]); 
      }, delayMove);

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die4xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die4xMove, diceValues[0]); 
      }, delayMove);

      delayBlinkStart = delayBlinkStart + 3500;
      delayMove = delayBlinkStart + 3000;

      setTimeout(function() {
        $('#chip' + die4xMove).effect( "pulsate", {times:3}, 3000 ); 
      }, delayBlinkStart );

      setTimeout( function() {
        moveChip (die4xMove, diceValues[0]); 
      }, delayMove);      

    }

  }

  whiteTurn = false;
  diceRolled = false; 

}


// Create function that makes a manual black move

function blackMove () {

  diceRolled = true;

  var targetPositioner = {};
  var targetPositionerChosen = false;

  var targetChip = {};
  var targetChipChosen = false;

  $('.chip').mouseenter(
    function () {
      if(diceRolled && !targetChipChosen) {
        $(this).css('cursor', 'pointer');
      }
    }
  );

 $('.chip').mouseleave(
    function () {
      if(diceRolled && !whiteTurn) {
        $(this).css('cursor', 'auto');
      }
    }
  );

  $('.chip').click(
    function() {
      if(diceRolled && !targetChipChosen) {
        $(this).effect( "pulsate", {times:1}, 1000 );
        targetChip = $(this);
        setTimeout(
          function() {
            targetChipChosen = true;
          },100
        );
      }
    }
  );

  $('.midTri').mouseenter(
    function() {
      if(targetChipChosen && !targetPositionerChosen) {
        $(this).css('cursor', 'pointer');
      }
    }
  );

 $('.midTri').mouseleave(
    function() {
      if(diceRolled && !whiteTurn) {
        $(this).css('cursor', 'auto');
      }
    }
  );

  $('.midTri').click(function() {
    if(targetChipChosen && !targetPositionerChosen) {
      $(this).effect( "pulsate", {times:1}, 1000 );
      targetPositioner = $(this).find('.positioner');
      targetPositionerChosen = true;
    }  
  });


  // Move chip and update its position

  $('#leftEdge').click(function() {

    $(targetChip).detach().appendTo(targetPositioner);

    var targetChipNum = $(targetChip)[0].id.replace("chip", "");
    var targetPositionerNum = $(targetPositioner)[0].id.replace("positioner", "");
    chips[targetChipNum].position = targetPositionerNum;

    targetChipChosen = false;
    targetPositionerChosen = false;

        for(k=0; k<15; k++) {
          if(chips[k].position == targetPositionerNum) {
            $('#chip' + k).detach().appendTo('#barForWhite');
            chips[k].position = -1;
          }  
        }  

    // console.log('chip is ' + targetChipNum);
    // console.log('positioner is ' + targetPositionerNum);
    // console.log('new position of chip ' + targetChipNum + ' is ' +chips[targetChipNum].position);
    
  });

  $('#rightEdge').click(function() {
    diceRolled = false;
    whiteTurn = true;
    targetChipChosen = true;
    targetPositionerChosen = true;
  });

} 


// Create function that generates an array of legit white moves (each move is a move object)

function createArrayofLegitWhiteMoves () {


// Create white move posabilities. Do this by creating all possible non-blocked moves and then extracting those that are legit.

  // Populate the die movement possibilities of the white chips

  // Create white dieOne posabilities

  moves.length = 0;
  legitMoves.length = 0;
  var whoThere = [];         
  var numBlacks = 0;
  var i = 0;
  var j = 0;
  var k = 0;
  var l = 0;

  for( i = 0; i < 15; i++ ) {
    if( chips[i].position > 23 ) { chips[i].die1CanDo = 0;
    } else {
        if( (chips[i].position + diceValues[0]) > 23 ) { chips[i].die1CanDo = 9; 
        } else {
            whoThere.length = 0; 
            for( k = 0; k < 30; k++ ) {
              if( chips[k].position == (chips[i].position + diceValues[0]) ) { whoThere.push(k);
              }
            }
            numBlacks = 0;
            for( k = 0; k < whoThere.length; k++ ) {
              if( whoThere[k] > 14 ) { numBlacks++; 
              }
            }
            if( numBlacks > 1) { chips[i].die1CanDo = 0;             
            } else if( numBlacks == 1) { chips[i].die1CanDo = 5;
              } else { chips[i].die1CanDo = 1;
                }
          }
      }     
  }


  // Create white dieTwo posabilities

  for( i = 0; i < 15; i++ ) {
    if( chips[i].position > 23 ) { chips[i].die2CanDo = 0;
    } else {
        if( (chips[i].position + diceValues[1]) > 23 ) { chips[i].die2CanDo = 9; 
        } else {
            whoThere.length = 0; 
            for( k = 0; k < 30; k++ ) {
              if( chips[k].position == (chips[i].position + diceValues[1]) ) { whoThere.push(k);
              }
            }
            numBlacks = 0;
            for( k = 0; k < whoThere.length; k++ ) {
              if( whoThere[k] > 14 ) { numBlacks++; 
              }
            }
            if( numBlacks > 1 ) { chips[i].die2CanDo = 0; 
            } else if ( numBlacks == 1) { chips[i].die2CanDo = 5;
              } else { chips[i].die2CanDo = 1;
                }
          }
      }        
  }


  // Create white bothDie posabilities

  for( i = 0; i < 15; i++ ) {
    if( (chips[i].position > 23) ||  
        ((chips[i].die1CanDo === 0) && (chips[i].die2CanDo === 0)) || 
        (chips[i].die1CanDo == 9) || 
        (chips[i].die2CanDo == 9) ) {chips[i].dieBothCanDo = 0;
      } else if( (chips[i].position + diceValues[0] + diceValues[1]) > 23 ) { chips[i].dieBothCanDo = 9;
        } else {
        whoThere.length = 0; 
        for( k = 0; k < 30; k++ ) {
          if( chips[k].position == (chips[i].position + diceValues[0] + diceValues[1]) ) { whoThere.push(k);
          }
        }
        numBlacks = 0;
        for( k = 0; k < whoThere.length; k++ ) {
          if( whoThere[k] > 14 ) { numBlacks++; 
          }
        }
        if( numBlacks > 1 ) { chips[i].dieBothCanDo = 0; 
        } else if ( numBlacks == 1) { chips[i].dieBothCanDo = 5;
          } else { chips[i].dieBothCanDo = 1;
            }
      }      
  }


  // Create white dieThree posabilities

  if( diceValues[0] != diceValues[1] ) {
    for ( k = 0; k < 15; k++ ) {
      chips[k].die3CanDo = 0;
    }  
  } else {    
      for( i = 0; i < 15; i++ ) {
        if( chips[i].position > 23 ) { chips[i].die3CanDo = 0;
        } else {        
            if( (chips[i].position + diceValues[0]) > 23 ) { chips[i].die3CanDo = 9; 
            } else {
                whoThere.length = 0; 
                for( k = 0; k < 30; k++ ) {
                  if( chips[k].position == (chips[i].position + diceValues[0]) ) { whoThere.push(k);
                  }
                }
                numBlacks = 0;
                for( k = 0; k < whoThere.length; k++ ) {
                  if( whoThere[k] > 14 ) { numBlacks++; 
                  }
                }
                if( numBlacks > 1 ) { chips[i].die3CanDo = 0; 
                } else if ( numBlacks == 1) { chips[i].die3CanDo = 5;
                  } else { chips[i].die3CanDo = 1;
                    }
              }
          }
      }          
    }    
  

  // Create white dieFour posabilities

  if( diceValues[0] != diceValues[1] ) {
    for ( k = 0; k < 15; k++ ) {
      chips[k].die4CanDo = 0;
    }
  } else {    
      for( i = 0; i < 15; i++ ) {
        if( chips[i].position > 23 ) { chips[i].die4CanDo = 0;
        } else if( (chips[i].position + diceValues[0]) > 23 ) { chips[i].die4CanDo = 9;
          } else {
              whoThere.length = 0; 
              for( k = 0; k < 30; k++ ) {
                if( chips[k].position == (chips[i].position + diceValues[0]) ) { whoThere.push(k);
                }
              }
              numBlacks = 0;
              for( k = 0; k < whoThere.length; k++ ) {
                if( whoThere[k] > 14 ) { numBlacks++; 
                }
              }
              if( numBlacks > 1 ) { chips[i].die4CanDo = 0; 
              } else if( numBlacks == 1) { chips[i].die4CanDo = 5;
                } else { chips[i].die4CanDo = 1;
                  }
            }           
      }      
    }


  // Create white die3x posabilities

  if( diceValues[0] != diceValues[1] ) {
    for ( k = 0; k < 15; k++ ) {
      chips[k].die3xCanDo = 0;
    } 
  } else {    
      for( i = 0; i < 15; i++ ) {
        if( (chips[i].position > 23) || 
            (chips[i].die1CanDo === 0) || 
            (chips[i].dieBothCanDo === 0) || 
            (chips[i].die1CanDo === 9) || 
            (chips[i].dieBothCanDo === 9) ) {chips[i].die3xCanDo = 0;
        } else if( (chips[i].position + 3*diceValues[0]) > 23 ) {chips[i].die3xCanDo = 9; 
          } else {
              whoThere.length = 0; 
              for( k = 0; k < 30; k++ ) {
                if( chips[k].position == (chips[i].position + 3*diceValues[0]) ) { whoThere.push(k);
                }
              }
              numBlacks = 0;
              for( k = 0; k < whoThere.length; k++ ) {
                if( whoThere[k] > 14 ) { numBlacks++; 
                }
              }
              if( numBlacks > 1 ) { chips[i].die3xCanDo = 0; 
              } else if ( numBlacks == 1) { chips[i].die3xCanDo = 5;
                } else { chips[i].die3xCanDo = 1;
                  }
            }
      }      
    }
  

  // Create white die4x posabilities

  if( diceValues[0] != diceValues[1] ) {
    for ( k = 0; k < 15; k++ ) {
      chips[k].die4xCanDo = 0;
    } 
  } else {    
      for( i = 0; i < 15; i++ ) {
        if( (chips[i].position > 23) ||
            (chips[i].die1CanDo === 0) ||
            (chips[i].dieBothCanDo === 0) ||
            (chips[i].die3xCanDo === 0) ||
            (chips[i].die1CanDo === 9) || 
            (chips[i].dieBothCanDo === 9) || 
            (chips[i].die3xCanDo === 9) ) {chips[i].die4xCanDo = 0;
        } else if( (chips[i].position + 4*diceValues[0]) > 23 ) {chips[i].die4xCanDo = 9; 
          } else {
              whoThere.length = 0; 
              for( k = 0; k < 30; k++ ) {
                if( chips[k].position == (chips[i].position + 4*diceValues[0]) ) { whoThere.push(k);
                }
              }
              numBlacks = 0;
              for( k = 0; k < whoThere.length; k++ ) {
                if( whoThere[k] > 14 ) { numBlacks++; 
                }
              }
              if( numBlacks > 1 ) { chips[i].die4xCanDo = 0; 
              } else if ( numBlacks == 1) { chips[i].die4xCanDo = 5;
                } else { chips[i].die4xCanDo = 1;
                  }
            }
      }      
    }


  // Create the moves

  // Create white singles moves for non-double roll (roll non-double & no one chip moves more than once)

  if( diceValues[0] != diceValues[1] ) {

    for( i = 0; i < 15; i++ ) {
      if( (chips[i].die1CanDo === 1) || (chips[i].die1CanDo === 5) || (chips[i].die1CanDo === 9) ) {
        moves.push(new move(i,-1,-1,-1,-1,-1,-1,diceValues[1])); 
        for( k = 0; k < 15; k++ ) {
          if( k != i ) {
            if( (chips[k].die2CanDo === 1) || (chips[k].die2CanDo === 5) || (chips[k].die2CanDo === 9) ) {
              moves.push(new move(i,k,-1,-1,-1,-1,-1,0)); 
            }
          }
        }  
      }  
    } 
  } 


  // Create white dieBoth moves (not a double and one chip moves both dice)

  if( diceValues[0] != diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
      if( (chips[i].dieBothCanDo === 1) || (chips[i].dieBothCanDo === 5) || (chips[i].dieBothCanDo === 9) ) {
        moves.push(new move(-1,-1,i,-1,-1,-1,-1,0));
      }        
    }
  }


  // Create white singles moves for double roll (roll a double & no one chip moves more than once)

  if( diceValues[0] === diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
     if( (chips[i].die1CanDo === 1) || (chips[i].die1CanDo === 5) || (chips[i].die1CanDo === 9) ) {
        moves.push(new move(i,-1,-1,-1,-1,-1,-1,3*diceValues[0])); 
        for( k = 0; k < 15; k++ ) {
          if( k != i ) {
            if( (chips[k].die2CanDo === 1) || (chips[k].die2CanDo === 5) || (chips[k].die2CanDo === 9) ) {
              moves.push(new move(i,k,-1,-1,-1,-1,-1,2*diceValues[0]));
              for( j = 0; j < 15; j++ ) {
                if( (j != i) && (j != k) ) {
                  if( (chips[j].die3CanDo === 1) || (chips[j].die3CanDo === 5) || (chips[j].die3CanDo === 9) ) {
                    moves.push(new move(i,k,-1,j,-1,-1,-1,diceValues[0]));
                    for( l = 0; l < 15; l++ ) {
                      if( (l != i) && (l != k) && (l != j) ) {
                        if( (chips[l].die4CanDo === 1) || (chips[l].die4CanDo === 5) || (chips[l].die4CanDo === 9) ) {
                          moves.push(new move(i,k,-1,j,l,-1,-1,0));
                        }
                      }
                    }
                  }
                }
              }   
            }
          }
        }  
      }  
    } 
  } 


  // Create white two singles and one bothDie moves for a double (one & only chip moves both dice)

  if( diceValues[0] === diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
     if( (chips[i].dieBothCanDo === 1) || (chips[i].dieBothCanDo === 5) || (chips[i].dieBothCanDo === 9) ) {
        moves.push(new move(-1,-1,i,-1,-1,-1,-1,2*diceValues[0])); 
        for( k = 0; k < 15; k++ ) {
          if( k != i ) {
            if( (chips[k].die1CanDo === 1) || (chips[k].die1CanDo === 5) || (chips[k].die1CanDo === 9) ) {
              moves.push(new move(k,-1,i,-1,-1,-1,-1,diceValues[0]));
              for( j = 0; j < 15; j++ ) {
                if( (j != i) && (j != k) ) {
                  if( (chips[j].die2CanDo === 1) || (chips[j].die2CanDo === 5) || (chips[j].die2CanDo === 9) ) {
                    moves.push(new move(k,j,i,-1,-1,-1,-1,0));
                  }
                }
              }   
            }
          }
        }  
      }  
    } 
  } 


  // Create white double bothDie moves for a double (two chips move both dice)

  if( diceValues[0] === diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
     if( (chips[i].dieBothCanDo === 1) || (chips[i].dieBothCanDo === 5) || (chips[i].dieBothCanDo === 9) ) {
        moves.push(new move(-1,-1,i,-1,-1,-1,-1,2*diceValues[1])); 
        for( k = 0; k < 15; k++ ) {
          if( k != i ) {
            if( (chips[k].dieBothCanDo === 1) || (chips[k].dieBothCanDo === 5) || (chips[k].dieBothCanDo === 9) ) {
              moves.push(new move(k,k,i,-1,-1,-1,-1,0)); 
            }
          }
        }  
      }  
    } 
  } 


  // Create white 3x moves (a double roll and a chip moves 3x)

  if( diceValues[0] === diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
     if( (chips[i].die3xCanDo === 1) || (chips[i].die3xCanDo === 5) || (chips[i].die3xCanDo === 9) ) {
        moves.push(new move(-1,-1,-1,-1,-1,i,-1,diceValues[0])); 
        for( k = 0; k < 15; k++ ) {
          if( k != i ) {
            if( (chips[k].die1CanDo === 1) || (chips[k].die1CanDo === 5) || (chips[k].die1CanDo === 9) ) {
              moves.push(new move(k,-1,-1,-1,-1,i,-1,0)); 
            }
          }
        }  
      }  
    } 
  } 


  // Create white 4x moves (a double roll and one chip moves all four dice)

  if( diceValues[0] === diceValues[1] ) {
    for( i = 0; i < 15; i++ ) {
      if( (chips[i].die4xCanDo === 1) || (chips[i].die4xCanDo === 5) || (chips[i].die4xCanDo === 9) ) {
        moves.push(new move(-1, -1, -1, -1, -1, -1, i, 0));
      }        
    }
  }


  // Remove illegit off-board white moves

  function deepCopy (arr) {
      var out = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          var item = arr[i];
          var obj = {};
          for (var k in item) {
              obj[k] = item[k];
          }
          out.push(obj);
      }
      return out;
  }

  var badOffMoves = [];

  console.log("# moves before pruning is " + moves.length);

  var numOffMoves = 0;
   
  for(i = 0; i<moves.length; i++) {

    var chipsAfterMovePreview = deepCopy(chips);
    // var chipsAfterMovePreview = $.extend(true, [], chips);    
    var includesOff = false;

    if( moves[i].die1Chip != -1 ) {
      if( chips[moves[i].die1Chip].die1CanDo == 9 ) {
        includesOff = true;
      }
    } 

    if( moves[i].die2Chip != -1 ) {
      if( chips[moves[i].die2Chip].die2CanDo == 9 ) {
        includesOff = true;
      }
    }

    if( moves[i].dieBothChip != -1 ) {
      if( chips[moves[i].dieBothChip].dieBothCanDo == 9 ) {
        includesOff = true;
      }
    }

    if( moves[i].die3Chip != -1 ) {
      if( chips[moves[i].die3Chip].die3CanDo == 9 ) {
        includesOff = true;
      }
    } 

    if( moves[i].die4Chip != -1 ) {
      if( chips[moves[i].die4Chip].die4CanDo == 9 ) {
        includesOff = true;
      }
    }

    if( moves[i].die3xChip != -1 ) {
      if( chips[moves[i].die3xChip].die3xCanDo == 9 ) {
        includesOff = true;
      }
    }

    if( moves[i].die4xChip != -1 ) {
      if( chips[moves[i].die4xChip].die4xCanDo == 9 ) {
        includesOff = true;
      }
    } 

    if( includesOff ) {  

      numOffMoves++;

      // console.log('Found an off move that is: ');
      // console.log(moves[i]);

      if( moves[i].die1Chip != -1 ) {
        chipsAfterMovePreview[moves[i].die1Chip].position = chipsAfterMovePreview[moves[i].die1Chip].position + diceValues[0];
      }

      if( moves[i].die2Chip != -1 ) {
        chipsAfterMovePreview[moves[i].die2Chip].position = chipsAfterMovePreview[moves[i].die2Chip].position + diceValues[1];
      }

      if( moves[i].dieBothChip != -1 ) {
        chipsAfterMovePreview[moves[i].dieBothChip].position = chipsAfterMovePreview[moves[i].dieBothChip].position + diceValues[0] + diceValues[1];
      }

      if( moves[i].die3Chip != -1 ) {
        chipsAfterMovePreview[moves[i].die3Chip].position = chipsAfterMovePreview[moves[i].die3Chip].position + diceValues[0];
      }

      if( moves[i].die4Chip != -1 ) {
        chipsAfterMovePreview[moves[i].die4Chip].position = chipsAfterMovePreview[moves[i].die4Chip].position + diceValues[0];
      }

      if( moves[i].die3xChip != -1 ) {
        chipsAfterMovePreview[moves[i].die3xChip].position = chipsAfterMovePreview[moves[i].die3xChip].position + 3*diceValues[0];
      }

      if( moves[i].die4xChip != -1 ) {
        chipsAfterMovePreview[moves[i].die4xChip].position = chipsAfterMovePreview[moves[i].die4xChip].position + 4*diceValues[0];
      }

      var badoffMove = false;
      for( k = 0; k < 15; k++ ) {
        if( chipsAfterMovePreview[k].position < 18) {
          badoffMove = true;         
        }
      }

      if( badoffMove ) {badOffMoves.push(i);} 
    }
  }  

  console.log('numOffMoves is ' + numOffMoves);
  console.log('badOffMoves.length is ' + badOffMoves.length);

  for (l = badOffMoves.length -1; l >= 0; l--) {
   moves.splice(badOffMoves[l], 1);  
  }

  console.log("# moves after pruning is " + moves.length);


  // Remove illegit on-bar white moves

  var badOnBarMoves = [];

  var onBar = 0;  

  for(k=0; k<15; k++) {
    if (chips[k].position == -1) {onBar = 1;}
  }

  if (onBar) {  

    for(i = 0; i<moves.length; i++) {
      
      var chipsAfterMovePreview2 = deepCopy(chips);

      if( moves[i].die1Chip != -1 ) {
        chipsAfterMovePreview2[moves[i].die1Chip].position = chipsAfterMovePreview2[moves[i].die1Chip].position + diceValues[0];
      }

      if( moves[i].die2Chip != -1 ) {
        chipsAfterMovePreview2[moves[i].die2Chip].position = chipsAfterMovePreview2[moves[i].die2Chip].position + diceValues[1];
      }

      if( moves[i].dieBothChip != -1 ) {
        chipsAfterMovePreview2[moves[i].dieBothChip].position = chipsAfterMovePreview2[moves[i].dieBothChip].position + diceValues[0] + diceValues[1];
      }

      if( moves[i].die3Chip != -1 ) {
        chipsAfterMovePreview2[moves[i].die3Chip].position = chipsAfterMovePreview2[moves[i].die3Chip].position + diceValues[0];
      }

      if( moves[i].die4Chip != -1 ) {
        chipsAfterMovePreview2[moves[i].die4Chip].position = chipsAfterMovePreview2[moves[i].die4Chip].position + diceValues[0];
      }

      if( moves[i].die3xChip != -1 ) {
        chipsAfterMovePreview2[moves[i].die3xChip].position = chipsAfterMovePreview2[moves[i].die3xChip].position + 3*diceValues[0];
      }

      if( moves[i].die4xChip != -1 ) {
        chipsAfterMovePreview2[moves[i].die4xChip].position = chipsAfterMovePreview2[moves[i].die4xChip].position + 4*diceValues[0];
      }

      var badOnBarMove = false;
      for( k = 0; k < 15; k++ ) {
        if( chipsAfterMovePreview2[k].position === -1) {
          badOnBarMove = true;         
        }
      }  
    
      if( badOnBarMove ) {badOnBarMoves.push(i);} 

    }

      for (l = badOnBarMoves.length -1; l >= 0; l--) {
        moves.splice(badOnBarMoves[l], 1);  
      }
     
  }


  // Create a set of par white moves (moves that have "under = 0")

  var parMoves = [];

  for(i = 0; i<moves.length; i++) {
    if(moves[i].under === 0) {
      parMoves.push(moves[i]);
    }
  }


  // Create a set of legit white moves

  if(parMoves.length !== 0) {
    legitMoves= parMoves;
  } else {
      z = indexOfLowest(moves);
      for (i = 0; i<moves.length; i++) {
        if (moves[i].under === moves[z].under) {
          legitMoves.push(moves[i]);
        } 
      }
    }
  
  function indexOfLowest(a) {
    var lowest = 0;
    for (var i = 1; i < a.length; i++) {
    if (a[i].under < a[lowest].under) lowest = i;
    }
    return lowest;
  }

  console.log("# moves at end is " + moves.length);
  console.log("# parMoves is " + parMoves.length);
  console.log("# legitMoves is " + legitMoves.length);


}










card_array = ["black.png", "red1.png", "red2.png", "red3.png"]
let clicked = false;
let score = 0;
let game_number = 0;
let pointValue = 1;
let hintShown = false;
$(document).ready(function()
{
    shuffle(card_array);
    // give click functionality to all cards
    for(let i = 1; i<=4; i++)
    {
        $("#"+i).click(function()
        {
            // flip the cards
            for(let j = 0; j < card_array.length; j++)
                $("#"+(j+1)).attr("src", card_array[j]);

            // don't change border color if some card was already clicked
            if(!clicked)
            {
                // add red border to the chosen card
                $("#"+i).css('border', "solid 10px #e33")
                // if the card was guessed correctly change border to green and increse score
                if(card_array[i-1] == "black.png")
                {
                    $("#"+i).css('border', "solid 10px #195")
                    score += pointValue;
                }
                clicked = true;
                game_number += 1;
                // update scoreboard
                $("#gamesN").text(game_number);
                $("#score").text(score);
                $("#hint").prop('disabled', true);
                $("#shuffle").prop('disabled', false);
            }
        });
    }
    // shuffle when the shuffle button is clicked
    $("#shuffle").click(function()
    {
        // flip the cards
        $("img").attr("src", "reverse.png");
        // shuffle
        shuffle(card_array);
        // reset border
        $("img").css('border', "solid 10px #fff");

        clicked = false;
        hintShown = false;
        $("#hint").prop('disabled', false);
        $("#shuffle").prop('disabled', true);
    })
    // give user a hint if they request
    $("#hint").click(function()
    {
        //do nothing if user already guessed or asked for hint
        if(!clicked && !hintShown)
        {
            // randomly choose a card
            let randomCardIndex = Math.floor(Math.random()*4);
            // keep choosing a card until a red card is found
            while(card_array[randomCardIndex] == "black.png")
                randomCardIndex = Math.floor(Math.random()*4);
            // point is worth half after a hint
            pointValue = 0.5;
            $("#"+(randomCardIndex+1)).attr("src", card_array[randomCardIndex]);
        }
        hintShown = true;
        $("#hint").prop('disabled', true);
    });
    // show or hide scoreboard
    $("#results").click(function()
    {
        $("#scoreboard").toggle();
    });
});

function shuffle(array)
{
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) 
    {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
    pointValue = 1;
    return array;
}
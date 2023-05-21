let x=7, y=6, connect=4;
let turn;

function start()
{
    turn = 0;
    let t = document.getElementById("game_table");
    t.appendChild(document.createElement("tbody"));
    for(let i=y-1; i>=0; i--)
    {
        let row = document.createElement("tr");
        row.id = i;
        t.appendChild(row);
        for(let j = 0; j<x; j++)
        {
            let cell = document.createElement("td");
            cell.id = j+","+i;
            let size = Math.min(innerHeight/y/1.3, innerWidth/x/1.3);
            cell.style.width = size;
            cell.style.height = size;
            cell.appendChild(document.createElement("img"));
            cell.firstChild.style.width = size;
            cell.firstChild.style.height = size;
            row.appendChild(cell);
        }
    }
    let row = document.createElement("tr");
    row.id = "button_row";
    for(let j = 0; j<x; j++)
    {
        cell = document.createElement("td");
        b = document.createElement("button")
        cell.appendChild(b);
        b.innerText = "Put here";
        b.onclick = function(){add_token(j)}
        b.id = "b"+j;
        let size = Math.min(innerHeight/y/2, innerWidth/x/2);
        cell.style.width = size;
        cell.style.height = size/2;
        row.appendChild(cell);
    }
    t.appendChild(row);
}
function add_token(j)
{
    for(let i=0; i<y; i++)
    {
        if(document.getElementById(j+","+i).firstChild.src=="")
        {
            if(turn%2)
            {
                document.getElementById(j+","+i).firstChild.src = "gus.png";
                document.getElementById(j+","+i).value = "g";
            }
            else
            {
                document.getElementById(j+","+i).firstChild.src = "finger.png";
                document.getElementById(j+","+i).value = "f";
            }
            music = document.createElement("audio");
            music.src = "muza.mp3"
            music.play();
            turn++;
            check_winner();
            return;
        }
    }
}
function check_winner()
{
    let h = check_horizontal(0);
    let v = check_vertical(0);
    let i = check_inclined(0, 0);
    if(h || v || i)
    {
        win(h, v, i);
    }
}
function check_horizontal(r)
{
    if(r>=y)
    {
        return 0;
    }
    let gus = 0;
    let finger = 0;
    for(let i=0; i<x; i++)
    {
        let p = document.getElementById(i+","+r).value;
        if(p == "g")
        {
            gus++;
            finger=0;
        }
        if(p == "f")
        {
            gus = 0;
            finger++;
        }
        if(gus == connect)
        {
            return "g";
        }
        if(finger == connect)
        {
            return "f";
        }
    }
    return check_horizontal(r+1);
}
function check_vertical(c)
{
    if(c>=x)
    {
        return 0;
    }
    let gus = 0;
    let finger = 0;
    for(let i=0; i<y; i++)
    {
        let p = document.getElementById(c+","+i).value;
        if(p == "g")
        {
            gus++;
            finger=0;
        }
        if(p == "f")
        {
            gus = 0;
            finger++;
        }
        if(gus == connect)
        {
            return "g";
        }
        if(finger == connect)
        {
            return "f";
        }
    }
    return check_vertical(c+1);
}
function check_inclined(i1, i2)
{
    if(i2 == y-connect+1)
        return 0;
    let gus = 0;
    let finger = 0;
    for(let i = 0; i<connect; i++)
    {
        if(i1+i>=x || i2+i>=y)
            break;
        let p = document.getElementById((i1+i)+","+(i2+i)).value;
        if(p == "g")
        {
            gus++;
            finger=0;
        }
        if(p == "f")
        {
            gus = 0;
            finger++;
        }
        if(gus == connect)
        {
            return "g";
        }
        if(finger == connect)
        {
            return "f";
        }
    }
    gus = 0;
    finger = 0;
    for(let i = 0; i<connect; i++)
    {
        if(i1-i<0 || i2+i>=y)
            break;
        let p = document.getElementById((i1-i)+","+(i2+i)).value;
        if(p == "g")
        {
            gus++;
            finger=0;
        }
        if(p == "f")
        {
            gus = 0;
            finger++;
        }
        if(gus == connect)
        {
            return "g";
        }
        if(finger == connect)
        {
            return "f";
        }
    }
    if(i1+1 >= x)
        return check_inclined(0, i2+1);
    return check_inclined(i1+1, i2);
}
function win(h, v, i)
{
    for(let i = 0; i < x; i++)
        document.getElementById("b"+i).disabled = true;
    let winner = document.createElement("img");
    if(h == "g" || v == "g" || i == "g")
        winner.src = "../gus.png";
    else
        winner.src = "../finger.png";
        
    let paragraph = document.createElement("p");
    paragraph.innerText = "My honest reaction to winning";
    paragraph.style.fontSize = "xx-large";
    document.getElementById("winner").appendChild(paragraph);
    
    document.getElementById("winner").appendChild(winner);
    
    console.log(h, v, i);
}
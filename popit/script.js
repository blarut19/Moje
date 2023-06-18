let color_codes = ["#FF4E4E", "#FFFF4E", "#4EFFFF", "#4EFF4E", "#4E4EFF", "#FF4EFF"]
let outward_content_color_codes = ["#FFA0A0", "#FFFFA0", "#A0FFFF", "#A0FFA0", "#A0A0FF", "#FFA0FF"]
let inward_content_color_codes = ["rgb(160, 80, 80)", "rgb(160, 160, 80)", "rgb(80, 160, 160)", "rgb(80, 160, 80)", "rgb(80, 80, 160)", "rgb(160, 80, 160)"]

function start()
{
    table = document.getElementById("try_table");
    for(let i = 0; i<6; i++)
    {
        let row = document.createElement("tr")
        row.id = "R"+i;
        for(let j = 0; j<6; j++)
        {
            let cell = document.createElement("td");
            cell.id = String(i) + "." + String(j);
            cell.style.width = "5vw"
            cell.style.height = "5vw"
            cell.style.backgroundColor = color_codes[i];

            let cell_content = document.createElement("div");
            cell_content.style.borderRadius = "50%";
            cell_content.style.width = "5vw"
            cell_content.style.height = "5vw"
            cell_content.style.backgroundColor = outward_content_color_codes[i];

            cell.addEventListener("mousedown", function(){
                if(cell.firstChild.style.backgroundColor === inward_content_color_codes[i])
                    cell.firstChild.style.backgroundColor = outward_content_color_codes[i]
                else
                    cell.firstChild.style.backgroundColor = inward_content_color_codes[i]
            })

            cell.appendChild(cell_content);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function toggle_burger()
{
    b = document.getElementById("burger");
    if(b.style.display === "none")
        b.style.display = "block"
    else
        b.style.display = "none"
}

var [mins,secs, decis] = [0,0,0];
let myVar, current_time;

var container = document.getElementsByClassName("container");
var time = document.getElementById("time-text");
var start_stop_btn = document.getElementById("start-stop-btn");
var lap_reset_btn = document.getElementById("lap-reset-btn");
var lap_area = document.getElementById("lap-area");

start_stop_btn.addEventListener("click",startTimer);
lap_reset_btn.addEventListener("click",forLapReset);

var flag = true; //for startTimer() and forLapReset()

function startTimer()
{
    
    if(flag == true)
    {
        start_stop_btn.innerHTML = "Stop";
        lap_reset_btn.innerHTML = "Lap";
        flag = false;
        btnColorChange();
        myVar = setInterval(timeCycle,10);

        
    }
    else
    {
        start_stop_btn.innerHTML = "Start";
        lap_reset_btn.innerHTML = "Reset";
        flag = true;
        stopCycle();
    }

}

function btnColorChange()
{
    start_stop_btn.style.backgroundColor = "#351614";
    start_stop_btn.style.borderColor = "#351614";
    start_stop_btn.style.color = "red";

}

function forLapReset()
{
    if(flag) //reset area
    {
        time.innerHTML = "00:00:00";
        removeLap();

    }
    else    //lap area
    {
        lap();
    }
}

function timeCycle()
{
    decis++;

    if(decis == 100)
    {
        decis = 0;
        secs++;

        if(secs == 60)
        {
            secs = 0;
            mins++;

            if(mins == 60)
            {
                decis = 0;
                secs = 0;
                mins = 0;
            }
        }
    }
    let m = mins<10 ? "0" + mins : mins;
    let s = secs<10 ? "0" + secs : secs;
    let d = decis<10 ? "0" + decis : decis;

    time.innerHTML = `${m}:${s}:${d}`;
    current_time = time.innerHTML;
    
}

var lap_counter = 0;

function lap()
{
    let line = document.createElement("hr");

    lap_area.appendChild(line);
    
    let lap_text = document.createElement("p")
    let lap_time = document.createElement("p");
    
    lap_area.appendChild(lap_text);
    lap_area.appendChild(lap_time);

    lap_counter++;
    lap_text.innerHTML = `Lap ${lap_counter}`;
    lap_time.innerHTML = current_time;

    lapStyle();

}

function lapStyle()
{
    let line = document.getElementsByTagName("hr");
    let lap_things = document.getElementsByTagName("p");
    
    line.style.color = "#353535";
    lap_things.style.color = "#7F3D25";
}

function removeLap()
{
    lap_counter = 0;
    let lap_items = document.getElementsByTagName("p");
    let lines = document.getElementsByTagName("hr");

console.log(lap_items.length);

    let len = lap_items.length;
    for(let i=0; i<len; i++)
    {
        if(i%2 == 0)
            lap_area.removeChild(lines[0]);

        lap_area.removeChild(lap_items[0]);
    }
}

function stopCycle()
{
    clearInterval(myVar);
}

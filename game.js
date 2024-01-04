let score=JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0};

            update();
            

document.body.addEventListener('keydown',(event)=>{
    if (event.key==='r' || event.key==='R'){
        game('rock');
    }
    else if (event.key==='p' || event.key==='P'){
        game('paper');
    }
    else if (event.key==='s' || event.key==='S'){
        game('scissors');
    }
    else if (event.key==='c' || event.key==='C'){
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        update();
    }
    else if (event.key==='a' || event.key==='A'){
        autoplay();
    }

});


let comp='';
function compMove()
{
                
let num=Math.random();
if (0<=num && num<1/3)
{
    comp='rock';
}
else if (1/3<=num && num<2/3)
{
    comp='paper';
}
else
{
    comp='scissors';
}
return comp;

}

function game(move)
{
    comp='';
    comp=compMove();
    let result='';
    
    if (move==='rock')
    {
        if (comp==='rock')
        {
            result='Tie';
        }
        else if (comp==='paper')
        {
            result='You lost';
        }
        else
        {
            result='You won';
        }
    }
    else if (move==='paper')
    {
        if (comp==='rock')
        {
            result='You won';
        }
        else if (comp==='paper')
        {
            result='Tie';
        }
        else
        {
            result='You lost';
        }
    }
    else
    {
        if (comp==='rock')
        {
            result='You lost';
        }
        else if (comp==='paper')
        {
            result='You won';
        }
        else
        {
            result='Tie';
        }
    }
    if (result=='Tie')
    {
        score.ties++;
    }
    else if (result=='You won')
    {
        score.wins++;
    }
    else
    {
        score.losses++;
    }
    localStorage.setItem('score',JSON.stringify(score));
    
    document.querySelector('.jmoves').innerHTML = `You: <img class="move" src="images/${move}-emoji.png"> &nbsp;&nbsp; Computer: <img class="move" src="images/${comp}-emoji.png">`;
    document.querySelector('.jresult').innerHTML = result;
    
    update();
    //alert(`You picked ${move} and the computer picked ${comp}.\n${result}\nWins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);
}

function update()
{
    document.querySelector('.scoreb').innerHTML=`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

let going= false;
let inv;

function autoplay()
{
    const sub=document.querySelector('.auto');
    if (sub.innerText==='Auto Play')
    {    
    sub.innerHTML='Stop Auto Play';
    sub.classList.add('is-off');
    }
    else
    {
        sub.innerHTML='Auto Play';
        sub.classList.remove('is-on');
    }
    if (!going)
    {
    inv= setInterval(function(){
        const playermove= compMove();
        game(playermove);
    }, 1000 );
    going= true;
    }
    
    else
    {
        clearInterval(inv);
        going=false;
    }
}
var currentTheme = undefined;

function setup(){
    if (!localStorage.getItem("theme")){
        currentTheme = "White"    
    }
    else{
        currentTheme = localStorage.getItem("theme");
    }

    setTheme(currentTheme);
    console.log(currentTheme);
}

function toggleTheme(){
    if (currentTheme === "White"){
        setTheme("Dark")    
    }
    else{
        setTheme("White")
    }

    localStorage.setItem("theme", currentTheme);
}

function setTheme(theme){
    currentTheme = theme;

    let darkTheme = {
        "--object-color" : "#1b252c",
        "--object-color-2": "#2d363b",
        "--object-color-3": "#10171d",

        "--header-color" : "#1b252c",
        "--header-text-color" : "#ffffff",

        "--accent-color" : "#3fa39e",
        "--accent-color-2" : "#3fa365",

        "--text-color": "#fff",
        "--text-color-2": "#8c9fac",

        "--background-color1" : "#090e11",
        "--background-color2" : "#161f25",

        "--shadow-size" : "5px"
    }
    
    let whiteTheme = {
        "--background-color1" : "#ffffff",
        "--background-color2" : "#ffffff",

        "--shadow-size" : "0px",

        "--object-color" : "#ffffff",
        "--object-color-2" : "#ffffff",
        "--object-color-3" : "#ffffff",

        "--header-color" : "#ffffff",
        "--header-text-color" : "black",

        "--text-color" : "black",
        "--text-color-2" : "black",

        "--accent-color" : "#3fa39e",
        "--accent-color-2" : "#3fa365",

    }

    const root = document.querySelector(':root');
    if (theme == "Dark"){

        for ([key, value] of Object.entries(darkTheme)){
            root.style.setProperty(key, value)
        }
    }

    else if(theme == "White"){
        for ([key, value] of Object.entries(whiteTheme)){
            root.style.setProperty(key, value)
        }
    }
}

setup();
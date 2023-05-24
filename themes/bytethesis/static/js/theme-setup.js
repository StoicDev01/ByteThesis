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
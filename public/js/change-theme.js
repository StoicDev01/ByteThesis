function changeIcon(){
    if (currentTheme == "White"){
        $(".theme-light-icon").css("display","none")
        $(".theme-dark-icon").css("display", "block")
    }
    
    else if (currentTheme == "Dark"){
        $(".theme-light-icon").css("display", "block")
        $(".theme-dark-icon").css("display", "none")
    }
}

changeIcon();


$(".change-theme-button").click( () => {
    toggleTheme();
    changeIcon();
})
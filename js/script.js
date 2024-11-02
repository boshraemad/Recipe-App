let fastMealsArray=[];
let lowCaloriesArray=[];
let easyArray=[];
let mediumArray=[];
let recommendedMealsArray=[];
let trendingArray=[];
let breakfastArray=[];
let dinnerArray=[];
let lunchArray=[];
let savedRecipes=[];
let links=document.querySelectorAll("ul li");
let searchButton=document.getElementById("search-button");
let input=document.getElementById("search-input");
console.log(links);
let mainPage=document.querySelector(".main-page");
let recipesArea=document.querySelector(".main-page .row");
let homeLink=document.querySelector(".links .home");
let quickLink=document.querySelector(".links .quick");
let mediumLink=document.querySelector(".links .medium");
let easyLink=document.querySelector(".links .easy");
let dinnerLink=document.querySelector(".links .dinner");
let lunchLink=document.querySelector(".links .lunch");
let dietLink=document.querySelector(".links .diet");
let headTitle=document.querySelector(".recommendations h2");

fetch('https://dummyjson.com/recipes')
.then(res => res.json())
.then(data=>{
    let recipesArray=data.recipes;
    recipesArray.forEach(element => {
     if(parseInt(element.cookTimeMinutes)+parseInt(element.prepTimeMinutes)<=30){
         fastMealsArray.push(element);
     }
     if(element.caloriesPerServing<=300){
        lowCaloriesArray.push(element);
     }
     if(element.difficulty==="Easy"){
        easyArray.push(element);
     }
     if(element.difficulty==="Medium"){
        mediumArray.push(element);
     }
     if(element.rating>=4.7){
        recommendedMealsArray.push(element);
     }
     element.mealType.forEach(type=>{
        if(type==="Dinner"){
            dinnerArray.push(element);
         }
         if(type==="Lunch"){
            lunchArray.push(element);
         }
         if(type==="Breakfast"){
            breakfastArray.push(element);
         }
     })
    });
    console.log(data);
    clearSearchInput();
    addRecipiesToPage(recommendedMealsArray);
    homeLink.classList.add("active");
    homeLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(recommendedMealsArray);
      homeLink.classList.add("active");
    }
    dietLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(lowCaloriesArray);
      dietLink.classList.add("active");
    }
    quickLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(fastMealsArray);
      quickLink.classList.add("active");
    }
    mediumLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(mediumArray);
      mediumLink.classList.add("active");
    }
    easyLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(easyArray);
      easyLink.classList.add("active");
    }
    lunchLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(lunchArray);
      lunchLink.classList.add("active");
    }
    dinnerLink.onclick=()=>{
      clearSearchInput();
      addRecipiesToPage(dinnerArray);
      dinnerLink.classList.add("active");
    }
    searchButton.onclick=()=>{
      search(recipesArray);
    }
});
function addRecipiesToPage(array){
   removeActives(links);
   removeNotFound();
   headTitle.innerHTML="Recommended Recipes";
    //remove prev recipes
    recipesArea.innerHTML="";
    recipesArea.classList.add("gap-3");
    array.forEach(recipe=>{
        let recipeDiv=document.createElement("div");
        recipeDiv.className="recipe col-lg-3";
        let imgDiv=document.createElement("div");
        imgDiv.className="img";
        let img=document.createElement("img");
        img.setAttribute("src",recipe.image);
        img.setAttribute("loading","lazy");
        imgDiv.appendChild(img);
        let timeDiv=document.createElement("div");
        let timeNumber=document.createElement("span");
        timeNumber.className="time-number";
        timeNumber.appendChild(document.createTextNode(parseInt(recipe.cookTimeMinutes)+parseInt(recipe.prepTimeMinutes)));
      //   timeDiv.appendChild('<i class="fa-solid fa-clock"></i>');
        timeDiv.appendChild(timeNumber);
        imgDiv.appendChild(timeDiv);
        recipeDiv.appendChild(imgDiv);
        let infoDiv=document.createElement("div");
        infoDiv.className="info d-flex align-items-center justify-content-between";
        let recipeName=document.createElement("h3");
        recipeName.appendChild(document.createTextNode(recipe.name));
        let ratingDiv=document.createElement("div");
        ratingDiv.classsName="rating";
      //   ratingDiv.appendChild('<i class="fa-solid fa-star"></i>');
        let ratingNum=document.createElement("span");
        ratingNum.className="rating-number";
        ratingDiv.appendChild(ratingNum);
        infoDiv.appendChild(recipeName);
        infoDiv.appendChild(ratingDiv);
        recipeDiv.appendChild(infoDiv);
        let tags=document.createElement("p");
        tags.className="tags";
        recipe.tags.forEach(tag=>{
          let tagSpan=document.createElement("span");
          tagSpan.appendChild(document.createTextNode(tag));
          tags.appendChild(tagSpan);
        })
        recipeDiv.appendChild(tags);
        recipesArea.appendChild(recipeDiv);
        mainPage.appendChild(recipesArea);
    })
}
function removeActives(links){
   links.forEach(link => {
      if(link.classList.contains("active")){
         link.classList.remove("active");
      }
   });
}
function search(array){
   removeActives(links);
   let searchArray=[];
   let searchValue=input.value;
   array.forEach(element=>{
      if(element.name.toLowerCase()===searchValue.toLowerCase()){
         searchArray.push(element);
      }
      element.tags.forEach(tag=>{
         if(tag.toLowerCase()===searchValue.toLowerCase()){
            searchArray.push(element);
            // console.log(tag);
         }
      })
   })
   if(searchArray.length===0){
      headTitle.innerHTML="Nothing Found";
      recipesArea.innerHTML="";
      document.querySelector(".recommendations p").innerHTML="";
   }else{
      headTitle.innerHTML="Research Results";
      addRecipiesToPage(searchArray);
   }
}
function clearSearchInput(){
   input.value="";
}
function removeNotFound(){
   headTitle.innerHTML="";
}
// function showIngredients(){
   
// }
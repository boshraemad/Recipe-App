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
    recipesArea.addEventListener("click",(e=>{
      if(e.target.className==='recipe-button'){
         // console.log(e.target.parentElement.classList);
         recipesArray.forEach(recipe=>{
            if(e.target.parentElement.classList.contains(recipe.name.replaceAll(" ",""))){
               console.log(recipe);
               console.log(e.target.parentElement);
               addIngredientsToPage(recipe);
            }
         })
      }
    }))
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
        recipeDiv.className=`recipe col-lg-3 col-md-4 ${recipe.name.replaceAll(" ","")}`;
        let imgDiv=document.createElement("div");
        imgDiv.className="img";
        let img=document.createElement("img");
        img.className="img-fluid";
        img.setAttribute("src",recipe.image);
      //   img.setAttribute("loading","lazy");
        imgDiv.appendChild(img);
        let timeDiv=document.createElement("div");
        timeDiv.className="time";
        let timeNumber=document.createElement("span");
        timeNumber.className="time-number";
        timeNumber.appendChild(document.createTextNode(`${parseInt(recipe.cookTimeMinutes)+parseInt(recipe.prepTimeMinutes)} mins`));
        let iconSpan=document.createElement("span");
        iconSpan.innerHTML='<i class="fa-solid fa-clock"></i>';
        timeDiv.appendChild(iconSpan);
        timeDiv.appendChild(timeNumber);
        imgDiv.appendChild(timeDiv);
        recipeDiv.appendChild(imgDiv);
        let infoDiv=document.createElement("div");
        infoDiv.className="info d-flex align-items-center justify-content-between";
        let recipeName=document.createElement("h3");
        recipeName.appendChild(document.createTextNode(recipe.name));
        let ratingDiv=document.createElement("div");
        ratingDiv.classsName="rating";
        let iconSpan2=document.createElement("span");
        iconSpan2.className="star";
        iconSpan2.innerHTML='<i class="fa-solid fa-star"></i>';
        let ratingNum=document.createElement("span");
        ratingNum.className="rating-number";
        ratingNum.appendChild(document.createTextNode(recipe.rating));
        ratingDiv.appendChild(iconSpan2);
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
        let recipeButton=document.createElement("a");
        recipeButton.className="recipe-button";
        recipeButton.innerHTML="Show Recipe";
      //   recipeButton.href="./ingredient.html";
        recipeDiv.appendChild(recipeButton);
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
      element.ingredients.forEach(ingredient=>{
         if(ingredient.toLowerCase()===searchValue.toLowerCase()){
            searchArray.push(element);
            // console.log(tag);
         }
      })
      element.mealType.forEach(meal=>{
         if(meal.toLowerCase()===searchValue.toLowerCase()){
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
function addIngredientsToPage(recipe){
   let container=document.createElement("div");
   container.className="main container position-relative";
   let containerImg=document.createElement("img");
   containerImg.setAttribute("src",recipe.image);
   container.appendChild(containerImg);
   let ingredientContainer=document.createElement("ul");
   ingredientContainer.className="ingredients";
   let header1=document.createElement("h3");
   header1.innerHTML="Ingredients";
   ingredientContainer.appendChild(header1);
   recipe.ingredients.forEach(ingredient=>{
      let ingredientLine=document.createElement("li");
      ingredientLine.appendChild(document.createTextNode(ingredient));
      ingredientContainer.appendChild(ingredientLine);
   })
   container.appendChild(ingredientContainer);
   let instructionsContainer=document.createElement("ul");
   instructionsContainer.className="instructions";
   let header2=document.createElement("h3");
   header2.innerHTML="Instructions";
   instructionsContainer.appendChild(header2);
   recipe.instructions.forEach(ingredient=>{
      let instructionLine=document.createElement("li");
      instructionLine.appendChild(document.createTextNode(ingredient));
      instructionsContainer.appendChild(instructionLine);
   })
   container.appendChild(instructionsContainer);
   //new window
   let w=window.open("./ingredient.html");
   w.document.innerHTML="";
   setTimeout(function(){ 
      w.document.body.appendChild(container);
  }, 1000);
}

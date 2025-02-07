const apiKey = "743cdfcfbd7246a4857cc6a8e8d56daa";

const blogContainer = document.querySelector("#blog-container");

const SearchBox = document.querySelector("#box");
const button = document.querySelector("#Search");


button.addEventListener("click",async() =>
{
    const input=SearchBox.value.trim()
    if(input !="")
    {
        try {
          const articles = await fetchNewsQuery(input);
          displayBlogs(articles);
        } 
        catch (error) {
          console.log("Error While Fecthing data", error);
          return [];
        }
    }
    
    

})

async function fetchNewsQuery(input)
{
    try
    {
        const apiUrl = `https://newsapi.org/v2/everything?q=${input}&from=2025-01-07&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

        const response=await fetch(apiUrl)
        const data=await response.json();
        return data.articles
       
        
    }
    catch(error)
    {
        console.log("Error While Fecthing data",error);
        return[];
        
    }

}

async function fetchRandomNews()
{
    try
    {
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`

        const response=await fetch(apiUrl)
        const data=await response.json();
        return data.articles
       
        
    }
    catch(error)
    {
        console.log("Error While Fecthing data",error);
        return[];
        
    }
}

function displayBlogs(article)
{
    blogContainer.innerHTML=" ";

    article.forEach((article)=>
    {
        const blogCard=document.createElement("div");
        blogCard.classList.add("blog-card");
        const img=document.createElement("img")
        img.src=article.urlToImage;
        img.alt=article.title;
        const title=document.createElement("h2");
        const trucatedTitle=
        article.title.length >30
         ?article.title.slice(0,30) + "...."
         :article.title;
         title.textContent=trucatedTitle;

        const description=document.createElement("p");
        
        const trucatedDescription =
          article.description.length > 30
            ? article.description.slice(0, 100) + "...."
            : article.description;
        description.textContent = trucatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description)
        
        blogCard.addEventListener("click",()=>{
            window.open( article.url,"_blank");

        })

        blogContainer.appendChild(blogCard);



    })

}

(async ()=>
{
    try
    {
       const article = await fetchRandomNews();
        displayBlogs(article);
       
    }
    
    catch(error)
    {
        console.log("Error Fetching data",error);
        
    }
})()

//  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;

//  const data1=fetch(apiUrl)
//  .then((raw)=> raw.json())
//  .then((redable)=>console.log(redable.articles[0]))


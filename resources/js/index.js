async function generateCarouselItem(item,j){
  let imageLink=item.enclosure.link;
  let Link=item.link;
  let title=item.title;
  let author=item.author;
  let pubDate=item.pubDate;
  let descrip=item.description;

  let carouselItem=document.createElement('div');
  if (j===0){
    carouselItem.classList.add("carousel-item","active");
  }else{
  carouselItem.classList.add("carousel-item");
  }

  carouselItem.innerHTML=
            `
              <div class="card-inside">
                <div class="card">
                  <img src=${imageLink} class="card-img-top image" alt="...">
                  <div class="card-body">
                    <a href=${Link}>
                      <h5 class="card-title">${title}</h5>
                    </a>
                    <h6 class="card-subtitle mb-2 text-muted">${author} • ${pubDate}</h6>
                    <p class="card-text">${descrip}</p>
                  </div>
                </div>
              </div>
            `
  return carouselItem;
}



async function populateAccordionItem(magazines){

    //parent Accordion element to append accordion Item
    let accordion=document.getElementById("accordionExample");

    //fetch JSON data from .rss link(magazine)
    //'https://api.rss2json.com/v1/api.json?rss_url=' is used to get JSON from rss

    console.log(magazines.length);
    for (let i=0;i<magazines.length;i++){
        try{
            let magazineJSONData=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+magazines[i]).then((res)=>res.json());
        
            console.log(magazineJSONData.feed.title);
            headingEleId="heading"+`${i}`;
            CollapseEleId="collapse"+`${i}`;
            ashCollapseEle='#'+CollapseEleId;
            ashHeading=
            CarouselEleId="carousel"+`${i}`;
            CarouselBStarget='#'+CarouselEleId;
            CarouselEleInnerId=CarouselEleId+'Inner';
            console.log(headingEleId,CollapseEleId,CarouselEleInnerId,CarouselEleInnerId);
    
            // Create Accordion Item and populate Accoridion Item title
            let AccordionItem=document.createElement('div');
            if (i==0){
              AccordionItem.classList.add('accordion-item');
              AccordionItem.innerHTML=
            `
            <h2 class="accordion-header" id=${headingEleId}>
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target=${ashCollapseEle} aria-expanded="true" aria-controls=${CollapseEleId}>
                ${magazineJSONData.feed.title}
              </button>
            </h2>
            <div id=${CollapseEleId} class="accordion-collapse collapse show" aria-labelledby=${headingEleId} data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <!-- Carousel content -->
                <div id=${CarouselEleId} class="carousel slide" data-bs-ride="carousel">
                    <!-- Carousel Inner -->
                    <div class='carousel-inner' id=${CarouselEleInnerId}>

                    </div>

                    <button class="carousel-control-prev navigating-buttons-prev" type="button" data-bs-target=${CarouselBStarget} data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
  
                    <button class="carousel-control-next navigating-buttons-next" type="button" data-bs-target=${CarouselBStarget} data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <!-- /Carousel content -->
              </div>
            </div>
            `
            }else{
              AccordionItem.classList.add('accordion-item');
              AccordionItem.innerHTML=
              `
              <h2 class="accordion-header" id=${headingEleId}>
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=${ashCollapseEle} aria-expanded="false" aria-controls=${CollapseEleId}>
                  ${magazineJSONData.feed.title}
                </button>
              </h2>
              <div id=${CollapseEleId} class="accordion-collapse collapse" aria-labelledby=${headingEleId} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <!-- Carousel content -->
                  <div id=${CarouselEleId} class="carousel slide" data-bs-ride="carousel">
                      <!-- Carousel Inner -->
                      <div class='carousel-inner' id=${CarouselEleInnerId}>
  
                      </div>
  
                      <button class="carousel-control-prev navigating-buttons-prev" type="button" data-bs-target=${CarouselBStarget} data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
    
                      <button class="carousel-control-next navigating-buttons-next" type="button" data-bs-target=${CarouselBStarget} data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                  </div>
                  <!-- /Carousel content -->
                </div>
              </div>
              `
            }

            


            accordion.append(AccordionItem);
            let CarouselInner=document.getElementById(CarouselEleInnerId);
            console.log(CarouselInner);
            //build carousel
            let CarouselsList=magazineJSONData.items;
            
            for (let j=0;j<CarouselsList.length;j++){
              let carouselItemElem= await generateCarouselItem(CarouselsList[j],j);
              CarouselInner.append(carouselItemElem);
            }



        }
        catch(e){
            console.log(e)
        }
    }
    

}

populateAccordionItem(magazines);
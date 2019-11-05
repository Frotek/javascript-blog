/* eslint-disable linebreak-style */
{
  'use strict';
    
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    //console.log(event);
      
    
    /* [DONE] remove class 'active' from all article links */
    
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    
    /* [DONE] add class 'active' to the clicked link */
    
    this.classList.add('active');  
    //console.log('clickedElement:', clickedElement);
    
    /* [DONE] remove class 'active' from all articles */
    
    const activeArticles = document.querySelectorAll('.posts .active');
    
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    
    /* [DONE] get 'href' attribute from the clicked link */
    
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);
    
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);
    
    /* [DONE] add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
  }
      
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.list';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleTagSelector = '.post-tags a';
  const optTagsListSelector = '.list.tags a';
    
  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    //console.log(titleList);
    
    /* [DONE] remove contents of titleList */
    
    function clearMessages() {
      titleList.innerHTML = '';
    }
    clearMessages();
    
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    let html = '';
    
    /* for each article */
    
    for (let article of articles) {
      document.querySelectorAll(optArticleSelector);
    
      /* [DONE] get the article id */
            
      const articleId = article.getAttribute('id');
    
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
    
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
      /* [DONE] create HTML of the link */
    
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
        
      /* insert link into titleList */
    
      /* insert link into html variable */
    
      html = html + linkHTML;
    }
    
    titleList.innerHTML = html;
    //console.log('html', html);
    
    const links = document.querySelectorAll('.titles a');
    //console.log(links);
    
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
    
  generateTitleLinks();
    
  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      console.log(tagList);
        
      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      
      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log(tag);
            
        /* generate HTML of the link */
      
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
        //console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;
        //console.log(html);

        /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      /* END LOOP: for every article: */
    }

  }
      
  generateTags();

  function tagClickHandler(event) {
    console.log('Link was clicked!');
    /* prevent default action for this event */
    event.preventDefault();
  
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    //console.log(this);
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    //console.log(href);
  
    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    //console.log(tag);
  
    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log(activeTags);

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
    //console.log(tagLinks);
  
    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
  
      /* [DONE] add class active */
      tagLink.classList.add('active');
      //console.log('Oto tagLink:', tagLink);
  
    /* END LOOP: for each found tag link */
    }
  
    /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  
  function addClickListenersToTags() {

    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagSelector + ',' + optTagsListSelector);
    /* START LOOP: for each link */
    for (let tag of tagLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tag.addEventListener('Link was clicked', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

}
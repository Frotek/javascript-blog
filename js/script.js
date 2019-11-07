/* eslint-disable linebreak-style */
{
  'use strict';

  const titleClickHandler = function (event) {
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

    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = this.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleTagsSelectorLink = '.post-tags .list a';
  // const optTagsListSelector = '.tags.list';
  const optTagsListSelectorLink = '.tags.list a';
  const optArticleAuthorSelector = '.post-author';
  const optArticleAuthorSelectorLink = '.post-author a';
  // const optAuthorsListSelector = '.authors.list';
  const optAuthorsListSelectorLink = '.authors.list a';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';

  /* Reference to author list ul by id */
  const refs = {
    listOfAuthorsRef: document.getElementById('list-of-authors'),
    cloudOfTags: document.getElementById('cloud-of-tags'),
  };

  const sideBarData = {
    authors: [],
  };

  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    //console.log(titleList);

    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    /* for each article */
    for (let article of articles) {

      /* [DONE] get the article id */

      let articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      let articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      let linkHTML = ('<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>');

      /* insert link into titleList */

      /* insert link into html variable */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagClass(count, params, tag) {
    console.log(count, params, tag);

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);



    return `<a class="${optCloudClassPrefix}${classNumber}" href="#tag-${tag}">${tag}(${count}) &nbsp </a>`;
  }


  function calculateTagsParams(tags) {
    let valuesToReturn = {
      min: 9999999,
      max: 0
    };

    for (let tag in tags) {
      if (tags[tag] > valuesToReturn.max) {
        valuesToReturn.max = tags[tag];
      } else if (tags[tag] < valuesToReturn.min) {
        valuesToReturn.min = tags[tag];
      }
    }

    return valuesToReturn;
  }


  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = ' ';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        let linkHTML = ('<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ');
        //console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */

        /* 

          if (allTags.indexOf(linkHTML) == -1) {
                  /* [NEW] add generated code to allTags array 
                  allTags.push(linkHTML);
                }
        */

        // eslint-disable-next-line no-prototype-builtins
        if (!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);

      let allTagsHTML = '';

      for (let tag in allTags) {
        const tagLinkHTML = `<li> ${calculateTagClass(allTags[tag], tagsParams, tag)} </li>`;
        // allTagsHTML += `<li><a href="#tag-${tag}">${tag}(${allTags[tag]})</a></li>`
        allTagsHTML += tagLinkHTML;
      }

      //console.log(allTags)
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      refs.cloudOfTags.innerHTML = allTagsHTML;
      /* END LOOP: for every article: */
    }
    /* NEW find list of tags in right column */

    //  const tagList = document.querySelector('data-tags');

    // refs.cloudOfTags.innerHTML = allTags.join(" ");

    /* NEW add html from allTags to tagList */

    //tagList.innerHTML = allTags.join(' ');
  }

  generateTags();

  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('tag clicked');
    console.log(clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    //console.log(tag);

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
    //console.log(tagLinks);

    /* [DONE] START LOOP: for each found tag link */
    for (let tagHrefLink of tagHrefLinks) {

      /* [DONE] add class active */
      tagHrefLink.classList.add('active');
      //console.log('Oto tagLink:', tagLink);

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags() {

    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagsSelectorLink + ',' + optTagsListSelectorLink);

    /* START LOOP: for each link */
    for (let tag of tagLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors(customSelector = '') {

    /* find authors */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for each author */
    for (let article of articles) {

      /* find tags wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);

      let html = ' ';

      /* get tags from data-author attribute */
      const articleAuthors = article.getAttribute('data-author');

      /* generate HTML of the link */
      let linkHTML = ('<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li>');
      //let linkHTML = `<li> <a href="#author-${articleAuthors}" onclick="authorClickHandler(event)"> ${articleAuthors} </a></li>`;
      //console.log(linkHTML);
      html = html + linkHTML;

      authorsList.innerHTML = html;

    }
  }
  generateAuthors();

  /* Delete author duplicates from array */
  function removeDuplicates(arr) {
    var obj = {};
    var retArr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      retArr.push(key);
    }
    return retArr;
  }

  function getAllAuthors() {

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const articleAuthors = article.getAttribute('data-author');
      sideBarData.authors.push(articleAuthors);
    }
    sideBarData.authors = removeDuplicates(sideBarData.authors);

    // console.log(sideBarData.authors);
  }
  
  getAllAuthors();

  console.log(console);

  function authorClickHandler(event) {
    console.log(event.target);
    const clickedElement = event.target;
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    console.log('Link was clicked!');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
    console.log(authorLinks);


    /* [DONE] add class active */
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
      console.log(authorLink);
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    const linksAuthors = document.querySelectorAll(optArticleAuthorSelectorLink + ',' + optAuthorsListSelectorLink);
    console.log(linksAuthors);

    for (let author of linksAuthors) {
      //console.log(author);
      author.addEventListener('click', authorClickHandler);
    }
  }



  addClickListenersToAuthors();

  const removeActive = function (event) {

    event.preventDefault();

    const clickedElement = this;
    clickedElement.getAttribute('href');

    const activeRemoves = document.getElementsByClassName('active');

    for (let activeRemove of activeRemoves) {
      activeRemove.classList.remove('active');
    }
  };

  const removeActiveListener = function () {

    const listenerRemove = document.querySelectorAll('a[href^="#All-posts"');

    for (let remove of listenerRemove) {
      remove.addEventListener('click', removeActive);
    }
  };

  removeActiveListener();

  function createSideNavAuthorsList() {
    let html = ``;

    for (let author of sideBarData.authors) {
      let authorHTML = `<li><a href="#author-${author}" onclick="authorClickHandler(event)">${author}</a></li>`;

      html += authorHTML;
    }

    refs.listOfAuthorsRef.innerHTML = html;
  }

  createSideNavAuthorsList();

}
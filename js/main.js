document.getElementById('left-sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.getElementById('left-sidebar');
    sidebar.classList.toggle('active');
});

document.getElementById('right-sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.getElementById('right-sidebar');
    sidebar.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let currentPage = 1;
    const totalPages = 14;
    let insertTextIndex = 0;
    let pageDetail;
    let currentPageData = {};

    let typeP = new URLSearchParams(window.location.search).get('type') || '1';
    console.log(typeP);

    const userData = {
        userId: null,
        pageType: typeP,
        responses: [],
        openScrollTimes: [],
        hasScrolledToBottom: false,
        aiOverviewHoverTimes: [],
        searchResultsHoverTimes: [],
        aiOverviewPageView: [],
        referencePageClicks: 0,
        searchResultsPageView: []
    };

    let insertTexts = [];

    // Initialize timers and tracking variables
    let searchResultViewStartTime = null;
    let aiOverviewHoverStartTime = null;
    let searchResultsHoverStartTime = null;

    // Helper function to calculate time objects
    const createTimeObject = (start, end) => ({
        startTimestamp: start,
        endTimestamp: end,
        totalTime: end - start
    });

    // 页面导航
    const navigateToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        currentPage = pageNumber;
        loadPage(currentPage);
    }

    const createModal = () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            currentPageData.time = createTimeObject(currentPageData.time.startTimestamp, Date.now());
            if (currentPageData.type === 'search') {
                userData.searchResultsPageView.push(currentPageData);
            } else {
                userData.aiOverviewPageView.push(currentPageData);
            }


            modal.style.display = 'none';
            document.body.removeChild(modal);
        });
        backButton.classList.add('back-button');
        modalContent.appendChild(backButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
        return modalContent;
    };

    const loadPageDetail = (item, modalContent) => {

        const pageId = item.pageId;
        const pageContents = pageDetail.pages.find(p => p.id === pageId);

        const titleElement = document.createElement('p');
        titleElement.textContent = pageContents.title;
        titleElement.classList.add('page-title');
        modalContent.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `${pageContents.author}`;
        authorElement.classList.add('page-author');
        modalContent.appendChild(authorElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('page-content');

        if (pageContents) {
            // 加载页面内容
            pageContents.contents.forEach((content) => {
                if (content.type === 'text') {
                    const textElement = document.createElement('p');
                    textElement.textContent = content.content;
                    contentElement.appendChild(textElement);
                } else if (content.type === 'image') {
                    const imageElement = document.createElement('img');
                    imageElement.src = content.content;
                    imageElement.alt = content.alt;
                    imageElement.width = content.width;
                    imageElement.height = content.height;
                    imageElement.classList.add('page-image');
                    contentElement.appendChild(imageElement);
                }
            });
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Exit';

        nextButton.addEventListener('click', () => {
            currentPageData.time = createTimeObject(currentPageData.time.startTimestamp, Date.now());
            if (currentPageData.type === 'search') {
                userData.searchResultsPageView.push(currentPageData);
            } else {
                userData.aiOverviewPageView.push(currentPageData);
            }

            let modal = document.querySelector('.modal');
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });

        modalContent.appendChild(contentElement);
        modalContent.appendChild(nextButton);

    };

    // 加载页面内容
    const loadPage = (pageNumber) => {
        // 清空当前内容
        app.innerHTML = '';

        switch(pageNumber) {
            case 1:
                loadPage1();
                break;
            case 2:
                loadPage2();
                break;
            case 3:
                loadPage3();
                break;
            case 4:
                loadPage4();
                break;
            case 5:
                loadPage5();
                break;
            case 6:
                loadPage6();
                break;
            case 7:
                loadPage7();
                break;
            case 8:
                loadPage8();
                break;
            case 9:
                loadPage9();
                break;
            case 10:
                loadPage10();
                break;
            case 11:
                loadPage11();
                break;
            case 12:
                loadPage12();
                break;
            case 13:
                loadPage13();
                break;
            case 14:
                loadPage14();
                break;
            default:
                app.innerHTML = '<p>Page Not Exist</p>';
        }
    }

    function replacePlaceholders(str, arr) {
        // 使用正则表达式匹配所有的 [INSERT TEXT]
        return str.replace(/\[INSERT TEXT\]/g, () => {
            // 如果 arr 中还有元素，替换为当前元素
            if (insertTextIndex < arr.length) {
                return arr[insertTextIndex++];
            }
            // 如果 arr 中没有更多元素，保留原占位符
            return '[INSERT TEXT]';
        });
    }

    
    // 页面1的加载函数
    const loadPage1 = () => {
        insertTextIndex = 0;
        // 模块1 - 文字
      //  const container1 = document.createElement('div');
      //  container1.id = 'module1-container';
       // Modules.loadModule('module1', container1);

      //  container1.querySelectorAll('p').forEach((p, index) => {
      //      p.textContent = replacePlaceholders(p.textContent, insertTexts.page1, insertTextIndex);
      //  });

       // app.appendChild(container1);

        // 模块3 - 开放式问题
        const container1 = document.createElement('div');
        container1.id = 'module4-container';
        Modules.loadModule('module4', container1);

        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page1, insertTextIndex);
        });
        app.appendChild(container1);

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            // 验证是否所有问题已回答
            if (validatePage1()) {
                navigateToPage(2);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }



    // 页面2的加载函数
    const loadPage2 = () => {
        insertTextIndex = 0;
        
        // 模块2 - 单选题 (复用模块2)
        const container1 = document.createElement('div');
        container1.id = 'module2-page2-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page2);
        });

        insertTexts.page2Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));
            container1.querySelector(".module2").appendChild(label);
        });

        app.appendChild(container1);

        // 模块2 - 单选题 (第二个单选题)
        const container2 = document.createElement('div');
        container2.id = 'module2-page2-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page2, insertTextIndex);
        });
        insertTexts.page2Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);

        // 模块2 - 单选题 (第3个单选题)
        const container3 = document.createElement('div');
        container3.id = 'module2-page2-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page2, insertTextIndex);
        });
        insertTexts.page2Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);





        // 模块3 - 开放式问题
       // const container3 = document.createElement('div');
      //  container3.id = 'module3-page2-container';
     //   Modules.loadModule('module3', container3);
     //   container3.querySelectorAll('p').forEach((p, index) => {
      //      p.textContent = replacePlaceholders(p.textContent, insertTexts.page2, insertTextIndex);
     //   });
      //  app.appendChild(container3);

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage2()) {
                navigateToPage(3);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }




    // 页面3的加载函数 - 介绍任务
    const loadPage3 = () => {
        // 模块1 - 文字
        const container1 = document.createElement('div');
        container1.id ='module1-container';
        Modules.loadModule('module1', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page3, insertTextIndex);
        });
        app.appendChild(container1);

        

        
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            navigateToPage(4); // 进入第4页或第五页根据需求
        });
        app.appendChild(nextButton);
    }





    // 页面4的加载函数 - 搜索结果A
    const loadPage4 = () => {
        loadSearchResults();

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            navigateToPage(5); //
        });
        app.appendChild(nextButton);
    }




    // 页面5的加载函数
    const loadPage5 = () => {
        insertTextIndex = 0;
    

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page5-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page5, insertTextIndex);
        });
        insertTexts.page5Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);

        // 模块3 - 开放式问题
        const container2 = document.createElement('div');
        container2.id = 'module3-page5-container';
        Modules.loadModule('module3', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page5, insertTextIndex);
        });
        app.appendChild(container2);
    

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage5()) {
                navigateToPage(6);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }





    // 页面6的加载函数
    const loadPage6 = () => {
        insertTextIndex = 0;
    

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page6-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page6, insertTextIndex);
        });
        insertTexts.page6Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);

        // 模块3 - 开放式问题
        const container2 = document.createElement('div');
        container2.id = 'module3-page6-container';
        Modules.loadModule('module3', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page6, insertTextIndex);
        });
        app.appendChild(container2);
    


        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage6()) {
                navigateToPage(7);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }





    // 页面7的加载函数
    const loadPage7 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page7-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page7);
        });
        insertTexts.page7Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page7-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page7, insertTextIndex);
        });
        insertTexts.page7Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page7-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page7, insertTextIndex);
        });
        insertTexts.page7Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage7()) {
                navigateToPage(8);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }



    // 页面8的加载函数
    const loadPage8 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page8-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page8);
        });
        insertTexts.page8Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page8-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page8, insertTextIndex);
        });
        insertTexts.page8Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page8-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page8, insertTextIndex);
        });
        insertTexts.page8Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage8()) {
                navigateToPage(9);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }




    // 页面9的加载函数
    const loadPage9 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page9-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page9);
        });
        insertTexts.page9Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page9-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page9, insertTextIndex);
        });
        insertTexts.page9Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page9-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page9, insertTextIndex);
        });
        insertTexts.page9Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage9()) {
                navigateToPage(10);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }



    // 页面10的加载函数
    const loadPage10 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page10-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page10);
        });
        insertTexts.page10Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page10-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page10, insertTextIndex);
        });
        insertTexts.page10Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page10-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page10, insertTextIndex);
        });
        insertTexts.page10Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage10()) {
                navigateToPage(11);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }



    // 页面11的加载函数
    const loadPage11 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page11-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page11);
        });
        insertTexts.page11Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page11-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page11, insertTextIndex);
        });
        insertTexts.page11Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page11-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page11, insertTextIndex);
        });
        insertTexts.page11Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage11()) {
                navigateToPage(12);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }
    


    // 页面12的加载函数
    const loadPage12 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page12-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page12);
        });
        insertTexts.page12Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page12-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page12, insertTextIndex);
        });
        insertTexts.page12Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page12-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page12, insertTextIndex);
        });
        insertTexts.page12Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage12()) {
                navigateToPage(13);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }



    // 页面13的加载函数
    const loadPage13 = () => {
        insertTextIndex = 0;

        // 模块2 - 单选题 (第1个单选题)
        const container1 = document.createElement('div');
        container1.id = 'module2-page13-1-container';
        Modules.loadModule('module2', container1);
        container1.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page13);
        });
        insertTexts.page13Title1Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question1';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container1.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container1);


        const container2 = document.createElement('div');
        container2.id = 'module2-page13-2-container';
        Modules.loadModule('module2', container2);
        container2.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page13, insertTextIndex);
        });
        insertTexts.page13Title2Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question2';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container2.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container2);



        const container3 = document.createElement('div');
        container3.id = 'module2-page13-3-container';
        Modules.loadModule('module2', container3);
        container3.querySelectorAll('p').forEach((p, index) => {
            p.textContent = replacePlaceholders(p.textContent, insertTexts.page13, insertTextIndex);
        });
        insertTexts.page13Title3Choices.forEach((choice, index) => {

            var question = document.createElement('input');
            question.type = 'radio';
            question.name = 'question3';
            question.value = choice;
            var label = document.createElement('label');
            label.appendChild(question)
            label.appendChild(document.createTextNode(choice));
            label.appendChild(document.createElement('br'));

            container3.querySelector(".module2").appendChild(label);

        });
        app.appendChild(container3);
       
    
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', () => {
            if (validatePage13()) {
                navigateToPage(14);
            } else {
                showValidationError('You need to answer all the questions to proceed.');
            }
        });
        app.appendChild(nextButton);
    }




    // 页面14的加载函数
    const loadPage14 = () => {

        const endText = document.createElement('p');
        endText.id = 'end-text';
        endText.textContent = insertTexts.page14[0];
        const url = document.createElement('a');
        url.href = insertTexts.page14[1];
        if (insertTexts.page14[1].startsWith('http')
            || insertTexts.page14[1].startsWith('https')) {

        } else {
            url.href = "https://" + insertTexts.page14[1];
        }
        url.textContent = insertTexts.page14[1];
        endText.appendChild(url);
        app.appendChild(endText);
    }







    // 表单验证函数 - 页面1
    const validatePage1 = () => {

        // 检查开放式问题
        const openAnswer = document.querySelector('textarea[class="textarea-small"]').value.trim();
        if (openAnswer === '') return false;

        userData.userId = openAnswer; // Assuming userId is collected here
        // 存储响应
        userData.responses.push(
            { question: insertTexts.page1[0], answer: openAnswer, timestamp: new Date() }
        );

        return true;
    }

    // 表单验证函数 - 页面2
    const validatePage2 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page2-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page2-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page2-3-container input[name="question3"]:checked');
        if (!selected3) return false;

        // 检查开放式问题
       // const openAnswer = document.querySelector('#module3-page2-container textarea[name="openQuestion"]').value.trim();
       // if (openAnswer === '') return false;

        // 存储响应
        userData.responses.push(
            { question: insertTexts.page2[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page2[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page2[2], answer: selected3.value, timestamp: new Date() }
           // { question: insertTexts.page2[2], answer: openAnswer, timestamp: new Date() }
        );

        return true;
    }

    const validatePage5 = () => {
        
        // 检查第1个单选题
        const selected1 = document.querySelector('#module2-page5-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查开放式问题
        const openAnswer = document.querySelector('#module3-page5-container textarea[name="openQuestion"]').value.trim();
        if (openAnswer === '') return false;

        // 存储响应
        userData.responses.push(
            { question: insertTexts.page5[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page5[1], answer: openAnswer, timestamp: new Date() }
        );

        return true;
    }


    const validatePage6 = () => {
        
        // 检查第1个单选题
        const selected1 = document.querySelector('#module2-page6-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查开放式问题
        const openAnswer = document.querySelector('#module3-page6-container textarea[name="openQuestion"]').value.trim();
        if (openAnswer === '') return false;

        // 存储响应
        userData.responses.push(
            { question: insertTexts.page6[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page6[1], answer: openAnswer, timestamp: new Date() }
        );

        return true;
    }







    const validatePage7 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page7-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page7-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page7-3-container input[name="question3"]:checked');
        if (!selected3) return false;

        // 检查开放式问题
       // const openAnswer = document.querySelector('#module3-page2-container textarea[name="openQuestion"]').value.trim();
       // if (openAnswer === '') return false;

        // 存储响应
        userData.responses.push(
            { question: insertTexts.page7[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page7[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page7[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }


    const validatePage8 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page8-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page8-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page8-3-container input[name="question3"]:checked');
        if (!selected3) return false;


        // 存储响应
        userData.responses.push(
            { question: insertTexts.page8[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page8[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page8[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }



    const validatePage9 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page9-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page9-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page9-3-container input[name="question3"]:checked');
        if (!selected3) return false;


        // 存储响应
        userData.responses.push(
            { question: insertTexts.page9[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page9[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page9[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }


    const validatePage10 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page10-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page10-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page10-3-container input[name="question3"]:checked');
        if (!selected3) return false;


        // 存储响应
        userData.responses.push(
            { question: insertTexts.page10[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page10[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page10[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }


    const validatePage11 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page11-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page11-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page11-3-container input[name="question3"]:checked');
        if (!selected3) return false;


        // 存储响应
        userData.responses.push(
            { question: insertTexts.page11[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page11[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page11[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }


    const validatePage12 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page12-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page12-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page12-3-container input[name="question3"]:checked');
        if (!selected3) return false;



        // 存储响应
        userData.responses.push(
            { question: insertTexts.page12[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page12[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page12[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }

    
    
    const validatePage13 = () => {
        // 检查第一个单选题
        const selected1 = document.querySelector('#module2-page13-1-container input[name="question1"]:checked');
        if (!selected1) return false;

        // 检查第二个单选题
        const selected2 = document.querySelector('#module2-page13-2-container input[name="question2"]:checked');
        if (!selected2) return false;

        // 检查第3个单选题
        const selected3 = document.querySelector('#module2-page13-3-container input[name="question3"]:checked');
        if (!selected3) return false;


        // 存储响应
        userData.responses.push(
            { question: insertTexts.page13[0], answer: selected1.value, timestamp: new Date() },
            { question: insertTexts.page13[1], answer: selected2.value, timestamp: new Date() },
            { question: insertTexts.page13[2], answer: selected3.value, timestamp: new Date() }
        );

        return true;
    }








    // 显示验证错误消息
    const showValidationError = (message) => {
        let errorDiv = document.getElementById('validation-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'validation-error';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            app.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    // 随机化搜索结果的变量
    let searchResults = []; // 存储所有可用的搜索结果

    // 加载搜索结果输入数据
    fetch('searchResultsInput.json')
        .then(response => response.json())
        .then(data => {
            searchResults = data;
        })
        .catch(error => console.error('Error loading search results:', error));


    const setupAIOverview = () => {
        const aiOverview = document.createElement('div');
        aiOverview.classList.add('ai-overview');

        const aiContent = document.createElement('div');
        aiContent.classList.add('ai-content');
        aiContent.classList.add('hidden')

        aiContent.innerHTML = `
            <div class="ai-content-title">
                <img src="../images/star.png" width="20px" height="20px">
                <span>AI Overview</span>
            </div>`;

        let prevItem = null;
        pageDetail.aiOverview.forEach((item, index) => {
            if (item.type === 'text') {
                const p = document.createElement('p');
                p.innerHTML = item.content;
                aiContent.appendChild(p);
                prevItem = p;
            } else if (item.type === 'url') {
                const a = document.createElement('a');
                a.textContent = '🔗'
                a.classList.add('ai-link');
                a.dataset.content = item.content;
                if (prevItem) {
                    prevItem.appendChild(a);
                } else {
                    aiContent.appendChild(a);
                }
                a.addEventListener('mouseenter', (e) => {
                    showFloatingWindow(e, item.content);
                    // Start tracking AI Overview hover time
                    aiOverviewHoverStartTime = Date.now();
                });
                a.addEventListener('mouseleave', () => {
                    if (aiOverviewHoverStartTime) {
                        const endTime = Date.now();
                        userData.aiOverviewHoverTimes.push(createTimeObject(aiOverviewHoverStartTime, endTime));
                        aiOverviewHoverStartTime = null;
                    }
                });
                prevItem = a;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modalContent = createModal();
                    loadPageDetail(item.content, modalContent);

                    userData.referencePageClicks++;
                    currentPageData = {
                        type: 'aiOverview',
                        pageId: item.content.pageId,
                        time: createTimeObject(Date.now(), Date.now()),
                        hasScrolledToBottom: false
                    }

                    const modal = document.querySelector('.modal-content');
                    modal.addEventListener('scroll', () => {
                        if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight) {
                            currentPageData.hasScrolledToBottom = true;
                        }
                    });
                });

            } else if (item.type === 'list') {
                const ul = document.createElement('ul');
                item.content.forEach(content => {
                    const li = document.createElement('li');
                    li.textContent = content;
                    ul.appendChild(li);
                });
                aiContent.appendChild(ul);
                prevItem = ul;
            }
        });

        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.classList.add('show-more');
        aiOverview.appendChild(aiContent);
        aiOverview.appendChild(showMoreButton);

        // Track hover time on AI Overview
        aiOverview.addEventListener('mouseenter', () => {
            aiOverviewHoverStartTime = Date.now();
        });

        aiOverview.addEventListener('mouseleave', () => {
            if (aiOverviewHoverStartTime) {
                const endTime = Date.now();
                userData.aiOverviewHoverTimes.push(createTimeObject(aiOverviewHoverStartTime, endTime));
                aiOverviewHoverStartTime = null;
            }
        });

        return aiOverview;
    }

    // 搜索结果页面加载函数
    const loadSearchResults = () => {

        // 找出对应页面的搜索结果
        const resultsContainer = document.createElement('div');

        // AI Overview - 仅在第一页(第4页和第5页均需要)
        const aiOverview = setupAIOverview();

        // 搜索框和按钮（不可编辑和点击）
        const searchBox = document.createElement('div');
        searchBox.classList.add('search-box');

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.value = pageDetail.search;
        searchInput.disabled = true;
        searchBox.appendChild(searchInput);

        const searchButton = document.createElement('button');
        searchButton.textContent = 'Search';
        searchButton.disabled = true;
        searchBox.appendChild(searchButton);

        if (typeP === '1') {
            app.appendChild(searchBox);
            app.appendChild(aiOverview);
            app.appendChild(resultsContainer);
        } else if (typeP === '2') {
            app.appendChild(searchBox);
            app.appendChild(resultsContainer);
            resultsContainer.appendChild(aiOverview);
        }
        else if (typeP === '3') {
            app.appendChild(searchBox);
            app.appendChild(aiOverview);
            aiOverview.querySelectorAll('.ai-link').forEach((link) => {
                // 删除link节点
                link.parentNode.removeChild(link);
            });
            app.appendChild(resultsContainer);
        }
        else if (typeP === '4') {
            app.appendChild(searchBox);
            app.appendChild(resultsContainer);
            resultsContainer.appendChild(aiOverview);
            aiOverview.querySelectorAll('.ai-link').forEach((link) => {
                // 删除link节点
                link.parentNode.removeChild(link);
            });
        }
        else if (typeP === '5') {
            app.appendChild(searchBox);
            app.appendChild(resultsContainer);
            searchBox.style.paddingBottom = '50px';
            searchBox.style.borderBottom = '1px solid #ccc';
        }
        else {
            app.appendChild(searchBox);
            app.appendChild(aiOverview);
            app.appendChild(resultsContainer);
        }

        // 搜索结果区域
        resultsContainer.id = 'results-container';

        searchResultViewStartTime = Date.now();

        searchResults.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            const title = document.createElement('a');
            title.href = result.url;
            title.textContent = result.title;
            title.dataset.url = result.url;
            title.classList.add('result-title');
            title.addEventListener('click', (e) => {
                e.preventDefault();
                const modalContent = createModal();
                loadPageDetail(result, modalContent);

                currentPageData = {
                    type : 'search',
                    pageId: result.id,
                    time: createTimeObject(Date.now(), Date.now()),
                    hasScrolledToBottom: false
                }

                const modal = document.querySelector('.modal-content');
                modal.addEventListener('scroll', () => {
                    if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight) {
                        currentPageData.hasScrolledToBottom = true;
                    }
                });


            });

            const url = document.createElement('p');
            url.textContent = result.url;
            url.classList.add('result-url');

            const snippet = document.createElement('p');
            snippet.textContent = result.snippet;
            snippet.classList.add('result-snippet');

            resultDiv.appendChild(title);
            resultDiv.appendChild(url);
            resultDiv.appendChild(snippet);

            // Track hover time on search results
            resultDiv.addEventListener('mouseenter', () => {
                searchResultsHoverStartTime = Date.now();
            });
            resultDiv.addEventListener('mouseleave', () => {
                if (searchResultsHoverStartTime) {
                    const endTime = Date.now();
                    userData.searchResultsHoverTimes.push(createTimeObject(searchResultsHoverStartTime, endTime));
                    searchResultsHoverStartTime = null;
                }
            });

            resultsContainer.appendChild(resultDiv);
        });


        // 滚动监听
        resultsContainer.addEventListener('scroll', () => {
            // 判断是否滚动到底部
            if (resultsContainer.scrollTop + resultsContainer.clientHeight >= resultsContainer.scrollHeight) {
                userData.hasScrolledToBottom = true;

                // Record time from opening to scrolling to bottom
                if (searchResultViewStartTime) {
                    const endTime = Date.now();
                    userData.openScrollTimes.push(createTimeObject(searchResultViewStartTime, endTime));
                    searchResultViewStartTime = null;
                }
            }
        });

        // 设置内容大小
        setupHeight(aiOverview, resultsContainer);
    }

    const setupHeight = (aiOverview, resultsContainer) => {
        const aiOverviewHeight = aiOverview.offsetHeight;
        // 计算剩余高度
        let remainingHeight = window.innerHeight - aiOverviewHeight;

        if (resultsContainer.contains(aiOverview)) {
            remainingHeight = window.innerHeight;
        }

        // 设置resultsContainer的高度
        resultsContainer.style.maxHeight = (remainingHeight - 200) + 'px';
        // 处理“Show More”按钮的点击事件
        const showMoreButton = aiOverview.querySelector('.show-more');
        const contentDiv = aiOverview.querySelector('.ai-content');

        // Track hover time on AI Overview
        const aiOverviewContainer = aiOverview.querySelector('.ai-content-title');
        aiOverviewContainer.addEventListener('mouseenter', () => {
            aiOverviewHoverStartTime = Date.now();
        });
        aiOverviewContainer.addEventListener('mouseleave', () => {
            if (aiOverviewHoverStartTime) {
                const endTime = Date.now();
                userData.aiOverviewHoverTimes.push(createTimeObject(aiOverviewHoverStartTime, endTime));
                aiOverviewHoverStartTime = null;
            }
        });

        showMoreButton.addEventListener('click', () => {
            contentDiv.classList.toggle('expanded');
            if (contentDiv.classList.contains('expanded')) {
                showMoreButton.textContent = 'Show Less';
                let currentHeight = aiOverview.offsetHeight;
                let g = window.innerHeight - currentHeight;
                if (resultsContainer.contains(aiOverview)) {
                    g = window.innerHeight;
                }
                resultsContainer.style.maxHeight = (g - 200) + 'px';
            } else {
                showMoreButton.textContent = 'Show More';
                let currentHeight = aiOverview.offsetHeight;
                let g = window.innerHeight - currentHeight;
                if (resultsContainer.contains(aiOverview)) {
                    g = window.innerHeight;
                }
                resultsContainer.style.maxHeight = (g - 200) + 'px';
            }
        });
    }

    // 显示浮动窗口
    const showFloatingWindow = (event, item) => {
        const floatingWindow = document.createElement('div');
        floatingWindow.id = 'floating-window';

        // 构建浮动窗口的内容
        const content = document.createElement('div');
        content.classList.add('card')
        const link = document.createElement('a');
        link.textContent = item.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalContent = createModal();
            loadPageDetail(item, modalContent);

            currentPageData = {
                type : 'aiOverview',
                pageId: item.pageId,
                time: createTimeObject(Date.now(), Date.now()),
                hasScrolledToBottom: false
            }

            const modal = document.querySelector('.modal-content');
            modal.addEventListener('scroll', () => {
                if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight) {
                    currentPageData.hasScrolledToBottom = true;
                }
            });
        })
        link.classList.add('title-link')
        const title = document.createElement('div');
        title.appendChild(link);

        const description = document.createElement('p');
        description.textContent = item.description;
        description.classList.add('description')
        content.appendChild(title);
        content.appendChild(description);

        floatingWindow.appendChild(content);

        // 定位浮动窗口（根据链接的位置）
        const linkRect = event.target.getBoundingClientRect();
        let top = linkRect.bottom + window.scrollY;
        let left = linkRect.left + window.scrollX;

        // 防止超出视口右侧
        if (left + 300 > window.innerWidth) {
            left = window.innerWidth - 320; // 300px 宽度 + 20px margin
        }

        // 防止超出视口底部
        if (top + floatingWindow.offsetHeight > window.scrollY + window.innerHeight) {
            top = linkRect.top + window.scrollY - 200; // 上移
        }

        floatingWindow.style.top = `${top}px`;
        floatingWindow.style.left = `${left}px`;

        floatingWindow.addEventListener('mouseleave', () => {
            hideFloatingWindow();
        });

        document.body.appendChild(floatingWindow);
    }

    // 隐藏浮动窗口
    const hideFloatingWindow = () => {
        const floatingWindow = document.getElementById('floating-window');
        if (floatingWindow) {
            document.body.removeChild(floatingWindow);
        }
    }

    // 提交数据到后端
    const submitData = () => {
        fetch('/api/response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // 在适当的时候调用提交函数
    window.addEventListener('beforeunload', submitData);

    window.addEventListener('click', (e) => {
        const floatingWindow = document.getElementById('floating-window');
        if (floatingWindow && !floatingWindow.contains(e.target)) {
            hideFloatingWindow();
        }
    })

    // 初始化每个页面的INSERT TEXT
    fetch('insertText.json')
        .then(response => response.json())
        .then(data => {
            insertTexts = data
            insertTextIndex = 0
            const container1 = document.createElement('div');
            container1.id ='module1-container';
            Modules.loadModule('module1', container1);
            container1.querySelectorAll('p').forEach((p, index) => {
                p.textContent = replacePlaceholders(p.textContent, insertTexts.page3, insertTextIndex);
            });
            document.getElementById("left-sidebar").appendChild(container1)


            fetch('pageDetail.json')
                .then(response => response.json())
                .then(data => {
                    pageDetail = data;
                    // 加载第4页
                    loadPage(1);
                })

        })
        .catch(error => console.error('Error fetching insert texts:', error));


});

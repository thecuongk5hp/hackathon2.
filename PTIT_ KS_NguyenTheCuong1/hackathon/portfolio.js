let heroInfo = {
    name: "Minh Cường",
    job: "freelance react developer",
    imgUrl: "https://picsum.photos/200/300",
  };
  
  let personalDetail = {
    name: "Minh Cường",
    dob: "06 June 1995",
    spokenLanguages: ["English", "France", "German"],
    nationality: "Vietnam",
    interest: ["Music", "Reading", "Journey"],
    techs: [
      {
        id: 1,
        imgUrl: "https://i.postimg.cc/cHdfNH2Z/android.png",
        techName: "Android",
        exp: 2,
      },
      {
        id: 2,
        imgUrl: "https://i.postimg.cc/nrCjHQk8/Angular.png",
        techName: "Angular",
        exp: 1,
      },
      {
        id: 3,
        imgUrl: "https://i.postimg.cc/G3VJ4csP/bootstrap.png",
        techName: "Bootstrap",
        exp: 3,
      },
      {
        id: 4,
        imgUrl: "https://i.postimg.cc/dt91z6v7/vue.png",
        techName: "Vue",
        exp: 2,
      },
      {
        id: 5,
        imgUrl: "https://i.postimg.cc/XNdXg3zk/react.png",
        techName: "React",
        exp: 2 / 3,
      },
      {
        id: 6,
        imgUrl: "https://i.postimg.cc/PfgYt2B2/mongodb.png",
        techName: "Mongodb",
        exp: 0.25,
      },
      {
        id: 7,
        imgUrl: "https://i.postimg.cc/RZzFYYjx/laravel.png",
        techName: "Laravel",
        exp: 1,
      },
      {
        id: 8,
        imgUrl: "https://i.postimg.cc/X7N3ybSJ/nodejs-icon.png",
        techName: "Node.js",
        exp: 5 / 6,
      },
    ],
  };
  
  let projects = [
    {
      id: 1,
      imgUrl: "https://i.postimg.cc/nrCjHQk8/Angular.png",
      projectName: "Auto Drive Project",
      link: "https://abcd-example.com",
      tags: ["Angular", "React", "Jquery"],
    },
    {
      id: 2,
      imgUrl: "https://i.postimg.cc/G3VJ4csP/bootstrap.png",
      projectName: "Ecommerce Project",
      link: "https://abcd-example.com",
      tags: ["Bootstrap", "CSS", "Javascript"],
    },
    {
      id: 3,
      imgUrl: "https://i.postimg.cc/PfgYt2B2/mongodb.png",
      projectName: "Chat Application",
      link: "https://abcd-example.com",
      tags: ["MongoDB", "Javascript"],
    },
    {
      id: 4,
      imgUrl: "https://i.postimg.cc/dt91z6v7/vue.png",
      projectName: "Social Media Platform",
      link: "https://abcd-example.com",
      tags: ["Vue", "Javascript"],
    },
    {
      id: 5,
      imgUrl: "https://i.postimg.cc/XNdXg3zk/react.png",
      projectName: "Image Sharing Platform",
      link: "https://abcd-example.com",
      tags: ["React", "Javascript"],
    },
  ];
  
  
  
  
  
  // Lưu dữ liệu vào Local Storage
  localStorage.setItem('heroInfo', JSON.stringify(heroInfo));
  localStorage.setItem('personalDetail', JSON.stringify(personalDetail));
  localStorage.setItem('projects', JSON.stringify(projects));
  
  // Render dữ liệu từ Local Storage
  document.addEventListener('DOMContentLoaded', function() {
      // Render thông tin về Hero
      let heroInfoFromStorage = JSON.parse(localStorage.getItem('heroInfo'));
      document.querySelector('.main-icon p').textContent = heroInfoFromStorage.name;
      document.querySelector('.navbar-item a').textContent = `Hi, I'm ${heroInfoFromStorage.name}`;
  document.querySelector('.navbar-item p').textContent = `I'm a ${heroInfoFromStorage.job}`;
  
      // Render thông tin cá nhân
      let personalDetailFromStorage = JSON.parse(localStorage.getItem('personalDetail'));
      document.querySelector('.personal-details h2').textContent = 'Personal Details';
      let personalDetailContent = `
          <p>Date of birth: ${personalDetailFromStorage.dob}</p>
          <p>Spoken Languages: ${personalDetailFromStorage.spokenLanguages.join(', ')}</p>
          <p>Nationality: ${personalDetailFromStorage.nationality}</p>
          <p>Interest: ${personalDetailFromStorage.interest.join(', ')}</p>
      `;
      document.querySelector('.personal-details').insertAdjacentHTML('beforeend', personalDetailContent);
  
      // Render các dự án
      let projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
      let projectsContainer = document.querySelector('.container2');
      projectsFromStorage.forEach(project => {
          let projectElement = `
              <div class="logo2">
                  <img src="${project.imgUrl}" alt="${project.projectName}">
                  <div>
                      <p class="p-1">${project.projectName}</p>
                      <p class="p-2"><a href="${project.link}" target="_blank">Link</a></p>
                  </div>
              </div>
          `;
          projectsContainer.insertAdjacentHTML('beforeend', projectElement);
      });
  });
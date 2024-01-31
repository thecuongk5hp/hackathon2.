const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
const projectTable = document.getElementById('projectTable');

function displayProjects() {
  if (storedProjects) {
    storedProjects.forEach(project => {
      const row = projectTable.insertRow(-1);
      row.setAttribute('data-id', project.id); 

      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      cell1.textContent = project.projectName;
      cell2.innerHTML = `<a href="${project.imgUrl}" target="_blank">Link</a>`;
      cell3.innerHTML = `<a href="${project.link}" target="_blank">Link</a>`;
      cell4.textContent = project.tags.join(', ');
      cell5.innerHTML = `<button class="delete" onclick="deleteProject(${project.id})">Delete</button> <button class="update" onclick="openUpdateModal(${project.id})">Update</button>`;
    });
  }
}

const search = document.getElementById('search');
const rows = projectTable.querySelectorAll('tr:not(:first-child)');
search.addEventListener('keyup', function(event) {
  const term = event.target.value.toLowerCase();
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let found = false;
    cells.forEach(cell => {
      if (cell.textContent.toLowerCase().includes(term)) {
        found = true;
      }
    });
    if (found) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

function addNewProject() {
  const newName = document.getElementById('newProjectName').value;
  const newImageUrl = document.getElementById('newImageUrl').value;
  const newLink = document.getElementById('newLink').value;
  const newTags = document.getElementById('newTags').value.split(',');

  if (newName && newImageUrl && newLink && newTags) {
    const newProject = {
      id: Date.now(), 
      projectName: newName,
      imgUrl: newImageUrl,
      link: newLink,
      tags: newTags.map(tag => tag.trim()), 
    };

    storedProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(storedProjects));
    const row = projectTable.insertRow(-1);
    row.setAttribute('data-id', newProject.id); 
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = newProject.projectName;
    cell2.innerHTML = `<img src="${newProject.imgUrl}" alt="${newProject.projectName}">`;
    cell3.innerHTML = `<a href="${newProject.link}" target="_blank">Link</a>`;
    cell4.textContent = newProject.tags.join(', ');
    cell5.innerHTML = `<button class="delete" onclick="deleteProject(${newProject.id})">Delete</button> <button class="update" onclick="openUpdateModal(${newProject.id})">Update</button>`;

    
    document.getElementById('newProjectName').value = '';
    document.getElementById('newImageUrl').value = '';
    document.getElementById('newLink').value = '';
    document.getElementById('newTags').value = '';
  } else {
    alert('Vui lòng điền đầy đủ thông tin.');
  }
};


function openUpdateModal(projectId) {
  const projectToUpdate = storedProjects.find(project => project.id === projectId);
  document.getElementById('updateProjectName').value = projectToUpdate.projectName;
  document.getElementById('updateImageUrl').value = projectToUpdate.imgUrl;
  document.getElementById('updateLink').value = projectToUpdate.link;
  document.getElementById('updateTags').value = projectToUpdate.tags.join(', ');
  const updateModal = document.getElementById('updateModal');
  updateModal.setAttribute('data-id', projectId);
  updateModal.style.display = 'block';
}

function closeUpdateModal() {
  const updateModal = document.getElementById('updateModal');
  updateModal.removeAttribute('data-id'); 
  updateModal.style.display = 'none';
}

function updateProject() {
  const projectName = document.getElementById('updateProjectName').value;
  const imageUrl = document.getElementById('updateImageUrl').value;
  const link = document.getElementById('updateLink').value;
  const tags = document.getElementById('updateTags').value.split(',');
  if (projectName && imageUrl && link && tags) {
    const projectId = parseInt(document.getElementById('updateModal').getAttribute('data-id'));
    const updatedProjects = storedProjects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          projectName: projectName,
          imgUrl: imageUrl,
          link: link,
          tags: tags.map(tag => tag.trim()), 
        };
      } else {
        return project;
      }
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    closeUpdateModal();

    const rowToUpdate = document.querySelector(`tr[data-id="${projectId}"]`);
    if (rowToUpdate) {
      const cells = rowToUpdate.querySelectorAll('td');
      cells[0].textContent = projectName;
      cells[1].innerHTML = `<img src="${imageUrl}" alt="${projectName}">`;
      cells[2].innerHTML = `<a href="${link}" target="_blank">Link</a>`;
      cells[3].textContent = tags.join(', ');
    }
  } else {
    alert('Vui lòng điền đầy đủ thông tin.');
  }
}

function deleteProject(projectId) {
  const updatedProjects = storedProjects.filter(project => project.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
  const rowToDelete = document.querySelector(`tr[data-id="${projectId}"]`);
  if (rowToDelete) {
    rowToDelete.remove();
  }
}
displayProjects();
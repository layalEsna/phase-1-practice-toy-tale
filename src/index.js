let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch(`http://localhost:3000/toys`)
    .then(res => {
      if (!res.ok) {
        throw new Error('An error occurred!')
      }
      return res.json()
    })
    .then(data => {
      data.forEach(toy => {
        const toyCollection = document.querySelector('#toy-collection')
        const card = document.createElement('div')
        card.classList.add('card')
        toyCollection.appendChild(card)
        const h2 = document.createElement('h2')
        h2.textContent = toy.name
        card.appendChild(h2)
        const img = document.createElement('img')
        img.classList.add('toy-avatar')
        img.src = toy.image
        card.appendChild(img)
        const p = document.createElement('p')
        p.setAttribute('id', 'addLikes')
        p.textContent = `${toy.likes} likes`
        card.appendChild(p)
        const btn = document.createElement('button')
        btn.classList.add('like-btn')
        btn.setAttribute('id', toy.id)
        btn.textContent = 'Like'
        card.appendChild(btn)

        btn.addEventListener('click', () => {
          
          p.textContent = `${parseInt(p.textContent) + 1} likes`;

          
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              'likes': parseInt(p.textContent)
            })
          });
        });
      });
    })
    .catch(error => {
      console.error('Error fetching toys:', error);
    });

  const form = document.querySelector('#add-toy-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputName = document.querySelector('.input-text[name="name"]').value;
    const inputImg = document.querySelector('.input-text[name="image"]').value;

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": inputName,
        "image": inputImg,
        //"likes": 0
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add toy');
      }
      return response.json();
    })
    .then(data => {
      console.log('Toy added successfully:', data);
    })
    .catch(error => {
      console.error('Error adding toy:', error);
    });

    form.reset();
  });
});


// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
//   fetch(`http://localhost:3000/toys`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('An error ocurred!')
//       }
//       return res.json()
//     })
//     .then(data => {
//       //console.log(data[0].name)
//       console.log(data)
//       data.forEach(toy => {
//         const toyCollection = document.querySelector('#toy-collection')
//         const card = document.createElement('div')
//         card.classList.add('card')
//         toyCollection.appendChild(card)
//         const h2 = document.createElement('h2')
//         h2.textContent = toy.name
//         card.appendChild(h2)
//         const img = document.createElement('img')
//         img.classList.add('toy-avatar')
//         img.src = toy.image
//         card.appendChild(img)
//         const p = document.createElement('p')
//         p.setAttribute('id', 'addLikes')
//         p.textContent = `${toy.likes} likes`
//         card.appendChild(p)
//         const btn = document.createElement('button')
//         btn.classList.add('like-btn')
//         btn.setAttribute('id', toy.id)
//         btn.textContent = 'Like'
//         card.appendChild(btn)
//       })

//     })

  
//   const form = document.querySelector('#add-toy-form');
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const inputName = document.querySelector('.input-text[name="name"]').value;
//     const inputImg = document.querySelector('.input-text[name="image"]').value;

//     fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "name": inputName,
//         "image": inputImg,
        
//       })
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to add toy');
//         }
//         return response.json();
//       })
//       .then(data => {
        
//         console.log('Toy added successfully:', data);
        
//       })
//       .catch(error => {
//         console.error('Error adding toy:', error);
//       });

    
//     form.reset();
//   });

//   const likeBtn = document.querySelector(`#${toy.id}`);
//   likeBtn.addEventListener('click', () => {
//     const pLikes = document.querySelector('#addLikes');
//     pLikes.textContent = parseInt(pLikes.textContent) + 1 + 'Likes';

//     fetch('http://localhost:3000/toys')
//       .then(res => {
//   return res.json()
//       })
//       .then(data => {
//       console.log(data)
//     })

// fetch(`http://localhost:3000/toys/${toy.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         'likes': parseInt(p.textContent)//likeBtn
//       })
//     });
//   });



// });

// document.addEventListener('DOMContentLoaded', () => {
//   const likeBtn = document.querySelector('#' + toy.id)
//   likeBtn.addEventListener('click', () => {
//     const pLikes = document.querySelector('#addLikes')
//     // pLikes.textContent = pLikes.value + 1
//     pLikes.textContent = parseInt(pLikes.textContent) + 1
     
//     fetch(`http://localhost:3000/toys/${toy.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         'likes': likeBtn
//       })
//     })
//   })
// })

// document.addEventListener('DOMContentLoaded', () => {
//   const likeBtn = document.querySelector('#' + toy.id);
//   likeBtn.addEventListener('click', () => {
//     const pLikes = document.querySelector('#addLikes');
//     pLikes.textContent = parseInt(pLikes.textContent) + 1;

//     fetch('http://localhost:3000/toys')
//       .then(res => {
//   return res.json()
//       })
//       .then(data => {
//       console.log(data)
//     })

// fetch(`http://localhost:3000/toys/${toy.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         'likes': likeBtn
//       })
//     });
//   });
// });



// document.addEventListener('DOMContentLoaded', () => {
//   const likeBtn = document.querySelector('#toy.id')
//   likeBtn.addEventListener('click', () => {
//     const addLikes = document.querySelector('#addLikes')
//     let likeN = addLikes.value + 1
//     fetch(`http://localhost:3000/toys/${toy.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'Application/json',
//         Accept: 'Application/json'
//       },
//       body: JSON.stringify({
//         'likes': likeN
//       })


//     },
//       // headers: {
//       //   'Content-Type': 'Application/json',
//       //   Accept: 'Application/json'
//       // }
//   }

//   })











// // Assuming you have a button with class 'like-btn' and each button has an ID corresponding to the toy ID

// // document.addEventListener("DOMContentLoaded", () => {
// //   const toyCollection = document.querySelector('#toy-collection');

// //   // Add event listener to the toy collection to handle like button clicks
// //   toyCollection.addEventListener('click', (event) => {
// //     if (event.target.classList.contains('like-btn')) {
// //       // Get the ID of the toy associated with the like button
// //       const toyId = event.target.getAttribute('id');

// //       // Fetch the current number of likes for the toy
// //       fetch(`http://localhost:3000/toys/${toyId}`)
// //         .then(res => {
// //           if (!res.ok) {
// //             throw new Error('An error occurred!')
// //           }
// //           return res.json();
// //         })
// //         .then(data => {
// //           // Increment the number of likes
// //           const newLikes = data.likes + 1;

// //           // Make a PATCH request to update the number of likes
// //           fetch(`http://localhost:3000/toys/${toyId}`, {
// //             method: 'PATCH',
// //             headers: {
// //               'Content-Type': 'application/json',
// //               Accept: 'application/json'
// //             },
// //             body: JSON.stringify({
// //               "likes": newLikes
// //             })
// //           })
// //             .then(res => {
// //               if (!res.ok) {
// //                 throw new Error('Failed to update likes!');
// //               }
// //               // Update the DOM with the new number of likes
// //               event.target.previousElementSibling.textContent = `${newLikes} likes`;
// //               console.log('Likes updated successfully!');
// //             })
// //             .catch(error => {
// //               console.error('Error updating likes:', error);
// //             });
// //         })
// //         .catch(error => {
// //           console.error('Error fetching toy details:', error);
// //         });
// //     }
// //   });
// // });


      
// // //     body: JSON.stringify(
// // //       const likebtn = document.querySelector('.like-btn')
// // // likebtn.addEventListener('click', () => {

// //   //   )
      
    
// //   // })
  
  

// // // // fetch('http://localhost:3000/toys', {
// // // //   method: 'POST',
// // // //   headers: {
// // // //     'Content-Type': 'application/json',
// // // //     Accept: 'application/json'
// // // //   },
// // // //   body: JSON.stringify({
// // // //     "name": "Jessie",
// // // //     "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
// // // //     "likes": 0
// // // //   })

// // // // })
// // // //   .then(res => {
// // // //     if (!res.ok) {
// // // //       throw new Error('Not found!')
// // // //     }
// // // //     return res.json()
// // // //   })

// // // let addToy = false;

// // // document.addEventListener("DOMContentLoaded", () => {
// // //   const addBtn = document.querySelector("#new-toy-btn");
// // //   const toyFormContainer = document.querySelector(".container");
// // //   addBtn.addEventListener("click", () => {
// // //     // hide & seek with the form
// // //     addToy = !addToy;
// //     if (addToy) {
// //       toyFormContainer.style.display = "block";
// //     } else {
// //       toyFormContainer.style.display = "none";
// //     }
// //   });

// //   // Fetch toys and add them to the DOM
// //   fetch(`http://localhost:3000/toys`)
// //     .then(res => {
// //       if (!res.ok) {
// //         throw new Error('An error occurred!')
// //       }
// //       return res.json()
// //     })
// //     .then(data => {
// //       //console.log(data[0].name)
// //       console.log(data)
// //       data.forEach(toy => {
// //         const toyCollection = document.querySelector('#toy-collection')
// //         const card = document.createElement('div')
// //         card.classList.add('card')
// //         toyCollection.appendChild(card)
// //         const h2 = document.createElement('h2')
// //         h2.textContent = toy.name
// //         card.appendChild(h2)
// //         const img = document.createElement('img')
// //         img.classList.add('toy-avatar')
// //         img.src = toy.image
// //         card.appendChild(img)
// //         const p = document.createElement('p')
// //         p.textContent = `${toy.likes} likes`
// //         card.appendChild(p)
// //         const btn = document.createElement('button')
// //         btn.classList.add('like-btn')
// //         btn.setAttribute('id', toy.id)
// //         btn.textContent = 'Like'
// //         card.appendChild(btn)
// //       });

// //       // After fetching toys and adding them to the DOM, 
// //       // make the second fetch request to create a new toy
// //       fetch('http://localhost:3000/toys', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Accept: 'application/json'
// //         },
// //         body: JSON.stringify({
// //           "name": "Jessie",
// //           "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
// //           "likes": 0
// //         })
// //       })
// //         .then(res => {
// //           if (!res.ok) {
// //             throw new Error('Not found!')
// //           }
// //           res.json()
// //           //   const btn = document.querySelector('#new-toy-btn')

// //           //   btn.addEventListener('click', () => {
// //           //     return res.json()
// //           //   })
// //         })

// //         .then(data => {
// //           const btn = document.querySelector('#new-toy-btn')
// //           btn.addEventListener('click', () => {
// //             return data.json()
// //           })
// //         })
// //         .catch(error => {
// //           console.error('Error:', error);
// //         });
// //     })
// //     .catch(error => {
// //       console.error('Error:', error);
// //     });
// // });

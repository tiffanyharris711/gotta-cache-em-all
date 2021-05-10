// const img1 = document.querySelector('#title');
const img1 = d3.select('#title');

Velocity(img1, {
  translateY: '130px',
  translateX: '130px'},
{
  easing: [2000, 80],
  duration: '2000' });

  console.log("test");
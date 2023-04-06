import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
	  console.log(row.innerHTML);
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
	let found = false;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture') && !found) {
		  div.className = 'cards-card-image';
		  div.querySelectorAll('img').style = 'border-radius:25px';
		  found = true;
	  }
      else {
		  div.className = 'cards-card-body';
		  div.querySelectorAll('img').forEach((img) => {
				img.width=24;
				img.height=24;
		  });
	  }
    });
	li.children[4].classList.add("right");
	li.children[5].classList.add("right");
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

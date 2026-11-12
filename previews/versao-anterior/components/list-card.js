const ListCardComponent = ({ props }) => ({
  next() {
    const property = props.property;
    return {
      done: false,
      value: /*html*/`
        <article class="list-card" data-route="imovel" data-property-id="${property.id}" style="cursor: pointer;">
          <img src="${property.image}" alt="${property.title}" loading="lazy">
          <div class="list-info">
            <span class="property-type">${property.type}</span>
            <h3>${property.title}</h3>
            <div class="location">${property.city}</div>
            <div class="meta">${property.meta.map((item) => /*html*/`<span>${item}</span>`).join("")}</div>
          </div>
          <div class="list-price">
            <strong class="price">${property.price}</strong>
          </div>
        </article>
      `,
    };
  },
});

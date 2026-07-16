const PropertyCardComponent = ({ props }) => ({
  next() {
    const property = props.property;
    return {
      done: false,
      value: /*html*/`
        <article class="property-card fade-up" data-route="imovel" data-property-id="${property.id}" style="cursor: pointer;">
          <div class="card-media">
            <img src="${property.image}" alt="${property.title}" loading="lazy">
            <span class="badge">${property.tag}</span>
          </div>
          <div class="property-body">
            <span class="property-type">${property.type}</span>
            <h3>${property.title}</h3>
            <div class="location">${property.city}</div>
            <div class="meta">${property.meta.map((item) => /*html*/`<span>${item}</span>`).join("")}</div>
            <div class="price">${property.price}</div>
          </div>
        </article>
      `,
    };
  },
});

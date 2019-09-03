$.getJSON('./data/grammys.json', data => {
  let options = data.fields.map(option => option.field);
  let category_types = $('#category_types');
  let fields = data.fields;

  category_types.append(
    options.map(option => {
      return $('<option/>', { value: option, text: option });
    })
  );

  $(document).ready(_=> {
    let selection = $(category_types).children('option:selected').val();
    let contentObj = fields.filter(cat => cat.field == selection)[0];

    setContent(contentObj);
    category_types.change(function () {
      let selectedCat = $(this).children('option:selected').val();
      contentObj = fields.filter(cat => cat.field === selectedCat)[0];
      setContent(contentObj)
    })
  })
});

function setContent(content) {
  let $nominees_section = $('#nominees_section');
  let description = content.hasOwnProperty('description') &&
                    content.description != ''? 
                    '<p class="description">' + content.description + '</p>' :
                    '';
  let categories = content.categories
                  .map((cat,index) => (
                    '<h3>' + cat.category_name + '</h3>' +
                    '<ul>' +
                    cat.nominees.map( (nominee, i) => (
                      '<li>'+
                        `<h4 ${i === cat.winner_id ? 'class=winner' : ''}> 
                          ${nominee.nominee} 
                        </h4>` +
                        `${i === cat.winner_id ? '<span> WINNER </span>' : ''}`+
                        '<p>' + nominee.artist + '</p>' +
                        '<p>' + nominee.info + '</p>'
                    )).join('') +
                    '</ul>' +
                    `${content.categories[index + 1] ? '<hr>' : ''}`
                  ));
  
  // set content
  $nominees_section.html(
      '<h2>' + content.field + '</h2>' +
      description + 
      categories.join('')
    );
}
